import {
    BodyLayout,
    Button,
    FlexLayout,
    NewSidebar,
    Notification,
    Popover,
    TextStyles,
    Topbar,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
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
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import CampaignPage from './CampaignPage/CampaignPage';
import ProductPage from './ProductPage/ProductPage';
import SettingsPage from './SettingPage/SettingsPage';
import NotificationPage from './NotificationPage/NotificationPage';
import { APP_TARGET_NAME, urlFetchCalls } from '../../Constant';
import { dateFormat } from '../CommonFunctions';
import HelpPage from './HelpPage/HelpPage';
import FAQPage from './FAQPage/FAQPage';

const Panel = (_props: PropsI) => {
    let navigate = useNavigate();
    const {
        get: { getNotifications },
        post: { faqGetData },
    } = urlFetchCalls;
    const {
        di: { GET, POST },
        location,
        error,
    } = _props;
    const menu = [
        {
            id: 'dashboard',
            content: 'Dashboard',
            icon: <Home size={20} color="#3B424F" />,
            path: 'dashboard',
        },
        {
            id: 'productlist',
            content: 'Product List',
            icon: <Box size={20} color="#3B424F" />,
            path: 'product',
        },
        {
            id: 'settings',
            content: 'Settings',
            icon: <Settings size={20} color="#3B424F" />,
            path: 'settings',
        },
        {
            id: 'help',
            content: 'Help',
            icon: <LifeBuoy size={20} color="#3B424F" />,
            path: 'help',
        },
        {
            id: 'faq',
            content: 'FAQ',
            icon: <HelpCircle color="#3B424F" size={20} />,
            path: 'faq',
        },
        {
            id: 'logout',
            content: 'Logout',
            icon: <LogOut size={20} color="#3B424F" />,
            path: '/logout',
            extraClass: 'logout__style',
        },
    ];

    const [panel, setPanel] = useState({
        notification_popUp: false,
        notifications: [],
        notification_activePage: 1,
        notification_count: 10,
        total_notification: 0,
    });

    const {
        notification_popUp,
        notification_activePage,
        notification_count,
        notifications,
        total_notification,
    } = panel;

    const [faq, setFaq] = useState<any>({
        faqData: {},
        dataLoading: false,
        helpFaqData: [],
        faqs: [],
        btnLoading: false,
        searchValue: '',
        searchedData: [],
        renderSearcedData: {},
        showSearch: false,
    });

    useEffect(() => {
        getAllNotifications(notification_activePage, notification_count);
        let path =
            location.pathname.split('/')[3] === 'faq' ||
            location.pathname.split('/')[3] === 'help';
        if (path === true) {
            setFaq({
                ...faq,
                dataLoading: true,
                faqData: {},
                faqs: {},
                helpFaqData: [],
            });
            POST(faqGetData, { marketplace: APP_TARGET_NAME, limit: 5 }).then(
                (res) => {
                    faq.dataLoading = false;
                    if (res.success) {
                        faq.faqData = res.data;
                        faq.dataLoading = false;
                    } else {
                        error(res.message);
                    }
                    setFaq({
                        ...faq,
                    });
                }
            );
        }
    }, [location]);

    const getAllNotifications = (activePage: any, count: any) => {
        setPanel({ ...panel, notifications: [] });
        GET(getNotifications, {
            activePage: activePage,
            count: count,
        }).then((res) => {
            if (res.success) {
                panel.notifications = res.data.rows;
                panel.total_notification = res.data.count;
            }
            setPanel({ ...panel });
        });
    };
    const openNotificationPopover = () => {
        panel.notification_popUp = !panel.notification_popUp;
        setPanel({ ...panel });
    };
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
                                    <div className="popover--height">
                                        <Popover
                                            activator={
                                                <Button
                                                    type="Outlined"
                                                    icon={
                                                        <Bell size={'16px'} />
                                                    }
                                                    onClick={
                                                        openNotificationPopover
                                                    }
                                                />
                                            }
                                            open={notification_popUp}
                                            onClose={openNotificationPopover}
                                            popoverContainer="element"
                                            popoverWidth={300}>
                                            {notifications.length > 0 &&
                                                [
                                                    notifications[0],
                                                    notifications[1],
                                                    notifications[2],
                                                ].map((ele: any) => {
                                                    return (
                                                        <Notification
                                                            key={ele.title}
                                                            children={
                                                                <TextStyles
                                                                    content={
                                                                        ele
                                                                            .message
                                                                            .length >
                                                                        30
                                                                            ? `${ele.message.substring(
                                                                                  0,
                                                                                  30
                                                                              )}...`
                                                                            : ele.message
                                                                    }
                                                                    type="Paragraph"
                                                                    paragraphTypes="MD-1.4"
                                                                    fontweight="normal"
                                                                />
                                                            }
                                                            destroy={false}
                                                            type="danger"
                                                            subdesciption={dateFormat(
                                                                ele.created_at
                                                            )}
                                                        />
                                                    );
                                                })}
                                            <hr />
                                            <Button
                                                type="Plain"
                                                icon={<ArrowRight />}
                                                content="View all Notifications"
                                                iconAlign="left"
                                                onClick={() => {
                                                    navigate('notification');
                                                    openNotificationPopover();
                                                }}
                                            />
                                        </Popover>
                                    </div>
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
                    <Route path="dashboard/*" element={<Dashboard />} />
                    <Route path="dashboard/create" element={<CampaignPage />} />
                    <Route path="product" element={<ProductPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route
                        path="notification"
                        element={
                            <NotificationPage
                                panel={panel}
                                setPanel={setPanel}
                                getAllNotifications={getAllNotifications}
                            />
                        }
                    />
                    <Route
                        path="help"
                        element={
                            <HelpPage
                                menu={menu}
                                changeHandler={changeHandler}
                                faq={faq}
                                setFaq={setFaq}
                            />
                        }
                    />
                    <Route
                        path="faq"
                        element={<FAQPage faq={faq} setFaq={setFaq} />}
                    />
                </Route>
            </Routes>
        </>
    );
};

export default DI(Panel);
