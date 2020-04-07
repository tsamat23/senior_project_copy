import {IS_LOADING} from '../actions/actionTypes';

export const initialState = {
    isLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {...state, isLoading: action.arg};

        default:
            return state;
    }
};

export default reducer;