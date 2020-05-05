import React from 'react';
import classes from './Profile.module.css'
import MyWallContainer from './MyWall/MyWallContainer';
import UserInfo from './UserInfo';

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <UserInfo profileData={props.profilePage.profileData}
                status={props.profilePage.status}
                updateUserStatus={props.updateUserStatus}
                isOwner={props.isOwner}
                savePhoto = {props.savePhoto} />
            <MyWallContainer />
        </div>
    );
}

export default Profile;