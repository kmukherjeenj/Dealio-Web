import * as types from './types';
import initialState from './initialState';

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case types.SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case types.SET_AUTHED:
            return {
                ...state,
                authed: action.payload,
            };
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case types.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case types.SET_DEALS:
            return {
                ...state,
                deals: action.payload,
            };
        default:
            return state;
    }
};
