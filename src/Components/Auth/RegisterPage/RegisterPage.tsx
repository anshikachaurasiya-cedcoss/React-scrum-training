import {
    Button,
    CheckBox,
    FlexLayout,
    FormElement,
    Modal,
    TextField,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { DI } from '../../../Core/DependencyInjection';
import { PropsI } from 'src/Core/@types';
import { regexValidation, urlFetchCalls } from '../../../Constant';
import CustomHelpPoints from '../../CustomHelpPoints';
import { RegistrationPage } from '../StaticMessages';
import OtpPage from '../OtpPage/OtpPage';

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

    const [otpModal, setOtpModal] = useState(false);

    useEffect(() => {
        let auth_token = _props.di.globalState.get('auth_token', true);
        if (auth_token) {
            _props.di.globalState.set('auth_token', auth_token);
        }
    }, []);

    const [errorValidation, setErrorValidation] = useState({
        brand: { error: false, showError: false, message: '' },
        email: { error: false, showError: false, message: '' },
        password: { error: false, showError: false, message: '' },
        confirmPassword: { error: false, showError: false, message: '' },
    });

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

    let {
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
        const {
            post: { emailExistsCheck },
        } = urlFetchCalls;

        _props.di
            .POST(emailExistsCheck, { data: { email: email } })
            .then((res) => {
                state.loading = false;
                if (res.success) {
                    openModal();
                } else {
                    _props.error(res.message);
                }
                setState({ ...state });
            });
    };

    const openModal = () => {
        setOtpModal(!otpModal);
    };
    return (
        <>
            <FormElement>
                <TextField
                    name={'Store / Brand Name'}
                    required={true}
                    placeHolder={'Enter Store / Brand Name'}
                    value={brandName}
                    error={brandErr}
                    showHelp={brandMessage}
                    onChange={(e) => changeHandler(e, 'Store / Brand Name')}
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
                    onChange={(e) => changeHandler(e, 'Create Password')}
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
                    onChange={(e) => changeHandler(e, 'Confirm Password')}
                    error={confirmPwdErr}
                    showHelp={confirmMessage}
                    type="password"
                />
                <FlexLayout valign="center" spacing="extraTight" halign="start">
                    <CheckBox
                        labelVal={AgreeTnc}
                        checked={checkField}
                        onClick={checkHandler}
                    />
                    <Button type="TextButton" content="Read Our Policies" />
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
            {otpModal ? (
                <OtpPage otpModal={otpModal} openModal={openModal} />
            ) : (
                <></>
            )}
        </>
    );
};

export default DI(RegisterPage);
