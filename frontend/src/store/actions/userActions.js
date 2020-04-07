import axios from '../../axios';
import {NotificationManager} from 'react-notifications';
import {push} from 'react-router-redux';
import {isLoading} from "./isLoading";
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_ERROR,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_SUCCESS,
    VK_LOGIN_SUCCESS,
    VK_LOGIN_ERROR,
    REGISTER_USER_FAILURE,
    LOGOUT_USER_FAILURE, RECOVER_PASSWORD_FAILURE, CHECK_TOKEN_FAILURE, CHANGE_PASS_FAILURE
} from './actionTypes';


const registerUserSuccess = (data) => {
    return {type: REGISTER_USER_SUCCESS, data};
};

const registerUserFailure = (data) => {
    return {type: REGISTER_USER_FAILURE, data};
};

export const registerUser = userData => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.post('/users', userData).then(
            response => {
                dispatch(isLoading(false));
                dispatch(registerUserSuccess(response.data.user));
                NotificationManager.success('Вы успешно зарегистрировались!');
                dispatch(push('/blocks'));
            }, error => {
                dispatch(isLoading(false));
                dispatch(registerUserFailure(error.response.data.message));
                NotificationManager.error('Ошибка', error.response.data.message)
            })
    };
};

const loginUserSuccess = user => {
    return {type: LOGIN_USER_SUCCESS, user};
};

const loginUserFailure = (data) => {
    return {type: LOGIN_USER_FAILURE, data};
};

export const loginUser = userData => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.post('/users/sessions', userData).then(
            response => {
                dispatch(isLoading(false));
                dispatch(loginUserSuccess(response.data.user, response.data.token));
                if (response.data.user.role === 'admin') {
                    dispatch(push('/admin'))
                } else {
                    dispatch(push('/blocks'));
                }
                NotificationManager.success(response.data.message);
            },
            error => {
                dispatch(loginUserFailure(error.response.data.message));
                NotificationManager.error(error.response.data.message);
                dispatch(isLoading(false));
            }
        )
    }
};

export const logoutUserFailure = (data) => {
    return {type: LOGOUT_USER_FAILURE, data};
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.delete('/users/sessions').then(
            response => {
                dispatch(isLoading(false));
                dispatch({type: LOGOUT_USER});
                dispatch(push('/blocks'));
                NotificationManager.success(response.data.message);
            },
            (error) => {
                dispatch(isLoading(false));
                dispatch(logoutUserFailure(error.response.data.message));
                NotificationManager.error(error.response.data.message);
            }
        );
    }
};


export const facebookLoginSuccess = (data) => {
    return {type: FACEBOOK_LOGIN_SUCCESS, data}
};

export const facebookLoginError = (error) => {
    return {type: FACEBOOK_LOGIN_ERROR, error};
};

export const facebookLogin = (data) => {
    return dispatch => {
        return axios.post('/users/facebookLogin', data).then((response) => {
            dispatch(facebookLoginSuccess(response.data.user));
            dispatch(push('/'));
            NotificationManager.success('Вы успешно зарегистрировались!');
        }, error => {
            dispatch(isLoading(false));
            dispatch(facebookLoginError(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const vkLoginSuccess = (data) => {
    return {type: VK_LOGIN_SUCCESS, data};
};

export const vkLoginError = (error) => {
    return {type: VK_LOGIN_ERROR, error};
};

export const vkLogin = (data) => {
    return dispatch => {
        return axios.post('/users/vkontakteLogin', data).then((response) => {
            dispatch(vkLoginSuccess(response.data.user));
            dispatch(push('/'));
            NotificationManager.success('Вы успешно зарегистрировались!');
        }, error => {
            dispatch(vkLoginError(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const recoverPasswordFailure = (data) => {
    return {type: RECOVER_PASSWORD_FAILURE, data}
};

export const recoverPassword = (email) => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.post('/users/passwordRecovery', {email: email}).then(response => {
            dispatch(isLoading(false));
            dispatch(push('/'));
            NotificationManager.success(response.data.message)
        }, error => {
            dispatch(isLoading(false));
            dispatch(recoverPasswordFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};

export const checkTokenFailure = (data) => {
    return {type: CHECK_TOKEN_FAILURE, data};
};

export const checkToken = (token) => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.post(`/users/checkToken?token=${token}`).then(response => {
            dispatch(isLoading(false));
            dispatch(loginUserSuccess(response.data));
        }, (error) => {
            dispatch(isLoading(false));
            dispatch(checkTokenFailure(error.response.data.message));
            NotificationManager.error('Произошла ошибка', 'Невозможно войти в аккаунт!')
        })
    }
};

export const changePasswordFailure = (data) => {
    return {type: CHANGE_PASS_FAILURE, data};
};

export const changePassword = (data) => {
    return dispatch => {
        dispatch(isLoading(true));
        return axios.post('/users/changePass', data).then(() => {
            dispatch(isLoading(false));
            NotificationManager.success('Пароль успешно изменен!');
            dispatch(push('/blocks'));
        }, error => {
            dispatch(isLoading(false));
            dispatch(changePasswordFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message);
        })
    }
};
