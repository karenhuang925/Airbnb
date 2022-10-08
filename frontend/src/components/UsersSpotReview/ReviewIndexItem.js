import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/review';
import EditReviewForm from '../ReviewForm/EditReview'


const ReviewIndexItem = ({ review }) => {
    const [redirect, setRedirct] = useState(false)

    const dispatch = useDispatch()
    const deleteReview = (e) => {
        e.preventDefault();
        dispatch(reviewActions.deleteReviewFetch(review.id))
        setRedirct(true)
    };
    if(redirect){
        return (
            <Redirect to="/users/my/reviews" />
        )
    }


    return (
        <div>
            <h1>My reviews</h1>
            <li>
                <p>{review.content}</p>
                <p>stars: {review.stars}</p>
                <EditReviewForm id={review.id}/>
                <button onClick={deleteReview}>Delete</button>
            </li>
        </div>
    );
};

export default ReviewIndexItem;