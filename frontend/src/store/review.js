import { csrfFetch } from './csrf';

const GET_REVIEW = 'Review/Get'
const ADD_REVIEW = 'Review/ADD'
const DELETE_REVIEW = 'Review/DELETE'
const EDIT_REVIEW = 'Review/EDIT'

export const getReview = (payload) => {
    return { type: GET_REVIEW, payload }
}
export const addReview = (payload) => {
    return { type: ADD_REVIEW, payload }
}
export const editReview = (payload) => {
    return { type: EDIT_REVIEW, payload }
}
export const deleteReview = (payload) => {
    return { type: DELETE_REVIEW, payload }
}


export const reviewBySpotFetch = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    if (response.status !== 200) {
        throw Error("Spot couldn't be found")
    }
    dispatch(getReview(reviews));
    // return response;
};
export const reviewByUserFetch = () => async dispatch => {
    const response = await csrfFetch('/api/users/my/reviews');
    const reviews = await response.json();
    if (response.status !== 200) {
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

export const editReviewFetch = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review),
    })
    const data = await response.json()
    dispatch(editReview(data))
    return response;
}
export const deleteReviewFetch = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    const review = await response.json()
    dispatch(deleteReview(id))
    return response;
}


const initialState = { review: null };


const reviewReducer = (state = initialState, action) => {
    let newState
    let index;
    switch (action.type) {
        case GET_REVIEW:
            newState = { ...state };
            newState = action.payload;
            return newState;
        case ADD_REVIEW:
            index = state.Reviews.length || 0
            newState = { ...state };
            newState.Reviews[index] = action.payload
            return newState;
        case EDIT_REVIEW:
            index = state.Reviews.findIndex(review => review.id === action.payload.id);
            newState = {
                ...state
                // review: {
                //     ...state.review,
                //     // review.Reviews[index] = {}
                // }
            };
            newState.Reviews[index] = action.payload

            return newState;
        case DELETE_REVIEW:
            index = state.Reviews.findIndex(review => review.id === action.payload);
            newState = { ...state }
            delete newState.Reviews[index]
            return newState
        default:
            return state
    }
}

export default reviewReducer
