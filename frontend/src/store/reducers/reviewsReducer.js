import {
    FETCH_ALL_REVIEWS_FAILURE, FETCH_ALL_REVIEWS_SUCCESS, FETCH_PSYCHOLOGIST_REVIEWS_FAILURE,
    FETCH_PSYCHOLOGIST_REVIEWS_SUCCESS,
    GET_USER_NOTIFICATIONS_SUCCESS, GET_USER_NOTIFICATIONS_FAILURE, SEND_REVIEW_FAILURE
} from "../actions/actionTypes";

export const initialState = {
    reviews: [],
    psychologistReviews: [],
    notifications: [],
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_REVIEWS_SUCCESS:
            return {...state, reviews: action.allReviews};
        case FETCH_ALL_REVIEWS_FAILURE:
            return {...state, error: action.error};
        case FETCH_PSYCHOLOGIST_REVIEWS_SUCCESS:
            return {...state, psychologistReviews: action.psychologistReviews};
        case FETCH_PSYCHOLOGIST_REVIEWS_FAILURE:
            return {...state, error: action.error};
        case GET_USER_NOTIFICATIONS_SUCCESS:
            return {...state, notifications: action.data};
        case GET_USER_NOTIFICATIONS_FAILURE:
            return {...state, error: action.error};
        case SEND_REVIEW_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;