import {
    Button,
    Card,
    FlexLayout,
    Notification,
    PageHeader,
    Pagination,
    Skeleton,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../../../Core';
import './NotificationPage.css';
import { pageArr } from '../../../Components/ConstantArrays';
import { dateFormat } from '../../../Components/CommonFunctions';

interface notificationProps extends DIProps {
    panel: {
        notification_popUp: boolean;
        notifications: never[];
        notification_activePage: number;
        notification_count: number;
        total_notification: number;
    };
    setPanel: React.Dispatch<
        React.SetStateAction<{
            notification_popUp: boolean;
            notifications: never[];
            notification_activePage: number;
            notification_count: number;
            total_notification: number;
        }>
    >;
    getAllNotifications: (activePage: any, count: any) => void;
}
const NotificationPage = (_props: notificationProps) => {
    const { panel, setPanel, getAllNotifications } = _props;
    const {
        notification_activePage,
        notification_count,
        notifications,
        total_notification,
    } = panel;
    const ShowMessage = (item: any) => {
        let btn: any;
        let design: any;
        if (item.severity === 'success') {
            item.message.split('<br/>').forEach((ele: any) => {
                if (ele.includes('Click here')) {
                    btn = <Button type="TextButton" content={ele} />;
                }
            });
            design = (
                <FlexLayout spacing="extraTight" direction="vertical">
                    <TextStyles content={item.message.split('<br/>')[0]} />
                    <TextStyles content={item.message.split('<br/>')[1]} />
                    {btn}
                </FlexLayout>
            );
            return design;
        } else {
            return item.message;
        }
    };
    return (
        <>
            <PageHeader title="Notifications" />
            <Card>
                {notifications.length > 0 ? (
                    <FlexLayout direction="vertical" spacing="loose">
                        {notifications.map((item: any) => {
                            return (
                                <>
                                    <Notification
                                        type={
                                            item.severity === 'error'
                                                ? 'danger'
                                                : item.severity
                                        }
                                        destroy={false}
                                        children={
                                            <TextStyles
                                                content={ShowMessage(item)}
                                            />
                                        }
                                        subdesciption={
                                            <TextStyles
                                                content={
                                                    <TextStyles
                                                        type="Paragraph"
                                                        paragraphTypes="XS-1.2"
                                                        utility="light--text"
                                                        content={dateFormat(
                                                            item.created_at
                                                        )}
                                                    />
                                                }
                                                utility="notification_subdescription"
                                            />
                                        }
                                    />
                                    <hr />
                                </>
                            );
                        })}
                        <Pagination
                            totalitem={total_notification}
                            countPerPage={notification_count}
                            currentPage={notification_activePage}
                            onCountChange={(val: any) => {
                                panel.notification_count = val;
                                setPanel({ ...panel });
                                getAllNotifications(
                                    panel.notification_activePage,
                                    val
                                );
                            }}
                            onEnter={(page) => {
                                panel.notification_activePage = Number(page);
                                setPanel({ ...panel });
                                getAllNotifications(
                                    page,
                                    panel.notification_count
                                );
                            }}
                            onNext={() => {
                                panel.notification_activePage =
                                    panel.notification_activePage + 1;
                                setPanel({
                                    ...panel,
                                });
                                getAllNotifications(
                                    panel.notification_activePage,
                                    panel.notification_count
                                );
                            }}
                            onPrevious={() => {
                                panel.notification_activePage =
                                    panel.notification_activePage - 1;
                                setPanel({
                                    ...panel,
                                });
                                getAllNotifications(
                                    panel.notification_activePage,
                                    panel.notification_count
                                );
                            }}
                            optionPerPage={pageArr}
                        />
                    </FlexLayout>
                ) : (
                    <Skeleton line={notification_count} />
                )}
            </Card>
        </>
    );
};

export default DI(NotificationPage);
