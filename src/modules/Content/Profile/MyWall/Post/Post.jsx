import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
    <div className = {classes.post}>
        <img alt = "" src= {props.userSmallPhoto}/>
        {props.message}
        <div>
            <span>likes: </span> {props.likes}
        </div>
    
    </div>
    );
}

export default Post;