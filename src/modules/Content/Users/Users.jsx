import React from 'react';
import Pagination from '../../Common/Pagination';
import User from './User';
import styles from './Users.module.css'

const Users = (props) => {

    return <div className={styles.usersPage}>
        <div className={styles.pagination}>
            <Pagination totalItems={props.totalUsers} itemsOnPage={props.itemsOnPage}
                currentPage={props.currentPage} getUsersOnClick={props.getUsersOnClick}
                portionSize={10} />
        </div>
        <div className = {styles.users}>
            {
                props.users.map(u =>
                    <User user={u} FetchingFollowDisable={props.FetchingFollowDisable}
                        followUnFollow={props.followUnFollow} />
                )
            }
        </div>
    </div>
}

export default Users;