import React, { FC } from 'react';
import classes from './Profile.module.css'
import MyWallContainer from './MyWall/MyWallContainer';
import UserInfo from './UserInfo';
import { ProfilePageStateType } from '../../../redux/profile_reducer';

type PropsType = {
    profilePage: ProfilePageStateType
    isOwner: boolean
    updateAboutMe: (form: any) => void
    savePhoto: (photoFile: any) => void
    updateUserStatus: (statusBody: string) => void
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={classes.profile}>
            <UserInfo profileData={props.profilePage.profileData}
                status={props.profilePage.status}
                updateUserStatus={props.updateUserStatus}
                isOwner={props.isOwner}
                savePhoto = {props.savePhoto}
                updateAboutMe = {props.updateAboutMe} />
            <MyWallContainer />
        </div>
    );
}

export default Profile;