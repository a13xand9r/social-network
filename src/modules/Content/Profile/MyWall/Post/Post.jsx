import React from 'react';
import classes from './Post.module.css'
import UserPhoto from '../../../../../pictures/user_man.png'

const Post = (props) => {
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