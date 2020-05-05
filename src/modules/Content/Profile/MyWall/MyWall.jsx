import React from 'react';
import classes from './MyWall.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';

const PostTextForm = (props) => {
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

const MyWall = (props) => {
    const onAddPost = (form) => {
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