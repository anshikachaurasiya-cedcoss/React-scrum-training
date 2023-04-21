import {
    ActionList,
    AdvanceFilter,
    Badge,
    Button,
    Card,
    CheckBox,
    FlexChild,
    FlexLayout,
    Grid,
    OverlappingImages,
    PageHeader,
    Pagination,
    Popover,
    TextField,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
    Download,
    Plus,
    Filter,
    Search,
    MoreVertical,
    AlertTriangle,
} from 'react-feather';
import { DI, DIProps } from '../../Core/DependencyInjection';
import { urlFetchCalls } from '../../Constant';
import Facebook from '../../Asests/Images/svg/Facebook';
import Instagram from '../../Asests/Images/svg/Instagram';
import { useNavigate } from 'react-router-dom';

type typeProps =
    | 'Neutral-100-Border'
    | 'Warning-100'
    | 'Neutral-100'
    | 'Positive-100'
    | 'Positive-200'
    | 'Neutral-300'
    | 'Neutral-100'
    | 'Info-100';

type keyProps =
    | 'PENDING'
    | 'PAUSED'
    | 'ERRORS'
    | 'SCHEDULED'
    | 'ACTIVE'
    | 'ENDED'
    | 'DISCONNECTED'
    | 'ARCHIVED';

type badgeProps = {
    key: keyProps;
    type: typeProps;
}[];

