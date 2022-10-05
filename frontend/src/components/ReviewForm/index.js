import React, { useState } from 'react';
import * as reviewActions from '../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';


const ReviewFormPage = ({review, formType}) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [content, setContent] = useState(review.content)
    const [stars, setStars] = useState(review.stars)
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        review = { ...review, content, stars };

        if (formType === "Create review"){
            return dispatch(reviewActions.addReviewFetch(review)).catch(
                async (error) => {
                    if (error) setErrors([error.message]);
                }
            );
        } else if(formType === "Edit review"){
            return dispatch(reviewActions.editReviewFetch(review)).catch(
                async (error) => {
                    if (error) setErrors([error.message]);
                }
            );
        }
        history.push(`/users/my/reviews`);

    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                content
                    <input
                    type="text"
                    value={content}
                    placeholder="How do you like this spot"
                    onChange={(e) => setContent(e.target.value)}
                    required
                    />
                </label>
                <label>
                    stars
                    <input
                    type="number"
                    value={stars}
                    placeholder="stars"
                    onChange={(e) => setStars(parseInt(e.target.value))}
                    required
                    />
                </label>
                <button type="submit">Submit review</button>
            </form>
        </div>
    )
}

export default ReviewFormPage
