import { csrfFetch } from './csrf';

const GET_REVIEW = 'Review/Get'
const ADD_REVIEW = 'Review/ADD'


export const getReview = (payload) => {
    return {type: GET_REVIEW, payload}
}
export const addReview = (payload) => {
    return {type: ADD_REVIEW, payload}
}


export const reviewBySpotFetch = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    if(response.status !== 200){
        throw Error("Spot couldn't be found")
    }
    dispatch(getReview(reviews));
    // return response;
};

export const addReviewFetch = (review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
    })
    const data = await response.json()
    dispatch(addReview(data))
    return response;
}


const initialState = {review: null};


const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_REVIEW:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case ADD_REVIEW:
            newState = {...state};
            newState.review.Reviews[action.payload.id] = action.payload
            return newState;
        default:
        return state
    }
}

export default reviewReducer
