import {
    Button,
    FlexLayout,
    FormElement,
    TextField,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const Forget = () => {
    const navigate = useNavigate();
    return (
        <>
            <FormElement>
                <TextField placeHolder="Enter Email" />
                <hr />
                <Button disable length={'fullBtn'}>
                    Generate Link
                </Button>
            </FormElement>
            <br />
            <FlexLayout halign="start">
                <Button
                    type="TextButton"
                    thickness="thin"
                    icon={<ArrowLeft />}
                    onClick={() => navigate('/auth/login')}>
                    Back To Login
                </Button>
            </FlexLayout>
        </>
    );
};

export default Forget;
