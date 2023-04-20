import { Loader } from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { parseJwt } from '../../../Core';

const OnBoardingSuccessPage = () => {
    let [sec, setSec] = useState(3);
    let timeRef = useRef<any>();
    let [loaderPercentage, setLoaderPercentage] = useState(33.3);
    let [searchParams] = useSearchParams();
    let navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('user_token');
        if (token) {
            let id = parseJwt(token).user_id;
            navigate(`/panel/${id}/dashboard`);
        }
    }, []);

    useEffect(() => {
        timeRef.current = setInterval(() => {
            if (sec > 0) {
                sec--;
                setSec(sec);
                loaderPercentage = loaderPercentage + 33.3;
                setLoaderPercentage(loaderPercentage);
            }
            if (sec === 0) {
            }
        }, 1000);
        return () => {
            clearInterval(timeRef.current);
        };
    }, [sec]);

    return (
        <Loader
            type="Loader3"
            percentage={loaderPercentage}
            title="You are all set!"
            subtitle="Prepping your Dashboard"
        />
    );
};

export default OnBoardingSuccessPage;
