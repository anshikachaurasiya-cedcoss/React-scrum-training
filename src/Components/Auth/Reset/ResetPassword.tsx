import {
    Alert,
    Button,
    FlexLayout,
    FormElement,
    TextField,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { parseJwt } from '../../../Core';
import { PropsI } from 'src/Core/@types';
import { DI } from '../../../Core/DependencyInjection';
import { Eye, EyeOff } from 'react-feather';
import CustomHelpPoints from '../../CustomHelpPoints';
import { regexValidation, urlFetchCalls } from '../../../Constant';
import PasswordCreatedAlert from '../Layouts/PasswordCreatedAlert';

interface resetPwdObj {
    password: string;
    confirmPassword: string;
    loading: boolean;
    eyeoff: boolean;
    error: boolean;
}
let start: any = '',
    token = '';
const ResetPassword = (_props: PropsI) => {
    const [state, setState] = useState<resetPwdObj>({
        password: '',
        confirmPassword: '',
        loading: false,
        eyeoff: false,
        error: true,
    });
    const [details, setDetails] = useState('');
    let [resetSuccessful, setResetSuccessFul] = useState(false);

    const [errorValidation, setErrorValidation] = useState({
        password: { showError: false, message: '' },
        confirmPassword: { showError: false, message: '' },
    });

    useEffect(() => {
        start = window.location.search.indexOf('=');
        token = window.location.search.substring(
            start + 1,
            window.location.search.length
        );
        setDetails(parseJwt(atob(token)).email);
    }, []);
    // function handles the state on change of input fields
    const inputHandler = (e: any, name: string) => {
        if (name === 'New Password') {
            state.password = e;
            if (state.password.match(regexValidation.passwordformat)) {
                errorValidation.password.showError = false;
            } else {
                errorValidation.password.showError = true;
                state.error = true;
            }
            if (state.confirmPassword !== '') {
                checkValidation();
            }
        } else {
            state.confirmPassword = e;
            checkValidation();
        }
        setErrorValidation({ ...errorValidation });
        setState({ ...state });
    };
    // function checks for validation
    const checkValidation = () => {
        if (state.password === state.confirmPassword) {
            errorValidation.confirmPassword.showError = false;
            errorValidation.confirmPassword.message = '';
            state.error = false;
        } else {
            errorValidation.confirmPassword.showError = true;
            errorValidation.confirmPassword.message = 'Passwords do not match!';
            state.error = true;
        }
        setErrorValidation({ ...errorValidation });
        setState({ ...state });
    };
    // function checks for validation on blur of the input field
    const blurHandler = (name: string) => {
        if (name === 'New Password') {
            if (state.password === '') {
                errorValidation.password.showError = true;
            }
        } else {
            if (state.confirmPassword === '') {
                errorValidation.confirmPassword.showError = true;
            }
        }
        setErrorValidation({ ...errorValidation });
    };
    // function hits the save password api
    const savePasswordHandler = () => {
        state.loading = true;
        const {
            post: { forgotReset },
        } = urlFetchCalls;
        _props.di
            .POST(forgotReset, {
                new_password: state.password,
                confirm_password: state.confirmPassword,
                token: token,
            })
            .then((res) => {
                state.loading = false;
                if (res.success) {
                    setResetSuccessFul(true);
                } else {
                    _props.error(res.message);
                }
            });
        setState({ ...state });
    };
    const { confirmPassword, password, loading, eyeoff, error } = state;
    const {
        password: { showError: pwdError },
        confirmPassword: { showError: confirmPwdError, message: confirmPwdMsg },
    } = errorValidation;

    return (
        <>
            {resetSuccessful ? (
                <PasswordCreatedAlert />
            ) : (
                <FlexLayout spacing="loose" direction="vertical">
                    <Alert
                        type="info"
                        desciption={`You are resetting password for ${details}`}>
                        You're all set!
                    </Alert>
                    <FormElement>
                        <TextField
                            name={'New Password'}
                            required={true}
                            placeHolder={'Enter Password'}
                            strength={false}
                            type="password"
                            show={eyeoff}
                            value={password}
                            error={pwdError}
                            onChange={(e) => inputHandler(e, 'New Password')}
                            onblur={() => blurHandler('New Password')}
                            innerSufIcon={
                                eyeoff ? (
                                    <Eye
                                        color="#3B424F"
                                        size={20}
                                        onClick={() =>
                                            setState({
                                                ...state,
                                                eyeoff: !eyeoff,
                                            })
                                        }
                                    />
                                ) : (
                                    <EyeOff
                                        color="#3B424F"
                                        size={20}
                                        onClick={() =>
                                            setState({
                                                ...state,
                                                eyeoff: !eyeoff,
                                            })
                                        }
                                    />
                                )
                            }
                        />
                        <CustomHelpPoints />
                        <TextField
                            name="Confirm Password"
                            required={true}
                            placeHolder="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            error={confirmPwdError}
                            showHelp={confirmPwdMsg}
                            onChange={(e) =>
                                inputHandler(e, 'Confirm Password')
                            }
                            onblur={() => blurHandler('Confirm Password')}
                        />
                        <hr />
                        <Button
                            disable={error}
                            length="fullBtn"
                            thickness="large"
                            loading={loading}
                            onClick={savePasswordHandler}>
                            Save
                        </Button>
                    </FormElement>
                </FlexLayout>
            )}
        </>
    );
};

export default DI(ResetPassword);