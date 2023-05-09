import { Card, FlexLayout, TextField } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import CustomHelpPoints from '../../CustomHelpPoints';
import './SettingsPage.css';

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
        type: 'password';
    };
}

const PasswordSettings = () => {
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
            type: 'password',
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

    const changeHandler = (val: string, e: any) => {
        if (val === current_pwd_name) {
            password.current_pwd.value = e;
        } else if (val === new_pwd_name) {
            password.new_pwd.value = e;
        } else {
            password.confirm_pwd.value = e;
        }
        setPassword({ ...password });
    };
    return (
        <Card
            title="Password Reset"
            primaryAction={{
                type: 'Primary',
                content: 'Save New Password',
            }}>
            <FlexLayout direction="vertical" spacing="tight">
                <TextField
                    show={current_pwd_error}
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
                    show={new_pwd_error}
                    placeHolder={new_pwd_placeholder}
                    type={new_pwd_type}
                    name={new_pwd_name}
                    onChange={(e) => changeHandler(new_pwd_name, e)}
                    value={new_pwd_value}
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
                    show={confirm_pwd_error}
                    placeHolder={confirm_placeholder}
                    name={confirm_name}
                    value={confirm_value}
                    onChange={(e) => changeHandler(confirm_name, e)}
                />
            </FlexLayout>
        </Card>
    );
};

export default PasswordSettings;
