import React from 'react';
import styles from './Users.module.css'
import user_man from './../../../pictures/user_man.png'
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../../types/types';

type PropsType = {
    user: UsersType
    searchText: string | null
    isTermSearch: boolean
    FetchingFollowDisable: Array<number>
    followUnFollow: (userId: number, followed: boolean) => void
}

const User: React.FC<PropsType> = ({ user, searchText, isTermSearch, FetchingFollowDisable, followUnFollow }) => {
    let termIndex: number = -1
    if (searchText) termIndex = user.name.indexOf(searchText)
    return <div className={styles.item} >
        <NavLink to={'/profile/' + user.id} >
            <img src={user.photos.small === null ? user_man : user.photos.small} alt="No" />
        </NavLink>
        { (searchText && isTermSearch && termIndex !== -1) ? user.name.split('').map((el, i) => {
            return <span className = {(i < (searchText.length + termIndex) && i >= termIndex) ? styles.searchTerm : ''}>{el}</span>
        }) : user.name}
        {/* {user.name} */}
        <br />
        <button disabled={FetchingFollowDisable.some(id => id === user.id)}
            onClick={() => { followUnFollow(user.id, user.followed) }}>
            {user.followed ? 'Unfollow' : 'Follow'}
        </button>
    </div>
}

export default User;