import { Card, FlexLayout, TextField } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import CustomHelpPoints from '../../CustomHelpPoints';
import './SettingsPage.css';
import { regexValidation } from '../../../Constant';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';

interface pwdObj {
    current_pwd: {
        value: string;
        name: string;
        eyeOfOn: boolean;
        type:
            | 'password'
            | 'text'
            | 'number'
            | 'url'
            | 'email'
            | 'tel'
            | undefined;
        placeholder: string;
        error: boolean;
    };
    new_pwd: {
        value: string;
        name: string;
        eyeOfOn: boolean;
        type:
            | 'password'
            | 'text'
            | 'number'
            | 'url'
            | 'email'
            | 'tel'
            | undefined;
        placeholder: string;
        error: boolean;
    };
    confirm_pwd: {
        value: string;
        name: string;
        placeholder: string;
        error: boolean;
    };
}

const PasswordSettings = (_props: DIProps) => {
    const {
        post: { resetPassword },
    } = urlFetchCalls;
    const {
        di: { POST },
        redux: { current },
        error,
        success,
    } = _props;
    const { passwordFormat } = regexValidation;
    const [password, setPassword] = useState<pwdObj>({
        current_pwd: {
            value: '',
            name: 'Current Password',
            eyeOfOn: false,
            type: 'password',
            placeholder: 'Enter Old Password',
            error: false,
        },
        new_pwd: {
            value: '',
            name: 'New Password',
            eyeOfOn: false,
            type: 'password',
            placeholder: 'Enter New Password',
            error: false,
        },
        confirm_pwd: {
            value: '',
            name: 'Confirm Password',
            placeholder: 'Confirm New Password',
            error: false,
        },
    });
    const {
        current_pwd: {
            value: current_pwd_value,
            name: current_pwd_name,
            eyeOfOn: current_pwd_eye,
            type: current_pwd_type,
            placeholder: current_pwd_placeholder,
            error: current_pwd_error,
        },
        new_pwd: {
            value: new_pwd_value,
            name: new_pwd_name,
            eyeOfOn: new_pwd_eye,
            type: new_pwd_type,
            placeholder: new_pwd_placeholder,
            error: new_pwd_error,
        },
        confirm_pwd: {
            value: confirm_value,
            name: confirm_name,
            placeholder: confirm_placeholder,
            error: confirm_pwd_error,
        },
    } = password;
    // function handles the input boxes and also check for the validations
    const changeHandler = (val: string, e: any) => {
        if (val === current_pwd_name) {
            if (e === '') {
                password.current_pwd.error = true;
            } else {
                password.current_pwd.error = false;
            }
            password.current_pwd.value = e;
            if (new_pwd_value !== '') {
                oldNewMatch();
            }
        } else if (val === new_pwd_name) {
            if (e === '') {
                password.new_pwd.error = true;
            } else {
                password.new_pwd.error = false;
            }
            password.new_pwd.value = e;
            if (current_pwd_value !== '') {
                oldNewMatch();
            }
            if (confirm_value !== '') {
                checkValidation();
            }
        } else {
            password.confirm_pwd.value = e;
            checkValidation();
        }
        setPassword({ ...password });
    };
    // function checks if the old and new password are same or not
    const oldNewMatch = () => {
        if (password.current_pwd.value === password.new_pwd.value) {
            password.new_pwd.error = true;
        } else {
            password.new_pwd.error = false;
        }
        setPassword({ ...password });
    };
    const checkValidation = () => {
        if (password.new_pwd.value === password.confirm_pwd.value) {
            password.confirm_pwd.error = false;
        } else {
            password.confirm_pwd.error = true;
        }
        setPassword({ ...password });
    };
    // function checks for validation on blur of the input fields
    const blurHandler = (value: string) => {
        if (value === new_pwd_name) {
            if (new_pwd_value.match(passwordFormat)) {
                password.new_pwd.error = false;
            } else {
                password.new_pwd.error = true;
            }
        } else {
            checkValidation();
        }

        setPassword({ ...password });
    };
    // function disables or enables the reset button if any of the input field is not correctly filled or empty
    const disableBtn = () => {
        if (
            current_pwd_value === '' ||
            new_pwd_value === '' ||
            confirm_value === '' ||
            current_pwd_error ||
            new_pwd_error ||
            confirm_pwd_error
        ) {
            return true;
        } else {
            return false;
        }
    };
    // function hits the api for resetting the password
    const reset = () => {
        let params = {
            email: current?.source.email,
            old_password: current_pwd_value,
            new_password: new_pwd_value,
            confirm_password: confirm_value,
        };
        POST(resetPassword, params).then((res) => {
            if (res.success) {
                password.current_pwd.value = '';
                password.new_pwd.value = '';
                password.confirm_pwd.value = '';
                setPassword({ ...password });
                success(res.message);
            } else {
                error(res.message);
            }
        });
    };
    return (
        <Card
            title="Password Reset"
            primaryAction={{
                type: 'Primary',
                content: 'Save New Password',
                disable: disableBtn(),
                onClick: () => reset(),
            }}>
            <FlexLayout direction="vertical" spacing="tight">
                <TextField
                    show={current_pwd_eye}
                    error={current_pwd_error}
                    type={current_pwd_type}
                    name={current_pwd_name}
                    value={current_pwd_value}
                    placeHolder={current_pwd_placeholder}
                    onChange={(e) => changeHandler(current_pwd_name, e)}
                    innerSufIcon={
                        current_pwd_eye ? (
                            <Eye
                                color="#3B424F"
                                size={20}
                                onClick={() => {
                                    password.current_pwd.eyeOfOn =
                                        !password.current_pwd.eyeOfOn;
                                    password.current_pwd.type = 'password';
                                    setPassword({ ...password });
                                }}
                            />
                        ) : (
                            <EyeOff
                                color="#3B424F"
                                size={20}
                                onClick={() => {
                                    password.current_pwd.eyeOfOn =
                                        !password.current_pwd.eyeOfOn;
                                    password.current_pwd.type = 'text';
                                    setPassword({ ...password });
                                }}
                            />
                        )
                    }
                />
                <TextField
                    show={new_pwd_eye}
                    error={new_pwd_error}
                    placeHolder={new_pwd_placeholder}
                    type={new_pwd_type}
                    name={new_pwd_name}
                    onChange={(e) => changeHandler(new_pwd_name, e)}
                    onblur={() => blurHandler(new_pwd_name)}
                    value={new_pwd_value}
                    showHelp={
                        current_pwd_value === new_pwd_value
                            ? 'Your new password cannot be the same as your current password.'
                            : ''
                    }
                    innerSufIcon={
                        new_pwd_eye ? (
                            <Eye
                                color="#3B424F"
                                size={20}
                                onClick={() => {
                                    password.new_pwd.eyeOfOn =
                                        !password.new_pwd.eyeOfOn;
                                    password.new_pwd.type = 'password';
                                    setPassword({ ...password });
                                }}
                            />
                        ) : (
                            <EyeOff
                                color="#3B424F"
                                size={20}
                                onClick={() => {
                                    password.new_pwd.eyeOfOn =
                                        !password.new_pwd.eyeOfOn;
                                    password.new_pwd.type = 'text';
                                    setPassword({ ...password });
                                }}
                            />
                        )
                    }
                />
                <CustomHelpPoints />
                <TextField
                    error={confirm_pwd_error}
                    placeHolder={confirm_placeholder}
                    name={confirm_name}
                    value={confirm_value}
                    onChange={(e) => changeHandler(confirm_name, e)}
                    onblur={() => blurHandler(confirm_name)}
                    showHelp={
                        confirm_pwd_error ? 'Passwords do not match!' : ''
                    }
                    type="password"
                />
            </FlexLayout>
        </Card>
    );
};

export default DI(PasswordSettings);
