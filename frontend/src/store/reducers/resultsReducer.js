import {FETCH_RESULTS_ERROR, FETCH_RESULTS_SUCCESS} from "../actions/actionTypes";


export const initialState = {
    results: [],
    overallGrade: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESULTS_SUCCESS:
            return {...state, results: action.results, overallGrade: action.overallGrade};
        case FETCH_RESULTS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;