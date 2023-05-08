import { PageHeader, Tabs } from '@cedcommerce/ounce-ui';
import React, { useState } from 'react';
import { Key, Lock, User, Settings } from 'react-feather';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AccountSettings from './AccountSettings';
import GeneralSettings from './GeneralSettings';
import PasswordSettings from './PasswordSettings';
import './SettingsPage.css';

const SettingsPage = () => {
    const settingsArr = [
        {
            icon: <User />,
            content: 'Accounts',
            id: 'Accounts',
            path: 'account_settings',
        },
        {
            icon: <Key />,
            content: 'Password ',
            id: 'Password ',
            path: 'general_settings',
        },
        {
            icon: <Settings />,
            content: 'General Details',
            id: 'General Details',
            path: '',
        },
        {
            icon: <Lock />,
            content: 'Privacy Settings',
            id: 'Privacy Settings',
        },
    ];
    const [tab, setTab] = useState({ selectedTab: settingsArr[0].content });
    const navigate = useNavigate();
    const { selectedTab } = tab;
    const changeTab = (val: any) => {
        tab.selectedTab = val;
        setTab({ ...tab });
        navigate(`${val}`);
    };
    return (
        <Routes>
            <Route
                path="*"
                element={
                    <div className="setting--custom_style">
                        <PageHeader title="Settings" />
                        <Tabs
                            selected={selectedTab}
                            value={settingsArr}
                            alignment="vertical"
                            onChange={(val) => changeTab(val)}>
                            <Outlet />
                        </Tabs>
                    </div>
                }>
                <Route path="account_settings" element={<AccountSettings />} />
                <Route path="general_settings" element={<GeneralSettings />} />
                <Route
                    path="password_settings"
                    element={<PasswordSettings />}
                />
            </Route>
        </Routes>
    );
};

export default SettingsPage;
