import React, { useEffect, useState } from 'react';
import Pagination from '../../Common/Pagination';
import styles from './Users.module.css'
import User from './User';
import { UsersType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux_store';
import { connect } from 'react-redux';
import { getUsers, followUnFollow, actions } from '../../../redux/users_reducer';
import Preloader from '../../Common/Preloader';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import Search from '../../Common/Search';

// type PropsType = {
//     totalUsers: number
//     currentPage: number
//     itemsOnPage: number
//     FetchingFollowDisable: Array<number>
//     users: Array<UsersType>
//     getUsers: (pageNumber: number, itemsOnPage: number) => void
//     followUnFollow: (userId: number, followed: boolean) => void
// }
type OwnProps = {
    friends: boolean
}

type StateToPropsType = {
    users: Array<UsersType>
    currentPage: number
    itemsOnPage: number
    totalUsers: number
    isFetching: boolean
    FetchingFollowDisable: Array<number>
    termSearch: boolean
}
type DispatchToPropsType = {
    getUsers: (pageNumber: number, itemsOnPage: number, friends: boolean, term: string | null) => void
    followUnFollow: (userId: number, followed: boolean) => void
    changeCurrentPage: (p: number) => void
}
type PathParamsType = {
    pageNumber: string,
}
type PropsType = StateToPropsType & DispatchToPropsType & RouteComponentProps<PathParamsType> & OwnProps

const Users: React.FC<PropsType> = (props) => {
    let [searchText, changeSearchText] = useState<string | null>(null)

    const getUsers = (term: string | null = null) => {
        if (props.match.params.pageNumber){
            if (props.match.url.includes('users')) props.getUsers(+props.match.params.pageNumber, props.itemsOnPage, false, term)
            if (props.match.url.includes('friends')) props.getUsers(+props.match.params.pageNumber, props.itemsOnPage, true, term)
        }
    }
    useEffect(() => {
        getUsers(searchText)
    }, [props.match.params.pageNumber, searchText])
    if (!props.match.params.pageNumber){
        return <Redirect to = {props.match.url === '/users' ? '/users/1' : '/friends/1'} />
    }
    return <div className = {styles.usersPage}>
        {props.isFetching ? <div className = {styles.preloader}><Preloader /></div> : null}
        <Search search = {changeSearchText} />
        {props.itemsOnPage < props.totalUsers ? <div className = {styles.pagination}><Pagination totalItems={props.totalUsers} itemsOnPage={props.itemsOnPage} 
            path = {props.match.url.includes('users') ? '/users/' : '/friends/'}
            currentPage={+props.match.params.pageNumber} portionSize = {10} /></div> : null}
        {
            props.users.map(u =>
                <User user={u} FetchingFollowDisable={props.FetchingFollowDisable}
                    followUnFollow={props.followUnFollow} isTermSearch = {props.termSearch} searchText = {searchText} />
            )
        }
    </div>
}

const mapStateToProps = (state: AppStateType):StateToPropsType  => {
    return{
        users:                  state.usersPage.users,
        currentPage:            state.usersPage.currentPage,
        itemsOnPage:            state.usersPage.itemsOnPage,
        totalUsers:             state.usersPage.totalUsers,
        isFetching:             state.usersPage.isFetching,
        FetchingFollowDisable:  state.usersPage.FetchingFollowDisable,
        termSearch:             state.usersPage.termSearch,
    }
}

export default compose<React.ComponentType>(connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getUsers,
    followUnFollow,
    changeCurrentPage: actions.changeCurrentPage
}), withRouter)(Users);