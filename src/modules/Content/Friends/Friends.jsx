import React from 'react';
import Pagination from '../../Common/Pagination';
import User from './User';

const Users = (props) => {

    return <div>
        <Pagination totalUsers={props.totalUsers} itemsOnPage={props.itemsOnPage}
            currentPage={props.currentPage} getUsersOnClick={props.getUsersOnClick} />
        {
            props.users.map(u =>
                <User user={u} FetchingFollowDisable={props.FetchingFollowDisable}
                    followUnFollow={props.followUnFollow} />
            )
        }
    </div>
}

export default Users;