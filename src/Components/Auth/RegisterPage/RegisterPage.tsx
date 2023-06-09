import {
    Button,
    CheckBox,
    FlexLayout,
    FormElement,
    TextField,
} from '@cedcommerce/ounce-ui';
import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { DI, DIProps, parseJwt } from '../../../Core';
import { regexValidation, urlFetchCalls } from '../../../Constant';
import CustomHelpPoints from '../../CustomHelpPoints';
import { RegistrationPage } from '../StaticMessages';
import OtpPage from '../OtpPage/OtpPage';
import { syncConnectorInfo } from '../../../Actions';
import { StoreDispatcher } from '../../..';
import RegisterRedirectPage from './RegisterRedirectPage';

interface PropsI extends DIProps {
    syncConnectorInfo: (_props: DIProps) => void;
}

interface loginStateObj {
    brandName: string;
    email: string;
    password: string;
    loading: boolean;
    eyeoff: boolean;
    confirmPassword: string;
    checkField: boolean;
}

const RegisterPage = (_props: PropsI) => {
    const [state, setState] = useState<loginStateObj>({
        brandName: '',
        email: '',
        password: '',
        loading: false,
        eyeoff: false,
        confirmPassword: '',
        checkField: false,
    });
    // destructuring of props
    const {
        syncConnectorInfo,
        di: {
            globalState: { get, set },
            POST,
            GET,
        },
        error,
    } = _props;
    const {
        post: { emailExistsCheck },
        get: { otpMail },
    } = urlFetchCalls;

    const dispatcher = useContext(StoreDispatcher);

    const [otpModal, setOtpModal] = useState(false);
    // setting the auth_token in useEffect
    useEffect(() => {
        let auth_token = get('auth_token', true);
        if (auth_token) {
            set('auth_token', auth_token);
            let obj = parseJwt(auth_token);
            dispatcher({
                type: 'user_id',
                state: { user_id: obj.user_id },
            });
            syncConnectorInfo(_props);
        }
    }, []);

    const [errorValidation, setErrorValidation] = useState({
        brand: { error: false, showError: false, message: '' },
        email: { error: false, showError: false, message: '' },
        password: { error: false, showError: false, message: '' },
        confirmPassword: { error: false, showError: false, message: '' },
    });

    const [emailResponse, setEmailResponse] = useState({});
    const [accountCreate, setAccountCreate] = useState<any>({});
    const [registerResponse, setRegisterResponse] = useState<any>({});

    const { AgreeTnc, BrandLenght, emailErrors, PasswordNotMatched } =
        RegistrationPage;
    const { emailFormat } = regexValidation;
    // function checks for validations and set the states on input change
    const changeHandler = (e: any, name: string) => {
        if (name === 'Store / Brand Name') {
            state.brandName = e;
            if (state.brandName !== '') {
                errorValidation.brand.showError = false;
                if (state.brandName.length < 100) {
                    errorValidation.brand.message = '';
                }
            }
        } else if (name === 'Email') {
            state.email = e;
            errorValidation.email.showError = false;
            errorValidation.email.message = '';
        } else if (name === 'Create Password') {
            state.password = e;
            errorValidation.password.showError = false;
            if (state.confirmPassword !== '') {
                if (state.password === state.confirmPassword) {
                    errorValidation.confirmPassword.message = '';
                    errorValidation.confirmPassword.showError = false;
                } else {
                    errorValidation.confirmPassword.message =
                        PasswordNotMatched;
                    errorValidation.confirmPassword.showError = true;
                }
            }
        } else if (name === 'Confirm Password') {
            state.confirmPassword = e;
            if (state.password === state.confirmPassword) {
                errorValidation.confirmPassword.message = '';
                errorValidation.confirmPassword.showError = false;
            } else {
                errorValidation.confirmPassword.message = PasswordNotMatched;
                errorValidation.confirmPassword.showError = true;
            }
        }
        setErrorValidation({ ...errorValidation });
        setState({ ...state });
    };
    // function checks for validation on blur of the input box
    const blurHandler = (name: string) => {
        if (name === 'Store / Brand Name') {
            if (state.brandName.length >= 100) {
                errorValidation.brand.showError = true;
                errorValidation.brand.message = BrandLenght;
            } else if (state.brandName === '') {
                errorValidation.brand.showError = true;
            } else {
                errorValidation.brand.message = '';
                errorValidation.brand.showError = false;
            }
        } else if (name === 'Email') {
            if (state.email === '') {
                errorValidation.email.showError = true;
            } else {
                if (!state.email.match(emailFormat)) {
                    errorValidation.email.showError = true;
                    errorValidation.email.message = emailErrors;
                } else {
                    errorValidation.email.showError = false;
                    errorValidation.email.message = '';
                }
            }
        } else if (name === 'Create Password') {
            if (state.password === '') {
                errorValidation.password.showError = true;
            } else {
                errorValidation.password.showError = false;
            }
        }
        setErrorValidation({ ...errorValidation });
    };
    // function sets the state of checkbox
    const checkHandler = () => {
        if (state.checkField) {
            state.checkField = false;
        } else {
            state.checkField = true;
        }
        setState({ ...state });
    };
    // destructuring of errorvalidation state
    const {
        brand: { showError: brandErr, message: brandMessage },
        email: { showError: emailErr, message: emailMessage },
        password: { showError: pwdErr },
        confirmPassword: { showError: confirmPwdErr, message: confirmMessage },
    } = errorValidation;
    // function checks the condition to set the button disable property
    const checksAllCond = () => {
        if (
            email.match(emailFormat) &&
            emailErr === false &&
            password !== '' &&
            pwdErr === false &&
            brandName !== '' &&
            brandErr === false &&
            confirmPwdErr === false &&
            confirmPassword !== '' &&
            checkField
        ) {
            return false;
        } else {
            return true;
        }
    };
    // destructuring of state
    const {
        eyeoff,
        password,
        brandName,
        email,
        loading,
        confirmPassword,
        checkField,
    } = state;
    // function hits the api on click of create account button
    const createHandler = () => {
        setState({ ...state, loading: true });

        POST(emailExistsCheck, { data: { email: email } }).then((res) => {
            if (res.success) {
                state.loading = true;
                getMail(1);
                if (!res.success) {
                    state.loading = false;
                    error(res.message);
                }
                setState({ ...state });
            } else {
                setState({ ...state, loading: false });
                error(res.message);
            }
        });
    };
    // function hits the send otp api
    const getMail = (num: number) => {
        GET(otpMail, { email: email }).then((res) => {
            setEmailResponse(res);
            if (res.success) {
                state.loading = false;
                if (num === 1) {
                    openModal();
                }
            } else {
                error(res.message);
                state.loading = false;
            }
            setState({ ...state });
        });
    };
    // function hits the account creation api as the otp is successfully verified
    const createUser = () => {
        const {
            post: { createUser },
        } = urlFetchCalls;
        POST(createUser, {
            data: {
                user: {
                    email: email,
                    new_password: password,
                    confirm_password: confirmPassword,
                },
                config: [
                    {
                        key: 'brand',
                        value: brandName,
                        group_code: 'meta-testwebapi',
                    },
                ],
            },
        }).then((res) => {
            if (res.success) {
                setRegisterResponse(res);
            } else {
                error(res.message);
            }
        });
    };

    // function handles the state of modal
    const openModal = () => {
        setOtpModal(!otpModal);
    };
    return (
        <>
            {accountCreate.success ? (
                <RegisterRedirectPage registerResponse={registerResponse} />
            ) : (
                <>
                    <FormElement>
                        <TextField
                            name={'Store / Brand Name'}
                            required={true}
                            placeHolder={'Enter Store / Brand Name'}
                            value={brandName}
                            error={brandErr}
                            showHelp={brandMessage}
                            onChange={(e) =>
                                changeHandler(e, 'Store / Brand Name')
                            }
                            onblur={() => blurHandler('Store / Brand Name')}
                        />
                        <TextField
                            name={'Email'}
                            required={true}
                            placeHolder={'ex: abc@gmail.com'}
                            value={email}
                            onChange={(e) => changeHandler(e, 'Email')}
                            onblur={() => blurHandler('Email')}
                            error={emailErr}
                            showHelp={emailMessage}
                        />
                        <TextField
                            name={'Create Password'}
                            required={true}
                            placeHolder={'Enter Password'}
                            strength={true}
                            show={eyeoff}
                            type="password"
                            error={pwdErr}
                            value={password}
                            onChange={(e) =>
                                changeHandler(e, 'Create Password')
                            }
                            onblur={() => blurHandler('Create Password')}
                            innerSufIcon={
                                eyeoff ? (
                                    <Eye
                                        color="rgb(112, 116, 126)"
                                        size={24}
                                        onClick={() =>
                                            setState({
                                                ...state,
                                                eyeoff: !eyeoff,
                                            })
                                        }
                                    />
                                ) : (
                                    <EyeOff
                                        color="rgb(112, 116, 126)"
                                        size={24}
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
                            name={'Confirm Password'}
                            required={true}
                            placeHolder={'Confirm Password'}
                            value={confirmPassword}
                            onChange={(e) =>
                                changeHandler(e, 'Confirm Password')
                            }
                            error={confirmPwdErr}
                            showHelp={confirmMessage}
                            type="password"
                        />
                        <FlexLayout
                            valign="center"
                            spacing="extraTight"
                            halign="start">
                            <CheckBox
                                labelVal={AgreeTnc}
                                checked={checkField}
                                onClick={checkHandler}
                            />
                            <Button
                                type="TextButton"
                                content="Read Our Policies"
                            />
                        </FlexLayout>
                        <hr />
                        <Button
                            length="fullBtn"
                            disable={checksAllCond()}
                            loading={loading}
                            onClick={createHandler}>
                            Create Account
                        </Button>
                    </FormElement>
                    {/* rendering of otp modal */}
                    {otpModal ? (
                        <OtpPage
                            otpModal={otpModal}
                            openModal={openModal}
                            getMail={getMail}
                            emailResponse={emailResponse}
                            email={email}
                            setAccountCreate={setAccountCreate}
                            createUser={createUser}
                        />
                    ) : (
                        <></>
                    )}
                </>
            )}
        </>
    );
};

export default DI(RegisterPage, { func: { syncConnectorInfo } });
