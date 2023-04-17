import { Alert, Button, FormElement, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'react-feather';

const RegisterRedirectPage = () => {
    let [sec, setSec] = useState(5);
    let timeRef = useRef<any>();
    useEffect(() => {
        clearInterval(timeRef.current);
        timeRef.current = setInterval(timer, 1000);
    }, [sec]);
    const timer = () => {
        if (sec > 0) {
            sec--;
            setSec(sec);
        }
    };
    return (
        <FormElement>
            <Alert type="success" destroy={false}>
                Your email has been successfully verified. Account creation is
                in progress.
            </Alert>
            <hr></hr>
            <Button
                icon={<ArrowRight size={20} />}
                type="Plain"
                // onClick={() => _props.history(loginPage)}
            >
                Proceed to Account Connection
            </Button>
            <TextStyles content={`Redirecting in ${sec} seconds.`} />
        </FormElement>
    );
};

export default RegisterRedirectPage;
