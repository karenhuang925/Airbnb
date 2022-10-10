import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormPage/index';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button className='navButton' onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
            </Modal>
        )}
        </>
    );
}

export default LoginFormModal;
