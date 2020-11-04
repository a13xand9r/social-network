import React, { useCallback, useEffect } from 'react';
import Pagination from '../../Common/Pagination';
import styles from './Users.module.css'
import User from './User';
import { UsersType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux_store';
import { connect } from 'react-redux';
import { getUsers, followUnFollow, actions } from '../../../redux/users_reducer';
import Preloader from '../../Common/Preloader';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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

type StateToPropsType = {
    users: Array<UsersType>
    currentPage: number
    itemsOnPage: number
    totalUsers: number
    isFetching: boolean
    FetchingFollowDisable: Array<number>
}
type DispatchToPropsType = {
    getUsers: (pageNumber: number, itemsOnPage: number, friends: boolean, term: string | null) => void
    followUnFollow: (userId: number, followed: boolean) => void
    changeCurrentPage: (p: number) => void
}
type PropsType = StateToPropsType & DispatchToPropsType

const Users: React.FC<PropsType> = (props) => {
    let history = useHistory()
    let {pageNumber, term}: {pageNumber: string, term: string} = useParams()
    let onSearchRouter = (term: string) => {
        if (history.location.pathname.includes('users')) history.push(`/users/1/${term}`)
        if (history.location.pathname.includes('friends')) history.push(`/friends/1/${term}`)
    }
   let termSearch: boolean = term ? true : false

    const getUsers = useCallback(
        (term: string | null = null) => {
            if (pageNumber){
                if (history.location.pathname.includes('users')) props.getUsers(+pageNumber, props.itemsOnPage, false, term)
                if (history.location.pathname.includes('friends')) props.getUsers(+pageNumber, props.itemsOnPage, true, term)
            }
        },[])
    useEffect(() => {
        getUsers(term)
    }, [pageNumber, term, getUsers])
    if (!pageNumber){
        return <Redirect to = {history.location.pathname === '/users' ? '/users/1' : '/friends/1'} />
    }
    return <div className = {styles.usersPage}>
        {props.isFetching ? <div className = {styles.preloader}><Preloader /></div> : null}
        <Search search = {onSearchRouter} />
        {props.itemsOnPage < props.totalUsers ? <div className = {styles.pagination}>
            <Pagination totalItems={props.totalUsers} itemsOnPage={props.itemsOnPage}
            path = {history.location.pathname.includes('users') ? '/users/' : '/friends/'}
            currentPage={+pageNumber} portionSize = {10} term = {term} /></div> : null}
        {
            props.users.map(u =>
                <User user={u} FetchingFollowDisable={props.FetchingFollowDisable}
                    followUnFollow={props.followUnFollow} isTermSearch = {termSearch} searchText = {term} />
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
    }
}

export default connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getUsers,
    followUnFollow,
    changeCurrentPage: actions.changeCurrentPage
})(Users);