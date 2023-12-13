import axios from 'axios';

import { HTTPS } from './constant';
import { handleError } from './handleError';
import { SET_USER, SET_DEALS, SET_EMAIL, SET_TOKEN, SET_USERS, SET_AUTHED, SET_LOADING } from '../redux/types';

export const sendOTP = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.post('/verify/send-email-otp', data)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_EMAIL,
                    payload: data.email,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const verifyOTP = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.post('/verify/verify-email-otp', data)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const register = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.post('/users/register', data)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_USER,
                    payload: res.data,
                });
                dispatch({
                    type: SET_TOKEN,
                    payload: res.data.token,
                });
                dispatch({
                    type: SET_AUTHED,
                    payload: true,
                });
                HTTPS.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const getDeals = (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.get('/deals')
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_DEALS,
                    payload: res.data,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const addDeal = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });
        HTTPS.post('/deals/add', data)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const updateDeal = (dispatch, id, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });
        HTTPS.put(`/deals/${id}`, data)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const getUsers = (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.get('/users')
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                dispatch({
                    type: SET_USERS,
                    payload: res.data,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const removeDeal = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.delete(`/deals/${data.id}`)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const removeUser = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        HTTPS.delete(`/users/${data.id}`)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const uploadFiles = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });
        const formData = new FormData();
        data.map((file) => {
            formData.append('file', file);
            return null;
        });
        HTTPS.post('/upload', formData)
            .then((res) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                resolve(res.data);
            })
            .catch((err) => {
                dispatch({
                    type: SET_LOADING,
                    payload: false,
                });
                reject(handleError(err));
            });
    });

export const uploadToAnalyze = (dispatch, url) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        const headers = {
            'x-api-key': 'ask_653c2ceba8aaeb889196dd42cc824a01',
        };

        axios
            .get('https://api.askyourpdf.com/v1/api/download_pdf', {
                headers,
                params: {
                    url,
                },
            })
            .then((response) => {
                if (response.status === 201) {
                    dispatch({
                        type: SET_LOADING,
                        payload: false,
                    });
                    resolve(response.data);
                } else {
                    reject(handleError(response.status));
                }
            })
            .catch((error) => {
                console.error(error);
                reject(handleError(error));
            });
    });

export const getChat = (docID, message) =>
    new Promise((resolve, reject) => {
        const headers = {
            'x-api-key': 'ask_653c2ceba8aaeb889196dd42cc824a01',
            'Content-Type': 'application/json',
        };

        axios
            .post(`https://api.askyourpdf.com/v1/chat/${docID}`, message, {
                headers,
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(handleError(response.status));
                }
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
