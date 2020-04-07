import {
    FETCH_ALL_USERS_SUCCESS,
    FETCH_FULL_INFO_USER_SUCCESS,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_ADMIN_SUCCESS,
    LOGOUT_USER,
    GET_IMPORTANT_USERS,
    FETCH_ALL_USERS_ERROR,
    FETCH_FULL_INFO_USER_FAILURE,
    NOTIFY_ADMIN_FAILURE,
    GET_PSYCHOLOGISTS_FAILURE, GET_ABOUT_INFO, GET_ABOUT_INFO_FAILURE, EDIT_INFO_FAILURE
} from "../actions/actionTypes";


export const initialState = {
    allUsers: [],
    currentUser: null,
    notifications: [],
    importantNotifications: [],
    importantUsers: [],
    error: null,
    about: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return {...state, allUsers: null, currentUser: null};

        case FETCH_ALL_USERS_SUCCESS:
            return {...state, allUsers: action.users};

        case FETCH_ALL_USERS_ERROR:
            return {...state, error: action.error};

        case FETCH_FULL_INFO_USER_SUCCESS:
            return {...state, currentUser: action.user};

        case FETCH_FULL_INFO_USER_FAILURE:
            return {...state, error: action.error};

        case NOTIFY_ADMIN_FAILURE:
            return {...state, error: action.error};

        case FETCH_NOTIFICATIONS_ADMIN_SUCCESS:
            return {...state, notifications: action.notifications};

        case FETCH_NOTIFICATIONS_SUCCESS:
            return {...state, importantNotifications: action.importantData};

        case GET_IMPORTANT_USERS:
            return {...state, importantUsers: action.data};
        case GET_PSYCHOLOGISTS_FAILURE:
            return {...state, error: action.error};

        case GET_ABOUT_INFO:
            return {...state, about: action.data};

        case GET_ABOUT_INFO_FAILURE:
            return {...state, error: action.error};
        case EDIT_INFO_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;
