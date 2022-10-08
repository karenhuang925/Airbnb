import ProfileButton from './ProfileButton'
import { useSelector } from 'react-redux';
import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom'
import LoginFormModal from '../LoginFormModal';
import DemoUserLogin from './DemoUserLogin'


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
                <NavLink to="/users/signup">
                    <button>
                    Sign Up
                    </button>
                </NavLink>
                <DemoUserLogin />
            </>
        );
    }
    return (
            <ul className='grid-container'>
                <li className='item1'>
                    <NavLink exact to="/">
                        <i className="fas fa-bars"></i>
                        Home Page
                    </NavLink>
                </li>
                <li className='item2'>
                    <i className="fa-solid fa-user" />
                    {isLoaded && sessionLinks}
                </li>
                <li className='item3'>
                    <NavLink exact to="/spots">
                        <i className="fas fa-house"></i>
                        Listing
                    </NavLink>
                </li>
                <li className='item4'>
                    <NavLink exact to="/about">
                        <i className="fas fa-loction-dot"></i>
                        About
                    </NavLink>
                </li>
            </ul>
    );
}


export default Navigation
