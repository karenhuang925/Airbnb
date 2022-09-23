import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser'
const REMOVE_SESSION = 'session/removeUser'

export const setUser = (user) => {
    return {type: SET_USER,payload: user}
}

export const removeSession = () => {
    return {type: REMOVE_SESSION}
}

export const login = (user) => async dispatch => {
    const { email, password } = user;
    const response = await csrfFetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    })
    const data = await response.json()
    dispatch(setUser(data))
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/users/my');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_SESSION:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState
        default:
            return state
    }
}

export default sessionReducer
