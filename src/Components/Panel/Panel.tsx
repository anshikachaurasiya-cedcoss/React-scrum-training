import { BodyLayout, Button, NewSidebar, Topbar } from '@cedcommerce/ounce-ui';
import React from 'react';
import {
    Bell,
    Box,
    HelpCircle,
    Home,
    LifeBuoy,
    LogOut,
    Settings,
} from 'react-feather';
import { PropsI } from 'src/Core/@types';
import { DI } from '../../Core/DependencyInjection';
import Cedcommerce from '../../Asests/Images/svg/Cedcommerce';
import MobileLogo from '../../Asests/Images/svg/MobileLogo';
import Dashboard from './Dashboard';
import Footer from '../Footer/Footer';

const Panel = (_props: PropsI) => {
    const menu = [
        {
            id: 'dashboard',
            content: 'Dashboard',
            icon: <Home />,
            path: '/dashboard',
        },
        {
            id: 'productlist',
            content: 'Product List',
            icon: <Box />,
            path: '/productlist',
        },
        {
            id: 'settings',
            content: 'Settings',
            icon: <Settings />,
            path: '/settings',
        },
        {
            id: 'help',
            content: 'Help',
            icon: <LifeBuoy />,
            path: '/help',
        },
        {
            id: 'faq',
            content: 'FAQ',
            icon: <HelpCircle />,
            path: '/faq',
        },
    ];

    const submenu = [
        { id: 'logout', content: 'Logout', icon: <LogOut />, path: '/logout' },
    ];

    return (
        <>
            <Topbar
                connectRight={
                    <Button type="Outlined" icon={<Bell size={'16px'} />} />
                }
            />
            <NewSidebar
                logo={<Cedcommerce />}
                mobileLogo={<MobileLogo />}
                menu={menu}
                subMenu={submenu}
            />
            <BodyLayout>
                <Dashboard />
                <Footer />
            </BodyLayout>
        </>
    );
};

export default DI(Panel);
