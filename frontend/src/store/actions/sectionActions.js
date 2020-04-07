import {push} from "react-router-redux";

import axios from '../../axios';
import {isLoading} from './isLoading';
import {
    ADD_NEW_SECTION_SUCCESS,
    FETCH_ALL_SECTIONS_ERROR,
    FETCH_ALL_SECTIONS_SUCCESS,
    SUCCESS_SETTED_RATING_SECTION,
    TOGGLE_SECTION_FORM,
    GET_SECTION_BY_ID_SUCCESS,
    GET_FINISHED_SECTION_SUCCESS,
    GET_SECTION_BY_ID_FAILURE,
    EDIT_SECTION_FAILURE,
    ADD_NEW_SECTION_FAILURE,
    GET_FINISHED_SECTION_FAILURE,
    SUCCESS_SETTED_RATING_SECTION_FAILURE,
    DELETE_SECTION_FAILURE, SUBMIT_SECTION_SUCCESS, SUBMIT_SECTION_ERROR
} from "./actionTypes";
import {NotificationManager} from "react-notifications";
import {toggleRateModal} from "./questionActions";

const addNewSectionSuccess = section => ({
    type: ADD_NEW_SECTION_SUCCESS, section
});

const addNewSectionFailure = error => {
    return {type: ADD_NEW_SECTION_FAILURE, error};
};

export const addNewSection = (sectionData) => {
    return dispatch => {
        return axios.post('/sections', sectionData).then(response => {
            dispatch(addNewSectionSuccess(response.data));
            NotificationManager.success('Секция успешно создана');
        }, error => {
            dispatch(addNewSectionFailure(error.response.data.message));
            NotificationManager(error.response.data.message);
        })
    }
};

export const editedSection = (sectionData, id) => {
    return dispatch => {
        return axios.post(`/sections/edit/${id}`, sectionData).then(response => {
            dispatch(fetchAllSectionsSuccess(response.data));
            NotificationManager.success('Секция успешно отредактирована!');
        }, error => {
            dispatch(addNewSectionFailure(error.response.data.message));
            NotificationManager(error.response.data.message);
        })
    }
};


export const fetchAllSectionsSuccess = allSections => ({
    type: FETCH_ALL_SECTIONS_SUCCESS, allSections
});

const fetchAllSectionsError = error => ({
    type: FETCH_ALL_SECTIONS_ERROR, error
});

export const fetchAllSection = () => {
    return dispatch => {
        return axios.get('/sections').then(response => {
            dispatch(fetchAllSectionsSuccess(response.data));
        }, error => {
            dispatch(fetchAllSectionsError(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const toggleSectionForm = () => ({
    type: TOGGLE_SECTION_FORM
});

const getFinishedSectionSuccess = section => ({
    type: GET_FINISHED_SECTION_SUCCESS, section
});

export const getFinishedSectionFailure = error => {
    return {type: GET_FINISHED_SECTION_FAILURE, error};
};

export const getFinishedSection = (userId, sectionId) => {
    return dispatch => {
        return axios.get(`/sections/finished/?userId=${userId}&sectionId=${sectionId}`).then(response => {
            dispatch(getFinishedSectionSuccess(response.data));
        }, error => {
            getFinishedSectionFailure(error.response.data.message);
            NotificationManager.error(error.response.data.message);
        })
    }
};


const successSettedRatingSection = section => ({
    type: SUCCESS_SETTED_RATING_SECTION, section
});

export const successSettedRatingSectionFailure = error => ({
     type: SUCCESS_SETTED_RATING_SECTION_FAILURE, error
});

export const sendRating = (ratingData, sectionId) => {
    return dispatch => {
        // dispatch(toggleRateModal(sectionId));
        dispatch(isLoading(true));
        return axios.post(`/sections/rate/${sectionId}`, {ratingData}).then(response => {
            dispatch(isLoading(false));
            // dispatch(successSettedRatingSection(response.data));
            dispatch(push('/'));
        }, error => {
            dispatch(successSettedRatingSectionFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const submitSectionSuccess = sectionId => ({
    type: SUBMIT_SECTION_SUCCESS, sectionId
});

export const submitSectionError = error => ({
    type: SUBMIT_SECTION_ERROR, error
});

export const submitSection = sectionId => {
    return dispatch => {
        return axios.post("/sections/submit", {sectionId}).then(
            response => {
                dispatch(toggleRateModal(response.data));
                dispatch(push("/"));
                NotificationManager.success('Секция завершена!');
            },
            error => {
                dispatch(submitSectionError(error.response.data.message));
                NotificationManager.error(error.response.data.message);
            }
        );
    };
};


export const getSectionByIdSuccess = (data) => {
    return {type: GET_SECTION_BY_ID_SUCCESS, data};
};

export const getSectionsByIdFailure = error => {
    return {type: GET_SECTION_BY_ID_FAILURE, error};
};

export const getSectionById = (id) => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.get(`/sections/${id}`).then(response => {
            dispatch(isLoading(false));
            dispatch(getSectionByIdSuccess(response.data))
        }, (error) => {
            dispatch(getSectionsByIdFailure(error));
            NotificationManager.error('Произошла ошибка при загрузке секции!');
        })
    }
};

export const editSectionFailure = error => {
    return {type: EDIT_SECTION_FAILURE, error};
};

export const editSection = (data) => {
    return (dispatch) => {
        return axios.post('/sections/editSection', data).then(response => {
            dispatch(fetchAllSectionsSuccess(response.data))
        }, (error) => {
            dispatch(editSectionFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const deleteSectionFailure = error => {
    return {type: DELETE_SECTION_FAILURE, error};
};

export const deleteSection = (id) => {
    return dispatch => {
        return axios.delete(`/sections/deleteSection/${id}`).then(response => {
            dispatch(fetchAllSection(response.data));
            NotificationManager.success('Секция успешно удалена');
        }, error => {
            dispatch(deleteSectionFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};