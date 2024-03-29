import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
        }
        );
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p1>Log in</p1>
                <ul>
                    {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
                </ul>
                <label>
                    Email
                    <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Password
                    <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                <button className='modalButton' type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LoginFormPage
