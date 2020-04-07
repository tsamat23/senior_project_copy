import axios from '../../axios';
import {FETCH_RESULTS_ERROR, FETCH_RESULTS_SUCCESS} from "./actionTypes";
import {NotificationManager} from "react-notifications";

export const fetchResultsSuccess = (results, overallGrade) => ({
    type: FETCH_RESULTS_SUCCESS, results, overallGrade
});

export const fetchResultsError = error => ({
    type: FETCH_RESULTS_ERROR, error
});

export const fetchResults = () => {
    return dispatch => {
        return axios.get('/results').then(response => {
            dispatch(fetchResultsSuccess(response.data.results, response.data.overallGrade))
        }, error => {
            dispatch(fetchResultsError(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};