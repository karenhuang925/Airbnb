import { csrfFetch } from './csrf';

const GET_SPOT = 'Spot/GetSpots'
const GET_SPOT_Detail = 'Spot/GetSpotDetail'
const GET_USER_SPOT = 'Spot/GetUserSpot'
const Add_SPOT = 'Spot/ADD'
const EDIT_SPOT = 'Spot/EDIT'
const DELETE_SPOT = 'Spot/DELETE'

export const getSpot = (payload) => {
    return {type: GET_SPOT, payload}
}
export const getSpotDetail = (payload) => {
    return {type: GET_SPOT_Detail, payload}
}
export const getUserSpot = (payload) => {
    return {type: GET_USER_SPOT, payload}
}
export const addSpot = (payload) => {
    return {type: Add_SPOT, payload}
}
export const editSpot = (payload) => {
    return {type: EDIT_SPOT, payload}
}
export const deleteSpot = (payload) => {
    return {type: DELETE_SPOT, payload}
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
    if(response.status === 404){
        throw Error("Spot couldn't be found")
    }
    dispatch(getSpotDetail(spot));
    // return response;
};
export const getUserSpotFetch = () => async dispatch => {
    const response = await csrfFetch('/api/users/my/spots');
    const spots = await response.json()
    if(response.status !== 200){
        throw Error("Spot couldn't be found")
    }
    dispatch(getUserSpot(spots));
    // return response;
};
export const addSpotFetch = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot),
    })
    const data = await response.json()
    if(response.status === 400){
        throw Error("Cannot create this spot, check your input")
    }
    dispatch(addSpot(data))
    return response;
}
export const editSpotFetch = (spot) => async dispatch => {
    const id = spot.id
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'Put',
        body: JSON.stringify(spot),
    })
    const data = await response.json()
    if(response.status === 400){
        throw Error("Edit cannot be done, check your input")
    }
    dispatch(editSpot(data))
    return response;
}

export const deleteSpotFetch = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'Delete',
    });
    const spot = await response.json()
    dispatch(getSpotDetail(spot));
    // return response;
};


const initialState = {Spots: null, current: null};


const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_SPOT:
            newState = {...state}
            newState = action.payload;
            return newState;
        case GET_SPOT_Detail:
            newState = {...state}
            newState.current = action.payload
            return newState;
        case GET_USER_SPOT:
            newState = {...state}
            newState = action.payload;
            return newState;
        case Add_SPOT:
            newState = {...state};
            newState.Spots[action.payload.id] = action.payload
            return newState;
        case EDIT_SPOT:
            const index = state.Spots.findIndex(spot => spot.id === action.payload.id);
            newState = {...state};
            newState.Spots[index] = action.payload
            return newState;
        case DELETE_SPOT:
            newState = {...state}
            delete newState.Spots[action.payload]
            return newState
        default:
            return state
    }
}

export default spotReducer
