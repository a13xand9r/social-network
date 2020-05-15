import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './Profile';
import { requestProfilePage, getUserStatus, updateUserStatus, savePhoto, updateAboutMe } from '../../../redux/profile_reducer';
import Preloader from '../../Common/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';
import { getProfilePage, getIsAuthRequested, getIsAuth, getUserId } from '../../../redux/selectors';

class ProfileContainer extends React.Component {
    componentDidMount() {
        if (this.props.isAuth) {
            this.props.requestProfilePage(this.props.match.params.userId
                ? this.props.match.params.userId
                : this.props.authId)
            this.props.getUserStatus(this.props.match.params.userId
                ? this.props.match.params.userId
                : this.props.authId)
        } else if (this.props.match.params.userId) {
            this.props.requestProfilePage(this.props.match.params.userId)
            this.props.getUserStatus(this.props.match.params.userId)
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userId !== this.props.match.params.userId && !this.props.match.params.userId) {
            this.props.requestProfilePage(this.props.authId)
        }
    }

    render() {
        return <>
            {this.props.profilePage.isFetching
                ? <Preloader />
                : <Profile profilePage={this.props.profilePage}
                    updateUserStatus={this.props.updateUserStatus}
                    isOwner = {!this.props.match.params.userId}
                    savePhoto = {this.props.savePhoto} 
                    updateAboutMe = {this.props.updateAboutMe} />}
        </>
    }
}

const mapStateToProps = (state) => {
    return{
        profilePage: getProfilePage(state), 
        authId: getUserId(state),
        isAuth: getIsAuth(state),
        isAuthRequested: getIsAuthRequested(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestProfilePage, getUserStatus, updateUserStatus, savePhoto, updateAboutMe}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)