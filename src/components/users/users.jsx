import React, {useEffect, useRef, useState} from 'react';
import {CircularProgress} from '@mui/material';
import './../../App.scss';
import './users.scss';
import MyButton from '../UI/myButton';
import apiRequests from '../../api/apiRequests';
import User from './user/user';
import UserProfile from './userProfile/userProfile';


const Users = (props) => {

    let [showBtn, setShowBtn] = useState(true);
    let [userProfile, setUserProfile] = useState({});


    useEffect(() => {
        console.log(props)
        getUsers(props.pageNum)
            .catch(e => console.log(e));
    }, []);

    let usersRef = useRef(null)

    const getUsers = async (pageNum) => {
        props.setLoader(true);
        await apiRequests.getUsers(pageNum)
            .then(data => {
                props.setUsers(props.users.concat(data.users));
                props.setPageNum((prev) => prev + 1);
                if (pageNum === data.total_pages) setShowBtn(false);
                props.setLoader(false);
            })
            .catch(e => console.log(e));
    };

    const getUserProfile = async (userId) => {
        try {
            const user = await apiRequests.getUser(userId);
            setUserProfile(user.user);
            props.setUserOpen(true);
            setTimeout(() => window.scrollTo(0, usersRef.current.scrollHeight + 120), 0);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <section ref={usersRef} id='users' className='users__section'>
            <div className='users__container container'>
                <h1 className='users__title title'>Working with GET request</h1>
                {props.userOpen
                    ? <UserProfile  userOpen={props.userOpen} setUserOpen={props.setUserOpen} user={userProfile}/>
                    : <>
                        <div className='users__cards'>
                            {props.users.map((user) => {
                                return <User  getUserProfile={getUserProfile} userOpen={props.userOpen} key={user.id} user={user}/>
                            })}
                        </div>
                        {showBtn
                            ? <div className='show-btn__container'>
                                <MyButton onClick={() => getUsers(props.pageNum)} disabled={props.loader}>
                                    Show more
                                </MyButton>
                                <span className='loader'>
                                    {props.loader ? <CircularProgress sx={{width: '10px', height: '10px'}}/> : ''}
                                </span>
                            </div>
                            : null}
                    </>}
            </div>
        </section>
    );
};

export default Users;