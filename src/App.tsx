import React from 'react';
import classes from './App.module.css';
import Nav from './Components/Navbar/nav';
import { Route } from 'react-router-dom';
import DialogsContainer from './Components/Content/Dialogs/DialogsContainer';
import UsersContainer from './Components/Content/Users/UsersContainer';
import ProfileContainer from './Components/Content/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import { connect, ConnectedProps } from 'react-redux';
import { initialApp } from './redux/initial_reducer';
import Preloader from './Components/Common/Preloader';
import { AppStateType } from './redux/redux_store';
import { Dispatch } from 'redux';
//import { Dispatch } from 'redux';

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
  dispatch: Dispatch
}

export default connector(App)
