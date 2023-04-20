import { Alert, TextLink, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../../Core';
import { DI, DIProps } from '../../../Core/DependencyInjection';
import OnBoardingErrorModal from './OnBoardingErrorModal';

interface PropsI extends DIProps {
    registerError: () => void;
    errorModal: boolean;
    fbResponse: any;
    openModalFunc: () => void;
}

const OnBoardingErrorPage = (_props: PropsI) => {
    const { registerError, errorModal, fbResponse, openModalFunc } = _props;
    let navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('user_token');
        if (token) {
            navigate(`/panel/${parseJwt(token).user_id}/dashboard`);
        }
    }, []);

    return (
        <>
            <Alert
                destroy={false}
                type="danger"
                desciption={
                    <TextLink
                        onClick={registerError}
                        label="Wondering what went wrong?"
                        extraClass="link--style"
                    />
                }
                children={
                    <TextStyles
                        content="Unable to connect your account. Please try again."
                        textcolor="dark"
                        type="Paragraph"
                        paragraphTypes="MD-1.4"
                    />
                }
            />
            {errorModal ? (
                <OnBoardingErrorModal
                    fbResponse={fbResponse}
                    errorModal={errorModal}
                    openModalFunc={openModalFunc}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default DI(OnBoardingErrorPage);
