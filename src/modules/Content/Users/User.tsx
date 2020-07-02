import React from 'react';
import styles from './Users.module.css'
import user_man from './../../../pictures/user_man.png'
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../../types/types';

type PropsType = {
    user: UsersType
    FetchingFollowDisable: Array<number>
    followUnFollow: (userId: number, followed: boolean) => void
}

const User: React.FC<PropsType> = ({ user, FetchingFollowDisable, followUnFollow }) => {

    return <div className={styles.item} >
        <NavLink to={'/profile/' + user.id} >
            <img src={user.photos.small === null ? user_man : user.photos.small} alt="No" />
        </NavLink>
        {user.name}
        <br />
        <button disabled={FetchingFollowDisable.some(id => id === user.id)}
            onClick={() => { followUnFollow(user.id, user.followed) }}>
            {user.followed ? 'Unfollow' : 'Follow'}
        </button>
    </div>
}

export default User;