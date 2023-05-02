import {
    Alert,
    AutoComplete,
    Button,
    Card,
    CheckBox,
    Datepicker,
    FlexChild,
    FlexLayout,
    FormElement,
    PageHeader,
    Radio,
    Select,
    TextField,
    TextLink,
    TextStyles,
    ToolTip,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';
import './CampaignPage.css';
import moment from 'moment';

const CampaignPage = (_props: DIProps) => {
    const {
        get: { initCampaignUrl },
    } = urlFetchCalls;
    const {
        di: { GET },
        redux: { current },
    } = _props;
    const [products, setProducts] = useState({
        products_count: 0,
        is_instagram_connected: false,
        audience_str: '',
    });
    const [audience, setAudience] = useState([
        { checked: false, val: 'Prospective Audience' },
        { checked: false, val: 'Retargeting Audience' },
    ]);
    const [value, setValue] = useState({
        campaign: { campaign_value: '', campaign_error: false },
        start_date: { start_value: '' },
        end_date: { end_value: '' },
        daily_budget: { budget_value: '', budget_error: false },
        Ad_text: {
            ad_value:
                'Get fast, free delivery when you check out using Buy with Product',
            ad_error: false,
        },
        facebook: { checked: true },
        instagram: { checked: false },
    });
    const {
        campaign: { campaign_value, campaign_error },
        facebook: { checked: fb_checked },
        instagram: { checked: insta_checked },
        Ad_text: { ad_value, ad_error },
        daily_budget: { budget_value, budget_error },
        start_date: { start_value },
        end_date: { end_value },
    } = value;
    const { products_count, is_instagram_connected, audience_str } = products;
    const [{ checked: prospective_checked }, { checked: retargeting_checked }] =
        audience;
    useEffect(() => {
        getInitCampaigns();
    }, []);
    const getInitCampaigns = () => {
        GET(initCampaignUrl, { shop_id: current?.target._id }).then((res) => {
            setProducts({
                ...products,
                products_count: res.data.products_count,
                is_instagram_connected: res.data.is_instagram_connected,
            });
        });
    };
    const radioHandler = (str: string) => {
        setProducts({ ...products, audience_str: str });
        audience.forEach((ele) => {
            if (ele.val === str) {
                ele.checked = true;
            } else {
                ele.checked = false;
            }
        });
        setAudience([...audience]);
    };

    const changeHandler = (e: any, str: string) => {
        if (str === 'Enter Campaign Name') {
            value.campaign.campaign_error = false;
            value.campaign.campaign_value = e;
        } else if (str === 'Daily Budget') {
            if (e.match(/^[0-9]*$/)) {
                value.daily_budget.budget_error = false;
                value.daily_budget.budget_value = e;
            } else {
                value.daily_budget.budget_error = true;
            }
        } else if (str === 'Ad Text') {
            value.Ad_text.ad_error = false;
            value.Ad_text.ad_value = e;
        }
        setValue({ ...value });
    };

    const blurHandler = (str: string) => {
        if (str === 'Enter Campaign Name') {
            if (campaign_value === '' || campaign_value.length > 394) {
                value.campaign.campaign_error = true;
            } else {
                value.campaign.campaign_error = false;
            }
        } else if (str === 'Daily Budget') {
            if (budget_value === '' || Number(budget_value) < 5) {
                value.daily_budget.budget_error = true;
            } else {
                value.daily_budget.budget_error = false;
            }
        } else if (str === 'Ad Text') {
            if (ad_value === '') {
                value.Ad_text.ad_error = true;
            } else {
                value.Ad_text.ad_error = false;
            }
        }
        setValue({ ...value });
    };

    const disabledStart = (current: any) => {
        if (end_value !== '') {
            return current > moment(end_value).add(-1, 'day');
        }
        const start_Date = current < moment().add(-1, 'day');
        return start_Date;
    };
    const disabledEnd = (current: any) => {
        if (start_value !== '') {
            const end_Date = current < moment(start_value).add(+1, 'day');
            return end_Date;
        }
    };
    const checkHandler = (str: string) => {
        if (str === 'Facebook') {
            value.facebook.checked = !value.facebook.checked;
        }
        if (str === 'Instagram') {
            value.instagram.checked = !value.instagram.checked;
        }
        setValue({ ...value });
    };

    const dateHandler = (str: string, val: any) => {
        if (str === 'Start Date') {
            if (val === null) {
                value.start_date.start_value = '';
            }
            value.start_date.start_value = val;
        } else if (str === 'End Date') {
            if (val === null) {
                value.end_date.end_value = '';
            }
            value.end_date.end_value = val;
        }
        setValue({ ...value });
    };

    const campIcon = () => {
        if (
            campaign_value === '' ||
            budget_value === '' ||
            ad_value === '' ||
            start_value === '' ||
            campaign_error ||
            budget_error ||
            ad_error ||
            start_value === null
        ) {
            return '#70747E';
        } else {
            return '#027A48';
        }
    };

    return (
        <>
            <PageHeader
                title="Setup Campaign "
                description="Facebook Dynamic Ads automatically target the audience based on their interest, intent, and actions."
                reverseNavigation
            />
            <FlexLayout spacing="loose" wrap="noWrap" wrapMob="wrap">
                <FlexChild desktopWidth="66">
                    <Card
                        cardType="Default"
                        title={
                            <FlexLayout
                                spacing="loose"
                                halign="center"
                                wrap="noWrap">
                                <CheckCircle size={20} color={campIcon()} />
                                <TextStyles
                                    content="Campaign Details"
                                    type="SubHeading"
                                    subheadingTypes="XS-1.6"
                                    fontweight="bold"
                                    lineHeight="LH-2.4"
                                />
                            </FlexLayout>
                        }
                        primaryAction={<Button content="Create Campaign" />}
                        secondaryAction={<Button content="Cancel" />}>
                        <FlexLayout spacing="loose" direction="vertical">
                            <Card>
                                <FormElement>
                                    <TextField
                                        name="Campaign Name"
                                        required
                                        placeHolder="Enter Campaign Name"
                                        showHelp="Campaign name limited to 394 characters."
                                        value={campaign_value}
                                        error={campaign_error}
                                        onChange={(e) =>
                                            changeHandler(
                                                e,
                                                'Enter Campaign Name'
                                            )
                                        }
                                        onblur={() =>
                                            blurHandler('Enter Campaign Name')
                                        }
                                    />
                                    <FlexLayout spacing="loose" wrap="noWrap">
                                        <FlexChild desktopWidth="50">
                                            <Datepicker
                                                format="MM/DD/YYYY"
                                                placeholder="MM/DD/YYYY"
                                                showHelp="Campaign starts at 12 am(EST time zone) "
                                                name={
                                                    <FlexLayout spacing="extraTight">
                                                        <TextStyles content="Start Date" />
                                                        <TextStyles
                                                            content="*"
                                                            utility="text--imp"
                                                        />
                                                    </FlexLayout>
                                                }
                                                value={start_value}
                                                onChange={(val: any) =>
                                                    dateHandler(
                                                        'Start Date',
                                                        val
                                                    )
                                                }
                                                disabledDate={disabledStart}
                                            />
                                        </FlexChild>
                                        <FlexChild desktopWidth="50">
                                            <Datepicker
                                                onChange={(val: any) =>
                                                    dateHandler('End Date', val)
                                                }
                                                disabled={
                                                    start_value === '' ||
                                                    start_value === null
                                                        ? true
                                                        : false
                                                }
                                                value={end_value}
                                                disabledDate={disabledEnd}
                                                format="MM/DD/YYYY"
                                                placeholder="MM/DD/YYYY"
                                                name="End Date "
                                                showHelp="Campaign remains active until paused or til the end date."
                                            />
                                        </FlexChild>
                                    </FlexLayout>
                                    <TextField
                                        value={budget_value}
                                        onChange={(e) =>
                                            changeHandler(e, 'Daily Budget')
                                        }
                                        onblur={() =>
                                            blurHandler('Daily Budget')
                                        }
                                        error={budget_error}
                                        name={
                                            <ToolTip
                                                open={false}
                                                type="light"
                                                position="top"
                                                popoverContainer="element"
                                                extraClass="custom--tooltip_style"
                                                helpText={
                                                    <TextStyles
                                                        content="A budget is the amount of money that you want to spend on showing people your campaigns. Its also a cost control tool. It helps control your overall spending for a campaign, the same way a bid strategy helps control your cost per result."
                                                        paragraphTypes="MD-1.4"
                                                        type="Paragraph"
                                                    />
                                                }>
                                                <FlexLayout spacing="extraTight">
                                                    <TextStyles
                                                        content="Daily Budget"
                                                        utility="text--underline"
                                                    />
                                                    <TextStyles
                                                        content="*"
                                                        utility="text--imp"
                                                    />
                                                </FlexLayout>
                                            </ToolTip>
                                        }
                                        required
                                        placeHolder="$"
                                        showHelp="Minimum daily budget is $5. You are charged only when shopper clicks on the Ad.."
                                    />
                                    <TextField
                                        name="Ad Text "
                                        required
                                        value={ad_value}
                                        onChange={(e) =>
                                            changeHandler(e, 'Ad Text')
                                        }
                                        error={ad_error}
                                        onblur={() => blurHandler('Ad Text')}
                                        placeHolder="Insert the Suitable Ad Text"
                                        showHelp={
                                            <FlexLayout
                                                wrap="noWrap"
                                                spacing="extraTight">
                                                <TextStyles
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                    textcolor="#4E4F52"
                                                    utility="helpText--style"
                                                    content="To know more about high performing and quality content for Ads refer to our"
                                                />
                                                <TextLink
                                                    label="Content guide"
                                                    extraClass="link--style"
                                                />
                                            </FlexLayout>
                                        }
                                    />
                                </FormElement>
                            </Card>
                            <hr />
                            <Card
                                title={
                                    <FlexLayout
                                        spacing="loose"
                                        halign="center"
                                        wrap="noWrap">
                                        <CheckCircle
                                            color="#027A48"
                                            size={20}
                                        />
                                        <TextStyles
                                            content="Buy with Prime-eligible products"
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold"
                                            lineHeight="LH-2.4"
                                        />
                                    </FlexLayout>
                                }>
                                <FlexLayout
                                    direction="vertical"
                                    spacing="loose">
                                    <TextStyles
                                        content={
                                            <>
                                                <TextStyles content="Make sure your product catalog is synced with the app so that Facebook can select the most suitable products to advertise. " />
                                                <TextLink
                                                    label="Learn more about the Catalog Sync process."
                                                    extraClass="link--style"
                                                />
                                            </>
                                        }
                                    />
                                    <Alert
                                        destroy={false}
                                        type={
                                            products_count === 0
                                                ? 'warning'
                                                : 'info'
                                        }>
                                        <TextStyles
                                            content={`You have synchronized ${products_count} in-stock Buy with Prime-eligible products.`}
                                            textcolor="#4E4F52"
                                            type="Paragraph"
                                            paragraphTypes="MD-1.4"
                                            lineHeight="LH-2.0"
                                        />
                                    </Alert>
                                </FlexLayout>
                            </Card>
                            <hr />
                            <Card
                                title={
                                    <FlexLayout
                                        spacing="loose"
                                        halign="center"
                                        wrap="noWrap">
                                        <CheckCircle
                                            color="#027A48"
                                            size={20}
                                        />
                                        <TextStyles
                                            content="Target Location"
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold"
                                            lineHeight="LH-2.4"
                                        />
                                    </FlexLayout>
                                }>
                                <Alert type="info" destroy={false}>
                                    <FlexLayout direction="vertical">
                                        <TextStyles
                                            fontweight="bold"
                                            type="Paragraph"
                                            paragraphTypes="MD-1.4"
                                            content="Target location is limited to the US only."
                                            textcolor="#1C2433"
                                        />
                                        <TextStyles
                                            content="United States"
                                            type="Paragraph"
                                            paragraphTypes="MD-1.4"
                                            textcolor="#4E4F52"
                                        />
                                    </FlexLayout>
                                </Alert>
                            </Card>
                            <hr />
                            <Card
                                title={
                                    <FlexLayout
                                        spacing="loose"
                                        halign="center"
                                        wrap="noWrap">
                                        <CheckCircle
                                            color={
                                                retargeting_checked ||
                                                prospective_checked
                                                    ? '#027A48'
                                                    : '#70747E'
                                            }
                                            size={20}
                                        />
                                        <TextStyles
                                            content="Target Audience"
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold"
                                            lineHeight="LH-2.4"
                                        />
                                    </FlexLayout>
                                }
                                subTitle={
                                    <TextStyles
                                        content="Define your target audience."
                                        type="Paragraph"
                                        paragraphTypes="MD-1.4"
                                        fontweight="bold"
                                    />
                                }>
                                <FlexLayout
                                    spacing="loose"
                                    direction="vertical">
                                    <FlexLayout spacing="loose" wrap="noWrap">
                                        <Radio
                                            labelVal="Prospective Audience"
                                            name="radio"
                                            checked={prospective_checked}
                                            onClick={() =>
                                                radioHandler(
                                                    'Prospective Audience'
                                                )
                                            }
                                        />
                                        <Radio
                                            labelVal="Retargeting Audience"
                                            name="radio"
                                            checked={retargeting_checked}
                                            onClick={() =>
                                                radioHandler(
                                                    'Retargeting Audience'
                                                )
                                            }
                                        />
                                    </FlexLayout>
                                    {audience_str ===
                                        'Prospective Audience' && (
                                        <FlexLayout
                                            direction="vertical"
                                            spacing="tight">
                                            <TextStyles
                                                content="Define the group of people who will see your Ads based on their demographics, interests, behavior, and more."
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                textcolor="#4E4F52"
                                            />
                                            <Card cardType="Bordered">
                                                <FlexLayout
                                                    direction="vertical"
                                                    spacing="loose">
                                                    <FlexLayout
                                                        spacing="loose"
                                                        wrap="noWrap">
                                                        <Select
                                                            name="Min Age "
                                                            required
                                                        />
                                                        <Select
                                                            name="Max Age "
                                                            required
                                                        />
                                                        <Select
                                                            name="Gender"
                                                            required
                                                        />
                                                    </FlexLayout>
                                                    <Card cardType="Subdued">
                                                        <AutoComplete
                                                            name="Search and Select Groups"
                                                            options={[]}
                                                            placeHolder=" Search for demographics, interests, behaviors, etc."
                                                        />
                                                    </Card>
                                                    <hr />
                                                    <CheckBox labelVal="Reach people apart from your detailed targeting selections when its expected to improve performance." />
                                                </FlexLayout>
                                            </Card>
                                        </FlexLayout>
                                    )}
                                    {audience_str ===
                                        'Retargeting Audience' && (
                                        <FlexLayout
                                            direction="vertical"
                                            spacing="tight">
                                            <TextStyles
                                                content="Target customers who either viewed your product or added it to their cart, but did not purchase."
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                textcolor="#4E4F52"
                                            />
                                            <Card cardType="Bordered">
                                                <FlexLayout
                                                    direction="vertical"
                                                    spacing="loose">
                                                    <Select name="Retargeting Groups" />
                                                    <hr />
                                                    <CheckBox labelVal="Reach people apart from your detailed targeting selections when its expected to improve performance." />
                                                </FlexLayout>
                                            </Card>
                                        </FlexLayout>
                                    )}
                                </FlexLayout>
                            </Card>
                            <hr />
                            <Card
                                title={
                                    <FlexLayout
                                        spacing="loose"
                                        halign="center"
                                        wrap="noWrap">
                                        <CheckCircle
                                            color={
                                                fb_checked || insta_checked
                                                    ? '#027A48'
                                                    : '#70747E'
                                            }
                                            size={20}
                                        />
                                        <TextStyles
                                            content="Placements"
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold"
                                            lineHeight="LH-2.4"
                                        />
                                    </FlexLayout>
                                }
                                subTitle="You can select Facebook, Instagram, or both to place your Ads. Please note that if you select both, the Ads placement gets distributed between the two platforms based on the Ad strength.">
                                <FlexLayout
                                    direction="vertical"
                                    spacing="extraTight"
                                    desktopWidth="100">
                                    {fb_checked === false &&
                                    insta_checked === false ? (
                                        <Alert
                                            type="info"
                                            destroy={false}
                                            children={
                                                <TextStyles content="Atleast one platform should be selected." />
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <FlexLayout
                                        direction="vertical"
                                        valign="start">
                                        <CheckBox
                                            labelVal="Facebook"
                                            checked={fb_checked}
                                            onClick={() =>
                                                checkHandler('Facebook')
                                            }
                                        />
                                        {is_instagram_connected === true ? (
                                            <CheckBox
                                                labelVal="Instagram"
                                                checked={insta_checked}
                                                onClick={() =>
                                                    checkHandler('Instagram')
                                                }
                                            />
                                        ) : (
                                            <FlexLayout
                                                spacing="extraTight"
                                                halign="center">
                                                <CheckBox
                                                    labelVal="Instagram"
                                                    disabled
                                                />

                                                <ToolTip
                                                    helpText="Connect your Instagram Account to place ads on Instagram"
                                                    position="top"
                                                    open={false}
                                                    type="light">
                                                    <AlertCircle
                                                        color="#70747E"
                                                        size={20}
                                                    />
                                                </ToolTip>
                                            </FlexLayout>
                                        )}
                                    </FlexLayout>
                                </FlexLayout>
                            </Card>
                        </FlexLayout>
                    </Card>
                </FlexChild>
                <FlexChild desktopWidth="33">
                    <FlexLayout direction="vertical" spacing="loose">
                        <Card cardType="Default">
                            <TextStyles content="Preview Section" />
                        </Card>
                        <Card cardType="Default">
                            <TextStyles content="Preview Section" />
                        </Card>
                    </FlexLayout>
                </FlexChild>
            </FlexLayout>
        </>
    );
};

export default DI(CampaignPage);
