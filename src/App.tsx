import React from 'react';
import classes from './App.module.css';
import Nav from './modules/Navbar/nav';
import { Route } from 'react-router-dom';
import DialogsContainer from './modules/Content/Dialogs/DialogsContainer';
import UsersContainer from './modules/Content/Users/UsersContainer';
import ProfileContainer from './modules/Content/Profile/ProfileContainer';
import HeaderContainer from './modules/Header/HeaderContainer';
import LoginPage from './modules/Login/Login';
import { connect, ConnectedProps } from 'react-redux';
import { initialApp } from './redux/initial_reducer';
import Preloader from './modules/Common/Preloader';
import { AppStateType } from './redux/redux_store';

class App extends React.Component<PropsType> {
  componentDidMount() {
    this.props.initialApp()
  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className={classes.app_wrapper} >
        <HeaderContainer />
        <div className={classes.page}>
          <Nav />
          <div className={classes.app_wrapper_content}>
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/login' render={() => <LoginPage />} />
          </div>
        </div>

      </div>
    )
  }
}
const mapStateToProps = (state: AppStateType) => ({
  initialized: state.initial.initialized
})

const connector = connect(mapStateToProps,{initialApp})
type PropsType = ConnectedProps<typeof connector> & {
  state: AppStateType
  dispatch: any
}

export default connector(App)
