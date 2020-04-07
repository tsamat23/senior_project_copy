import {IS_LOADING} from "./actionTypes";

export const isLoading = (arg) => {
    return {type: IS_LOADING, arg}
};