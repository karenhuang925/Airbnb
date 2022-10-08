import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/review';
import React, {useEffect, useState } from 'react';
import ReviewIndexItem from './ReviewIndexItem.js'
import {Link} from 'react-router-dom';

const UserReview = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    let reviews = useSelector(state => state.review.Reviews) || "";

    useEffect(() => {
        dispatch(reviewActions.reviewByUserFetch())
        .catch(
            async (error) => {
                if (error) setErrors(error.message);
            })
    }, []);


    if (reviews?.length === 0) {
        return (<div>You don't have any review yet</div>)
    }

    return (
        <div className="row">
            <ul>
                {
                reviews?.map(review => (
                    <ReviewIndexItem
                    review={review}
                    key={review.id}
                    />
                ))
                }
            </ul>
        </div>
    )
}

export default UserReview
