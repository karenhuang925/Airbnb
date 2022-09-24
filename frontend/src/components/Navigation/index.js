import ProfileButton from './ProfileButton'
import { useSelector } from 'react-redux';
import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom'
import LoginFormModal from '../LoginFormModal';


const Navigation = (isLoaded) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
        } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/users/signup">Sign Up</NavLink>
            </>
        );
    }
    return (
            <ul>
            <li>
                <NavLink exact to="/">
                    <i className="fas fa-house">
                    </i>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
            </ul>
    );
}


export default Navigation
