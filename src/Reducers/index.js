import { necessaryInfo } from './NecessaryInfo';
import { utility } from './Utility';

import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

const allReducers = combineReducers({
    necessaryInfo,
    utility,
});

const initialState = {};

const middleware = [thunk];
let con = compose(applyMiddleware(...middleware));
if (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
) {
    con = compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

export const store = createStore(allReducers, initialState, con);
