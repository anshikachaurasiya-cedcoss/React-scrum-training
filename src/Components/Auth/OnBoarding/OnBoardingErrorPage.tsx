import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { parseJwt } from '../../../Core';
import { DI, DIProps } from '../../../Core/DependencyInjection';

interface PropsI extends DIProps {
    registerError: () => void;
    errorModal: boolean;
    fbResponse: any;
    openModalFunc: () => void;
}

const OnBoardingErrorPage = (_props: PropsI) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let val = searchParams.get('success');
        if (val) {
            let token = localStorage.getItem('user_token');
            if (token) {
                navigate(
                    `/panel/${
                        parseJwt(token).user_id
                    }/dashboard?success=${false}&message=${'failed to connect with fb'}`
                );
            } else {
                navigate('/auth/login');
            }
        }
    }, []);

    return <></>;
};

export default DI(OnBoardingErrorPage);
