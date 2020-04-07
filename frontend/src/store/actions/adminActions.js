import {
	GET_PSYCHOLOGISTS,
	GET_PSYCHO_BY_ID,
	FETCH_ALL_USERS_ERROR,
	FETCH_ALL_USERS_SUCCESS,
	FETCH_FULL_INFO_USER_SUCCESS,
	FETCH_FULL_INFO_USER_FAILURE,
	FETCH_NOTIFICATIONS_SUCCESS,
	FETCH_NOTIFICATIONS_ADMIN_SUCCESS,
	FETCH_NOTIFICATIONS_ADMIN_FAILURE,
	GET_IMPORTANT_USERS,
	NOTIFY_ADMIN_FAILURE,
	FETCH_NOTIFICATIONS_FAILURE,
	GET_IMPORTANT_USERS_FAILURE,
	GET_PSYCHOLOGISTS_FAILURE,
	GET_PSYCHO_BY_ID_FAILURE,
	ADD_PSYCHO_FAILURE,
	EDIT_PSYCHO_FAILURE,
	DELETE_PSYCHO_FAILURE,
	GET_ABOUT_INFO,
	GET_ABOUT_INFO_FAILURE,
	EDIT_INFO_FAILURE,
} from "./actionTypes";
import axios from "../../axios";
import { toggleRateModal } from "./questionActions";
import { isLoading } from "./isLoading";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";

const fetchAllUsersSuccess = users => ({
	type: FETCH_ALL_USERS_SUCCESS,
	users,
});

const fetchAllUsersError = error => ({
	type: FETCH_ALL_USERS_ERROR,
	error,
});

