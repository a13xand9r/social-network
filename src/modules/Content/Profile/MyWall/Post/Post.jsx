import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
    <div className = {classes.post}>
        <img alt = "Картинка не грузит" src="https://i.pinimg.com/originals/4d/af/2f/4daf2f183af331a8ba9a12bc2a458486.jpg"/>
        {props.message}
        <div>
            <span>likes: </span> {props.likes}
        </div>
    
    </div>
    );
}

export default Post;