import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewFormPage from './index';
import {useParams} from "react-router-dom"

function ReviewFormModal() {
    const [showModal, setShowModal] = useState(false);
    const {spotId} = useParams()
    const review = {
        content: 'Great place, recommended!',
        stars: 5,
        spotId: parseInt(spotId)
    };

    return (
        <>
        <button onClick={() => setShowModal(true)}>Add a Review</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ReviewFormPage review={review} formType="Create review" />
            </Modal>
        )}
        </>
    );
}

export default ReviewFormModal;
