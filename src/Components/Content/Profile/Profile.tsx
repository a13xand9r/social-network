import React, { FC } from 'react';
import classes from './Profile.module.css'
import MyWallContainer from './MyWall/MyWallContainer';
import UserInfo from './ProfileInfo';
import { ProfilePageStateType } from '../../../redux/profile_reducer';
import { AboutMeFormValuesType } from './AboutMe';

type PropsType = {
    profilePage: ProfilePageStateType
    isOwner: boolean
    updateAboutMe: (form: AboutMeFormValuesType) => void
    savePhoto: (photoFile: File) => void
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