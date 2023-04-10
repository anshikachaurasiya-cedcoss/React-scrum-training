import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import '@cedcommerce/ounce-ui/dist/index.css';

const App = lazy(() => import('./App'));

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './Reducers';

export const StoreDispatcher = React.createContext(store.dispatch);

ReactDOM.render(
    <>
        <BrowserRouter>
            <Provider store={store}>
                <StoreDispatcher.Provider value={store.dispatch}>
                    <Suspense fallback={<></>}>
                        <App />
                    </Suspense>
                </StoreDispatcher.Provider>
            </Provider>
        </BrowserRouter>
    </>,
    document.getElementById('root')
);
