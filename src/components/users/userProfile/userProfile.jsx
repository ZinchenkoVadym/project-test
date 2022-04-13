import React from 'react';
import User from "../user/user";
import './userProfile.scss'

const UserProfile = (props) => {

    return (
        <div className='user__profile' onClick={() =>{
        props.setUserOpen(false)
        }
        }>
            <User {...props}/>
        </div>
    );
};

export default UserProfile;