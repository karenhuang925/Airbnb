import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/review';
import EditReviewForm from '../ReviewForm/EditReview'


const ReviewIndexItem = ({ review }) => {
    const dispatch = useDispatch()
    const deleteReview = (e) => {
        e.preventDefault();
        dispatch(reviewActions.deleteReviewFetch(review.id))
    };


    return (
        <li>
            <p>{review.User.firstName}, {review.User.lastName}:</p>
            <p>{review.content}</p>
            <p>stars: {review.stars}</p>
            <EditReviewForm id={review.id}/>
            <button onClick={deleteReview}>Delete</button>
        </li>
    );
};

export default ReviewIndexItem;
