import { useEffect, useState } from 'react';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import ReviewFormPage from './index';

const EditReviewForm = () => {

    let review = useSelector(state => state.spot)

    if(review){
        return (
            <ReviewFormPage review={review} formType="Edit review" />
        );
    }
}

export default EditReviewForm;
