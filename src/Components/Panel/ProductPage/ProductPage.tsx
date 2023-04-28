import {
    ActionList,
    AdvanceFilter,
    AutoComplete,
    Button,
    Card,
    CheckBox,
    Dots,
    FlexLayout,
    FormElement,
    Grid,
    Image,
    PageHeader,
    Pagination,
    Popover,
    Tag,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import './ProductPage.css';
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Filter, MoreVertical, RefreshCcw } from 'react-feather';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';
import { productsHead, productData, productFilterData } from './ProductsData';
import imageNotFound from '../../../Asests/Images/Image_not_found.png';
import { pageArr } from '../../ConstantArrays';

interface PropsI extends DIProps {}

const ProductPage = (_props: PropsI) => {
    const {
        get: { getRefineProductsUrl, getRefineProductsCountsUrl },
    } = urlFetchCalls;
    const {
        di: { GET },
    } = _props;
    const { rows } = productData;
    const [productsData, setProductsData] = useState<any>([]);
    const [pagination, setPagination] = useState({
        totalPageRead: 2,
        currentPage: 1,
    });
    const [filtersArr, setFiltersArr] = useState(productFilterData);
    const [showFilters, setShowFilters] = useState<any>({
        showFilterBadges: [],
        showBadges: false,
        searchVal: '',
    });
    const [managePopOver, setManagePopover] = useState(false);
    const { showFilterBadges, showBadges, searchVal } = showFilters;
    const { totalPageRead, currentPage } = pagination;
    useEffect(() => {
        getProductsData();
    }, []);
    // function hits the api of getting the products data
    const getProductsData = () => {
        setProductsData(rows);
        designProductsData(rows);
        GET(getRefineProductsUrl, { activePage: 1, count: 5 }).then((res) => {
            // setPagination({
            //     ...pagination,
            //     totalPageRead: res.data.totalPageRead,
            // });
        });
        GET(getRefineProductsCountsUrl, { activePage: 2, count: 5 }).then(
            (res) => {}
        );
    };
    // function formats the data and renders the data in UI
    const designProductsData = (rows: any) => {
        let newData = rows.map((ele: any) => {
            let obj = { ...ele };
            let error: any = [];
            let pending: any = [];
            let active: any = [];
            if (ele.main_image) {
                obj.main_image = (
                    <Image src={ele.main_image} alt="" width={48} height={48} />
                );
            } else {
                obj.main_image = (
                    <Image src={imageNotFound} alt="" width={48} height={48} />
                );
            }
            if (
                ele.items.length === 1 &&
                ele.items[0].visibility === 'Catalog and Search'
            ) {
                {
                    obj.item_title = ele.items[0].title;
                }
            } else {
                if (ele.items.length > 0) {
                    obj.item_title = (
                        <FlexLayout direction="vertical">
                            <TextStyles
                                content={ele.items[0].title}
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                textcolor="#4E4F52"
                            />
                            <TextStyles
                                content={`${ele.items.length - 1} Variants`}
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                fontweight="bold"
                                textcolor="#283140"
                            />
                        </FlexLayout>
                    );
                }
            }
            if (
                ele.items.length === 1 &&
                ele.items[0].visibility === 'Catalog and Search'
            ) {
                pending.push(ele);
            } else if (ele.items.length > 1) {
                ele.items.forEach((item: any) => {
                    if (item.visibility !== 'Catalog and Search') {
                        if (item.status && item.status === 'error') {
                            error.push(item);
                        } else if (item.status && item.status === 'pending') {
                            pending.push(item);
                        } else if (item.status && item.status === 'active') {
                            active.push(item);
                        } else {
                            pending.push(item);
                        }
                    }
                });
            }
            obj.status_arr = {
                pending: pending.length,
                active: active.length,
                error: error.length,
            };
            return obj;
        });

        setProductsData([...newData]);
    };
    // function renders the status column on the basis of the status
    const renderStatusList = (obj: any) => {
        let error: any;
        let active: any;
        let pending: any;
        if (obj.items.length === 1) {
            return (
                <FlexLayout spacing="tight" valign="center">
                    <Dots status="none" />
                    <TextStyles
                        type="Paragraph"
                        paragraphTypes="SM-1.3"
                        content="Pending"
                    />
                </FlexLayout>
            );
        } else if (obj.items.length > 1) {
            obj.items.map((ele: any) => {
                if (ele.status && ele.status === 'error') {
                    error = (
                        <FlexLayout spacing="tight" valign="center">
                            <AlertTriangle color="#C4281C" size={20} />
                            <TextStyles
                                utility="underline"
                                content={`${
                                    obj.status_arr.error < 10
                                        ? '0' + obj.status_arr.error
                                        : obj.status_arr.error
                                } Errors`}
                                textcolor="negative"
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                fontweight="bold"
                            />
                        </FlexLayout>
                    );
                } else if (ele.status && ele.status === 'active') {
                    active = (
                        <FlexLayout spacing="tight" valign="center">
                            <Dots status="completed" />
                            <TextStyles
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                content={`${
                                    obj.status_arr.active < 10
                                        ? '0' + obj.status_arr.active
                                        : obj.status_arr.active
                                } Active`}
                            />
                        </FlexLayout>
                    );
                } else if (
                    (ele.status && ele.status === 'pending') ||
                    ele.status === undefined
                ) {
                    pending = (
                        <FlexLayout spacing="mediumTight" valign="center">
                            <Dots status="none" />
                            <TextStyles
                                type="Paragraph"
                                paragraphTypes="SM-1.3"
                                content={`${
                                    obj.status_arr.pending < 10
                                        ? '0' + obj.status_arr.pending
                                        : obj.status_arr.pending
                                } Pending`}
                            />
                        </FlexLayout>
                    );
                }
            });
            return (
                <FlexLayout direction="vertical" valign="start">
                    {error}
                    {pending}
                    {active}
                </FlexLayout>
            );
        }
    };
    // function renders the action list
    const renderActionList = (obj: any) => {
        if (obj.status_arr.error === 0 && obj.status_arr.active === 0) {
            return (
                <div className="custom--disable_Btn">
                    <Button
                        disable
                        type="Plain"
                        icon={<MoreVertical size={20} color="#8C9098" />}
                    />
                </div>
            );
        } else {
            return (
                <ActionList
                    activator={
                        <div className="custom--enable_Btn">
                            <Button
                                type="Plain"
                                icon={
                                    <MoreVertical color="#3B424F" size={20} />
                                }
                            />
                        </div>
                    }
                    options={[]}
                />
            );
        }
    };
    // function sets the state on change of pagination
    const countChange = (page: any) => {
        setPagination({ ...pagination, totalPageRead: page });
    };
    // function sets the state on click of next button in pagination
    const nextPage = () => {
        let nextPage = currentPage + 1;
        setPagination({ ...pagination, currentPage: nextPage });
    };
    // function sets the state on click of the previous button in pagination
    const prevPage = () => {
        let prevPage = currentPage - 1;
        setPagination({ ...pagination, currentPage: prevPage });
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
    // function handles the checkboxes of filter
    const filterHandler = (obj: any, i: number) => {
        let index = filtersArr.findIndex((ele) => ele.status === obj.status);
        filtersArr[index].checked = !filtersArr[index].checked;
        setFiltersArr([...filtersArr]);
    };
    // function apply the filter on selected status
    const applyFilter = () => {
        let obj: any = {};
        let n = 0;
        manageFilter();
        filtersArr.forEach((ele: any) => {
            if (ele.checked) {
                Object.assign(obj, {
                    [`filter[items.status][10][${n++}]`]: ele.status,
                });
            }
        });
        let parObj = {
            is_only_parent_allow: false,
            count: 5,
            activePage: 2,
        };
        Object.assign(parObj, obj);
        GET(getRefineProductsUrl, parObj).then((res) => {});
    };
    const manageFilter = () => {
        showFilters.showFilterBadges = [];
        filtersArr.forEach((ele) => {
            if (ele.checked) {
                showFilters.showFilterBadges.push(ele);
            }
        });
        if (showFilters.showFilterBadges.length === 0) {
            showFilters.showBadges = false;
        } else {
            showFilters.showBadges = true;
        }
        setShowFilters({ ...showFilters });
    };
    // function resets the
    const resetFilters = () => {
        let filter = [...filtersArr];
        filter.forEach((ele) => {
            ele.checked = false;
        });
        setFiltersArr([...filter]);
    };
    const disableFilterBtn = () => {
        let obj = filtersArr.find((ele) => ele.checked === true);
        if (obj !== undefined) {
            return false;
        }
        if (obj === undefined) {
            return true;
        }
    };
    const handleFilterPopOver = () => {
        let open = !managePopOver;
        setManagePopover(open);
    };
    const removeItemFilter = (ele: any) => {
        let ind = filtersArr.findIndex(
            (item: any) => item.status === ele.status
        );
        filtersArr[ind].checked = false;
        setFiltersArr([...filtersArr]);
        applyFilter();
    };
    const removeAllFilter = () => {
        setShowFilters({
            ...showFilters,
            showFilterBadges: [],
            showBadges: false,
        });
        let removedFilters = [...filtersArr];
        removedFilters.forEach((ele) => {
            ele.checked = false;
        });
        setFiltersArr([...removedFilters]);
    };
    const searchHandler = (e: string) => {
        setShowFilters({ ...showFilters, searchVal: e });
    };
    useEffect(() => {
        let search = setTimeout(() => {
            GET(getRefineProductsUrl, {
                'filter[title][3]': searchVal,
            }).then((res) => {});
        }, 1000);
        return () => clearTimeout(search);
    }, [searchVal]);
    return (
        <>
            <PageHeader
                title="Products"
                description="Your Buy with Prime products and their status appear here."
                action={
                    <Button
                        content="Catalog Sync"
                        icon={<RefreshCcw size={16} color="#FAFAFB" />}
                    />
                }
            />
            <Card cardType="Default">
                <FlexLayout
                    spacing="loose"
                    direction="vertical"
                    desktopWidth="100">
                    <FlexLayout valign="center" halign="fill">
                        <AutoComplete
                            options={[]}
                            placeHolder="Search Products"
                            thickness="thin"
                            onChange={(e: any) => searchHandler(e)}
                            value={searchVal}
                            clearButton
                            clearFunction={() =>
                                setShowFilters({
                                    ...showFilters,
                                    searchVal: '',
                                })
                            }
                        />
                        <AdvanceFilter
                            filters={filterArr}
                            type="Outlined"
                            button="Filter"
                            icon={<Filter size={16} color="#3B424F" />}
                            disableApply={disableFilterBtn()}
                            disableReset={disableFilterBtn()}
                            resetFilter={resetFilters}
                            onApply={applyFilter}
                            heading="Filters"
                        />
                    </FlexLayout>
                    <FlexLayout>
                        {showBadges === true ? (
                            <Card cardType="Subdued" extraClass="badge--card">
                                <Popover
                                    popoverWidth={210}
                                    activator={
                                        showFilterBadges.length > 1 ? (
                                            <Tag
                                                count={`+${
                                                    showFilterBadges.length - 1
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
                                                            showFilterBadges[0]
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
                                                            showFilterBadges[0]
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
                                            {showFilterBadges.map(
                                                (ele: any) => {
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
                                                }
                                            )}
                                        </FlexLayout>
                                    }
                                    open={managePopOver}
                                />
                            </Card>
                        ) : (
                            <></>
                        )}
                    </FlexLayout>
                    <Grid
                        columns={[
                            ...productsHead,
                            {
                                render: (obj: any) => renderStatusList(obj),
                                key: 'item_status',
                                title: 'Status',
                            },
                            {
                                render: (obj: any) => renderActionList(obj),
                                key: 'actions',
                                title: 'Actions',
                            },
                        ]}
                        dataSource={productsData}
                    />
                    <Pagination
                        countPerPage={totalPageRead}
                        currentPage={currentPage}
                        optionPerPage={pageArr}
                        totalitem={productsData.length}
                        onCountChange={(page) => countChange(page)}
                        onNext={nextPage}
                        onPrevious={prevPage}
                    />
                </FlexLayout>
            </Card>
        </>
    );
};

export default DI(ProductPage);