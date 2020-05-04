import React from 'react';
import { connect } from 'react-redux';
import { getUsers, followUnFollow } from '../../../redux/friends_reducer';
import Preloader from '../../Common/Preloader';
import Users from './Users';

class UsersContainer extends React.Component{
    componentDidMount(){
        this.props.getUsers(/*this.props.currentPage*/1, this.props.itemsOnPage)
    }

    getUsersOnClick = (pageNumber) => {
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

const mapStateToProps = (state) => {
    return{
        users:                  state.friendsPage.users,
        currentPage:            state.friendsPage.currentPage,
        itemsOnPage:            state.friendsPage.itemsOnPage,
        totalUsers:             state.friendsPage.totalUsers,
        isFetching:             state.friendsPage.isFetching,
        FetchingFollowDisable:  state.friendsPage.FetchingFollowDisable,
    }
}
export default connect(mapStateToProps, {
    getUsers,
    followUnFollow
})(UsersContainer);