interface PropsI extends DIProps {}
let start = 0;
let arr: any = [];
const Dashboard = (_props: PropsI) => {
    let statusArr: badgeProps = [
        { key: 'PENDING', type: 'Neutral-100-Border' },
        { key: 'PAUSED', type: 'Warning-100' },
        { key: 'ERRORS', type: 'Neutral-100' },
        { key: 'SCHEDULED', type: 'Positive-100' },
        { key: 'ACTIVE', type: 'Positive-200' },
        { key: 'ENDED', type: 'Neutral-300' },
        { key: 'DISCONNECTED', type: 'Neutral-100' },
        {
            key: 'ARCHIVED',
            type: 'Info-100',
        },
    ];
    let [actionList, setActionList] = useState(false);
    let [popOver, setPopOver] = useState(false);

    const openActionList = () => {
        setActionList(!actionList);
    };
    const gridHead = [
        {
            dataIndex: 'campaign_name',
            fixed: 'left',
            key: 'campaign_name',
            title: 'Campaign',
        },
        {
            dataIndex: 'status',
            fixed: 'left',
            key: 'status',
            title: 'Status',
        },
        {
            dataIndex: 'campaign_placement',
            key: 'campaign_placement',
            title: 'Placement',
        },
        { dataIndex: 'start_date', key: 'start_date', title: 'Start Date' },
        { dataIndex: 'end_date', key: 'end_date', title: 'End Date' },
        {
            dataIndex: 'daily_budget',
            key: 'daily_budget',
            title: 'Daily Budget',
        },
        { dataIndex: 'spend', key: 'spend', title: 'Spend' },
        { dataIndex: 'sales', key: 'sales', title: 'Sales' },
        {
            render: () => (
                <ActionList
                    activator={
                        <div
                            className="icon--bg"
                            onClick={() => openActionList()}>
                            <MoreVertical size={20} color="#3B424F" />
                        </div>
                    }
                    options={[
                        {
                            items: [
                                {
                                    content: 'Action 1',
                                    onClick: function noRefCheck() {},
                                },
                                {
                                    content: 'Action 1',
                                    onClick: function noRefCheck() {},
                                },
                                {
                                    content: 'Action 1',
                                    onClick: function noRefCheck() {},
                                },
                            ],
                        },
                    ]}
                    open={actionList}
                />
            ),
            fixed: 'right',
            key: 'actions',
            title: 'Actions',
        },
    ];
    const newColumns = [
        {
            dataIndex: 'impressions',
            key: 'impressions',
            title: 'Impressions',
            checked: false,
        },
        { dataIndex: 'clicks', key: 'clicks', title: 'Clicks', checked: false },
        { dataIndex: 'orders', key: 'orders', title: 'Orders', checked: false },
        { dataIndex: 'roas', key: 'roas', title: 'ROAS', checked: false },
    ];

    const [gridHeading, setGridheading] = useState({
        gridHead: gridHead,
        newColumns: newColumns,
    });

    const gridData = [
        {
            campaign_name: 'retargeting campaign 1',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'PENDING',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 2',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'PAUSED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 3',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ERRORS',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 4',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'SCHEDULED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 5',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ACTIVE',
            campaign_placement: ['facebook', 'instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 6',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ENDED',
            campaign_placement: ['instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 7',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'DISCONNECTED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 8',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'SCHEDULED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 9',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ERRORS',
            campaign_placement: ['instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 10',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ARCHIVED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 11',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'DISCONNECTED',
            campaign_placement: ['facebook', 'instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 12',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ENDED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 13',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ACTIVE',
            campaign_placement: ['facebook', 'instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 14',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'SCHEDULED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 15',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ACTIVE',
            campaign_placement: ['instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 16',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ERRORS',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 17',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'PENDING',
            campaign_placement: ['facebook', 'instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign 18',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'PAUSED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'retargeting campaign',
            campaign_id: '23854594149590431',
            daily_budget: 86,
            status: 'ACTIVE',
            campaign_placement: ['instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '05/01/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 34',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'SCHEDULED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '04/30/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 23',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'ERRORS',
            campaign_placement: ['facebook', 'instagram'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 25',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'PENDING',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '04/30/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 24',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'ARCHIVED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '04/30/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 23',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'ERRORS',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '04/30/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 21',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'PENDING',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '04/30/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
        {
            campaign_name: 'syed campaign 11',
            campaign_id: '23854594122030431',
            daily_budget: 85,
            status: 'SCHEDULED',
            campaign_placement: ['facebook'],
            user_id: '643fa76ff0ed0bf6ab0c2c82',
            shop_id: 902,
            start_date: '04/28/2023',
            end_date: '04/30/2023',
            spend: 0,
            impressions: 0,
            clicks: 0,
            orders: 0,
            sales: 0,
            roas: 0,
        },
    ];
    const pageArr = [
        {
            label: '5',
            value: '5',
        },
        {
            label: '10',
            value: '10',
        },
        {
            label: '15',
            value: '15',
        },
        {
            label: '20',
            value: '20',
        },
        {
            label: '25',
            value: '25',
        },
    ];
    let navigate = useNavigate();

    const [optionPagination, setOptionPagination] = useState('5');
    let [currentPage, setCurrentPage] = useState(1);
    let [data, setData] = useState<any>([]);
    // destructuring of fetching calls
    const {
        get: { getCampaignsUrl },
    } = urlFetchCalls;
    // const destructuring of props
    const {
        di: { GET },
    } = _props;
    // useEffect used to call the function which hits the api of get campaigns data
    useEffect(() => {
        getCampaginsData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        let copy = gridData;
        data = copy.slice(0, Number(optionPagination));
        setData(data);
        designGridData(data);
    }, [optionPagination]);

    const getCampaginsData = () => {
        GET(getCampaignsUrl, {
            shop_id: _props.redux.account?.target.meta[0]._id,
            count: optionPagination,
            activePage: currentPage,
        }).then((res) => {
            if (res.success) {
                if (res.data.rows.length === 0) {
                    setData(gridData);
                    designGridData(gridData);
                }
            }
        });
    };
    // function design the data fetched from api
    const designGridData = (dataArr: any[]) => {
        let newData = dataArr.map((ele) => {
            let obj = { ...ele };
            let type = statusArr.find((item) => item.key === ele.status)?.type;
            obj.status = (
                <Badge
                    type={type}
                    size={'regular'}
                    children={<TextStyles content={ele.status.toLowerCase()} />}
                />
            );
            if (ele.status === 'ERRORS') {
                obj.status = (
                    <Badge customBgColor="white">
                        <FlexLayout spacing="extraTight" halign="center">
                            <AlertTriangle color="#C4281C" size={20} />
                            <TextStyles
                                content={'Errors'}
                                textcolor="negative"
                            />
                        </FlexLayout>
                    </Badge>
                );
            }
            if (ele.campaign_placement.length > 1) {
                obj.campaign_placement = (
                    <OverlappingImages size="25">
                        <Facebook />
                        <Instagram />
                    </OverlappingImages>
                );
            }
            if (ele.campaign_placement.length === 1) {
                if (ele.campaign_placement[0] === 'facebook') {
                    obj.campaign_placement = <Facebook />;
                } else {
                    obj.campaign_placement = <Instagram />;
                }
            }
            if (ele.end_date === '') {
                obj.end_date = 'DD/MM/YY';
            }
            obj.sales = '$' + ele.sales;
            obj.daily_budget = '$' + ele.daily_budget;
            obj.spend = '$' + ele.spend;
            obj.roas = '$' + ele.roas;
            obj.impressions = '$' + ele.impressions;
            obj.clicks = '$' + ele.clicks;
            obj.orders = '$' + ele.orders;
            return obj;
        });
        setData([...newData]);
    };
    // function change the pagination count on change
    const countChange = (count: number) => {
        let page = count.toString();
        let val = pageArr.find((ele) => ele.value === page);
        if (val) {
            setOptionPagination(val.value);
        }
    };
    let end = Number(optionPagination);

    const nextChange = () => {
        currentPage = currentPage + 1;
        setCurrentPage(currentPage);
        manageGrid();
    };
    const prevChange = () => {
        currentPage = currentPage - 1;
        setCurrentPage(currentPage);
        manageGrid();
    };
    const enterChange = (page: string | number) => {
        currentPage = Number(page);
        setCurrentPage(currentPage);
        manageGrid();
    };
    const manageGrid = () => {
        let copyData = gridData;
        start =
            Number(optionPagination) * currentPage -
            (Number(optionPagination) + 1);
        end = Number(optionPagination) * currentPage;
        data = copyData.slice(start + 1, end);
        setData(data);
        designGridData(data);
    };

    const handlePopOver = () => {
        setPopOver(!popOver);
    };

    const addColumn = (obj: any) => {
        let checked = gridHeading.newColumns.findIndex(
            (ele) => ele.dataIndex === obj.dataIndex
        );
        gridHeading.newColumns[checked].checked =
            !gridHeading.newColumns[checked].checked;

        let newHeadingData = [...gridHeading.gridHead];
        let cond = gridHeading.gridHead.findIndex(
            (item) => item.dataIndex === obj.dataIndex
        );
        if (cond == -1) {
            newHeadingData.splice(newHeadingData.length - 1, 0, obj);
        } else {
            newHeadingData.splice(cond, 1);
        }
        setGridheading({ ...gridHeading, gridHead: newHeadingData });
    };

    return (
        <>
            <PageHeader
                title="Welcome to Social Ads for Buy with Prime!"
                description="Create and manage all your Buy with Prime Facebook and Instagram campaigns here."
                action={
                    <Button
                        icon={<Plus />}
                        thickness="large"
                        onClick={() =>
                            navigate(`/panel/${_props.redux.user_id}/campaign`)
                        }>
                        Create Campaign
                    </Button>
                }
            />
            <Card
                cardType="Default"
                title={'Campaigns'}
                action={
                    <Button
                        icon={<Download size={16} color="#3B424F" />}
                        type="Outlined"
                        thickness="large">
                        <TextStyles
                            content="Download Report"
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            textcolor="dark"
                        />
                    </Button>
                }>
                <FlexLayout
                    direction="vertical"
                    desktopWidth="100"
                    spacing="loose">
                    <hr />
                    <FlexLayout valign="center" halign="fill">
                        <FlexChild desktopWidth="50">
                            <TextField
                                innerPreIcon={
                                    <Search color="#70747E" size={20} />
                                }
                                placeHolder="Search Campaign"
                                thickness="thin"
                            />
                        </FlexChild>
                        <FlexChild desktopWidth="50">
                            <FlexLayout spacing="loose" halign="end">
                                <AdvanceFilter
                                    type="Outlined"
                                    icon={<Filter color="#3B424F" size={16} />}
                                    filters={[]}
                                    button="Filter"
                                    heading="Filters"
                                />

                                <Popover
                                    onClose={handlePopOver}
                                    activator={
                                        <Button
                                            type="Outlined"
                                            icon={
                                                <Plus
                                                    color="#3B424F"
                                                    size={16}
                                                />
                                            }
                                            thickness="thin"
                                            onClick={handlePopOver}>
                                            <TextStyles
                                                content="Manage Coloumns"
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                            />
                                        </Button>
                                    }
                                    open={popOver}
                                    popoverContainer="body"
                                    popoverWidth={165}>
                                    <FlexLayout
                                        direction="vertical"
                                        spacing="loose">
                                        {gridHeading.newColumns.map(
                                            (ele, index) => {
                                                return (
                                                    <FlexLayout
                                                        key={index}
                                                        wrap="noWrap">
                                                        <CheckBox
                                                            onClick={() =>
                                                                addColumn(ele)
                                                            }
                                                            checked={
                                                                ele.checked
                                                            }
                                                            labelVal={ele.title}
                                                        />
                                                    </FlexLayout>
                                                );
                                            }
                                        )}
                                    </FlexLayout>
                                </Popover>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                    <Grid
                        columns={gridHeading.gridHead}
                        dataSource={data}
                        scrollX={1400}
                    />
                    <Pagination
                        countPerPage={optionPagination}
                        currentPage={currentPage}
                        onCountChange={(count) => countChange(count)}
                        onEnter={
                            (page: string | number) => enterChange(Number(page))
                        }
                        onNext={nextChange}
                        onPrevious={() => prevChange()}
                        optionPerPage={pageArr}
                        totalitem={gridData.length}
                    />
                </FlexLayout>
            </Card>
        </>
    );
};

export default DI(Dashboard);
