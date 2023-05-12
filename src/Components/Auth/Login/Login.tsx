import React, { useContext, useEffect, useState } from 'react';
import { DI, DIProps, parseJwt } from '../../../Core';
import { loginStatus } from '../../../Actions';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    // destructuring of props
    const {
        di: {
            POST,
            globalState: { set },
        },
        error,
    } = _props;
    // destructuring of states
    const { username, password, loading, eyeoff } = state;
    const {
        email: { message: emailMsg, showError: emailError },
        password: { showError: pwdError },
    } = errorValidation;
    // destructing of fetching calls
    const {
        post: { userLogin },
    } = urlFetchCalls;
    const [searchParams] = useSearchParams();
    useEffect(() => {
        let bearerToken = searchParams.get('bearer');
        let status = searchParams.get('connection_status');
        let success = searchParams.get('success');
        let navigate_value = localStorage.getItem('navigate_from');

        if (bearerToken) {
            dispatcher({
                type: 'user_id',
                state: { user_id: parseJwt(bearerToken).user_id },
            });
            set(`${parseJwt(bearerToken).user_id}_auth_token`, bearerToken);
            if (status && Number(status) === 1) {
                if (navigate_value) {
                    if (navigate_value === 'Account') {
                        navigate(
                            `/panel/${
                                parseJwt(bearerToken).user_id
                            }/dashboard?success=${true}`
                        );
                    } else {
                        navigate('/success/message');
                    }
                } else {
                    navigate('/success/message');
                }
            }
        }
    }, []);

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
        setState({ ...state, loading: true });

        POST(userLogin, {
            email: username,
            password: password,
        }).then((res) => {
            if (res.success) {
                state.loading = true;
                let obj = parseJwt(res.data.token);
                set(`${obj.user_id}_auth_token`, res.data.token);
                dispatcher({
                    type: 'user_id',
                    state: { user_id: obj.user_id },
                });
                navigate(`/panel/${obj.user_id}/dashboard`);
            } else {
                state.loading = false;
                error(res.message);
            }
            setState({ ...state });
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

    return (
        <>
            <FormElement>
                <TextField
                    name={'Email'}
                    error={emailError}
                    showHelp={emailMsg}
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
                            error={pwdError}
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

export default DI(Login, {
    func: { loginStatus },
});
