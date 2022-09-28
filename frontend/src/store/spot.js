import { csrfFetch } from './csrf';

const GET_SPOT = 'Spot/GetSpots'
const GET_SPOT_Detail = 'Spot/GetSpotDetail'
const Add_SPOT = 'Spot/ADD'

export const getSpot = (payload) => {
    return {type: GET_SPOT, payload}
}
export const getSpotDetail = (payload) => {
    return {type: GET_SPOT_Detail, payload}
}
export const addSpot = (payload) => {
    return {type: Add_SPOT, payload}
}


export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    dispatch(getSpot(spots));
    // return response;
};
export const getTheSpotDetail = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);
    const spot = await response.json()
    dispatch(getSpotDetail(spot));
    // return response;
};
export const addSpotFetch = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot),
    })
    const data = await response.json()
    dispatch(addSpot(data))
    return response;
}




const initialState = {spot: null};


const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_SPOT:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case GET_SPOT_Detail:
            newState = Object.assign({}, state);
            newState.current = action.payload
            return newState;
        case Add_SPOT:
            newState = {...state};
            newState.Spots[action.payload.id] = action.payload
            return newState;
        default:
            return state
    }
}

export default spotReducer
