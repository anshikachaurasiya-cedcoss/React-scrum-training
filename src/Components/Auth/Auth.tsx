/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { DIProps, DI } from '../../Core';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Alert, FlexLayout, LRLayout, TextStyles } from '@cedcommerce/ounce-ui';
import Footer from '../Footer/Footer';
import './auth.css';
import Login from './Login/Login';
import { cardTitleAuth } from '../../Constant';

function Auth(_props: DIProps): JSX.Element {
    const match = useParams();
    const location = () => {
        return match['*']?.includes('login')
            ? cardTitleAuth.login
            : match['*']?.includes('register')
            ? cardTitleAuth.register
            : match['*']?.includes('forgotsuccess')
            ? ''
            : match['*']?.includes('forgot')
            ? cardTitleAuth.forgot
            : match['*']?.includes('reset')
            ? cardTitleAuth.reset
            : cardTitleAuth.default;
    };
    const registerPath = match['*']?.includes('/register');

    return (
        <>
            <div className="init-LoginPage__Wrapper">
                <div className="init-LoginPage">
                    <div className="inte-auth-custom">
                        <LRLayout
                            title={
                                <div className="auth_page_title">
                                    <TextStyles
                                        alignment="left"
                                        fontweight="extraBold"
                                        headingTypes="LG-2.8"
                                        paragraphTypes="MD-1.4"
                                        textcolor="light"
                                        type="Heading"
                                        utility="none">
                                        React-
                                    </TextStyles>
                                    <TextStyles
                                        alignment="left"
                                        fontweight="extraBold"
                                        headingTypes="LG-2.8"
                                        paragraphTypes="MD-1.4"
                                        textcolor="light"
                                        type="Heading"
                                        utility="none">
                                        Boiler Plate
                                    </TextStyles>
                                </div>
                            }
                            cardTitle={`${location()}`}
                            lrHelpText={
                                <>
                                    <FlexLayout
                                        direction="vertical"
                                        spacing="extraLoose">
                                        <TextStyles
                                            alignment="left"
                                            fontweight="normal"
                                            headingTypes="MD-2.7"
                                            lineHeight="LH-2.8"
                                            subheadingTypes="SM-1.8"
                                            textcolor="light"
                                            type="SubHeading"
                                            utility="none">
                                            React boiler plate description
                                        </TextStyles>
                                    </FlexLayout>
                                </>
                            }>
                            <Routes>
                                <Route path="login" element={<Login />} />
                                <Route
                                    path="*"
                                    element={<Navigate to={'/auth/login'} />}
                                />
                            </Routes>
                        </LRLayout>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default DI(Auth);
