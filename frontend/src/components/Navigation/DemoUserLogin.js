import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useState } from 'react';

const DemoUserLogin = () => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);



    const demoLogin = () =>{
        return dispatch(sessionActions.login({
            email:"demo@user.io",
            password:"password" })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
        }
        );
    }
    return (
    <>
        <button onClick={()=>demoLogin()}>Demo User</button>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
    </>
    )
}

export default DemoUserLogin
