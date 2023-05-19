import {
    Button,
    FlexLayout,
    FormElement,
    TextField,
} from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { PropsI } from 'src/Core/@types';
import { regexValidation, urlFetchCalls } from '../../../Constant';
import { DI } from '../../../Core/DependencyInjection';

const Forget = (_props: PropsI) => {
    const {
        redirect: { loginPage },
        post: { forgotPassword },
    } = urlFetchCalls;
    const {
        error,
        history,
        di: { POST },
    } = _props;

    const [emailState, setEmailState] = useState({
        value: '',
        showError: false,
        message: '',
        emailError: true,
        btnLoading: false,
    });
    const { value, showError, message, emailError, btnLoading } = emailState;
    const navigate = useNavigate();
    // function handles the state of email on change of the input box
    const emailHandler = (e: any) => {
        emailState.message = '';
        emailState.showError = false;
        emailState.value = e;
        if (emailState.value.match(regexValidation.emailFormat)) {
            emailState.emailError = false;
        } else {
            emailState.emailError = true;
        }
        setEmailState({ ...emailState });
    };
    // function handles the states on blur of the input box
    const blurHandler = () => {
        if (emailState.value.match(regexValidation.emailFormat)) {
            emailState.showError = false;
            emailState.message = '';
            emailState.emailError = false;
        } else {
            if (emailState.value === '') {
                emailState.message = '';
            } else {
                emailState.message = 'Please enter a valid email';
            }
            emailState.emailError = true;
            emailState.showError = true;
        }
        setEmailState({ ...emailState });
    };
    // function hits the forget api on click of generate link button
    const generateHandler = () => {
        setEmailState({ ...emailState, btnLoading: true });
        let location = window.location.origin;
        POST(forgotPassword, {
            email: emailState.value,
            'reset-link': `${location}/auth/reset`,
            subject:
                'Reset your password for Social Ads on Buy with Prime Account',
        }).then((res) => {
            setEmailState({ ...emailState, btnLoading: false });
            if (res.success) {
                navigate('/auth/forgotsuccess');
            } else {
                error(res.message);
            }
        });
    };

    return (
        <>
            <FormElement>
                <TextField
                    placeHolder="Enter Email"
                    error={showError}
                    value={value}
                    onChange={(e) => emailHandler(e)}
                    onblur={blurHandler}
                    showHelp={message}
                />
                <hr />
                <Button
                    disable={emailError}
                    length={'fullBtn'}
                    thickness="large"
                    content=" Generate Link"
                    loading={btnLoading}
                    onClick={generateHandler}
                />
            </FormElement>
            <br />
            <FlexLayout halign="start">
                <div className="btn--style">
                    <Button
                        type="Plain"
                        thickness="extraThin"
                        icon={<ArrowLeft />}
                        onClick={() => history(loginPage)}
                        content="Back To Login"
                    />
                </div>
            </FlexLayout>
        </>
    );
};

export default DI(Forget);
