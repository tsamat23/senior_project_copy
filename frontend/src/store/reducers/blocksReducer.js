import {FETCH_ALL_BLOCKS_SUCCESS, GET_BLOCK_BY_ID_ERROR, GET_BLOCK_BY_ID_SUCCESS} from "../actions/actionTypes";


export const initialState = {
    blocks: [],
    blockById: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_BLOCKS_SUCCESS:
            return {...state, blocks: action.allBlocks};
        case GET_BLOCK_BY_ID_SUCCESS:
            return {...state, blockById: action.data};
        case GET_BLOCK_BY_ID_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default reducer;