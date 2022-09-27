const GET_SPOT = 'Spot/GetSpots'

export const getSpot = (payload) => {
    return {type: GET_SPOT, payload}
}


export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    dispatch(getSpot(spots));
    // return response;
};

const initialState = {spot: null};


const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_SPOT:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        // case REMOVE_SESSION:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState
        default:
            return state
    }
}

export default spotReducer
