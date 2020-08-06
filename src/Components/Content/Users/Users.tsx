import React from 'react';
import Pagination from '../../Common/Pagination';
import User from './User';
import { UsersType } from '../../../types/types';

type PropsType = {
    totalUsers: number
    currentPage: number
    itemsOnPage: number
    FetchingFollowDisable: Array<number>
    users: Array<UsersType>
    getUsersOnClick: (pageNumber: number) => void
    followUnFollow: (userId: number, followed: boolean) => void
}

const Users: React.FC<PropsType> = (props) => {

    return <div>
        <Pagination totalItems={props.totalUsers} itemsOnPage={props.itemsOnPage}
            currentPage={props.currentPage} getItemsOnClick={props.getUsersOnClick} portionSize = {10} />
        {
            props.users.map(u =>
                <User user={u} FetchingFollowDisable={props.FetchingFollowDisable}
                    followUnFollow={props.followUnFollow} />
            )
        }
    </div>
}

export default Users;