import {FETCH_NOTIFICATIONS_SUCCESS, FETCH_NOTIFICATIONS_FAILURE, GET_IMPORTANT_USERS_FAILURE} from '../actions/actionTypes';

export const initialState = {
    notifications: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {...state, notifications: action.data};

        case FETCH_NOTIFICATIONS_FAILURE:
            return {...state, error: action.error};

        case GET_IMPORTANT_USERS_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;
