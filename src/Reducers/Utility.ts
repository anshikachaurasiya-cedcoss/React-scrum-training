/* eslint-disable @typescript-eslint/no-explicit-any */
interface UtilityActionI {
    type: 'showToast' | 'hideToast' | 'LOGIN_STATUS' | 'logout' | 'errorFound';
    state: any;
}
type errorType = 'fullPage' | 'modulePage' | '';
interface StateI {
    showToast: ObjectI;
    showID: number;
    LOGIN_STATUS?: {
        [name: string]: any;
        state: 'LOGIN' | 'LOGOUT';
    };
    errorFound: {
        location: string | null;
        showError: boolean;
        errorType?: errorType;
        message?: string | null;
    };
}

interface ObjectI {
    [name: string]: any;
}

export const utility = (
    state: StateI = {
        showToast: {},
        showID: 1,
        errorFound: {
            location: null,
            showError: false,
            errorType: '',
            message: null,
        },
    },
    action: UtilityActionI
): StateI => {
    switch (action.type) {
        case 'showToast':
            state['showToast'][state['showID']] = action.state;
            state['showID']++;
            return { ...state };
        case 'hideToast':
            delete state['showToast'][action.state.id];
            return { ...state };
        case 'logout':
            return {
                showToast: {},
                showID: 1,
                errorFound: {
                    showError: false,
                    location: null,
                },
            };
        case 'LOGIN_STATUS':
            return {
                ...state,
                LOGIN_STATUS: {
                    ...action.state,
                },
            };
        case 'errorFound':
            return {
                ...state,
                errorFound: action.state,
            };
        default:
            return state;
    }
};
