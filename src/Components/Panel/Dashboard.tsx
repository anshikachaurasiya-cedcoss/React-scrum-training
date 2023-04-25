import {
    ActionList,
    AdvanceFilter,
    AutoComplete,
    Badge,
    Button,
    Card,
    CheckBox,
    FlexChild,
    FlexLayout,
    FormElement,
    Grid,
    OverlappingImages,
    PageHeader,
    Pagination,
    Popover,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { gridData, newColumns, filterVal, pageArr } from '../ConstantArrays';
import {
    Download,
    Plus,
    Filter,
    MoreVertical,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
} from 'react-feather';
import { DI, DIProps } from '../../Core/DependencyInjection';
import { urlFetchCalls } from '../../Constant';
import Facebook from '../../Asests/Images/svg/Facebook';
import Instagram from '../../Asests/Images/svg/Instagram';
import { useNavigate } from 'react-router-dom';
import { environment } from '../../environments/environment';

type typeProps =
    | 'Neutral-100-Border'
    | 'Warning-100'
    | 'Neutral-100'
    | 'Positive-100'
    | 'Positive-200'
    | 'Neutral-300'
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
const Dashboard = (_props: PropsI) => {
    const {
        get: { getCampaignsUrl, bulkExportCSV, getCampaignsAutoCompleteUrl },
    } = urlFetchCalls;
    const statusArr: badgeProps = [
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
    const [actionList, setActionList] = useState(false);
    const [popOver, setPopOver] = useState({
        addItemPopOver: false,
        filterPopOver: false,
    });
    const [searchVal, setSearchVal] = useState('');

    const openActionList = (obj: any) => {
        // let newData = data;
        // console.log(newData);
        // data.forEach((ele: any) => {
        //     if (ele.campaign_id === obj.campaign_id) {
        //         console.log(newData);
        //     }
        // });
    };

    const renderActionList = (obj: any) => {
        if (
            obj.status === 'PENDING' ||
            obj.status === 'ENDED' ||
            obj.status === 'DISCONNECTED' ||
            obj.status === 'ARCHIVED'
        ) {
            return (
                <ActionList
                    activator={
                        <Button
                            disable
                            type="TextButton"
                            icon={<MoreVertical size={20} color="#8C9098" />}
                        />
                    }
                    options={[]}
                    open={actionList}
                />
            );
        } else {
            return (
                <ActionList
                    activator={
                        <Button
                            onClick={() => openActionList(obj)}
                            type="TextButton"
                            iconRound
                            icon={<MoreVertical size={20} color="#3B424F" />}
                        />
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
            );
        }
    };
    const gridHead = [
        {
            dataIndex: 'campaign_name',
            fixed: 'left',
            key: 'campaign_name',
            title: 'Campaign',
        },
        {
            dataIndex: 'statusComponent',
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
            render: (obj: any) => renderActionList(obj),
            fixed: 'right',
            key: 'actions',
            title: 'Actions',
        },
    ];

    const [filtersArr, setFiltersArr] = useState(filterVal);
    const [showFilter, setShowFilter] = useState<any>([]);
    const filterArr = [
        {
            children: (
                <FormElement>
                    {filtersArr.map((ele, i) => {
                        return (
                            <CheckBox
                                key={i}
                                labelVal={ele.status}
                                checked={ele.checked}
                                onClick={() => filterHandler(ele, i)}
                            />
                        );
                    })}
                </FormElement>
            ),
            name: 'Status',
        },
    ];
    const filterHandler = (ele: any, i: number) => {
        let filterObj = filtersArr.find((item) => item.status === ele.status);
        const ind = showFilter.findIndex((item: any) => item.checked === true);
        if (filterObj) {
            filtersArr[i].checked = !filtersArr[i].checked;
            setFiltersArr([...filtersArr]);
            if (filterObj.checked === true) {
                showFilter.push(filterObj);
            } else {
                showFilter.splice(ind, 1);
            }
            setShowFilter([...showFilter]);
        }
    };

    const disableBtn = () => {
        let obj = filtersArr.find((ele) => ele.checked === true);
        if (obj !== undefined) {
            return false;
        }
        if (obj === undefined) {
            return true;
        }
    };

    const applyFilter = () => {
        let obj = {};
        showFilter.forEach((ele: any, i: number) => {
            Object.assign(obj, { [`filter[status][${i}]`]: ele.status });
        });
        GET(getCampaignsUrl, {
            shop_id: current?.target._id,
            filter: JSON.stringify(obj),
            order: 1,
            count: 5,
            activePage: 2,
        }).then((res) => {});
    };

    const removeItemFilter = (ele: any) => {
        let ind = showFilter.findIndex(
            (item: any) => item.status === ele.status
        );
        let index = filtersArr.findIndex((item) => item.status === ele.status);
        let removedFilter = [...filtersArr];
        removedFilter[index].checked = false;
        setFiltersArr([...removedFilter]);
        let removedData = [...showFilter];
        removedData.splice(ind, 1);
        setShowFilter([...removedData]);
    };

    const removeAllFilter = () => {
        setShowFilter([]);
        let removedFilters = [...filtersArr];
        removedFilters.forEach((ele) => {
            ele.checked = false;
        });
        setFiltersArr([...removedFilters]);
    };

    const [gridHeading, setGridheading] = useState({
        gridHead: gridHead,
        newColumns: newColumns,
    });

    const navigate = useNavigate();

    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState({ optionPagination: 5, currentPage: 1 });
    // destructuring of fetching calls

    // const destructuring of props
    const {
        di: {
            GET,
            globalState: { get },
        },
        redux: { current },
    } = _props;
    // useEffect used to call the function which hits the api of get campaigns data
    useEffect(() => {
        getCampaginsData();
    }, []);

    useEffect(() => {
        // setCurrentPage(1);
        setPage({ ...page, currentPage: 1 });
        let copy = gridData;
        let copyData = copy.slice(0, Number(page.optionPagination));
        setData(copyData);
        designGridData(copyData);
    }, [page.optionPagination]);

    const getCampaginsData = () => {
        setData(() => gridData);
        designGridData(gridData);
        GET(getCampaignsUrl, {
            shop_id: _props.redux.account?.target.meta[0]._id,
            count: page.optionPagination,
            activePage: page.currentPage,
        }).then((res) => {});
    };

    // function design the data fetched from api
    const designGridData = (dataArr: any[]) => {
        let newData = dataArr.map((ele) => {
            let obj = { ...ele };
            let type = statusArr.find((item) => item.key === ele.status)?.type;
            obj.statusComponent = (
                <Badge
                    type={type}
                    size={'regular'}
                    children={<TextStyles content={ele.status.toLowerCase()} />}
                />
            );
            obj.action = false;
            if (ele.status === 'ERRORS') {
                obj.statusComponent = (
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
        let pageSelect = count.toString();
        let val = pageArr.find((ele) => ele.value === pageSelect);
        if (val) {
            setPage({ ...page, optionPagination: Number(val.value) });
        }
    };
    let end = Number(page.optionPagination);
    const nextChange = () => {
        let obj = { ...page };
        obj.currentPage = obj.currentPage + 1;
        let copyData = gridData;
        start = Number(page.optionPagination) * page.currentPage;
        end =
            Number(page.optionPagination) * page.currentPage +
            Number(page.optionPagination);
        let newData = copyData.slice(start, end);
        setPage({ ...obj });
        setData(() => newData);
        designGridData(newData);
    };
    const prevChange = () => {
        let copyData = gridData;
        let obj = { ...page };
        obj.currentPage = obj.currentPage - 1;
        start =
            Number(obj.optionPagination) * obj.currentPage -
            obj.optionPagination;
        end = Number(obj.optionPagination) * obj.currentPage;
        let newData = copyData.slice(start, end);
        setData(() => newData);
        setPage({ ...obj });
        designGridData(newData);
    };
    const enterChange = (current: string | number) => {
        let obj = { ...page };
        obj.currentPage = Number(current);
        start =
            Number(page.optionPagination) * Number(current) -
            Number(page.optionPagination) +
            1;
        end = Number(page.optionPagination) * Number(current);
        let copyData = gridData;
        let newData = copyData.slice(start - 1, end);
        setData([...newData]);
        setPage({ ...obj });
        designGridData(newData);
    };

    const handlePopOver = () => {
        setPopOver({ ...popOver, addItemPopOver: !popOver.addItemPopOver });
    };

    const handleFilterPopOver = () => {
        setPopOver({ ...popOver, filterPopOver: !popOver.filterPopOver });
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

    const searchHandler = () => {
        GET(getCampaignsAutoCompleteUrl, {
            shop_id: current?.target._id,
            keyword: searchVal,
        }).then((res) => {});
    };
    // function downloads the camapign Report in a csv format
    const downloadCampaign = () => {
        let url =
            environment.API_ENDPOINT +
            bulkExportCSV +
            `?shop_id=${_props.redux.current?.target._id}&bearer=${get(
                'auth_token'
            )}`;

        window.open(url);
    };
    const { addItemPopOver, filterPopOver } = popOver;
    const { currentPage, optionPagination } = page;
    return (
        <>
            <PageHeader
                title="Welcome to Social Ads for Buy with Prime!"
                description="Create and manage all your Buy with Prime Facebook and Instagram campaigns here."
                action={
                    <Button
                        icon={<Plus />}
                        thickness="large"
                        onClick={() => navigate(`campaign`)}>
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
                        thickness="large"
                        onClick={downloadCampaign}>
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
                    mobileWidth="100"
                    tabWidth="100"
                    spacing="loose">
                    <hr />
                    <FlexLayout valign="center" halign="fill" wrap="noWrap">
                        <FlexChild
                            desktopWidth="50"
                            mobileWidth="50"
                            tabWidth="50">
                            <AutoComplete
                                value={searchVal}
                                onEnter={searchHandler}
                                onChange={(e: any) => setSearchVal(e)}
                                placeHolder="Search Campaign"
                                thickness="thin"
                                options={[]}
                            />
                        </FlexChild>
                        <FlexChild
                            desktopWidth="50"
                            mobileWidth="50"
                            tabWidth="50">
                            <FlexLayout spacing="loose" halign="end">
                                <AdvanceFilter
                                    type="Outlined"
                                    icon={<Filter color="#3B424F" size={16} />}
                                    filters={filterArr}
                                    button="Filter"
                                    heading="Filters"
                                    disableApply={disableBtn()}
                                    onApply={applyFilter}
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
                                    open={addItemPopOver}
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
                    <FlexLayout>
                        {showFilter.length > 0 ? (
                            <Card cardType="Subdued" extraClass="badge--card">
                                <Popover
                                    activator={
                                        <Button
                                            onClick={handleFilterPopOver}
                                            type="Secondary">
                                            <FlexLayout
                                                spacing="tight"
                                                halign="center"
                                                valign="center">
                                                <TextStyles content="Status:" />
                                                <TextStyles
                                                    content={
                                                        showFilter[0].status
                                                    }
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                />
                                                {showFilter.length > 1 ? (
                                                    <Badge
                                                        size="small"
                                                        customBgColor="#3B424F"
                                                        badgeTextColor="#FAFAFB">
                                                        <FlexLayout
                                                            spacing="extraTight"
                                                            halign="center"
                                                            valign="center"
                                                            wrap="noWrap">
                                                            <TextStyles
                                                                content="+"
                                                                textcolor="#FAFAFB"
                                                            />
                                                            <TextStyles
                                                                textcolor="#FAFAFB"
                                                                content={
                                                                    showFilter.length -
                                                                    1
                                                                }
                                                                type="Paragraph"
                                                                paragraphTypes="XS-1.2"
                                                            />
                                                        </FlexLayout>
                                                    </Badge>
                                                ) : (
                                                    <></>
                                                )}
                                                {filterPopOver ? (
                                                    <ChevronUp
                                                        size={16}
                                                        color="#3B424F"
                                                    />
                                                ) : (
                                                    <ChevronDown
                                                        size={16}
                                                        color="#3B424F"
                                                    />
                                                )}
                                                <Button
                                                    thickness="extraThin"
                                                    content="X"
                                                    type="Secondary"
                                                    onClick={removeAllFilter}
                                                />
                                            </FlexLayout>
                                        </Button>
                                    }
                                    popoverContainer="body"
                                    children={
                                        <FlexLayout spacing="tight">
                                            {showFilter.map((ele: any) => {
                                                return (
                                                    <Badge
                                                        size="small"
                                                        type="Neutral-200"
                                                        key={ele}>
                                                        <FlexLayout
                                                            spacing="extraTight"
                                                            halign="center"
                                                            valign="center">
                                                            <TextStyles
                                                                content={
                                                                    ele.status
                                                                }
                                                                type="Paragraph"
                                                                paragraphTypes="MD-1.4"
                                                            />
                                                            <Button
                                                                content="X"
                                                                type="Secondary"
                                                                thickness="extraThin"
                                                                onClick={() =>
                                                                    removeItemFilter(
                                                                        ele
                                                                    )
                                                                }
                                                            />
                                                        </FlexLayout>
                                                    </Badge>
                                                );
                                            })}
                                        </FlexLayout>
                                    }
                                    open={filterPopOver}
                                />
                            </Card>
                        ) : (
                            <></>
                        )}
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
                        onEnter={(page: string | number) =>
                            enterChange(Number(page))
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
