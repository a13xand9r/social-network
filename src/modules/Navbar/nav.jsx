import React from 'react';
import classes from './nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
    <nav className = {classes.nav}>
        <div className = {classes.item}>
            <NavLink exact to = '/profile' activeClassName = {classes.active}>My Profile</NavLink>
        </div>
        
        {/* <div className = {classes.item}>
           <NavLink to = '/friends' activeClassName = {classes.active}>My Friends</NavLink>
        </div> */}
        <div className = {classes.item}>
           <NavLink to = '/users' activeClassName = {classes.active}>Users</NavLink>
        </div>

        <div className = {classes.item}>
            <NavLink to = '/dialogs' activeClassName = {classes.active}>Message</NavLink>
        </div>

        <div className = {classes.item}>
            <NavLink to = '/feed' activeClassName = {classes.active}>News</NavLink>
        </div>
        
    </nav>
    );
}

export default Nav;