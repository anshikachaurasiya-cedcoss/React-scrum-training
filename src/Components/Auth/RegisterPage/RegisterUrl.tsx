import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreDispatcher } from '../../..';
import { parseJwt, DI } from '../../../Core';

const RegisterUrl = () => {
    const dispatcher = useContext(StoreDispatcher);
    let navigate = useNavigate();

    const [searchParams] = useSearchParams();
    useEffect(() => {
        let val = searchParams.get('user_token');
        if (val) {
            let obj = parseJwt(val);
            sessionStorage.setItem('auth_token', val);
            dispatcher({ type: 'user_id', state: { user_id: obj.user_id } });
            navigate(`/auth/register/${obj.user_id}`);
        }
    }, []);

    return <></>;
};

export default DI(RegisterUrl);
