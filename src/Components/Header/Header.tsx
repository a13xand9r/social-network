import React, { FC } from 'react';
import classes from './Header.module.css'
import UserPhoto from '../../pictures/user_man.png'
import { NavLink } from 'react-router-dom';
import { PropsHeaderFromRedux } from './HeaderContainer';

const Header: FC<PropsHeaderFromRedux> = (props) => {
    return (
        <header className={classes.header}>
            <p>Главная страница</p>
            <img alt="" className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png' />
            <div>{props.isAuth
                ? <div><div>{props.login} - <NavLink to="/login" onClick = {props.logout}>logout</NavLink></div> 
                  <NavLink to='/profile'><img className = {classes.userPhoto} src={props.userSmallPhoto ? props.userSmallPhoto : UserPhoto} alt=""/></NavLink></div>
                : <NavLink to={'/login'}>login</NavLink>}</div>
        </header>
    );
}

export default Header;