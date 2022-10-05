import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
        setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    };

    return (
        <>
        <button onClick={openMenu}>
            <i className="fa-solid fa-user" />
        </button>
        {showMenu && (
            <ul className="profile-dropdown">
                <li>Hi, {user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <Link to="/users/my/spots">
                    <button >View my spots</button>
                    </Link>
                </li>
                <li>
                    <Link to="/users/my/reviews">
                    <button >View my reviews</button>
                    </Link>
                </li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        )}
        </>
    );
}

export default ProfileButton;
