import {push} from "react-router-redux";

import axios from '../../axios';
import {isLoading} from "./isLoading";
import {
    FETCH_ALL_BLOCKS_SUCCESS,
    FETCH_ALL_BLOCKS_ERROR, GET_BLOCK_BY_ID_SUCCESS, GET_BLOCK_BY_ID_ERROR
} from "./actionTypes";
import {NotificationManager} from "react-notifications";

export const fetchAllBlockSuccess = allBlocks => ({
    type: FETCH_ALL_BLOCKS_SUCCESS, allBlocks
});

export const fetchAllBlocksError = error => ({
    type: FETCH_ALL_BLOCKS_ERROR, error
});

export const fetchAllBlock = () => {
    return dispatch => {
        return axios.get('/blocks').then(response => {
            dispatch(fetchAllBlockSuccess(response.data))
        }, error => {
            dispatch(fetchAllBlocksError(error.response.data.message));
            NotificationManager(error.response.data.message);
        })
    }
};

export const getBlockByIdSuccess = data => {
    return {type: GET_BLOCK_BY_ID_SUCCESS, data};
};

export const getBlockByIdError = error => {
    return {type: GET_BLOCK_BY_ID_ERROR, error};
};

export const getBlockById = (id) => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.get(`/blocks/${id}`).then(response => {
            dispatch(isLoading(false));
            dispatch(getBlockByIdSuccess(response.data));
        }, error => {
            dispatch(getBlockByIdError(error));
            NotificationManager.error('Произошла ошибка при загрузке блока');
        });
    }
};