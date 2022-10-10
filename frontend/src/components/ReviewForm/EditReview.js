import { useEffect, useState } from 'react';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import ReviewFormPage from './index';
import { Modal } from '../../context/Modal';


const EditReviewForm = ({id}) => {
    const [showModal, setShowModal] = useState(false);

    let review = useSelector(state => state.review.Reviews).find(review => review.id === id)

    return (
        <>
            <button className='actionButton' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReviewFormPage review={review} formType="Edit review" />
                </Modal>
            )}
        </>


    );

}

export default EditReviewForm;
