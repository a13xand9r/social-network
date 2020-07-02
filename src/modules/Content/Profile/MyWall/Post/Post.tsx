import React, { FC } from 'react';
import classes from './Post.module.css'
import UserPhoto from '../../../../../pictures/user_man.png'

type PropsType = {
    message: string
    userSmallPhoto: string | null
    likes: string
}

const Post: FC<PropsType> = (props) => {
    return (
    <div className = {classes.post}>
        <img alt = "" src= {props.userSmallPhoto ? props.userSmallPhoto : UserPhoto}/>
        {props.message}
        <div>
            <span>likes: </span> {props.likes}
        </div>
    
    </div>
    );
}

export default Post;