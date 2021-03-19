import React, { FC } from 'react';
import classes from './MyWall.module.css'
import Post from './Post/Post';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { DispatchToPropsType, StateToPropsType } from './MyWallContainer';

const PostTextForm: FC<InjectedFormProps<PostFormValuesType>> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field name="postText" component="textarea" type="text" placeholder='Whats going on?' />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm<PostFormValuesType>({ form: 'wallPost' })(PostTextForm)

export type PostFormValuesType = {
    postText: string
}

type PropsType = StateToPropsType & DispatchToPropsType

const MyWall: FC<PropsType> = (props) => {
    const onAddPost = (form: PostFormValuesType) => {
        props.addPost(form.postText, props.myId);
    }
    let posts = props.posts.slice().reverse().map(post => <Post post = {post} deletePost = {props.deletePost} likePost = {props.likePost} userSmallPhoto = {props.userSmallPhoto} myPhoto = {props.myPhoto} myId = {props.myId} />);
    return (
    <div className = {classes.wall}>
        <PostReduxForm onSubmit = {onAddPost} />
        <div className = {classes.posts}>
            {posts}
        </div>
    </div>
    );
}

export default MyWall;