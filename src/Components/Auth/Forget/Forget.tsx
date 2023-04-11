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
    } = urlFetchCalls;

    const [emailState, setEmailState] = useState({
        value: '',
        showError: false,
        message: '',
        error: true,
    });
    // state for the setting the loading state of button on hitting the Generate link button
    let [btnLoading, setBtnLoading] = useState(false);
    let navigate = useNavigate();
    // function handles the state of email on change of the input box
    const emailHandler = (e: any) => {
        emailState.message = '';
        emailState.showError = false;
        emailState.value = e;
        if (emailState.value.match(regexValidation.emailFormat)) {
            emailState.error = false;
        } else {
            emailState.error = true;
        }
        setEmailState({ ...emailState });
    };
    // function handles the states on blur of the input box
    const blurHandler = () => {
        if (emailState.value.match(regexValidation.emailFormat)) {
            emailState.showError = false;
            emailState.message = '';
            emailState.error = false;
        } else {
            if (emailState.value === '') {
                emailState.message = '';
            } else {
                emailState.message = 'Please enter a valid email';
            }
            emailState.error = true;
            emailState.showError = true;
        }
        setEmailState({ ...emailState });
    };
    // function hits the forget api on click of generate link button
    const generateHandler = () => {
        setBtnLoading(true);
        let location = window.location.href;
        const {
            post: { forgotPassword },
        } = urlFetchCalls;

        _props.di
            .POST(forgotPassword, {
                email: emailState.value,
                'reset-link': location,
                subject:
                    'Reset your password for Social Ads on Buy with Prime Account',
            })
            .then((res) => {
                console.log(res);
                if (res.success) {
                    navigate('/auth/forgotsuccess');
                    setBtnLoading(false);
                } else {
                    setBtnLoading(false);
                    _props.error(res.message);
                }
            });
    };

    return (
        <>
            <FormElement>
                <TextField
                    placeHolder="Enter Email"
                    error={emailState.showError}
                    value={emailState.value}
                    onChange={(e) => emailHandler(e)}
                    onblur={blurHandler}
                    showHelp={emailState.message}
                />
                <hr />
                <Button
                    disable={emailState.error}
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
                        onClick={() => _props.history(loginPage)}
                        content="Back To Login"
                    />
                </div>
            </FlexLayout>
        </>
    );
};

export default DI(Forget);
