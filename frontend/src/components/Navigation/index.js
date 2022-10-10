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
            <div>
                <LoginFormModal className='auth3' />
                <NavLink to="/users/signup">
                    <button className='auth3 navButton'>
                    Sign Up
                    </button>
                </NavLink>
                <DemoUserLogin className='auth3'/>
            </div>
        );
    }
    return (
            <ul className='grid-container'>
                <li className='item1 navItem'>
                    <NavLink exact to="/">
                        <i className="fas fa-bars"></i>
                        Home Page
                    </NavLink>
                </li>
                <li className='item2 navItem'>
                    {isLoaded && sessionLinks}
                </li>
                <li className='item3 navItem'>
                    <NavLink exact to="/spots">
                        <i className="fas fa-house"></i>
                        Listing
                    </NavLink>
                </li>
                <li className='item4 navItem'>
                    <NavLink exact to="/about">
                        <i className="fas fa-loction-dot"></i>
                        About
                    </NavLink>
                </li>
            </ul>
    );
}


export default Navigation
