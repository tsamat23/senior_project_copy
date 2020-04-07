import {GET_PSYCHOLOGISTS, GET_PSYCHO_BY_ID,
    GET_PSYCHOLOGISTS_FAILURE, GET_PSYCHO_BY_ID_FAILURE,
    ADD_PSYCHO_FAILURE, EDIT_PSYCHO_FAILURE, DELETE_PSYCHO_FAILURE} from '../actions/actionTypes';

export const initialState = {
    psychologists: null,
    onePsycho: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PSYCHOLOGISTS:
            return {...state, psychologists: action.psycho};

        case GET_PSYCHO_BY_ID:
            return {...state, onePsycho: action.data};

        case GET_PSYCHOLOGISTS_FAILURE:
            return {...state, error: action.error};

        case GET_PSYCHO_BY_ID_FAILURE:
            return {...state, error: action.error};

        case ADD_PSYCHO_FAILURE:
            return {...state, error: action.error};

        case EDIT_PSYCHO_FAILURE:
            return {...state, error: action.error};
        case DELETE_PSYCHO_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;