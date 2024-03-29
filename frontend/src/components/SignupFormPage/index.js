import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
                .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className="pageForm" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
        <ul>
            {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
        </ul>
        <label>
            First name
            <input
            className="pageInput"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </label>
        <label>
            Last name
            <input
            className="pageInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </label>
        <label>
            Email
            <input
            className="pageInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
            Password
            <input
            className="pageInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <label>
            Confirm Password
            <input
            className="pageInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        <button className="pageButton" type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;
