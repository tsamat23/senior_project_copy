import {
    ANALYSE_TEST_RESULTS_SUCCESS,
    GET_QUESTION_BY_ID_SUCCESS,
    ADD_TEST_QUESTION_FAILURE,
    ANALYSE_TEST_RESULTS_FAILURE, GET_QUESTION_BY_ID_FAILURE,
    DELETE_QUESTION_FAILURE, EDIT_QUESTION_FAILURE, ADD_QUESTION_FAILURE
} from '../actions/actionTypes';

export const initialState = {
    sectionId: null,
    questions: [],
    testResults: [],
    activeStep: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTION_BY_ID_SUCCESS:
            return {
                ...state,
                questions: action.data.questions,
                sectionId: action.data._id,
                activeStep: action.data.lastAnsweredQuestionIndex ? action.data.lastAnsweredQuestionIndex.index : null
    };
        case ANALYSE_TEST_RESULTS_SUCCESS:
            return {...state, testResults: action.testResults};
        case ADD_TEST_QUESTION_FAILURE:
            return {...state, error: action.error};
        case ANALYSE_TEST_RESULTS_FAILURE:
            return {...state, error: action.error};
        case GET_QUESTION_BY_ID_FAILURE:
            return {...state, error: action.error};
        case DELETE_QUESTION_FAILURE:
            return {...state, error: action.error};
        case EDIT_QUESTION_FAILURE:
            return {...state, error: action.error};
        case ADD_QUESTION_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;