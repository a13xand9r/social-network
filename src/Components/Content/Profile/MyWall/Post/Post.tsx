import React, { FC } from 'react';
import classes from './Post.module.css'
import UserPhoto from '../../../../../pictures/user_man.png'
import likePicture from '../../../../../pictures/like.png'
import { PostDataType } from '../../../../../types/types';

type PropsType = {
    post: PostDataType
    userSmallPhoto: string | null
    myId: number | null
    myPhoto: string | null
    deletePost: (postId: number) => void
    likePost: (postId: number, like: boolean) => void
}

const Post: FC<PropsType> = (props) => {
    const onDeletePost = () => {
        props.deletePost(props.post.id)
    }
    const onLikePost = () => {
        props.likePost(props.post.id, props.post.iLike ? false : true)
    }
    return (
    <div className = {classes.post}>
        <img alt = "" src= {props.post.authorId === props.myId && props.post.authorId ? (props.myPhoto ? props.myPhoto : UserPhoto) : (props.userSmallPhoto ? props.userSmallPhoto : UserPhoto)}/>
        <div className = {classes.postInner}>
            <div className = {classes.postText}>{props.post.message}</div>
            <span onClick = {onLikePost}><img src={likePicture} alt="" className = {props.post.iLike ? '' : classes.unLike} /></span> {props.post.likes}
        </div>
        <button className = {classes.deletePost} onClick = {onDeletePost}>x</button>
    
    </div>
    );
}

export default Post;