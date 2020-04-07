import axios from '../../axios';
import {
    FETCH_ALL_REVIEWS_FAILURE, FETCH_ALL_REVIEWS_SUCCESS, FETCH_PSYCHOLOGIST_REVIEWS_FAILURE,
    FETCH_PSYCHOLOGIST_REVIEWS_SUCCESS, GET_USER_NOTIFICATIONS_FAILURE,
    GET_USER_NOTIFICATIONS_SUCCESS, SEND_REVIEW_FAILURE
} from "./actionTypes";
import {NotificationManager} from "react-notifications";
import {push} from "react-router-redux";

const fetchAllReviewsSuccess = allReviews => ({
    type: FETCH_ALL_REVIEWS_SUCCESS, allReviews
});

const fetchAllReviewsFailure = error => ({
    type: FETCH_ALL_REVIEWS_FAILURE, error
});

export const fetchAllReviews = () => {
    return dispatch => {
        return axios.get('/reviews').then(response => {
            dispatch(fetchAllReviewsSuccess(response.data));
        }, error => {
            dispatch(fetchAllReviewsFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};


export const getUserNotificationsSuccess = (data) => {
    return {type: GET_USER_NOTIFICATIONS_SUCCESS, data};
};

export const getUserNotificationsFailure = (error) => {
    return {type: GET_USER_NOTIFICATIONS_FAILURE, error};
};

export const getUserNotifications = () => {
    return dispatch => {
        return axios.get('/reviews/review-notifications').then(response => {
            dispatch(getUserNotificationsSuccess(response.data));
            if (response.data.length >= 0) {
                NotificationManager.info(`${response.data.length} новых уведомлений`);
            }
        }, (error) => {
            dispatch(getUserNotificationsFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message)
        })
    }
};

const fetchPsychologistReviewsSuccess = psychologistReviews => ({
    type: FETCH_PSYCHOLOGIST_REVIEWS_SUCCESS, psychologistReviews
});

const fetchPsychologistReviewsFailure = error => ({
    type: FETCH_PSYCHOLOGIST_REVIEWS_FAILURE, error
});

export const fetchPsychologistReviews = id => {
    return dispatch => {
        return axios.get('/reviews/psychologist/' + id).then(response => {
            dispatch(fetchPsychologistReviewsSuccess(response.data));
        }, error => {
            dispatch(fetchPsychologistReviewsFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        });
    }
};

export const sendReviewFailure = error => {
    return {type: SEND_REVIEW_FAILURE, error};
};

export const sendReview = reviewData => async dispatch => {
    try {
        await axios.post(`/reviews`, reviewData);
        NotificationManager.info(`Рецензия успешно отправлена!`);
        dispatch(push('/'));
    } catch (err) {
        dispatch(sendReviewFailure(err.response.data.message));
        NotificationManager.error(err.response.data.message);
    }
};