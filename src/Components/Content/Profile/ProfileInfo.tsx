import React, { useState, FC, ChangeEvent } from 'react';
import styles from './Profile.module.css'
import UserPhoto from '../../../pictures/user_man.png'
import UserStatus from './ProfileStatus';
import AboutMe, { AboutMeFormValuesType } from './AboutMe';
import { ProfileDataType } from '../../../types/types';

type PropsType = {
    status: string
    profileData: ProfileDataType
    isOwner: boolean
    updateUserStatus: (statusBody: string) => void
    savePhoto: (file: File) => void
    updateAboutMe: (form: AboutMeFormValuesType) => void
}

const UserInfo: FC<PropsType> = (props) => {
    let [editPhotoMode, setEditPhotoMode] = useState(false)
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length){
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={styles.userInfo}>
            <div className={styles.profileLargePhoto}
                onMouseOver={() => setEditPhotoMode(true)}
                onMouseLeave={() => setEditPhotoMode(false)}>
                <img alt="" src={
                    props.profileData.photos.large ? props.profileData.photos.large : UserPhoto
                } />
                {props.isOwner && editPhotoMode && <input type="file" className={styles.uploadPhotoButton}
                                                                    onChange = {onMainPhotoSelected} />}
            </div>
            <p>
                <UserStatus status = {props.status} updateUserStatus = {props.updateUserStatus} isOwner = {props.isOwner}/>
                <div className={styles.name}>{props.profileData.fullName}</div>

                <AboutMe updateAboutMe = {props.updateAboutMe} profileData = {props.profileData} isOwner ={props.isOwner}/>
            </p>
        </div>
    );
}


export default UserInfo;