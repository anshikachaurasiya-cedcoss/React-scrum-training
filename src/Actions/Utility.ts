/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

type ReduxRI = ThunkAction<void, any, unknown, Action<string>>;
type errorType = 'fullPage' | 'modulePage' | '';
// Action to Re-sync necessary Info
export const loginStatus =
    (status = 'LOGIN'): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'LOGIN_STATUS',
            state: {
                status: status,
            },
        });
    };

export const showNotification =
    (message: string, error = false): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'showToast',
            state: {
                error: error,
                message: message,
            },
        });
    };

export const success =
    (message: string): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'showToast',
            state: {
                error: false,
                message: message,
            },
        });
    };

export const error =
    (message: string): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'showToast',
            state: {
                error: true,
                message: message,
            },
        });
    };

export const warn =
    (message: string): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'showToast',
            state: {
                error: false,
                warn: true,
                message: message,
            },
        });
    };

export const hideNotification =
    (id: string | number): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'hideToast',
            state: {
                id: id,
            },
        });
    };

export const errorStatus =
    (
        location: string,
        showError: boolean,
        errorType: errorType = '',
        message: string | null = null
    ): ReduxRI =>
    (dispatch) => {
        dispatch({
            type: 'errorFound',
            state: { location, showError, errorType, message },
        });
    };
