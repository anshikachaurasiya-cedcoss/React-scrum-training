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
    Tag,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { gridData, filterVal, pageArr, searchedData } from '../ConstantArrays';
import {
    Download,
    Plus,
    Filter,
    MoreVertical,
    AlertTriangle,
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
    const gridHead = [
        {
            dataIndex: 'campaign_name',
            fixed: 'left',
            key: 'campaign_name',
            title: (
                <TextStyles
                    content="Campaigns"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'statusComponent',
            fixed: 'left',
            key: 'status',
            title: (
                <TextStyles
                    content="Status"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'campaign_placement',
            key: 'campaign_placement',
            title: (
                <TextStyles
                    content="Placement"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'start_date',
            key: 'start_date',
            title: (
                <TextStyles
                    content="Start Date"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'end_date',
            key: 'end_date',
            title: (
                <TextStyles
                    content="End Date"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'daily_budget',
            key: 'daily_budget',
            title: (
                <TextStyles
                    content="Daily Budget"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'spend',
            key: 'spend',
            title: (
                <TextStyles
                    content="Spend"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
        {
            dataIndex: 'sales',
            key: 'sales',
            title: (
                <TextStyles
                    content="Sales"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
        },
    ];
    const newColumns = [
        {
            dataIndex: 'impressions',
            key: 'impressions',
            title: (
                <TextStyles
                    content="Impressions"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
            heading: 'Impressions',
            checked: false,
        },
        {
            dataIndex: 'clicks',
            key: 'clicks',
            title: (
                <TextStyles
                    content="Clicks"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
            heading: 'Clicks',
            checked: false,
        },
        {
            dataIndex: 'orders',
            key: 'orders',
            title: (
                <TextStyles
                    content="Orders"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
            heading: 'Orders',
            checked: false,
        },
        {
            dataIndex: 'roas',
            key: 'roas',
            title: (
                <TextStyles
                    content="ROAS"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
            ),
            heading: 'ROAS',
            checked: false,
        },
    ];
    // destructuring of fetching calls
    const {
        get: { getCampaignsUrl, bulkExportCSV, getCampaignsAutoCompleteUrl },
    } = urlFetchCalls;
    // const destructuring of props
    const {
        di: {
            GET,
            globalState: { get },
        },
        redux: { current },
    } = _props;
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

    const [popOver, setPopOver] = useState({
        addItemPopOver: false,
        filterPopOver: false,
    });
    const [filtersArr, setFiltersArr] = useState(filterVal);
    const [showFilter, setShowFilter] = useState<any>({
        showFilters: [],
        showFilterBadges: false,
        searchedValues: [],
    });
    const [gridHeading, setGridheading] = useState({
        gridHead: gridHead,
        newColumns: newColumns,
    });
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState({ optionPagination: 5, currentPage: 1 });
    const [searchVal, setSearchVal] = useState('');
    // destructuring of states
    const { showFilters, showFilterBadges, searchedValues } = showFilter;
    // function opens the action list on clicking the action option
    const openActionList = (obj: any) => {
        let newData = [...data];
        let index = newData.findIndex(
            (ele: any) => ele.campaign_id === obj.campaign_id
        );
        newData[index].action = !newData[index].action;
        setData([...newData]);
    };
    // function renders the action list
    const renderActionList = (obj: any) => {
        if (
            obj.status === 'PENDING' ||
            obj.status === 'ENDED' ||
            obj.status === 'DISCONNECTED' ||
            obj.status === 'ARCHIVED'
        ) {
            return (
                <Button
                    disable
                    type="TextButton"
                    icon={<MoreVertical size={20} color="#8C9098" />}
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
                                    content: 'Edit',
                                    onClick: function noRefCheck() {},
                                },
                                {
                                    content: 'Archive',
                                    onClick: function noRefCheck() {},
                                },
                                {
                                    content: 'Pause',
                                    onClick: function noRefCheck() {},
                                },
                            ],
                        },
                    ]}
                    open={obj.action}
                />
            );
        }
    };

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
    // check handler function for filtered checkboxes
    const filterHandler = (ele: any, i: number) => {
        let index = filtersArr.findIndex((item) => item.status === ele.status);
        filtersArr[index].checked = !filtersArr[index].checked;
        setFiltersArr([...filtersArr]);
    };
    // function sets the filter and hits the filter api
    const applyFilter = () => {
        let obj: any = {};
        let n = 0;
        manageFilter();
        filtersArr.forEach((ele: any) => {
            if (ele.checked) {
                Object.assign(obj, { [`filter[status][${n++}]`]: ele.status });
            }
        });
        let parObj = {
            shop_id: current?.target._id,
            'filter[shop_id]': current?.target._id,
            order: 1,
            count: 5,
            activePage: 2,
        };
        Object.assign(parObj, obj);
        GET(getCampaignsUrl, parObj).then((res) => {});
    };
    const manageFilter = () => {
        showFilter.showFilters = [];
        filtersArr.forEach((ele) => {
            if (ele.checked) {
                showFilter.showFilters.push(ele);
            }
        });
        if (showFilter.showFilters.length === 0) {
            showFilter.showFilterBadges = false;
        } else {
            showFilter.showFilterBadges = true;
        }
        setShowFilter({ ...showFilter });
    };
    // function enables or disables the reset or apply button of advance Filter
    const disableBtn = () => {
        let obj = filtersArr.find((ele) => ele.checked === true);
        if (obj !== undefined) {
            return false;
        }
        if (obj === undefined) {
            return true;
        }
    };
    // function removes filter of particular selected item
    const removeItemFilter = (ele: any) => {
        let ind = filtersArr.findIndex(
            (item: any) => item.status === ele.status
        );
        filtersArr[ind].checked = false;
        setFiltersArr([...filtersArr]);
        applyFilter();
    };
    // function removes all the filters
    const removeAllFilter = () => {
        setShowFilter({
            ...showFilter,
            showFilters: [],
            showFilterBadges: false,
        });
        let removedFilters = [...filtersArr];
        removedFilters.forEach((ele) => {
            ele.checked = false;
        });
        setFiltersArr([...removedFilters]);
    };

    // useEffect used to call the function which hits the api of get campaigns data
    useEffect(() => {
        getCampaginsData();
    }, []);
    // useEffect sets the pagination after every change in state of optionpagination
    useEffect(() => {
        setPage({ ...page, currentPage: 1 });
        let copy = gridData;
        let copyData = copy.slice(0, Number(page.optionPagination));
        setData(copyData);
        designGridData(copyData);
    }, [page.optionPagination]);
    // function fetches the data from getCampains api
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
            if (obj.action) {
                obj.action = true;
            } else {
                obj.action = false;
            }
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
    // function sets the pagination on clicking of next
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
    // function sets the pagination on clicking of previous
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
    }; // function sets the pagination on Enter
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
    // function handles the add item popover
    const handlePopOver = () => {
        setPopOver({ ...popOver, addItemPopOver: !popOver.addItemPopOver });
    };
    // function handles the filter popover
    const handleFilterPopOver = () => {
        setPopOver({ ...popOver, filterPopOver: !popOver.filterPopOver });
    };
    // function adds or delets the new column
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

    const searchHandler = (e: any) => {
        setSearchVal(e);
    };

    useEffect(() => {
        const getSearchedData = setTimeout(() => {
            GET(getCampaignsAutoCompleteUrl, {
                shop_id: current?.target._id,
                keyword: searchVal,
            }).then((res) => {
                renderSearchedData();
            });
        }, 1000);
        return () => clearTimeout(getSearchedData);
    }, [searchVal]);

    const renderSearchedData = () => {
        let searched: any = [];
        let newSearch = searchedData.map((ele) => {
            let searchedObj: any = { ...ele };
            searchedObj.value = ele.campaign_name;
            searchedObj.label = ele.campaign_name;
            return searchedObj;
        });
        newSearch.forEach((ele) => {
            if (ele.value.includes(searchVal)) {
                searched.push(ele);
            }
        });
        setShowFilter({ ...showFilter, searchedValues: searched });
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
                        onClick={() => navigate('campaign')}>
                        Create Campaign
                    </Button>
                }
            />
            <Card
                cardType="Default"
                title={
                    <TextStyles
                        content="Campaigns"
                        utility="dashedLine"
                        type="SubHeading"
                        subheadingTypes="XS-1.6"
                        fontweight="extraBold"
                    />
                }
                action={
                    <Button
                        icon={<Download size={16} color="#3B424F" />}
                        type="Outlined"
                        thickness="large"
                        onClick={downloadCampaign}>
                        <TextStyles
                            content="Download Report"
                            utility="dashedLine"
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            fontweight="bold"
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
                                onChange={(e: any) => searchHandler(e)}
                                placeHolder="Search Campaign"
                                thickness="thin"
                                options={searchedValues}
                                clearButton
                                setHiglighted
                                clearFunction={() => setSearchVal('')}
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
                                    disableReset={disableBtn()}
                                    resetFilter={removeAllFilter}
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
                                                            labelVal={
                                                                ele.heading
                                                            }
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
                        {showFilterBadges === true ? (
                            <Card cardType="Subdued" extraClass="badge--card">
                                <Popover
                                    popoverWidth={210}
                                    activator={
                                        showFilters.length > 1 ? (
                                            <Tag
                                                count={`+${
                                                    showFilters.length - 1
                                                }`}
                                                popover
                                                togglePopup={
                                                    handleFilterPopOver
                                                }
                                                destroy={removeAllFilter}>
                                                <FlexLayout
                                                    valign="center"
                                                    halign="center"
                                                    wrap="noWrap"
                                                    spacing="tight">
                                                    <TextStyles content="Status:" />
                                                    <TextStyles
                                                        content={
                                                            showFilters[0]
                                                                .status
                                                        }
                                                        type="Paragraph"
                                                        paragraphTypes="MD-1.4"
                                                    />
                                                </FlexLayout>
                                            </Tag>
                                        ) : (
                                            <Tag
                                                destroy={removeAllFilter}
                                                togglePopup={
                                                    handleFilterPopOver
                                                }>
                                                <FlexLayout
                                                    valign="center"
                                                    halign="center"
                                                    wrap="noWrap"
                                                    spacing="tight">
                                                    <TextStyles content="Status:" />
                                                    <TextStyles
                                                        content={
                                                            showFilters[0]
                                                                .status
                                                        }
                                                        type="Paragraph"
                                                        paragraphTypes="MD-1.4"
                                                    />
                                                </FlexLayout>
                                            </Tag>
                                        )
                                    }
                                    popoverContainer="body"
                                    children={
                                        <FlexLayout spacing="extraTight">
                                            {showFilters.map((ele: any) => {
                                                return (
                                                    <Tag
                                                        key={ele.staus}
                                                        destroy={() =>
                                                            removeItemFilter(
                                                                ele
                                                            )
                                                        }>
                                                        {ele.status}
                                                    </Tag>
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
                        columns={[
                            ...gridHeading.gridHead,
                            {
                                render: (obj: any) => renderActionList(obj),
                                fixed: 'right',
                                key: 'actions',
                                title: (
                                    <TextStyles
                                        content="Actions"
                                        utility="dashedLine dashedLine--block"
                                        type="Paragraph"
                                        paragraphTypes="MD-1.4"
                                        fontweight="bold"
                                    />
                                ),
                            },
                        ]}
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
