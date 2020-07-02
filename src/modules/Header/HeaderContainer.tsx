import Header from './Header';
import { connect, ConnectedProps } from 'react-redux';
import { getAuth, logout } from '../../redux/auth_reducer';
import { AppStateType } from '../../redux/redux_store';

const mapStateToProps = (state: AppStateType) => ({
    login:  state.auth.login,
    userId: state.auth.userId,
    email:  state.auth.email,
    isAuth:  state.auth.isAuth
})

const connector = connect(mapStateToProps, {getAuth, logout});
export type PropsHeaderFromRedux = ConnectedProps<typeof connector>

export default connector(Header);