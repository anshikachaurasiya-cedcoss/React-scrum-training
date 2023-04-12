import { Button, Topbar } from '@cedcommerce/ounce-ui';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../Asests/Images/svg/Logo';
import { PropsI } from 'src/Core/@types';
import { DI } from '../../../Core/DependencyInjection';

const Dashboard = (_props: PropsI) => {
    const navigate = useNavigate();
    return (
        <>
            <Topbar
                connectLeft={<Logo />}
                connectRight={
                    <Button
                        type="TextButton"
                        icon={<ArrowLeft />}
                        onClick={() => navigate('/auth/login')}>
                        Back
                    </Button>
                }
            />
        </>
    );
};

export default DI(Dashboard);
