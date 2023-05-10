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
import './Panel.css';
import {
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import CampaignPage from './CampaignPage/CampaignPage';
import ProductPage from './ProductPage/ProductPage';
import SettingsPage from './SettingPage/SettingsPage';

const Panel = (_props: PropsI) => {
    let navigate = useNavigate();
    const location = useLocation();
    const menu = [
        {
            id: 'dashboard',
            content: 'Dashboard',
            icon: <Home />,
            path: 'dashboard',
        },
        {
            id: 'productlist',
            content: 'Product List',
            icon: <Box />,
            path: 'product',
        },
        {
            id: 'settings',
            content: 'Settings',
            icon: <Settings />,
            path: 'settings',
        },
        {
            id: 'help',
            content: 'Help',
            icon: <LifeBuoy />,
            path: 'help',
        },
        {
            id: 'faq',
            content: 'FAQ',
            icon: <HelpCircle />,
            path: 'faq',
        },
    ];

    const submenus = [
        { id: 'logout', content: 'Logout', icon: <LogOut />, path: '/logout' },
    ];

    const changeHandler = (e: any) => {
        navigate(`${e.path}`);
    };

    return (
        <>
            <Routes>
                <Route
                    path="*"
                    element={
                        <>
                            <Topbar
                                connectRight={
                                    <Button
                                        type="Outlined"
                                        icon={<Bell size={'16px'} />}
                                    />
                                }
                            />
                            <NewSidebar
                                logo={<Cedcommerce />}
                                mobileLogo={<MobileLogo />}
                                menu={menu}
                                path={
                                    location.pathname.split('/')[3] ===
                                    'campaign'
                                        ? 'dashboard'
                                        : location.pathname.split('/')[3]
                                }
                                onChange={(e: any) => changeHandler(e)}
                            />
                            <BodyLayout>
                                <Outlet />
                                <Footer />
                            </BodyLayout>
                        </>
                    }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="product" element={<ProductPage />} />
                    <Route path="campaign" element={<CampaignPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default DI(Panel);
