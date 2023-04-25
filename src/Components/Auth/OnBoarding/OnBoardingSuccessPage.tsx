import { Loader } from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DI, DIProps } from '../../../Core';

interface PropsI extends DIProps {}

const OnBoardingSuccessPage = (_props: PropsI) => {
    const [sec, setSec] = useState(3);
    let timeRef = useRef<any>();
    const [loaderPercentage, setLoaderPercentage] = useState(33.3);
    let navigate = useNavigate();

    useEffect(() => {
        timeRef.current = setInterval(() => {
            if (sec > 0) {
                setSec((sec) => sec - 1);
                setLoaderPercentage((prev) => prev + 33.3);
            }
            if (sec === 0) {
                navigate(`/panel/${_props.redux.user_id}/dashboard`);
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

export default DI(OnBoardingSuccessPage);
