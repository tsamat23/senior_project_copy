import {
    ADD_NEW_SECTION_SUCCESS, ADD_QUESTION_SUCCESS, FETCH_ALL_SECTIONS_SUCCESS,
    TOGGLE_SECTION_FORM, GET_SECTION_BY_ID_SUCCESS, GET_FINISHED_SECTION_SUCCESS, GET_SECTION_BY_ID_FAILURE,
    EDIT_SECTION_FAILURE, ADD_NEW_SECTION_FAILURE, GET_FINISHED_SECTION_FAILURE, SUCCESS_SETTED_RATING_SECTION_FAILURE,
    DELETE_SECTION_FAILURE
} from "../actions/actionTypes";

export const initialState = {
    sections: [],
    sectionById: null,
    showSectionForm: false,
    finishedSection: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_SECTION_SUCCESS:
            return {
                ...state,
                sections: state.sections.concat(action.section),
                showSectionForm: false
            };

        case FETCH_ALL_SECTIONS_SUCCESS:
            return {...state, sections: action.allSections};

        case TOGGLE_SECTION_FORM:
            return {...state, showSectionForm: !state.showSectionForm};

        case ADD_QUESTION_SUCCESS:
            const sectionsCopy = [...state.sections];
            const index = sectionsCopy.findIndex(section => section._id === action.section._id);

            sectionsCopy.splice(index, 1);
            sectionsCopy.push(action.section);

            return {...state, sections: sectionsCopy};

        case GET_SECTION_BY_ID_SUCCESS:
            return {...state, sectionById: action.data};
        case GET_FINISHED_SECTION_SUCCESS:
            return {...state, finishedSection: action.section};
        case GET_SECTION_BY_ID_FAILURE:
            return {...state, error: action.error};
        case EDIT_SECTION_FAILURE:
            return {...state, error: action.error};
        case ADD_NEW_SECTION_FAILURE:
            return {...state, error: action.error};
        case GET_FINISHED_SECTION_FAILURE:
            return {...state, error: action.error};
        case SUCCESS_SETTED_RATING_SECTION_FAILURE:
            return {...state, error: action.error};
        case DELETE_SECTION_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;