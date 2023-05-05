import {
    Alert,
    AutoComplete,
    Avatar,
    Card,
    Carousel,
    CheckBox,
    Datepicker,
    FlexChild,
    FlexLayout,
    FormElement,
    PageHeader,
    Radio,
    RangeSlider,
    Select,
    Tabs,
    TextField,
    TextLink,
    TextStyles,
    ToolTip,
    Image,
    Breadcrumb,
    Tag,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle, Play } from 'react-feather';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';
import './CampaignPage.css';
import images from '../../../Asests/Images/images.png';
import { getAdditionalParams, prepareheaders } from '../../../Services';

interface selectedObj {
    minValue: { value: string };
    maxValue: { value: string };
    genderValue: { value: string };
    reTargetValue: { value: string };
    reTarget: { label: string; value: string }[];
}

interface searchedObj {
    searchedvalue: string;
    searchedArr: {}[];
    selectedSearchedArr: any;
    searchLoading: boolean;
    selectedObj: any;
}

const CampaignPage = (_props: DIProps) => {
    const {
        get: { initCampaignUrl, getAudience },
    } = urlFetchCalls;
    const {
        di: { GET },
        redux: { current },
        error,
    } = _props;
    const minAge = [
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        { label: '25', value: '25' },
        { label: '26', value: '26' },
        { label: '27', value: '27' },
        { label: '28', value: '28' },
        { label: '29', value: '29' },
        { label: '30', value: '30' },
        { label: '31', value: '31' },
        { label: '32', value: '32' },
        { label: '33', value: '33' },
        { label: '34', value: '34' },
        { label: '35', value: '35' },
        { label: '36', value: '36' },
        { label: '37', value: '37' },
        { label: '38', value: '38' },
        { label: '39', value: '39' },
        { label: '40', value: '40' },
        { label: '41', value: '41' },
        { label: '42', value: '42' },
        { label: '43', value: '43' },
        { label: '44', value: '44' },
        { label: '45', value: '45' },
        { label: '46', value: '46' },
        { label: '47', value: '47' },
        { label: '48', value: '48' },
        { label: '49', value: '49' },
        { label: '50', value: '50' },
        { label: '51', value: '51' },
        { label: '52', value: '52' },
        { label: '53', value: '53' },
        { label: '54', value: '54' },
        { label: '55', value: '55' },
        { label: '56', value: '56' },
        { label: '57', value: '57' },
        { label: '58', value: '58' },
        { label: '59', value: '59' },
        { label: '60', value: '60' },
        { label: '61', value: '61' },
        { label: '62', value: '62' },
        { label: '63', value: '63' },
        { label: '64', value: '64' },
        { label: '65', value: '65' },
    ];
    const maxAge = [
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        { label: '25', value: '25' },
        { label: '26', value: '26' },
        { label: '27', value: '27' },
        { label: '28', value: '28' },
        { label: '29', value: '29' },
        { label: '30', value: '30' },
        { label: '31', value: '31' },
        { label: '32', value: '32' },
        { label: '33', value: '33' },
        { label: '34', value: '34' },
        { label: '35', value: '35' },
        { label: '36', value: '36' },
        { label: '37', value: '37' },
        { label: '38', value: '38' },
        { label: '39', value: '39' },
        { label: '40', value: '40' },
        { label: '41', value: '41' },
        { label: '42', value: '42' },
        { label: '43', value: '43' },
        { label: '44', value: '44' },
        { label: '45', value: '45' },
        { label: '46', value: '46' },
        { label: '47', value: '47' },
        { label: '48', value: '48' },
        { label: '49', value: '49' },
        { label: '50', value: '50' },
        { label: '51', value: '51' },
        { label: '52', value: '52' },
        { label: '53', value: '53' },
        { label: '54', value: '54' },
        { label: '55', value: '55' },
        { label: '56', value: '56' },
        { label: '57', value: '57' },
        { label: '58', value: '58' },
        { label: '59', value: '59' },
        { label: '60', value: '60' },
        { label: '61', value: '61' },
        { label: '62', value: '62' },
        { label: '63', value: '63' },
        { label: '64', value: '64' },
        { label: '65', value: '65' },
    ];
    const gender = [
        { label: 'male', value: 'male', selected: 'male' },
        { label: 'female', value: 'female' },
        { label: 'all', value: 'all' },
    ];
    const tabArr = [
        { id: 'facebook', content: 'Facebook' },
        { id: 'instagram', content: 'Instagram' },
    ];
    const controller = useRef<any>(null);
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
                'Get fast, free delivery when you check out using Buy with ProductGet fast, free delivery when you check out using Buy with Prime. Just look for the Buy with Prime badge and start shopping.',
            ad_error: false,
        },
        facebook: { checked: true },
        instagram: { checked: false },
    });

    const [searched, setSearched] = useState<searchedObj>({
        searchedvalue: '',
        searchedArr: [],
        selectedSearchedArr: [],
        selectedObj: {},
        searchLoading: false,
    });

    const {
        searchedvalue,
        searchedArr,
        selectedSearchedArr,
        searchLoading,
        selectedObj,
    } = searched;

    const [selectedValues, setSelectedValues] = useState<selectedObj>({
        minValue: { value: minAge[0].value },
        maxValue: { value: maxAge[maxAge.length - 1].value },
        genderValue: { value: gender[0].value },
        reTargetValue: { value: '' },
        reTarget: [],
    });

    const {
        minValue: { value: minSelectedValue },
        maxValue: { value: maxSelectedValue },
        genderValue: { value: genderSelectedValue },
        reTargetValue: { value: reTargetSelectedValue },
        reTarget,
    } = selectedValues;

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
            Object.values(res.data.audience).forEach((ele: any) => {
                let obj: any = {
                    label: ele,
                    value: ele,
                };
                selectedValues.reTarget.push(obj);
            });
            selectedValues.reTargetValue.value =
                selectedValues.reTarget[0].value;
            setSelectedValues({ ...selectedValues });
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

    const selectHandler = (str: string, ele: any) => {
        if (str === 'Min Age') {
            if (ele < maxSelectedValue) {
                selectedValues.minValue.value = ele;
            }
        } else if (str === 'Max Age') {
            if (ele > minSelectedValue) {
                selectedValues.maxValue.value = ele;
            }
        } else if (str === 'Gender') {
            selectedValues.genderValue.value = ele;
        } else if (str === 'Retargeting Groups') {
            selectedValues.reTargetValue.value = ele;
        }
        setSelectedValues({ ...selectedValues });
    };
    const searchHandler = (val: string) => {
        searched.searchedvalue = val;
        setSearched({ ...searched });
    };

    useEffect(() => {
        if (searchedvalue !== '') {
            setSearched({ ...searched, searchLoading: true });
            controller.current = new AbortController();
            const { signal } = controller.current;
            let search = setTimeout(() => {
                fetch(
                    `https://testing-app-backend.bwpapps.com/meta/campaign/getAudience?target_marketplace=${
                        getAdditionalParams(_props.redux).target_marketplace
                    }&query=${searchedvalue}&shop_id=${
                        _props.redux.current?.target._id
                    }`,
                    {
                        method: 'GET',
                        headers: prepareheaders(_props.redux),
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((res) => {
                        searched.searchLoading = false;
                        if (res.success) {
                            res.data.forEach((ele: any) => {
                                let obj: any = {
                                    value: ele.name,
                                    label: ele.name,
                                    lname: ele.path[0],
                                    popoverContent: (
                                        <FlexLayout
                                            direction="vertical"
                                            spacing="tight">
                                            <FlexLayout
                                                spacing="tight"
                                                wrap="noWrap">
                                                <TextStyles
                                                    fontweight="extraBolder"
                                                    content=" Size :"
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                    utility="helpText--style"
                                                />
                                                <TextStyles
                                                    textcolor="light"
                                                    content={`
                                            ${ele.audience_size_lower_bound}-
                                            ${ele.audience_size_upper_bound}`}
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                    utility="helpText--style"
                                                />
                                            </FlexLayout>
                                            <FlexLayout
                                                spacing="tight"
                                                wrap="noWrap">
                                                <TextStyles
                                                    textcolor="#1C2433"
                                                    content={`${ele.path[0]} > `}
                                                />
                                                <TextStyles textcolor="light">
                                                    {ele.path
                                                        .slice(
                                                            1,
                                                            ele.path.length
                                                        )
                                                        .map(
                                                            (
                                                                innerEle: any,
                                                                i: number
                                                            ) => {
                                                                return `${innerEle} ${
                                                                    i <
                                                                    ele.path
                                                                        .length -
                                                                        1
                                                                        ? '>'
                                                                        : ''
                                                                }`;
                                                            }
                                                        )}
                                                </TextStyles>
                                            </FlexLayout>
                                            {ele.description && (
                                                <FlexLayout
                                                    spacing="tight"
                                                    wrap="noWrap">
                                                    <TextStyles
                                                        content={'Description:'}
                                                    />
                                                    <TextStyles
                                                        content={
                                                            ele.description
                                                        }
                                                    />
                                                </FlexLayout>
                                            )}
                                            <Alert destroy={false} type="info">
                                                The audience size for the
                                                selected interest group is shown
                                                as a range. These numbers are
                                                subject to change over time.
                                            </Alert>
                                        </FlexLayout>
                                    ),
                                };
                                Object.assign(obj, ele);
                                searched.searchedArr.push(obj);
                            });
                        } else {
                            error(res.message);
                        }
                        setSearched({ ...searched, searchLoading: false });
                    });
            }, 2000);
            return () => {
                clearTimeout(search);
                controller.current.abort();
            };
        }
    }, [searchedvalue]);

    const selectSearched = (val: any) => {
        let obj: any = searchedArr.find((ele: any) => ele.name === val);
        const keyName = JSON.stringify(obj.path.slice(0, obj.path.length - 1));
        if (!Object.keys(selectedObj).includes(keyName)) {
            searched.selectedObj[keyName] = [obj];
        } else {
            searched.selectedObj[keyName].push(obj);
        }
        setSearched({ ...searched });
    };

    return (
        <>
            <PageHeader
                title="Setup Campaign "
                description="Facebook Dynamic Ads automatically target the audience based on their interest, intent, and actions."
                reverseNavigation
            />
            <FlexLayout
                spacing="loose"
                wrap="noWrap"
                wrapTab="noWrap"
                wrapMob="wrap">
                <FlexChild desktopWidth="66" tabWidth="66" mobileWidth="100">
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
                        primaryAction={{
                            content: 'Create Campaign',
                            type: 'Primary',
                        }}
                        secondaryAction={{
                            content: 'Cancel',
                            type: 'Outlined',
                        }}>
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
                                                        <div className="custom--selectStyle">
                                                            <Select
                                                                name="Min Age "
                                                                required
                                                                options={minAge.map(
                                                                    (ele) => {
                                                                        return ele;
                                                                    }
                                                                )}
                                                                value={
                                                                    minSelectedValue
                                                                }
                                                                onChange={(
                                                                    ele
                                                                ) =>
                                                                    selectHandler(
                                                                        'Min Age',
                                                                        ele
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="custom--selectStyle">
                                                            <Select
                                                                name="Max Age "
                                                                required
                                                                options={maxAge.map(
                                                                    (ele) => {
                                                                        return ele;
                                                                    }
                                                                )}
                                                                value={
                                                                    maxSelectedValue
                                                                }
                                                                onChange={(
                                                                    ele
                                                                ) =>
                                                                    selectHandler(
                                                                        'Max Age',
                                                                        ele
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="custom--selectStyle">
                                                            <Select
                                                                name="Gender"
                                                                required
                                                                options={gender.map(
                                                                    (ele) => {
                                                                        return ele;
                                                                    }
                                                                )}
                                                                value={
                                                                    genderSelectedValue
                                                                }
                                                                onChange={(
                                                                    ele
                                                                ) =>
                                                                    selectHandler(
                                                                        'Gender',
                                                                        ele
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </FlexLayout>
                                                    <Card cardType="Subdued">
                                                        {Object.keys(
                                                            selectedObj
                                                        ).map((ele: any, i) => {
                                                            return (
                                                                <FlexLayout
                                                                    key={ele}
                                                                    direction="vertical"
                                                                    spacing="tight">
                                                                    <FlexLayout
                                                                        key={
                                                                            ele
                                                                        }>
                                                                        <TextStyles
                                                                            content={JSON.parse(
                                                                                ele
                                                                            ).map(
                                                                                (
                                                                                    innerEle: any
                                                                                ) => {
                                                                                    return `${innerEle} ${
                                                                                        i <
                                                                                        JSON.parse(
                                                                                            ele
                                                                                        )
                                                                                            .length -
                                                                                            1
                                                                                            ? '>'
                                                                                            : ''
                                                                                    }`;
                                                                                }
                                                                            )}
                                                                        />
                                                                    </FlexLayout>
                                                                    <Card>
                                                                        {console.log(
                                                                            Object.values(
                                                                                selectedObj
                                                                            )
                                                                        )}
                                                                        {Object.values(
                                                                            selectedObj
                                                                        ).map(
                                                                            (
                                                                                tempEle: any
                                                                            ) => {
                                                                                return (
                                                                                    <Tag
                                                                                        key={
                                                                                            tempEle
                                                                                        }>
                                                                                        {
                                                                                            tempEle.name
                                                                                        }
                                                                                    </Tag>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </Card>
                                                                </FlexLayout>
                                                            );
                                                        })}

                                                        <AutoComplete
                                                            loading={
                                                                searchLoading
                                                            }
                                                            setHiglighted
                                                            showPopover
                                                            name="Search and Select Groups"
                                                            value={
                                                                searchedvalue
                                                            }
                                                            onChange={(
                                                                val: any
                                                            ) =>
                                                                searchHandler(
                                                                    val
                                                                )
                                                            }
                                                            options={
                                                                searchedArr
                                                            }
                                                            onClick={(
                                                                val: any
                                                            ) =>
                                                                selectSearched(
                                                                    val
                                                                )
                                                            }
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
                                                    <Select
                                                        name="Retargeting Groups"
                                                        options={reTarget.map(
                                                            (ele: any) => {
                                                                return ele;
                                                            }
                                                        )}
                                                        value={
                                                            reTargetSelectedValue
                                                        }
                                                        onChange={(ele) =>
                                                            selectHandler(
                                                                'Retargeting Groups',
                                                                ele
                                                            )
                                                        }
                                                    />
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
                                            type="warning"
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
                <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="100">
                    <FlexLayout direction="vertical" spacing="loose">
                        <Card
                            cardType="Default"
                            title="Preview"
                            subTitle="This is how your Ad will appear">
                            <FlexLayout
                                direction="vertical"
                                spacing="extraTight"
                                valign="start">
                                <Tabs
                                    alignment="horizontal"
                                    value={tabArr}
                                    selected={tabArr[0].id}
                                />
                                <FlexLayout
                                    spacing="tight"
                                    halign="start"
                                    valign="center">
                                    <Avatar />
                                    <TextStyles
                                        content="Peter Fingers"
                                        type="Paragraph"
                                        paragraphTypes="MD-1.4"
                                        fontweight="bold"
                                    />
                                </FlexLayout>
                                <TextStyles
                                    content="Place your ad text here"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    fontweight="light"
                                    textcolor="#4E4F52"
                                />
                                {/* <Card>
                                    <Carousel
                                        slidesToShow={1.2}
                                        autoplay
                                        slidesToScroll={1}>
                                        {[1, 2, 3, 4, 5].map((ele) => {
                                            return (
                                                <Card
                                                    key={ele}
                                                    cardType="Bordered"
                                                    secondaryAction={{
                                                        content: 'Shop Now',
                                                        type: 'Outlined',
                                                    }}
                                                    media={images}>
                                                    <TextStyles content="Fingers mouse with areao grip " />
                                                    <TextStyles content="$24.90" />
                                                </Card>
                                            );
                                        })}
                                    </Carousel>
                                </Card> */}
                            </FlexLayout>
                        </Card>
                        <Card cardType="Default">
                            <FlexLayout spacing="tight" direction="vertical">
                                <TextStyles
                                    content="Need assistance creating a campaign? Please see this video guide for help"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    textcolor="#4E4F52"
                                    fontweight="light"
                                    lineHeight="LH-2.0"
                                />
                                <TextLink
                                    label={
                                        <FlexLayout
                                            halign="start"
                                            wrap="noWrap"
                                            spacing="extraTight">
                                            <Play size={16} color="#2E90FA" />
                                            <TextStyles
                                                content="Campaign Guide"
                                                textcolor="#4E4F52"
                                                paragraphTypes="MD-1.4"
                                                type="Paragraph"
                                                fontweight="light"
                                            />
                                        </FlexLayout>
                                    }
                                />
                            </FlexLayout>
                        </Card>
                    </FlexLayout>
                </FlexChild>
            </FlexLayout>
        </>
    );
};

export default DI(CampaignPage);
