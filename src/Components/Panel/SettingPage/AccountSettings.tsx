import {
    Alert,
    Badge,
    Button,
    Card,
    FlexChild,
    FlexLayout,
    Loader,
    Modal,
    Select,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import { syncConnectorInfo } from '../../../Actions';
import React from 'react';
import { Edit, Plus } from 'react-feather';
import FbDisabled from '../../../Asests/Images/svg/FbDisabled';
import FbEnable from '../../../Asests/Images/svg/FbEnable';
import InstaEnable from '../../../Asests/Images/svg/InstaEnable';
import { DI, DIProps, parseJwt } from '../../../Core';
import './SettingsPage.css';
import {
    APP_SOURCE_NAME,
    APP_TARGET_NAME,
    currency,
    timezone,
    urlFetchCalls,
} from '../../../Constant';

interface PropsI extends DIProps {
    syncConnectorInfo: (_props: DIProps) => void;
}

interface accountProps extends PropsI {
    account: {
        disconnected: never[];
        modal: boolean;
        pixelData: never[];
        selectedPixel: string;
        primaryBtnDisable: boolean;
        pixels: string;
        btnLoading: boolean;
        updateModal: boolean;
        accountModal: boolean;
    };
    setAccount: React.Dispatch<
        React.SetStateAction<{
            disconnected: never[];
            modal: boolean;
            pixelData: never[];
            selectedPixel: string;
            primaryBtnDisable: boolean;
            pixels: string;
            btnLoading: boolean;
            updateModal: boolean;
        }>
    >;
}

const AccountSettings = (_props: accountProps) => {
    const {
        di: {
            GET,
            POST,
            globalState: { get },
        },
        error,
        success,
        redux: { current },
        syncConnectorInfo,
        account,
        setAccount,
    } = _props;

    const {
        get: { getPixelsUrl, installtionForm },
        post: { updatePixelUrl },
    } = urlFetchCalls;

    const {
        disconnected,
        modal,
        pixelData,
        selectedPixel,
        primaryBtnDisable,
        pixels,
        btnLoading,
        updateModal,
        accountModal,
    } = account;

    const openModal = (temp: string) => {
        if (temp === 'Edit Pixel') {
            account.modal = !account.modal;
        } else if (temp === 'Connect New Account') {
            account.accountModal = !account.accountModal;
        } else if (temp === 'Update Account') {
            account.updateModal = !account.updateModal;
        }
        setAccount({
            ...account,
            pixelData: [],
            primaryBtnDisable: true,
        });
    };

    const editPixel = () => {
        GET(getPixelsUrl, { shop_id: current?.target._id }).then((res) => {
            if (res.success) {
                let response = res.data.map((ele: any) => {
                    let obj = { ...ele };
                    let newObj = {
                        label: `${ele.name} - (${ele.id})`,
                        value: `${ele.name} - (${ele.id})`,
                    };
                    return Object.assign(obj, newObj);
                });
                let index = res.data.findIndex(
                    (ele: any) => ele.id === current?.target.data.pixel_id
                );
                account.selectedPixel = response[index].value;
                account.pixelData = response;
                setAccount({ ...account });
            }
        });
        openModal('Edit Pixel');
    };
    const selectHandler = (value: any, obj: any) => {
        setAccount({
            ...account,
            primaryBtnDisable: false,
            selectedPixel: obj.value,
            pixels: obj.id,
        });
    };
    const savePixel = () => {
        setAccount({ ...account, btnLoading: true });
        let data = {
            shop_id: current?.target._id,
            pixel: pixels,
        };
        POST(updatePixelUrl, data).then((res) => {
            account.btnLoading = false;
            if (res.success) {
                success(res.message);
                syncConnectorInfo(_props);
                openModal('Edit Pixel');
            } else {
                error(res.message);
            }
        });
    };
    const redirectFb = (temp: string) => {
        setAccount({ ...account, btnLoading: true });
        let id = '';
        let token = get('auth_token');
        if (token) {
            id = parseJwt(token).user_id;
        }
        let params = {
            code: APP_TARGET_NAME,
            state: JSON.stringify({
                source_shop_id: get('source_id'),
                app_tag: APP_SOURCE_NAME,
                app_code: { onyx: 'bwp', meta: APP_TARGET_NAME },
                user_id: id,
                source: APP_SOURCE_NAME,
            }),
            bearer: token,
            currency: currency,
            timezone: timezone,
        };
        GET(installtionForm, params).then((res) => {
            if (token) localStorage.setItem('user_token', token);
            localStorage.setItem('navigate_from', 'Account');
            account.btnLoading = false;
            setAccount({ ...account });
            openModal(temp);
        });
    };

    return (
        <Card cardType="Default" title="Accounts">
            <FlexLayout spacing="loose" direction="vertical">
                <Card cardType="Bordered" title="Facebook / Instagram Accounts">
                    <FlexLayout spacing="loose" direction="vertical">
                        <FlexLayout wrap="noWrap" spacing="mediumTight">
                            <FbEnable />
                            <FlexChild desktopWidth="100">
                                <FlexLayout
                                    direction="vertical"
                                    spacing="loose">
                                    <FlexLayout
                                        wrap="noWrap"
                                        halign="fill"
                                        valign="baseline">
                                        <FlexLayout
                                            spacing="extraTight"
                                            direction="vertical">
                                            <TextStyles
                                                content={
                                                    current?.target.data
                                                        .user_name
                                                }
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                fontweight="extraBold"
                                            />
                                            <TextStyles
                                                content={
                                                    current?.target.data
                                                        .account_name
                                                }
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                utility="light--text"
                                            />
                                            <Badge
                                                type="Positive-100"
                                                size="regular">
                                                {current?.target.data
                                                    .account_status ===
                                                    'ACTIVE' &&
                                                    'Active Account'}
                                            </Badge>
                                        </FlexLayout>
                                        <Button
                                            type="Outlined"
                                            onClick={() =>
                                                openModal('Update Account')
                                            }>
                                            Update
                                        </Button>
                                    </FlexLayout>
                                    <Modal
                                        heading="Update Facebook Account Settings"
                                        open={updateModal}
                                        close={() =>
                                            openModal('Update Account')
                                        }
                                        primaryAction={{
                                            content: 'Continue',
                                            type: 'Primary',
                                            onClick: () =>
                                                redirectFb('Update Account'),
                                            loading: btnLoading,
                                        }}
                                        secondaryAction={{
                                            content: 'Cancel',
                                            type: 'Outlined',
                                            onClick: () =>
                                                openModal('Update Account'),
                                        }}>
                                        <p>
                                            Your Facebook account
                                            <span className="update--textStyle">
                                                {current?.target.data.user_name}
                                            </span>
                                            is currently connected to the Social
                                            Ads for Buy with Prime account. Use
                                            the same Facebook account, Business
                                            Manager
                                            <span className="update--textStyle">
                                                {
                                                    current?.target.data
                                                        .business_name
                                                }
                                            </span>
                                            , and Facebook Ads account
                                            <span className="update--textStyle">
                                                {
                                                    current?.target.data
                                                        .account_name
                                                }
                                            </span>
                                        </p>
                                        <p>
                                            If any of the conditions do not
                                            meet. Your accounts’ catalogs get
                                            deleted on ads manager. Existing
                                            campaigns will be deleted on the ads
                                            manager and get disconnected in the
                                            app.
                                        </p>
                                    </Modal>
                                    <FlexLayout
                                        wrap="noWrap"
                                        valign="center"
                                        halign="fill">
                                        <FlexLayout
                                            spacing="extraTight"
                                            direction="vertical">
                                            <TextStyles
                                                content="Pixel ID"
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                            />
                                            <TextStyles
                                                content={
                                                    current?.target.data
                                                        .pixel_id
                                                }
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                utility="light--text"
                                            />
                                        </FlexLayout>
                                        <Button
                                            onClick={editPixel}
                                            type="Outlined"
                                            icon={<Edit size={20} />}>
                                            Edit
                                        </Button>
                                    </FlexLayout>
                                    <FlexLayout
                                        wrap="noWrap"
                                        halign="fill"></FlexLayout>
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                        <Modal
                            modalSize="large"
                            open={modal}
                            heading="Edit Pixel"
                            primaryAction={{
                                content: 'Save Changes',
                                type: 'Primary',
                                disable: primaryBtnDisable,
                                onClick: savePixel,
                                loading: btnLoading,
                            }}
                            secondaryAction={{
                                content: 'Cancel',
                                type: 'Outlined',
                                onClick: () => openModal('Edit Pixel'),
                            }}
                            close={() => openModal('Edit Pixel')}>
                            <FlexLayout>
                                {pixelData.length === 0 ? (
                                    <div className="loader--position">
                                        <Loader type="Loader2" />
                                    </div>
                                ) : (
                                    <FlexLayout
                                        direction="vertical"
                                        spacing="loose">
                                        <Alert type="warning">
                                            <FlexLayout>
                                                <TextStyles
                                                    type="Paragraph"
                                                    fontweight="bold"
                                                    paragraphTypes="MD-1.4"
                                                    content="Are you sure you want to change the Pixel ID?"
                                                />
                                                <TextStyles
                                                    type="Paragraph"
                                                    fontweight="normal"
                                                    paragraphTypes="MD-1.4"
                                                    content="Changing the pixel Id might result in tracking metrics inconsistency. For a smooth tracking experience, please ensure your DTC website has the same pixel Id as your Buy With Prime pixel Id."
                                                />
                                            </FlexLayout>
                                        </Alert>
                                        <Select
                                            options={pixelData}
                                            value={selectedPixel}
                                            onChange={(value: any, obj: any) =>
                                                selectHandler(value, obj)
                                            }
                                        />
                                    </FlexLayout>
                                )}
                            </FlexLayout>
                        </Modal>
                        <FlexLayout wrap="noWrap" spacing="tight">
                            <InstaEnable />
                            <FlexLayout
                                spacing="extraTight"
                                direction="vertical">
                                <TextStyles
                                    content="Instagram Account "
                                    utility="light--text"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                />
                                <TextStyles
                                    utility="blue--text"
                                    content="Learn how to connect your instagram account"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                />
                                <Badge type="Neutral-200" size="regular">
                                    {current?.target.data.instagram_data
                                        .length === 0
                                        ? 'Not Connected'
                                        : ''}
                                </Badge>
                            </FlexLayout>
                        </FlexLayout>
                    </FlexLayout>
                </Card>
                <Card cardType="Bordered" title="Disconnected Accounts">
                    <FlexLayout
                        spacing="loose"
                        direction="vertical"
                        valign="start">
                        {disconnected.length === 0 ? (
                            <Alert destroy={false} type="info">
                                <TextStyles
                                    utility="light--text"
                                    content="We are currently retrieving information regarding your disconnected account. The details will be available shortly."
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    textcolor="#4E4F52"
                                />
                            </Alert>
                        ) : (
                            disconnected.map((ele: any) => {
                                return (
                                    <FlexLayout
                                        key={ele.user_id}
                                        spacing="loose"
                                        halign="center"
                                        wrap="noWrap"
                                        valign="center">
                                        <FbDisabled />
                                        <FlexLayout
                                            spacing="extraTight"
                                            direction="vertical">
                                            <TextStyles
                                                content={ele.username}
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                fontweight="extraBold"
                                            />
                                            <TextStyles
                                                utility="light--text"
                                                content={ele.account_name}
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                            />
                                        </FlexLayout>
                                    </FlexLayout>
                                );
                            })
                        )}
                    </FlexLayout>
                </Card>
                <hr />
                <Button
                    icon={<Plus size={20} color="#3B424F" />}
                    content="Connect New Account"
                    type="Plain"
                    iconAlign="left"
                    onClick={() => openModal('Connect New Account')}
                />
                <Modal
                    heading="New Account Connection"
                    open={accountModal}
                    close={() => openModal('Connect New Account')}
                    primaryAction={{
                        content: 'Disconnect & Continue',
                        type: 'Danger',
                        onClick: () => redirectFb('Connect New Account'),
                        loading: btnLoading,
                    }}
                    secondaryAction={{
                        content: 'Cancel',
                        type: 'Outlined',
                        onClick: () => openModal('Connect New Account'),
                    }}>
                    <FlexLayout direction="vertical" spacing="loose">
                        <TextStyles
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            fontweight="normal"
                            lineHeight="LH-2.0"
                            content="This action disconnects your current Facebook account from the Buy with Prime app. Hence, deleting your Buy with Prime catalog from Facebook."
                        />
                        <TextStyles
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            fontweight="normal"
                            lineHeight="LH-2.0"
                            content="NOTE: Upon successful disconnection, all existing campaigns will reflect Disconnected status in app and will get deleted from the ads manager."
                        />
                    </FlexLayout>
                </Modal>
            </FlexLayout>
        </Card>
    );
};

export default DI(AccountSettings, {
    func: { syncConnectorInfo },
});
