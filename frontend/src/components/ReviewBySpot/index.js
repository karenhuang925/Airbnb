import { useParams, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewActions from '../../store/review';
import './ReviewBySpot.css'


const ReviewBySpot = ({spotId}) => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(reviewActions.reviewBySpotFetch(spotId))
        .then(() => setIsLoaded(true))
        .catch(
            async (error) => {
                if (error) setErrors(error.message);
            })
    }, [dispatch]);
    const reviews = useSelector(state => state.review.Reviews);
    return (
        <div className="row">
            {reviews?.map((review)=>{
                return (
                    <div className="column" key={review.id}>
                        <p>{review.User.firstName}, {review.User.lastName}:</p>
                        <p>{review.content}</p>
                        <p>stars: {review.stars}</p>

                    </div>
                )
            })}
        </div>
    )
}


export default ReviewBySpot
