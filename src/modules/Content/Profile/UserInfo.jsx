import React from 'react';
import classes from './Profile.module.css'
import UserPhoto from '../../../pictures/user_man.png'
import { useState } from 'react';
import { useEffect } from 'react';

const UserInfo = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [statusBody, changeStatusBody] = useState(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }
    const onChangeStatus = (e) => {
        changeStatusBody(e.currentTarget.value)
    }
    const onUpdateStatus = () => {
        props.updateUserStatus(statusBody)
        setEditMode(false)
    }
    useEffect(() => {
        changeStatusBody(props.status)
    }, [props.status, editMode])
    return (
        <div className={classes.userInfo}>
            <img alt="Картинка не грузит" src={
                props.profileData.photos.large ? props.profileData.photos.large : UserPhoto
            } />
            <p>
                {!editMode &&
                    <div>
                        <span onClick={activateEditMode}>{props.status || 'set your status'}</span>
                    </div>
                }
                {editMode &&
                    <div onMouseLeave={deactivateEditMode} className={classes.editStatus}>
                        <div>
                            <input onChange={onChangeStatus} autoFocus={true} value={statusBody} />
                        </div>
                        <div>
                            <button onClick={onUpdateStatus}>Update status</button>
                        </div>
                    </div>
                }
                <div className={classes.name}>{props.profileData.fullName}</div>
                <div className={classes.contacts}>{props.profileData.aboutMe}</div>
                <div className={classes.contacts}>Contacts:</div>
                <div className={classes.contact}>Facebook:  {props.profileData.facebook}</div>
                <div className={classes.contact}>VK:        {props.profileData.vk}</div>
                <div className={classes.contact}>Twitter:   {props.profileData.twitter}</div>
                <div className={classes.contact}>Instagram: {props.profileData.instagram}</div>
            </p>
        </div>
    );
}


export default UserInfo;