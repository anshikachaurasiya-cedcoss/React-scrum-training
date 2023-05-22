import {
    BodyLayout,
    Button,
    Modal,
    NewSidebar,
    Notification,
    Popover,
    Skeleton,
    TextStyles,
    Topbar,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import {
    ArrowRight,
    Bell,
    Box,
    HelpCircle,
    Home,
    LifeBuoy,
    LogOut,
    Settings,
} from 'react-feather';
import { DI, DIProps } from '../../Core/DependencyInjection';
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
import { environment } from '../../environments/environment';

const Panel = (_props: DIProps) => {
    let navigate = useNavigate();
    const {
        get: { getNotifications, queuedTaskUrl },
        post: { faqGetData, productImport },
    } = urlFetchCalls;
    const {
        di: {
            GET,
            POST,
            globalState: { get },
        },
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
            path: '/auth',
            extraClass: 'logout__style',
        },
    ];

    const [panel, setPanel] = useState<any>({
        notification_popUp: false,
        notifications: [],
        notification_activePage: 1,
        notification_count: 10,
        total_notification: 0,
        notify: false,
        syncProductData: [],
        logoutModal: false,
        popOverNotifications: [],
        apiLoading: false,
        syncModal: false,
    });

    const {
        notification_popUp,
        notification_activePage,
        notification_count,
        notifications,
        notify,
        syncProductData,
        logoutModal,
        popOverNotifications,
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

    useEffect(() => {
        webSocket();
        syncProducts();
    }, []);
    const webSocket = () => {
        let ws = new WebSocket(
            'wss://a5zls8ce93.execute-api.us-east-2.amazonaws.com/beta'
        );
        ws.onopen = function () {
            // just after opening connection its required to send identity to server
            ws.send(
                '{ "action": "identity","client_id":' +
                    process.env.CLIENT_ID +
                    ',"customer_id":"' +
                    _props.redux.user_id +
                    '","token":"' +
                    get('auth_token') +
                    '"}'
            );
        };
        ws.onmessage = function (evt) {
            let received_msg = evt.data;
            if (
                JSON.parse(received_msg).new_notification &&
                JSON.parse(received_msg).new_notification === true
            ) {
                setPanel((prev: any) => {
                    return { ...prev, notify: true };
                });
            }
            return getAllNotifications(
                notification_activePage,
                notification_count
            );
        };
        ws.onclose = function () {
            // websocket is closed.
            webSocket();
        };
    };

    const getAllNotifications = (activePage: any, count: any) => {
        GET(getNotifications, {
            activePage: activePage,
            count: count,
        }).then((res) => {
            if (res.success) {
                if (activePage === 1) {
                    setPanel((prev: any) => {
                        prev.popOverNotifications = res.data.rows;
                        return { ...prev };
                    });
                }
                setPanel((prev: any) => {
                    prev.notification_activePage = activePage;
                    prev.notification_count = count;
                    prev.notifications = res.data.rows;
                    prev.total_notification = res.data.count;
                    return { ...prev };
                });
            }
        });
    };
    const openNotificationPopover = () => {
        panel.notification_popUp = !panel.notification_popUp;
        setPanel({ ...panel, notify: false });
    };
    const changeHandler = (e: any) => {
        if (e.path !== '/auth') {
            navigate(`${e.path}`);
        } else {
            setPanel({ ...panel, logoutModal: true });
        }
    };
    const synced: any = {
        completed: {
            color: 'success',
            message: 'Products successfully uploaded.',
            heading: 'Uploaded Completed',
            product_code: 'product_upload',
            open: true,
        },
        variants_delete: {
            color: 'info',
            message: 'Please wait while the import is in progress.',
            heading: 'Take a break!!',
            product_code: 'variants_delete',
            open: true,
        },
        product_import: {
            color: 'info',
            message: 'Product uploading!',
            heading: 'Take a break. Your Product uploading! is in progress ',
            product_code: 'product_import',
            open: true,
        },
    };

    const syncProducts = () => {
        setPanel((prev: any) => {
            prev.apiLoading = true;
            return { ...prev };
        });
        GET(queuedTaskUrl).then((res) => {
            panel.apiLoading = false;
            panel.syncModal = false;
            if (res.success) {
                if (res.data.rows.length > 0) {
                    res.data.rows.forEach((ele: any) => {
                        if (
                            ele.process_code === 'product_upload' &&
                            ele.message === 'Products successfully uploaded.'
                        ) {
                            panel.syncProductData = synced.completed;
                        } else if (
                            (ele.process_code === 'product_import' &&
                                ele.message ===
                                    "Just a moment! We're retrieving your products from the source catalog. We'll let you know once it's done.") ||
                            (ele.process_code === 'product_upload' &&
                                ele.message ===
                                    'Take a break. Your product upload is in progress.')
                        ) {
                            panel.syncProductData = synced.product_import;
                        } else if (
                            ele.process_code === 'variants_delete' &&
                            ele.message ===
                                'Please wait while the import is in progress.'
                        ) {
                            panel.syncProductData = synced.variants_delete;
                        }
                        setPanel({ ...panel });
                    });
                }
            } else {
                let params = {
                    source: {
                        marketplace: _props.redux.current?.source.marketplace,
                        shopId: _props.redux.current?.source._id,
                        data: {
                            filter_condition: 'or',
                            filter_options: {
                                isPrimeIntended: true,
                                is_tester_account: true,
                            },
                        },
                    },
                    target: {
                        marketplace: _props.redux.current?.target.marketplace,
                        shopId: _props.redux.current?.target._id,
                    },
                };
                POST(productImport, params).then((res) => {});
            }
        });
    };

    const getImport = () => {};

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
                                                <div className="notify__alert">
                                                    {notify === true ? (
                                                        <div className="notification--dot" />
                                                    ) : (
                                                        ''
                                                    )}
                                                    <Button
                                                        type="Outlined"
                                                        icon={
                                                            <Bell
                                                                size={'16px'}
                                                            />
                                                        }
                                                        onClick={
                                                            openNotificationPopover
                                                        }
                                                    />
                                                </div>
                                            }
                                            open={notification_popUp}
                                            onClose={openNotificationPopover}
                                            popoverContainer="element"
                                            popoverWidth={300}>
                                            {popOverNotifications.length ===
                                            0 ? (
                                                <Skeleton line={3} />
                                            ) : (
                                                popOverNotifications.length >
                                                    0 &&
                                                [
                                                    popOverNotifications[0],
                                                    popOverNotifications[1],
                                                    popOverNotifications[2],
                                                ].map((ele: any) => {
                                                    return (
                                                        <Notification
                                                            key={ele.title}
                                                            children={
                                                                <TextStyles
                                                                    utility="ellipses--text"
                                                                    content={
                                                                        ele.message
                                                                    }
                                                                    type="Paragraph"
                                                                    paragraphTypes="MD-1.4"
                                                                    fontweight="normal"
                                                                />
                                                            }
                                                            destroy={false}
                                                            type={
                                                                ele.severity ===
                                                                'error'
                                                                    ? 'danger'
                                                                    : ele.severity
                                                            }
                                                            subdesciption={dateFormat(
                                                                ele.created_at
                                                            )}
                                                        />
                                                    );
                                                })
                                            )}
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
                    <Route
                        path="product"
                        element={
                            <ProductPage
                                syncProducts={syncProducts}
                                panel={panel}
                                setPanel={setPanel}
                            />
                        }
                    />
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
            <Modal
                heading="Logging Out"
                open={logoutModal}
                primaryAction={{
                    content: 'LogOut',
                    type: 'Primary',
                    onClick: () => {
                        sessionStorage.clear();
                        navigate('/auth');
                    },
                }}
                secondaryAction={{
                    content: 'Cancel',
                    type: 'Outlined',
                    onClick: () => {
                        setPanel({ ...panel, logoutModal: false });
                    },
                }}
                close={() => {
                    setPanel({ ...panel, logoutModal: false });
                }}>
                Are you sure you want to logout? You can always log back in
                later.
            </Modal>
        </>
    );
};

export default DI(Panel);
