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
        get: { initCampaignUrl, getDisconnectedAccountUrl },
        post: { getConfigUrl },
    } = urlFetchCalls;
    const {
        di: { GET, POST },
        redux: { current },
        error,
    } = _props;
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
    const [general, setGeneral] = useState({
        store_url: '',
        brand: '',
        editModal: false,
        brandValue: '',
        brandError: false,
        btnLoading: false,
    });
    const [account, setAccount] = useState({
        disconnected: [],
        modal: false,
        pixelData: [],
        selectedPixel: '',
        primaryBtnDisable: true,
        pixels: '',
        btnLoading: false,
        updateModal: false,
    });
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
    useEffect(() => {
        getDisconnected();
        getinit();
        getConfig();
    }, []);

    const getinit = () => {
        GET(initCampaignUrl, { shop_id: current?.target._id }).then((res) => {
            if (res.success) {
                general.store_url = res.data.website_url;
            } else {
                error(res.message);
            }
            setGeneral({ ...general });
        });
    };

    const getConfig = () => {
        let params = {
            group_code: ['bwp-product'],
            key: 'brand',
            source: { shopId: current?.source._id, marketplace: 'onyx' },
        };
        POST(getConfigUrl, params).then((res) => {
            if (res.success) {
                general.brand = res.data[0].value.brand;
                general.brandValue = res.data[0].value.brand;
                setGeneral({ ...general });
            }
        });
    };

    const getDisconnected = () => {
        GET(getDisconnectedAccountUrl, { shop_id: current?.target._id }).then(
            (res) => {
                if (res.success) {
                    account.disconnected = res.data;
                    setAccount({ ...account });
                } else {
                    error(res.message);
                }
            }
        );
    };

    return (
        <>
            <PageHeader title="Settings" />
            <Tabs
                selected={selectedTab}
                value={settingsArr}
                alignment="vertical"
                onChange={(id: any) => changeTab(id)}>
                {showComponent === settingsArr[0].id && (
                    <AccountSettings
                        account={account}
                        setAccount={setAccount}
                    />
                )}
                {showComponent === settingsArr[1].id && <PasswordSettings />}
                {showComponent === settingsArr[2].id && (
                    <GeneralSettings
                        general={general}
                        setGeneral={setGeneral}
                        getConfig={getConfig}
                    />
                )}
                {showComponent === settingsArr[3].id && <PrivacySettings />}
            </Tabs>
        </>
    );
};

export default DI(SettingsPage);
