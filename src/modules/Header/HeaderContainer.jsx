import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuth, logout } from '../../redux/auth_reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    login:  state.auth.login,
    userId: state.auth.userId,
    email:  state.auth.email,
    isAuth:  state.auth.isAuth
})

export default connect(mapStateToProps, {getAuth, logout})(HeaderContainer);