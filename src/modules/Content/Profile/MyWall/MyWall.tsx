import React, { FC } from 'react';
import classes from './MyWall.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { PostDataType } from '../../../../types/types';

const PostTextForm = (props: any) => {
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

const PostReduxForm = reduxForm({ form: 'wallPost' })(PostTextForm)

type PropsType = {
    posts: Array<PostDataType>
    userSmallPhoto: string | null
    addPost: (postText: string) => void
}

const MyWall: FC<PropsType> = (props) => {
    const onAddPost = (form: any) => {
        props.addPost(form.postText);
    }
    let posts = props.posts.map(post => <Post message = {post.message} likes = {post.like} userSmallPhoto = {props.userSmallPhoto} />);
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