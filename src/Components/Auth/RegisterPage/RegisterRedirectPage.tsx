import { Alert, Button, FormElement, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { DI, DIProps } from '../../../Core/DependencyInjection';

interface RegisterProps extends DIProps {
    registerResponse: any;
}

const RegisterRedirectPage = (_props: RegisterProps) => {
    let navigate = useNavigate();
    let [sec, setSec] = useState(5);
    let timeRef = useRef<any>();

    const {
        redux: { user_id },
    } = _props;

    useEffect(() => {
        clearInterval(timeRef.current);
        timeRef.current = setInterval(timer, 1000);
        if (sec === 0) {
            navigate(`/panel/${user_id}/dashboard`);
        }
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
                onClick={() => navigate(`/panel/${user_id}/dashboard`)}>
                Proceed to Account Connection
            </Button>
            <TextStyles content={`Redirecting in ${sec} seconds.`} />
        </FormElement>
    );
};

export default DI(RegisterRedirectPage);