export const fetchAllUsers = () => {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.get("/users").then(
			response => {
				dispatch(fetchAllUsersSuccess(response.data));
				dispatch(isLoading(false));
			},
			error => {
				dispatch(fetchAllUsersError(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

const fetchFullInfoUserSuccess = user => ({
	type: FETCH_FULL_INFO_USER_SUCCESS,
	user,
});

export const fetchFullINfoUserFailure = error => {
	return { type: FETCH_FULL_INFO_USER_FAILURE, error };
};

export const fetchFullInfoUser = id => dispatch => {
	dispatch(isLoading(true));
	return axios.get(`/users/${id}`).then(
		response => {
			dispatch(fetchFullInfoUserSuccess(response.data));
			dispatch(isLoading(false));
		},
		error => {
			dispatch(fetchFullINfoUserFailure(error.response.data.error));
			NotificationManager.error(error.response.data.message);
		}
	);
};

export const notifyAdminFailure = error => {
	return { type: NOTIFY_ADMIN_FAILURE, error };
};

export const notifyAdmin = sectionId => {
	return dispatch => {
		return axios.post("/notifications", {sectionId}).then(
			response => {
				dispatch(toggleRateModal(response.data));
				dispatch(push("/"));
			},
			error => {
				dispatch(notifyAdminFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const fetchNotificationsAdminSuccess = notifications => ({
	type: FETCH_NOTIFICATIONS_ADMIN_SUCCESS,
	notifications,
});

export const fetchNotificationsAdminFailure = error => {
	return { type: FETCH_NOTIFICATIONS_ADMIN_FAILURE, error };
};

export const fetchNotificationsAdmin = () => dispatch => {
	return axios.get("/notifications").then(
		response => {
			dispatch(fetchNotificationsAdminSuccess(response.data));
		},
		error => {
			dispatch(fetchNotificationsAdminFailure(error.response.data.message));
			NotificationManager.error(error.response.data.message);
		}
	);
};

export const unactiveNotifications = notificationsIds => async () => {
	await axios.patch("/notifications/active", notificationsIds);
};

export const getPsychoByIdSuccess = data => {
	return { type: GET_PSYCHO_BY_ID, data };
};

export const getPsychoByIdError = error => {
	return { type: GET_PSYCHO_BY_ID_FAILURE, error };
};

export const getOnePsycho = id => {
	return dispatch => {
		return axios.get(`/psychologists/psychoId?id=${id}`).then(
			response => {
				dispatch(getPsychoByIdSuccess(response.data));
			},
			error => {
				dispatch(getPsychoByIdError(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const getPsychologistsSuccess = psycho => {
	return { type: GET_PSYCHOLOGISTS, psycho };
};

export const getPsychologistsFailure = error => {
	return { type: GET_PSYCHOLOGISTS_FAILURE, error };
};

export const getPsychologists = () => {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.get("/psychologists").then(
			response => {
				dispatch(isLoading(false));
				dispatch(getPsychologistsSuccess(response.data));
			},
			error => {
				dispatch(getPsychologistsFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const addPsychoFailure = error => {
	return { type: ADD_PSYCHO_FAILURE, error };
};

export const addPsychologist = psycho => {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.post("/psychologists/addPsychologist", psycho).then(
			response => {
				dispatch(isLoading(false));
				dispatch(getPsychologists(response.data));
				NotificationManager.success("Вы успешно добавили психолога!");
			},
			error => {
				dispatch(addPsychoFailure(error.response.data.message));
				NotificationManager.error("Невозможно добавить психолога!");
			}
		);
	};
};

export const editPsychoFailure = error => {
	return { type: EDIT_PSYCHO_FAILURE, error };
};

export const editPsycho = data => {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.post("/psychologists/editPsycho", data).then(
			response => {
				dispatch(isLoading(false));
				dispatch(getPsychologists(response.data));
				NotificationManager.success("Данные психолога изменены!");
			},
			error => {
				dispatch(editPsychoFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const deletePsychoFailure = error => {
	return { type: DELETE_PSYCHO_FAILURE, error };
};

export const deletePsycho = id => {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.delete(`/psychologists/deletePsycho?id=${id}`).then(
			response => {
				dispatch(isLoading(false));
				dispatch(getPsychologistsSuccess(response.data));
				NotificationManager.success("Психолог успешно удален!");
			},
			error => {
				dispatch(deletePsychoFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const fetchNotificationsSuccess = importantData => {
	return { type: FETCH_NOTIFICATIONS_SUCCESS, importantData };
};

export const fetchNotificationsFailure = error => {
	return { type: FETCH_NOTIFICATIONS_FAILURE, error };
};

export const fetchNotifications = () => {
	return dispatch => {
		return axios.get("/notifications/importantNotifications").then(
			response => {
				dispatch(fetchNotificationsSuccess(response.data));
				// NotificationManager.info(`${response.data.length} ответов на важный вопрос!`)
			},
			error => {
				dispatch(fetchNotificationsFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const getImportantUsersSuccess = data => {
	return { type: GET_IMPORTANT_USERS, data };
};

export const getImportantUsersFailure = error => {
	return { type: GET_IMPORTANT_USERS_FAILURE, error };
};

export const getImportantUsers = () => {
	return dispatch => {
		return axios.get("/notifications/getImportantUsers").then(
			response => {
				dispatch(getImportantUsersSuccess(response.data));
			},
			error => {
				dispatch(getImportantUsersFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const getAboutInfoSuccess = data => {
	return { type: GET_ABOUT_INFO, data };
};

export const getAboutUsInfoFailure = error => {
	return { type: GET_ABOUT_INFO_FAILURE, error };
};

export const getAboutInfo = () => {
	return dispatch => {
		return axios.get("/aboutUs/").then(
			response => {
				dispatch(getAboutInfoSuccess(response.data));
			},
			error => {
				dispatch(getAboutUsInfoFailure(error.response.data.message));
				NotificationManager.error(error.response.data.message);
			}
		);
	};
};

export const editInfoFailure = error => {
	return { type: EDIT_INFO_FAILURE, error };
};


export const editInfo = (data) => {
    return dispatch => {
        return axios.post('/aboutUs/editInfo', data).then(response => {
            dispatch(getAboutInfoSuccess(response.data));
        }, error => {
            dispatch(editInfoFailure(error.response.data.message));
            NotificationManager.error(error.response.data.message)
        })
    }
};