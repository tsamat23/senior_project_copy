import {
    LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER_FAILURE,
    FACEBOOK_LOGIN_SUCCESS, VK_LOGIN_SUCCESS, VK_LOGIN_ERROR, FACEBOOK_LOGIN_ERROR,
    RECOVER_PASSWORD_FAILURE, CHECK_TOKEN_FAILURE, CHANGE_PASS_FAILURE, TOGGLE_RATEMODAL
} from "../actions/actionTypes";

export const initialState = {
    registerError: null,
    loginError: null,
    logoutError: null,
    user: null,
    psychologists: null,
    isLoading: true,
    error: null,
    showRateModal: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.data, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.data};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.data};
        case LOGOUT_USER:
            return {...state, user: null};
        case LOGOUT_USER_FAILURE:
            return {...state, logoutError: action.data};
        case FACEBOOK_LOGIN_SUCCESS:
            return {...state, user: action.data};
        case FACEBOOK_LOGIN_ERROR:
            return {...state, registerError: action.error};
        case VK_LOGIN_SUCCESS:
            return {...state, user: action.data};
        case VK_LOGIN_ERROR:
            return {...state, registerError: action.error};
        case RECOVER_PASSWORD_FAILURE:
            return {...state, error: action.data};
        case CHECK_TOKEN_FAILURE:
            return {...state, error: action.data};
        case CHANGE_PASS_FAILURE:
            return {...state, error: action.data};
        case TOGGLE_RATEMODAL:
            return {...state, showRateModal: false,
                user: {...state.user, sections: action.finishedSection}
            };
        default:
            return state;
    }
};

export default reducer;