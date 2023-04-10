import { Alert, Button, FormElement } from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../../../Core';
import { ArrowLeft } from 'react-feather';
import { urlFetchCalls } from '../../../Constant';
function ResetPasswordAlert(_props: DIProps) {
    const {
        redirect: { loginPage },
    } = urlFetchCalls;
    return (
        <FormElement>
            <Alert
                type="success"
                desciption="Check your email to reset password."
                destroy={false}>
                Reset password link generated!
            </Alert>
            <hr></hr>
            <Button
                icon={<ArrowLeft size={20} />}
                type="Plain"
                onClick={() => _props.history(loginPage)}>
                Back to Login
            </Button>
        </FormElement>
    );
}

export default DI(ResetPasswordAlert);
