import React, { useEffect, useState } from 'react';
import * as reviewActions from '../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


const ReviewFormPage = ({review, formType}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(review.content)
    const [stars, setStars] = useState(review.stars)
    const [errors, setErrors] = useState([]);
    const [redirect, setRedirect] = useState(false)

    if(redirect) return (
        <Redirect to="/users/my/reviews" />
    )


    const handleSubmit = (e) => {
        e.preventDefault();
        review = { ...review, content, stars };
        if (formType === "Create review"){
            dispatch(reviewActions.addReviewFetch(review))
            .then(()=>{
                dispatch(reviewActions.reviewByUserFetch())
                setRedirect(true)
            }

            ).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        } else if(formType === "Edit review"){
            dispatch(reviewActions.editReviewFetch(review))
            .then(
                ()=>{
                    dispatch(reviewActions.reviewByUserFetch())
                    setRedirect(true)
                }
            ).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <ul >
                    {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
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
