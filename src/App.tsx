/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DI, DIProps } from './Core';
import { hideNotification } from './Actions';
import './styles.css';
import { Toast, ToastWrapper } from '@cedcommerce/ounce-ui';
import { BrokenPage1 } from './Components/EmptyState/EmptyPages';
import NoInternet from './NoInternet';

const Auth = lazy(() => import('./Components/Auth'));
const ShowMessage = lazy(
    () => import('./Components/Other/Message/ShowMessage')
);

interface PropsI extends DIProps {
    hideNotification: (id: number | string) => void;
}
function App(Props: PropsI): JSX.Element {
    const {
        redux: { user_id, errorFound },
    } = Props;
    if (
        user_id == undefined ||
        errorFound?.errorType === 'fullPage' ||
        window.location.pathname.includes('/register')
    ) {
        if (errorFound?.location != null) {
            if (errorFound?.location === window.location.href)
                return (
                    <div className="custom_session_expire before_login_broken">
                        <div className="inner_s">
                            {' '}
                            <BrokenPage1 cardType="Plain" />
                        </div>
                    </div>
                );
        }
    }
    return (
        <>
            <NoInternet>
                <Routes>
                    <Route
                        path="/auth"
                        element={
                            <Suspense fallback={<></>}>
                                <Auth />
                            </Suspense>
                        }>
                        <Route path="*" element={<>NO Page Found 2</>} />
                    </Route>
                    <Route
                        path="/panel"
                        element={
                            <Suspense fallback={<></>}>
                                <div>Panel.tsx</div>
                            </Suspense>
                        }>
                        <Route path="*" element={<>NO Page Found 2</>} />
                    </Route>

                    <Route path="*" element={<Navigate to={'/auth/login'} />}>
                        {' '}
                    </Route>
                </Routes>
                <RenderToasts {...Props} />
            </NoInternet>
        </>
    );
}

function RenderToasts(props: PropsI): JSX.Element {
    const { redux } = props;
    const { showToast } = redux;
    return (
        <ToastWrapper>
            {Object.keys(showToast).map((key: any) => {
                const toast = showToast[key];
                let type: any = 'success';
                if (toast.error) type = 'error';
                if (toast.warn) type = 'warning';

                if (!toast.message?.trim()) return props.hideNotification(key);

                let time = 5000;
                const words = toast.message.split(' ').join('_').split('_');
                const wordLimit = words.length % 20 == 1 ? 0 : 1;
                const perWord: any = parseInt((words.length / 20).toFixed(0));
                time = (perWord + wordLimit) * 5000;
                return (
                    <Toast
                        key={key}
                        timeout={time}
                        type={type}
                        onDismiss={() => props.hideNotification(key)}
                        message={toast.message}
                    />
                );
            })}
        </ToastWrapper>
    );
}
export default DI(App, { stateNeeded: true, func: { hideNotification } });
