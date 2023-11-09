import { HTTPS } from './constant';
import { handleError } from './handleError';
import { SET_DEALS, SET_EMAIL, SET_LOADING } from '../redux/types';

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
