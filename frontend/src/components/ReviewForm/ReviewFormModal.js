import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReview';
import {useParams} from "react-router-dom"

function ReviewFormModal() {
    const [showModal, setShowModal] = useState(false);
    const {spotId} = useParams()

    console.log('here')
    return (
        <>
        <button onClick={() => setShowModal(true)}>Add a Review</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <CreateReviewForm spotId={parseInt(spotId)}/>
            </Modal>
        )}
        </>
    );
}

export default ReviewFormModal;
