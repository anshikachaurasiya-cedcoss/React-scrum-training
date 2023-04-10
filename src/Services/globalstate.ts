import { environment } from '../environments/environment';
import { BasicObjI as ObjectI } from '../Core/@types';
import { DIProps } from '../Core/DependencyInjection';

export interface GSI {
    set: (
        _StateProps: DIProps
    ) => (key: string, value: string, path?: boolean) => void;
    get: (
        _StateProps: any
    ) => (key: string, prefixIncluded?: boolean) => string | null;
    removeLocalStorage: (
        _StateProps: DIProps
    ) => (key: string, path?: string) => unknown;
    getBearerToken: (_StateProps: any) => () => string | null;
    prepareQuery: (params: ObjectI) => unknown;
}

const SelectedStorage = sessionStorage;

export const globalState: GSI = {
    set:
        (_StateProps: any) =>
        (key: string, value: string, prefixIncluded = false): void => {
            if (!prefixIncluded) {
                if (_StateProps && typeof _StateProps.user_id === 'string') {
                    key = _StateProps.user_id + '_' + key;
                } else if (
                    _StateProps &&
                    _StateProps.redux &&
                    typeof _StateProps.redux.user_id === 'string'
                ) {
                    key = _StateProps.redux.user_id + '_' + key;
                }
            }
            SelectedStorage.setItem(key, value);
        },
    get:
        (_StateProps: any) =>
        (key: string, prefixIncluded = false): string | null => {
            if (!prefixIncluded) {
                if (_StateProps && typeof _StateProps.user_id === 'string') {
                    return SelectedStorage.getItem(
                        _StateProps.user_id + '_' + key
                    );
                } else if (
                    _StateProps &&
                    _StateProps.redux &&
                    typeof _StateProps.redux.user_id === 'string'
                ) {
                    return SelectedStorage.getItem(
                        _StateProps.redux.user_id + '_' + key
                    );
                }
            }
            return SelectedStorage.getItem(key);
        },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeLocalStorage:
        (_StateProps: any) =>
        (key: string, path = '/'): unknown => {
            if (_StateProps && typeof _StateProps.user_id === 'string') {
                key = _StateProps.user_id + '_' + key;
            } else if (
                _StateProps &&
                _StateProps.redux &&
                typeof _StateProps.redux.user_id === 'string'
            ) {
                key = _StateProps.redux.user_id + '_' + key;
            }
            return SelectedStorage.removeItem(key);
        },
    getBearerToken: (_StateProps: any) => (): string | null => {
        if (_StateProps && typeof _StateProps.user_id === 'string') {
            return SelectedStorage.getItem(
                _StateProps.user_id + '_' + 'auth_token'
            );
        } else if (
            _StateProps &&
            _StateProps.redux &&
            typeof _StateProps.redux.user_id === 'string'
        ) {
            return SelectedStorage.getItem(
                _StateProps.redux.user_id + '_' + 'auth_token'
            );
        }
        return environment.Bearer;
    },
    prepareQuery: (params: ObjectI): unknown => {
        let queryString = Object.keys(params).length > 0 ? '?' : '';
        const end = '';
        for (let i = 0; i < Object.keys(params).length; i++) {
            let key = params[Object.keys(params)[i]];
            queryString += end + key + '=' + params[key];
            key = '&';
        }
        return queryString;
    },
};
