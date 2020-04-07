import axios from '../../axios';
import {
    GET_CONTACTS_SUCCESS,
    GET_CONTACT_ID_SUCCESS,
    GET_CONTACTS_FAILURE,
    GET_CONTACT_ID_FAILURE,
    EDIT_CONTACTS_FAILURE
} from './actionTypes';

import {NotificationManager} from 'react-notifications';

export const getContactsSuccess = data => {
    return {type: GET_CONTACTS_SUCCESS, data};
};

export const getContactsFailure = (error) => {
    return {type: GET_CONTACTS_FAILURE, error};
};

export const getContacts = () => {
    return dispatch => {
        return axios.get('/contacts').then(response => {
            dispatch(getContactsSuccess(response.data));
        }, error => {
            dispatch(getContactsFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const getContactIdSuccess = (data) => {
    return {type: GET_CONTACT_ID_SUCCESS, data};
};

export const getContactsIdFailure = (error) => {
    return {type: GET_CONTACT_ID_FAILURE, error};
};

export const getContactById = (id) => {
    return dispatch => {
        return axios.get(`/contacts/getContactsId?id=${id}`).then(response => {
            dispatch(getContactIdSuccess(response.data));
        }, error => {
            dispatch(getContactsIdFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const editContactsFailure = error => {
    return {type: EDIT_CONTACTS_FAILURE, error};
};

export const editContacts = (data, id) => {
    return dispatch => {
        return axios.post('/contacts/editContacts', {contact: data, id: id}).then(response => {
            dispatch(getContactsSuccess(response.data));
        }, error => {
            dispatch(editContactsFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};