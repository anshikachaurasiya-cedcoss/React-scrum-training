import { PageHeader, Tabs } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { Key, Lock, User, Settings } from 'react-feather';
import AccountSettings from './AccountSettings';
import GeneralSettings from './GeneralSettings';
import PasswordSettings from './PasswordSettings';
import './SettingsPage.css';
import PrivacySettings from './PrivacySettings';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';

const SettingsPage = (_props: DIProps) => {
    const {
        get: { initCampaignUrl },
    } = urlFetchCalls;
    const settingsArr = [
        {
            icon: <User />,
            content: 'Accounts',
            id: 'Accounts ',
        },
        {
            icon: <Key />,
            content: 'Password ',
            id: 'Password',
        },
        {
            icon: <Settings />,
            content: 'General Details',
            id: 'General Details',
        },
        {
            icon: <Lock />,
            content: 'Privacy Settings',
            id: 'Privacy Settings',
        },
    ];
    const [tab, setTab] = useState({
        selectedTab: settingsArr[0].id,
        showComponent: settingsArr[0].id,
    });
    const { selectedTab, showComponent } = tab;
    const changeTab = (id: any) => {
        settingsArr.forEach((ele: any) => {
            if (ele.id === id) {
                setTab({ ...tab, selectedTab: id, showComponent: id });
            }
        });
    };
    return (
        <>
            <PageHeader title="Settings" />
            <Tabs
                selected={selectedTab}
                value={settingsArr}
                alignment="vertical"
                onChange={(id: any) => changeTab(id)}>
                {showComponent === settingsArr[0].id && <AccountSettings />}
                {showComponent === settingsArr[1].id && <PasswordSettings />}
                {showComponent === settingsArr[2].id && <GeneralSettings />}
                {showComponent === settingsArr[3].id && <PrivacySettings />}
            </Tabs>
        </>
    );
};

export default DI(SettingsPage);
