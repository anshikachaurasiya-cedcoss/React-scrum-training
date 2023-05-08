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
    Select,
    Tabs,
    TextField,
    TextLink,
    TextStyles,
    ToolTip,
    Tag,
    Button,
    Image,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle, Play, X } from 'react-feather';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';
import './CampaignPage.css';
import images from '../../../Asests/Images/images.png';
import { getAdditionalParams, prepareheaders } from '../../../Services';
import moment from 'moment';

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
    searchLoading: boolean;
    selectedObj: any;
}

const CampaignPage = (_props: DIProps) => {
    const {
        get: { initCampaignUrl },
    } = urlFetchCalls;
    const {
        di: { GET },
        redux: { current },
        error,
    } = _props;

    // dynamic filling of age inside the prospective audience
    const age = new Array(48).fill('*').map((ele, i) => {
        if (i < 47)
            return { value: (i + 18).toString(), label: (i + 18).toString() };
        else return { value: `${i + 18}+`, label: `${i + 18}+` };
    });

    const gender = [
        { label: 'male', value: 'male', selected: 'male' },
        { label: 'female', value: 'female' },
        { label: 'all', value: 'all' },
    ];

    // created ref for aborting the previous call
    const controller = useRef<any>(null);
    const [products, setProducts] = useState({
        products_count: 0,
        is_instagram_connected: false,
        audience_str: '',
        max_Fb_Preview: [],
        max_Insta_Preview: [],
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
        selectedObj: {},
        searchLoading: false,
    });

    const [selectedValues, setSelectedValues] = useState<selectedObj>({
        minValue: { value: age[0].value },
        maxValue: { value: age[age.length - 1].value },
        genderValue: { value: gender[0].value },
        reTargetValue: { value: '' },
        reTarget: [],
    });
    // destructuring of states
    const { searchedvalue, searchedArr, searchLoading, selectedObj } = searched;
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
    const {
        products_count,
        is_instagram_connected,
        audience_str,
        max_Fb_Preview,
        max_Insta_Preview,
    } = products;
    const [{ checked: prospective_checked }, { checked: retargeting_checked }] =
        audience;

    const tabArr: any = [
        { id: 'facebook', content: 'Facebook', disable: true },
    ];

    const [selectTab, setSelectTab] = useState({
        tabSelectArray: tabArr,
        selectedTab: tabArr[0].id,
        maxFb: [],
        maxInsta: [],
    });

    const { tabSelectArray, selectedTab } = selectTab;

    useEffect(() => {
        if (is_instagram_connected === true) {
            selectTab.tabSelectArray.push({
                id: 'instagram',
                content: 'Instagram',
            });
            setSelectTab({ ...selectTab });
        }
    }, [is_instagram_connected]);

    useEffect(() => {
        getInitCampaigns();
    }, []);
    // function calls the gitInit API
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
            if (res.data.products_preview.length > 30) {
                products.max_Fb_Preview = res.data.products_preview.splice(
                    0,
                    30
                );
                products.max_Insta_Preview = res.data.products_preview.splice(
                    0,
                    10
                );
            } else {
                products.max_Fb_Preview = res.data.products_preview;
                products.max_Insta_Preview = res.data.products_preview;
            }
            setProducts({
                ...products,
                products_count: res.data.products_count,
                is_instagram_connected: res.data.is_instagram_connected,
            });
        });
    };
    // function handles the radio box
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
    // function handles the input fields boxes
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
    // function handles the validations on blur of the input field
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
    // function disables the start date of the calender
    const disabledStart = (current: any) => {
        if (end_value !== '') {
            return current > moment(end_value).add(-1, 'day');
        }
        const start_Date = current < moment().add(-1, 'day');
        return start_Date;
    };
    // function disables the end date of the calender
    const disabledEnd = (current: any) => {
        if (start_value !== '') {
            const end_Date = current < moment(start_value).add(+1, 'day');
            return end_Date;
        }
    };
    // function handles the checkbox
    const checkHandler = (str: string) => {
        if (str === 'Facebook') {
            value.facebook.checked = !value.facebook.checked;
        }
        if (str === 'Instagram') {
            value.instagram.checked = !value.instagram.checked;
        }
        setValue({ ...value });
    };
    // function handles the datepicker component
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
    // function handles the select boxes
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
    // in this useEffect we are aborting the last api call and also used the debouncing
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

    const imageError = (value: any, i: number) => {
        console.log(value, i, 'chal gaya function');
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
                                            <FlexLayout direction="vertical">
                                                <FlexLayout spacing="extraTight">
                                                    <TextStyles content="Start Date" />
                                                    <TextStyles
                                                        content="*"
                                                        utility="text--imp"
                                                    />
                                                </FlexLayout>
                                                <Datepicker
                                                    format="MM/DD/YYYY"
                                                    placeholder="MM/DD/YYYY"
                                                    showHelp="Campaign starts at 12 am(EST time zone) "
                                                    value={start_value}
                                                    onChange={(val: any) =>
                                                        dateHandler(
                                                            'Start Date',
                                                            val
                                                        )
                                                    }
                                                    disabledDate={disabledStart}
                                                />
                                            </FlexLayout>
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
                                    <FlexLayout
                                        direction="vertical"
                                        spacing="extraTight">
                                        <TextField
                                            name="Ad Text "
                                            required
                                            value={ad_value}
                                            onChange={(e) =>
                                                changeHandler(e, 'Ad Text')
                                            }
                                            error={ad_error}
                                            onblur={() =>
                                                blurHandler('Ad Text')
                                            }
                                            placeHolder="Insert the Suitable Ad Text"
                                        />
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
                                    </FlexLayout>
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
                                    direction="vertical"
                                    desktopWidth="100"
                                    mobileWidth="100"
                                    tabWidth="100">
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
                                                                options={age.map(
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
                                                                options={age.map(
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
                                                        <FlexLayout
                                                            direction="vertical"
                                                            spacing="tight">
                                                            {Object.entries(
                                                                selectedObj
                                                            ).map(
                                                                ([
                                                                    ele,
                                                                    val,
                                                                ]: any) => {
                                                                    return (
                                                                        <FlexLayout
                                                                            key={
                                                                                ele
                                                                            }
                                                                            direction="vertical"
                                                                            spacing="tight">
                                                                            <FlexLayout>
                                                                                <TextStyles
                                                                                    utility="helpText--style"
                                                                                    content={JSON.parse(
                                                                                        ele
                                                                                    ).map(
                                                                                        (
                                                                                            innerEle: any,
                                                                                            index: number
                                                                                        ) => {
                                                                                            return `${innerEle} ${
                                                                                                index <
                                                                                                JSON.parse(
                                                                                                    ele
                                                                                                )
                                                                                                    .length -
                                                                                                    1
                                                                                                    ? '  >  '
                                                                                                    : ''
                                                                                            }`;
                                                                                        }
                                                                                    )}
                                                                                />
                                                                            </FlexLayout>
                                                                            <Card>
                                                                                <FlexLayout
                                                                                    wrap="noWrap"
                                                                                    halign="fill">
                                                                                    <FlexLayout spacing="loose">
                                                                                        {val.map(
                                                                                            (
                                                                                                tempEle: any,
                                                                                                i: number
                                                                                            ) => {
                                                                                                return (
                                                                                                    <Tag
                                                                                                        destroy={() =>
                                                                                                            ''
                                                                                                        }
                                                                                                        key={
                                                                                                            tempEle.name +
                                                                                                            ele
                                                                                                        }
                                                                                                        children={
                                                                                                            tempEle.name
                                                                                                        }
                                                                                                    />
                                                                                                );
                                                                                            }
                                                                                        )}
                                                                                    </FlexLayout>
                                                                                    <div className="btn--custom_border">
                                                                                        <Button
                                                                                            type="Outlined"
                                                                                            icon={
                                                                                                <X
                                                                                                    size={
                                                                                                        20
                                                                                                    }
                                                                                                />
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </FlexLayout>
                                                                            </Card>
                                                                        </FlexLayout>
                                                                    );
                                                                }
                                                            )}

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
                                                        </FlexLayout>
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
                                            spacing="tight"
                                            desktopWidth="100"
                                            mobileWidth="100"
                                            tabWidth="100">
                                            <FlexChild childWidth="fullWidth">
                                                <TextStyles
                                                    content="Target customers who either viewed your product or added it to their cart, but did not purchase."
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                    textcolor="#4E4F52"
                                                />
                                            </FlexChild>
                                            <FlexChild childWidth="fullWidth">
                                                <Card cardType="Bordered">
                                                    <FlexLayout
                                                        direction="vertical"
                                                        spacing="loose"
                                                        desktopWidth="100"
                                                        mobileWidth="100"
                                                        tabWidth="100">
                                                        <FlexChild childWidth="fullWidth">
                                                            <div className="custom--retargeting--select">
                                                                <Select
                                                                    customClass="select--style"
                                                                    name="Retargeting Groups"
                                                                    options={reTarget.map(
                                                                        (
                                                                            ele: any
                                                                        ) => {
                                                                            return ele;
                                                                        }
                                                                    )}
                                                                    value={
                                                                        reTargetSelectedValue
                                                                    }
                                                                    onChange={(
                                                                        ele
                                                                    ) =>
                                                                        selectHandler(
                                                                            'Retargeting Groups',
                                                                            ele
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </FlexChild>
                                                        <hr />
                                                        <CheckBox labelVal="Reach people apart from your detailed targeting selections when its expected to improve performance." />
                                                    </FlexLayout>
                                                </Card>
                                            </FlexChild>
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
                    <FlexLayout
                        direction="vertical"
                        spacing="loose"
                        desktopWidth="100"
                        mobileWidth="100"
                        tabWidth="100">
                        <Card
                            cardType="Default"
                            title="Preview"
                            subTitle="This is how your Ad will appear">
                            <FlexLayout
                                direction="vertical"
                                spacing="extraTight"
                                valign="start"
                                desktopWidth="100"
                                tabWidth="100"
                                mobileWidth="100">
                                <Tabs
                                    alignment="horizontal"
                                    value={tabSelectArray}
                                    selected={selectedTab}
                                    onChange={(val) => {
                                        selectTab.selectedTab = val;
                                        setSelectTab({ ...selectTab });
                                    }}
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
                                    content={ad_value}
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    fontweight="light"
                                    textcolor="#4E4F52"
                                />
                                <div className="extra--spaceStyle">
                                    <Carousel
                                        responsive={[
                                            {
                                                breakpoint: 1115,
                                                settings: {
                                                    slidesToShow: 1.2,
                                                },
                                            },
                                            {
                                                breakpoint: 983,
                                                settings: {
                                                    slidesToShow: 2.5,
                                                },
                                            },
                                            {
                                                breakpoint: 726,
                                                settings: {
                                                    slidesToShow: 2.2,
                                                },
                                            },

                                            {
                                                breakpoint: 660,
                                                settings: {
                                                    slidesToShow: 1,
                                                },
                                            },
                                        ]}
                                        slidesToShow={1.2}
                                        autoplay
                                        infinite
                                        autoplaySpeed={2000}
                                        slidesToScroll={1}>
                                        {max_Fb_Preview.map(
                                            (ele: any, i: number) => {
                                                return (
                                                    <div
                                                        className="crousel--block"
                                                        key={ele.title}>
                                                        <Card
                                                            key={ele}
                                                            cardType="Subdued">
                                                            <FlexLayout
                                                                spacing="tight"
                                                                direction="vertical"
                                                                valign="start">
                                                                <Image
                                                                    height={284}
                                                                    width={265}
                                                                    onError={() =>
                                                                        imageError(
                                                                            ele.main_image,
                                                                            i
                                                                        )
                                                                    }
                                                                    src={
                                                                        ele.main_image
                                                                    }
                                                                />
                                                                <div className="crousel--div">
                                                                    <TextStyles
                                                                        fontweight="extraBold"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        content={ele.title.substring(
                                                                            0,
                                                                            20
                                                                        )}
                                                                    />
                                                                    <TextStyles
                                                                        content={`$ ${ele.price}`}
                                                                    />
                                                                    <Button
                                                                        type="Outlined"
                                                                        content=" Shop Now"
                                                                    />
                                                                </div>
                                                            </FlexLayout>
                                                        </Card>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </Carousel>
                                </div>
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
