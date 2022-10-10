import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/review';
import EditReviewForm from '../ReviewForm/EditReview'
import './review.css'


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
            <li className='singleReview'>
                <p>{review.content}</p>
                <p>stars: {review.stars} <i className="fa fa-star checked"></i></p>
                <EditReviewForm id={review.id}/>
                <button className='actionButton' onClick={deleteReview}>Delete</button>
            </li>
        </div>
    );
};

export default ReviewIndexItem;
