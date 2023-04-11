import React, { useContext, useState } from 'react';
import { DI, DIProps, parseJwt, extractUSername } from '../../../Core';
import { loginStatus } from '../../../Actions';
import * as queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { StoreDispatcher } from '../../..';
import { Eye, EyeOff } from 'react-feather';
import {
    Button,
    FlexLayout,
    FormElement,
    TextField,
} from '@cedcommerce/ounce-ui';
import { regexValidation, urlFetchCalls } from '../../../Constant';

interface PropsI extends DIProps {
    loginStatus: () => void;
}
interface objIErrorValidate {
    error?: boolean;
    message?: string;
    showError?: boolean;
}
interface objectState {
    [name: string]: objIErrorValidate;
}
interface loginStateObj {
    username: string;
    password: string;
    loading: boolean;
    eyeoff: boolean;
}
function Login(_props: PropsI): JSX.Element {
    const [state, setState] = useState<loginStateObj>({
        username: '',
        password: '',
        loading: false,
        eyeoff: false,
    });
    const [errorValidation, setErrorValidation] = useState<objectState>({
        email: { error: true, message: '', showError: false },
        password: { error: true, showError: false },
    });
    const navigate = useNavigate();
    const dispatcher = useContext(StoreDispatcher);
    // function handles the state on blur of input boxes
    const blurHandler = (name: string) => {
        if (name === 'Email') {
            if (state.username === '') {
                errorValidation.email.showError = true;
            } else {
                if (!state.username.match(regexValidation.emailFormat)) {
                    errorValidation.email.showError = true;
                    errorValidation.email.message =
                        'Please enter a valid email';
                } else {
                    errorValidation.email.showError = false;
                    errorValidation.email.message = '';
                }
            }
        } else {
            if (state.password === '') {
                errorValidation.password.showError = true;
            } else {
                errorValidation.password.showError = false;
            }
        }
        setErrorValidation({ ...errorValidation });
    };
    // function sets the state on the change of input boxes
    const changeHandler = (e: any, name: string) => {
        if (name === 'Email') {
            errorValidation.email.showError = false;
            errorValidation.email.message = '';
            state.username = e;
        } else {
            errorValidation.password.showError = false;
            state.password = e;
        }
        setErrorValidation({ ...errorValidation });
        setState({ ...state });
    };
    // function hits the login api on login button handler
    const login = () => {
        const {
            post: { userLogin },
        } = urlFetchCalls;
        _props.di
            .POST(userLogin, {
                email: username,
                password: password,
            })
            .then((res) => {
                if (res.success) {
                    _props.success(res.message);
                    let obj = parseJwt(res.data.token);
                    _props.di.globalState.set(
                        `${obj.user_id}_auth_token`,
                        res.data.token
                    );
                    state.username = '';
                    state.password = '';
                    setState({ ...state });
                    dispatcher({
                        type: 'syncNecessaryInfo',
                        state: obj.user_id,
                    });
                    navigate('/panel');
                } else {
                    _props.error(res.message);
                }
            });
    };
    // function disables or enables the login button
    const disableBtn = () => {
        if (
            state.username.match(regexValidation.emailFormat) &&
            state.password !== ''
        ) {
            return false;
        } else {
            return true;
        }
    };

    const { username, password, loading, eyeoff } = state;
    return (
        <>
            <FormElement>
                <TextField
                    name={'Email'}
                    error={errorValidation.email.showError}
                    showHelp={errorValidation.email.message}
                    required={true}
                    placeHolder={'ex: abc@gmail.com'}
                    value={username}
                    onChange={(e) => changeHandler(e, 'Email')}
                    onblur={() => blurHandler('Email')}
                />
                <div>
                    <FlexLayout direction="vertical" spacing="mediumTight">
                        <TextField
                            name={'Password'}
                            required={true}
                            placeHolder={'Enter Password'}
                            value={password}
                            strength={false}
                            show={eyeoff}
                            type="password"
                            error={errorValidation.password.showError}
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
                            onChange={(e) => {
                                changeHandler(e, 'Password');
                            }}
                            onblur={() => blurHandler('Password')}
                        />

                        <FlexLayout halign="end">
                            <Button
                                type="TextButton"
                                thickness="thin"
                                onClick={() => navigate('/auth/forgot')}>
                                Forgot Password?
                            </Button>
                        </FlexLayout>
                    </FlexLayout>
                </div>
                <hr />
                <Button
                    thickness="large"
                    length="fullBtn"
                    loading={loading}
                    disable={disableBtn()}
                    onClick={login}>
                    Login
                </Button>
            </FormElement>
        </>
    );
}

export default DI(Login, { func: { loginStatus } });
