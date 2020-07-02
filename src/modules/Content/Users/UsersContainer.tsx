import React from 'react';
import { connect } from 'react-redux';
import { getUsers, followUnFollow } from '../../../redux/users_reducer';
import Preloader from '../../Common/Preloader';
import Users from './Users';
import { UsersType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux_store';

type StateToPropsType = {
    users: Array<UsersType>
    currentPage: number
    itemsOnPage: number
    totalUsers: number
    isFetching: boolean
    FetchingFollowDisable: Array<number>
}
type DispatchToPropsType = {
    getUsers: (pageNumber: number, itemsOnPage: number) => void
    followUnFollow: (userId: number, followed: boolean) => void
}
type PropsType = StateToPropsType & DispatchToPropsType

class UsersContainer extends React.Component<PropsType>{
    componentDidMount(){
        this.props.getUsers(/*this.props.currentPage*/1, this.props.itemsOnPage)
    }

    getUsersOnClick = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.itemsOnPage)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users currentPage={this.props.currentPage}
                users={this.props.users}
                getUsersOnClick={this.getUsersOnClick}
                followUnFollow={this.props.followUnFollow}
                totalUsers={this.props.totalUsers}
                itemsOnPage={this.props.itemsOnPage}
                FetchingFollowDisable={this.props.FetchingFollowDisable}
            />
        </>

    }
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
    followUnFollow
})(UsersContainer);