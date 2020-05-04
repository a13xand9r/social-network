import React from 'react';
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={classes.header}>
            <p>Главная страница</p>
            <img alt="Картинка не грузит" className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png' />
            <div>{props.isAuth
                ? <div>{props.login} - <NavLink to="/login" onClick = {props.logout}>logout</NavLink></div> 
                : <NavLink to={'/login'}>login</NavLink>}</div>
        </header>
    );
}

export default Header;