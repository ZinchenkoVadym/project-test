import React from 'react';
import {Tooltip} from '@mui/material';
import './user.scss'
import '../../../App.scss';

const User = (props) => {

    const sliceText = (str) => {
        if (str.length > 20) return str.slice(0, 20) + '...';
        return str;
    };

    let name = sliceText(props.user.name);
    let email = sliceText(props.user.email);

    return (
        <div className='user__card' onClick={(e) => {
            if (!props.userOpen) {
                props.getUserProfile(props.user.id);
            }
        }}>
            <div className='body__card'>
                <img className='avatar' src={props.user.photo}/>
                {props.userOpen ? <div className='user__id'>User ID: {props.user.id}</div> : null}
                <Tooltip title={props.user.name}>
                    <div className='name'>{name}</div>
                </Tooltip>
                <div className='position'>{props.user.position}</div>
                <Tooltip arrow title={props.user.email}>
                    <div className='email'>{email}</div>
                </Tooltip>
                <div className='phone'>{props.user.phone}</div>
            </div>
        </div>
    );
};

export default User;