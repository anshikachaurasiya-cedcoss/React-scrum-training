import { Alert, Button, FormElement } from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../../../Core';
import { ArrowRight } from 'react-feather';
import { urlFetchCalls } from '../../../Constant';

function PasswordCreatedAlert(_props: DIProps) {
    const {
        redirect: { loginPage },
    } = urlFetchCalls;
    return (
        <FormElement>
            <Alert type="success" destroy={false}>
                Password Reset Successful!
            </Alert>
            <hr></hr>
            <Button
                icon={<ArrowRight size={20} />}
                type="Plain"
                onClick={() => _props.history(loginPage)}>
                Login
            </Button>
        </FormElement>
    );
}

export default DI(PasswordCreatedAlert);
