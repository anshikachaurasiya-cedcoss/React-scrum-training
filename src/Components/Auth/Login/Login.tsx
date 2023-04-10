import React, { useContext, useEffect, useState } from 'react';
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
import {
    APP_SOURCE_NAME,
    regexValidation,
    urlFetchCalls,
} from '../../../Constant';
import { RegistrationPage } from '../StaticMessages';

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
    const [pageLoad, pageLoadingState] = useState<boolean>(true);
    const [errorValidation, setErrorValidation] = useState<objectState>({
        email: { error: false, message: '', showError: false },
        password: { error: false, showError: false },
    });
    const navigate = useNavigate();
    const dispatcher = useContext(StoreDispatcher);

    useEffect(() => {
        dispatcher({
            type: 'logout',
            state: {},
        });
        _props.di.globalState.removeLocalStorage('auth_token');
        pageLoadingState(false);
        return () => {};
    }, []);

    if (pageLoad) {
        return <></>;
    }

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
                                console.log('object');
                            }}
                        />

                        <FlexLayout halign="end">
                            <Button
                                type="TextButton"
                                thickness="thin"
                                onClick={() => console.log('object')}>
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
                    disable={false}
                    onClick={() => {
                        console.log('Clicked');
                    }}>
                    Login
                </Button>
            </FormElement>
        </>
    );
}

export default DI(Login, { func: { loginStatus } });
