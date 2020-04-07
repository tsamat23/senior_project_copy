import axios from '../../axios';
import {NotificationManager} from 'react-notifications';
import {
    ADD_QUESTION_SUCCESS,
    ANALYSE_TEST_RESULTS_SUCCESS,
    GET_QUESTION_BY_ID_SUCCESS,
    TOGGLE_RATEMODAL,
    ADD_TEST_QUESTION_FAILURE,
    ANALYSE_TEST_RESULTS_FAILURE,
    GET_QUESTION_BY_ID_FAILURE,
    DELETE_QUESTION_FAILURE,
    EDIT_QUESTION_FAILURE,
    ADD_QUESTION_FAILURE
} from "./actionTypes";
import {fetchAllSectionsSuccess} from './sectionActions';

export const toggleRateModal = (finishedSection) => ({
    type: TOGGLE_RATEMODAL, finishedSection
});

export const addQuestionSuccess = section => ({
    type: ADD_QUESTION_SUCCESS, section
});

const addQuestionFailure = error => {
    return {type: ADD_QUESTION_FAILURE, error};
};

export const addQuestion = data => {
    return dispatch => {
        return axios.post('/questions', data).then(response => {
            dispatch(addQuestionSuccess(response.data));
        }, error => {
            addQuestionFailure(error.response.data.message);
            NotificationManager.error(error.response.data.message);
        })
    }
};


export const addTestQuestionFailure = error => {
    return {type: ADD_TEST_QUESTION_FAILURE, error};
};

export const sendTestQuestion = data => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Token': token};
        axios.post('/questions/test', data, headers)
            .then(response => {
                NotificationManager.success('Успех : )', 'Тест отправлен в базу');
                dispatch(addQuestionSuccess(response.data));
            }, (error) => {
                dispatch(addTestQuestionFailure(error.response.data.message));
                NotificationManager.error(error.response.data.message);
            })
    }
};

const analyseTestResultsSuccess = testResults => ({type: ANALYSE_TEST_RESULTS_SUCCESS, testResults});

export const analyseTestResultsFailure = (error) => {
    return {type: ANALYSE_TEST_RESULTS_FAILURE, error};
};

export const analyseTestResults = data => {
    return (dispatch, getState) => {
        const request = {
            user: getState().users.user,
            data
        };
        axios.post('/questions/analyseTest', request)
            .then(response => {
                dispatch(analyseTestResultsSuccess(response.data));
            }, error => {
                dispatch(analyseTestResultsFailure(error.response.data.message));
            })
    }
};


// export const answerDrawQuestion = (answer) => {
//     return () => {
//         return axios.post('/someRoute', answer).then(() => {
//             NotificationManager.success('Успех', 'Ответ отправлен');
//         }, () => {
//             NotificationManager.error('Невозможно отправить ответ');
//         })
//     }
// };


export const getQuestionByIdSuccess = (data) => {
    return {type: GET_QUESTION_BY_ID_SUCCESS, data};
};

export const getQuestionByIdFailure = (error) => {
    return {type: GET_QUESTION_BY_ID_FAILURE, error};
};

export const getQuestionById = (id) => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        return axios.post(`/sections/question${id}`, {user}).then(response => {
            dispatch(getQuestionByIdSuccess(response.data));
        }, (error) => {
            dispatch(getQuestionByIdFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};


export const deleteQuestionFailure = error => {
    return {type: DELETE_QUESTION_FAILURE, error}
};

export const deleteQuestion = (id) => {
    return (dispatch) => {
        return axios.delete(`/questions/deleteQuestion?id=${id}`).then(response => {
            dispatch(fetchAllSectionsSuccess(response.data));
        }, error => {
            dispatch(deleteQuestionFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};


export const editQuestionFailure = error => {
    return {type: EDIT_QUESTION_FAILURE, error};
};

export const editQuestion = (data) => {
    return dispatch => {
        return axios.post('/questions/editQuestion', data).then(response => {
            dispatch(fetchAllSectionsSuccess(response.data));
            NotificationManager.success('Вопрос изменен!');
        }, (error) => {
            dispatch(editQuestionFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

