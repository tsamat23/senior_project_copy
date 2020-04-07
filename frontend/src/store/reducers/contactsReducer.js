import {GET_CONTACT_ID_SUCCESS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,
    GET_CONTACT_ID_FAILURE, EDIT_CONTACTS_FAILURE} from "../actions/actionTypes";

export const initialState = {
    contacts: [],
    idContact: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTACTS_SUCCESS:
            return {...state, contacts: action.data};

        case GET_CONTACT_ID_SUCCESS:
            return {...state, idContact: action.data};

        case GET_CONTACTS_FAILURE:
            return {...state, error: action.error};

        case GET_CONTACT_ID_FAILURE:
            return {...state, error: action.error};

        case EDIT_CONTACTS_FAILURE:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default reducer;