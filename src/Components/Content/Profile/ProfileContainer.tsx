import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Profile from './Profile';
import { requestProfilePage, getUserStatus, updateUserStatus, savePhoto, updateAboutMe } from '../../../redux/profile_reducer';
import Preloader from '../../Common/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';
import { getProfilePage, getIsAuthRequested, getIsAuth, getUserId } from '../../../redux/selectors';
import { AppStateType } from '../../../redux/redux_store';


const mapStateToProps = (state: AppStateType) => {
    return{
        profilePage: getProfilePage(state),
        authId: getUserId(state),
        isAuth: getIsAuth(state),
        isAuthRequested: getIsAuthRequested(state)
    }
}

type PathParamsType = {
    userId: string,
}

const connector = connect(mapStateToProps, {requestProfilePage, getUserStatus, updateUserStatus, savePhoto, updateAboutMe})
type PropsFromRedux = ConnectedProps<typeof connector>
type PropsType = PropsFromRedux & RouteComponentProps<PathParamsType>


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        if (this.props.isAuth && this.props.authId !== null) {
            this.props.requestProfilePage(this.props.match.params.userId
                ? +this.props.match.params.userId
                : this.props.authId)
            this.props.getUserStatus(this.props.match.params.userId
                ? +this.props.match.params.userId
                : this.props.authId)
        } else if (this.props.match.params.userId) {
            this.props.requestProfilePage(+this.props.match.params.userId)
            this.props.getUserStatus(+this.props.match.params.userId)
        }
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId && !this.props.match.params.userId && this.props.authId !== null) {
            this.props.requestProfilePage(this.props.authId)
            this.props.getUserStatus(this.props.authId)
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

export default compose<React.ComponentType>(
    connector,
    withRouter,
    withAuthRedirect
)(ProfileContainer)