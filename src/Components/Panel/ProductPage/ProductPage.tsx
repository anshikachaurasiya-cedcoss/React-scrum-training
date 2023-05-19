import {
    Accordion,
    ActionList,
    AdvanceFilter,
    Alert,
    AutoComplete,
    Button,
    Card,
    CheckBox,
    Dots,
    FlexLayout,
    FormElement,
    Grid,
    Image,
    Modal,
    PageHeader,
    Pagination,
    Popover,
    Skeleton,
    Tag,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import './ProductPage.css';
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Filter, MoreVertical, RefreshCcw } from 'react-feather';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';
import noimg2 from '../../../Actions/Images-del/no-img.png';
import { pageArr } from '../../ConstantArrays';
import { EmptyProduct } from '../../../Components/EmptyState/EmptyPages';

interface productProps extends DIProps {
    syncProducts: () => void;
    panel: any;
    setPanel: React.Dispatch<any>;
}

const ProductPage = (_props: productProps) => {
    const productsHead = [
        {
            dataIndex: 'main_image',
            key: 'main_image',
            title: 'Image',
        },
        {
            dataIndex: 'item_title',
            key: 'item_title',
            title: 'Title',
        },
    ];

    // const productFilterData = [
    //     { status: 'Active', checked: false },
    //     { status: 'Error', checked: false },
    //     { status: 'Pending', checked: false },
    // ];

    const {
        get: { getRefineProductsUrl, getRefineProductsCountsUrl },
        post: { solutionsUrl },
    } = urlFetchCalls;
    const {
        di: { GET, POST },
        syncProducts,
        setPanel,
        panel,
        error,
    } = _props;
    const [products, setProducts] = useState<any>({
        productLoading: false,
        productsData: [],
    });
    const [modalErrors, setModalErrors] = useState<any>([]);

    const [pagination, setPagination] = useState({
        countPerPage: 5,
        currentPage: 1,
        totalItems: 0,
    });
    const [filtersArr, setFiltersArr] = useState([
        { status: 'Active', checked: false },
        { status: 'Error', checked: false },
        { status: 'Pending', checked: false },
    ]);
    const [showFilters, setShowFilters] = useState<any>({
        showFilterBadges: [],
        showBadges: false,
        searchVal: '',
        searchedValues: [],
        searchLoading: false,
    });
    const [open, setOpen] = useState({
        filterPopOver: false,
        errorModal: false,
        // syncModal: false,
    });
    const { productLoading, productsData } = products;
    const { syncProductData, syncModal } = panel;
    const { filterPopOver, errorModal } = open;
    const {
        showFilterBadges,
        showBadges,
        searchVal,
        searchedValues,
        searchLoading,
    } = showFilters;
    const { countPerPage, currentPage, totalItems } = pagination;

    // function hits the api of getting the products data
    const getProductsData = async () => {
        setProducts({ ...products, productLoading: true });
        let paramsObj = {
            activePage: pagination.currentPage,
            count: pagination.countPerPage,
            is_only_parent_allow: false,
        };
        await GET(getRefineProductsUrl, paramsObj).then((res) => {
            GET(getRefineProductsCountsUrl, paramsObj).then((response) => {
                setProducts({ ...products, productLoading: false });
                setPagination({
                    ...pagination,
                    totalItems: response.data.count,
                    currentPage: res.data.totalPageRead,
                    countPerPage: pagination.countPerPage,
                });
                designProductsData(res.data.rows);
            });
        });
    };

    // function formats the data and renders the data in UI
    const designProductsData = (rows: any) => {
        let newData = rows.map((ele: any, index: number) => {
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
                    <Image src={noimg2} alt="" width={48} height={48} />
                );
            }
            if (
                ele.items.length === 1 &&
                ele.items[0].visibility === 'Catalog and Search'
            ) {
                {
                    obj.item_title = (
                        <TextStyles
                            utility="light--text"
                            content={ele.items[0].title}
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            textcolor="#4E4F52"
                        />
                    );
                }
            } else {
                if (ele.items.length > 0) {
                    obj.item_title = (
                        <FlexLayout direction="vertical" valign="start">
                            <TextStyles
                                utility="light--text"
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
            // if (ele.items[0].visibility === 'Catalog and Search') {
            //     obj.value = ele.items[0].title;
            //     obj.label = ele.items[0].title;
            // }
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
        setProducts({ ...products, productsData: [...newData] });
    };
    // function renders the status column on the basis of the status
    const renderStatusList = (obj: any) => {
        let error: any;
        let active: any;
        let pending: any;
        if (obj.items.length === 1) {
            obj.items.map((ele: any) => {
                if (ele.status && ele.status === 'error') {
                    error = (
                        <div onClick={() => showError(obj)} key={ele.status}>
                            <FlexLayout
                                spacing="tight"
                                valign="center"
                                wrap="noWrap">
                                <AlertTriangle color="#C4281C" size={20} />
                                <TextStyles
                                    utility="underline"
                                    content={` Errors`}
                                    textcolor="negative"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    fontweight="bold"
                                />
                            </FlexLayout>
                        </div>
                    );
                } else if (ele.status && ele.status === 'active') {
                    active = (
                        <FlexLayout
                            key={ele.status}
                            spacing="tight"
                            valign="center"
                            wrap="noWrap">
                            <Dots status="completed" />
                            <TextStyles
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                content={' Active'}
                            />
                        </FlexLayout>
                    );
                } else if (
                    (ele.status && ele.status === 'pending') ||
                    !ele.status
                ) {
                    pending = (
                        <FlexLayout
                            key={ele.status}
                            spacing="tight"
                            valign="center"
                            wrap="noWrap">
                            <Dots status="none" />
                            <TextStyles
                                utility="light--text"
                                type="Paragraph"
                                paragraphTypes="SM-1.3"
                                content="Pending"
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
        } else if (obj.items.length > 1) {
            obj.items.map((ele: any) => {
                if (ele.status && ele.status === 'error') {
                    error = (
                        <div onClick={() => showError(obj)}>
                            <FlexLayout
                                spacing="tight"
                                valign="center"
                                wrap="noWrap">
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
                        </div>
                    );
                } else if (ele.status && ele.status === 'active') {
                    active = (
                        <FlexLayout
                            spacing="tight"
                            valign="center"
                            wrap="noWrap">
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
                } else if (ele.status && ele.status === 'pending') {
                    pending = (
                        <FlexLayout
                            spacing="mediumTight"
                            valign="center"
                            wrap="noWrap">
                            <Dots status="none" />
                            <TextStyles
                                utility="light--text"
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
                } else {
                    pending = (
                        <FlexLayout
                            spacing="mediumTight"
                            valign="center"
                            wrap="noWrap">
                            <Dots status="none" />
                            <TextStyles
                                utility="light--text"
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

    const showError = (obj: any) => {
        let ParamsArr: any = [];
        let newObj: any = {};
        let errorArr: any = [];
        obj.items.forEach((ele: any) => {
            if (ele.status === 'error') {
                if (ele.errors) {
                    ele.errors.forEach((innerEle: any) => {
                        let paramObj = {
                            title: innerEle.title,
                            marketplace: 'meta',
                        };
                        newObj = {
                            sku: ele.sku,
                            title: innerEle.title,
                            description: innerEle.description,
                            source_product_id: ele.source_product_id,
                            solutionAction: false,
                        };
                        errorArr.push(newObj);
                        ParamsArr.push(paramObj);
                    });
                }
            }
        });
        POST(solutionsUrl, ParamsArr).then((res) => {
            openModal();
            if (res.success) {
                res.data.forEach((ele: any, index: number) => {
                    errorArr[index] = { ...errorArr[index], ...ele };
                });
                const myobj: any = {};
                errorArr.forEach((err: any) => {
                    if (err.sku in myobj) {
                        myobj[err.sku].push(err);
                    } else {
                        myobj[err.sku] = [err];
                    }
                });
                setModalErrors([myobj]);
            } else {
                error(
                    'Sorry, the request was unsuccessful. Please try again later.'
                );
                setOpen({ ...open, errorModal: false });
            }
        });
    };

    const openModal = () => {
        setOpen({ ...open, errorModal: !errorModal });
    };

    const openErrorAccordian = (ele: any, i: number) => {
        if ('errorAction' in modalErrors[0][ele])
            modalErrors[0][ele]['errorAction'] =
                !modalErrors[0][ele]['errorAction'];
        else {
            modalErrors[0][ele]['errorAction'] = true;
        }
        setModalErrors([...modalErrors]);
    };
    // function renders the action list
    const renderActionList = (obj: any) => {
        if (obj.items.length === 1) {
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
                    [`filter[items.status][10][${n++}]`]:
                        ele.status.toLowerCase(),
                });
            }
        });
        let parObj = {
            is_only_parent_allow: false,
            activePage: currentPage,
            count: countPerPage,
        };
        Object.assign(parObj, obj);
        GET(getRefineProductsUrl, parObj).then((res) => {
            GET(getRefineProductsCountsUrl, {
                activePage: currentPage,
                count: countPerPage,
            }).then((response) => {});
            designProductsData(res.data.rows);
            setPagination({
                ...pagination,
                currentPage: res.data.totalPageRead,
                countPerPage: res.data.current_count,
            });
        });
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

    useEffect(() => {
        let obj: any = {};
        let arr: any = [];
        if (searchVal !== '') {
            setShowFilters({ ...showFilters, searchLoading: true });
            let search = setTimeout(() => {
                GET(getRefineProductsUrl, {
                    'filter[title][3]': searchVal,
                    is_only_parent_allow: false,
                    activePage: 1,
                    count: 5,
                }).then((res) => {
                    setShowFilters({ ...showFilters, searchLoading: false });
                    if (res.success) {
                        // if (res.success.rows.length > 0) {
                        res.data.rows.forEach((ele: any) => {
                            obj = { value: ele.title, label: ele.title };
                            Object.assign(obj, ele);
                            arr.push(obj);
                        });
                        renderSearchedData(arr);
                    } else {
                        error(res.message);
                    }
                });
            }, 1000);
            return () => clearTimeout(search);
        }
    }, [searchVal]);

    useEffect(() => {
        getProductsData();
        syncProducts();
    }, []);

    const renderSearchedData = (searchedArr: any) => {
        if (searchVal === '') {
            // setPagination({
            //     ...pagination,
            //     currentPage: 1,
            //     countPerPage: 5,
            // });
            // getProductsData();
        } else {
            setShowFilters((prev: any) => {
                return { ...prev, searchedValues: searchedArr };
            });
        }
    };
    const selectSearch = (val: any) => {
        let arr: any = [];
        searchedValues.forEach((ele: any) => {
            if (ele.title.toLowerCase().includes(val.toLowerCase())) {
                arr.push(ele);
            }
        });
        setPagination({
            ...pagination,
            totalItems: 1,
            currentPage: 1,
            countPerPage: 5,
        });
        designProductsData(arr);
    };

    const openSolutionAccordian = (ele: any, i: number) => {
        Object.values(modalErrors[0]).forEach((item: any, index) => {
            if (
                item.sku === ele.sku &&
                item.source_product_id === ele.source_product_id
            ) {
                item.solutionAction = !item.solutionAction;
            }
        });
        setModalErrors([...modalErrors]);
    };
    const closeFilter = () => {
        filtersArr.forEach((ele) => {
            if (ele.checked === true) {
                ele.checked = false;
            }
        });
        setFiltersArr([...filtersArr]);
    };

    const syncModalOpen = () => {
        panel.syncModal = !panel.syncModal;
        setPanel({ ...panel });
    };

    const searchingOnEnter = (val: any) => {
        setPagination({
            ...pagination,
            currentPage: 1,
            countPerPage: 5,
            totalItems: searchedValues.length,
        });
        designProductsData(searchedValues);
    };
    return (
        <>
            <PageHeader
                title="Products"
                description="Your Buy with Prime products and their status appear here."
                action={
                    productsData.length > 0 ? (
                        <Button
                            content="Catalog Sync"
                            icon={<RefreshCcw size={16} color="#FAFAFB" />}
                            onClick={() => syncModalOpen()}
                        />
                    ) : (
                        ''
                    )
                }
            />

            <Modal
                open={syncModal}
                close={syncModalOpen}
                heading="Sync your product catalog"
                secondaryAction={{
                    content: 'cancel',
                    type: 'Outlined',
                    onClick: () => syncModalOpen(),
                }}
                primaryAction={{
                    content: 'Yes',
                    type: 'Primary',
                    onClick: () => syncProducts(),
                    loading: panel.apiLoading,
                }}>
                Are you sure you want to sync your product catalog?
            </Modal>
            {productLoading === true ? (
                <Card>
                    <FlexLayout
                        direction="vertical"
                        spacing="loose"
                        desktopWidth="100">
                        <FlexLayout halign="fill" wrap="noWrap" spacing="loose">
                            <Skeleton width="90px" height="20px" />
                            <Skeleton width="30px" />
                        </FlexLayout>
                        <Skeleton line={8} />
                        <FlexLayout>
                            <Skeleton width="80px" line={1} /> <Skeleton />
                        </FlexLayout>
                    </FlexLayout>
                </Card>
            ) : productsData.length > 0 ? (
                <Card cardType="Default">
                    <FlexLayout
                        spacing="loose"
                        direction="vertical"
                        desktopWidth="100"
                        mobileWidth="100"
                        tabWidth="100">
                        {Object.keys(syncProductData).length > 0 &&
                        syncProductData.open === true ? (
                            <Alert
                                onClose={() => {
                                    syncProductData.open =
                                        !syncProductData.open;
                                    setPanel({ ...panel });
                                }}
                                type={syncProductData.color}
                                destroy={syncProductData.open}
                                children={syncProductData.message}
                                desciption={syncProductData.heading}
                            />
                        ) : (
                            ''
                        )}
                        <FlexLayout valign="center" halign="fill">
                            <AutoComplete
                                onEnter={(val: any) => searchingOnEnter(val)}
                                loading={searchLoading}
                                options={searchedValues}
                                placeHolder="Search Products"
                                thickness="thin"
                                onChange={(e: any) => {
                                    setShowFilters({
                                        ...showFilters,
                                        searchVal: e,
                                    });
                                }}
                                value={searchVal}
                                clearButton
                                setHiglighted
                                clearFunction={() => {
                                    setShowFilters({
                                        ...showFilters,
                                        searchVal: '',
                                    });
                                    getProductsData();
                                }}
                                onClick={(val: any) => selectSearch(val)}
                            />
                            <AdvanceFilter
                                onClose={closeFilter}
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
                                <Card
                                    cardType="Subdued"
                                    extraClass="badge--card">
                                    <Popover
                                        popoverWidth={210}
                                        activator={
                                            showFilterBadges.length > 1 ? (
                                                <Tag
                                                    count={`+${
                                                        showFilterBadges.length -
                                                        1
                                                    }`}
                                                    popover
                                                    togglePopup={() =>
                                                        setOpen({
                                                            ...open,
                                                            filterPopOver:
                                                                !filterPopOver,
                                                        })
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
                                                    togglePopup={() =>
                                                        setOpen({
                                                            ...open,
                                                            filterPopOver:
                                                                !filterPopOver,
                                                        })
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
                                        open={filterPopOver}
                                    />
                                </Card>
                            ) : (
                                <></>
                            )}
                        </FlexLayout>
                        <Grid
                            scrollX={700}
                            loading={productsData.length > 0 ? false : true}
                            columns={[
                                ...productsHead,
                                {
                                    render: (obj: any) => renderStatusList(obj),
                                    key: 'item_status',
                                    title: 'Status',
                                    width: 200,
                                },
                                {
                                    render: (obj: any) => renderActionList(obj),
                                    key: 'actions',
                                    title: 'Actions',
                                    width: 100,
                                },
                            ]}
                            dataSource={productsData}
                        />
                        <Pagination
                            countPerPage={countPerPage}
                            currentPage={parseInt(currentPage.toString())}
                            optionPerPage={pageArr}
                            totalitem={totalItems}
                            onCountChange={(page) =>
                                setPagination({
                                    ...pagination,
                                    countPerPage: page,
                                    currentPage: 1,
                                })
                            }
                            onEnter={(page) =>
                                setPagination({
                                    ...pagination,
                                    currentPage: Number(page),
                                })
                            }
                            onNext={() => {
                                pagination.currentPage =
                                    Number(currentPage) + 1;
                                setPagination({
                                    ...pagination,
                                });
                                getProductsData();
                            }}
                            onPrevious={() => {
                                pagination.currentPage =
                                    Number(currentPage) - 1;
                                setPagination({ ...pagination });
                                getProductsData();
                            }}
                        />
                    </FlexLayout>
                </Card>
            ) : (
                <EmptyProduct />
            )}
            <Modal open={errorModal} close={openModal} heading="Errors">
                <FlexLayout direction="vertical" spacing="loose">
                    {modalErrors.length > 0 &&
                        Object.entries(modalErrors[0]).map(
                            ([key, value]: any, i) => {
                                return (
                                    <Accordion
                                        key={key}
                                        title={
                                            <TextStyles
                                                content={`Variants sku: ${key}`}
                                                textcolor="negative"
                                            />
                                        }
                                        iconAlign="right"
                                        onClick={() =>
                                            openErrorAccordian(key, i)
                                        }
                                        active={
                                            modalErrors[0][key].errorAction
                                        }>
                                        <Card cardType="Default">
                                            {value.map(
                                                (item: any, index: any) => {
                                                    return (
                                                        <FlexLayout
                                                            key={item.title}
                                                            spacing="loose"
                                                            direction="vertical">
                                                            <FlexLayout
                                                                key={item.title}
                                                                wrap="noWrap"
                                                                spacing="loose">
                                                                <AlertTriangle
                                                                    size={20}
                                                                    color="#C4281C"
                                                                />
                                                                <FlexLayout
                                                                    direction="vertical"
                                                                    spacing="extraTight">
                                                                    <TextStyles
                                                                        content={
                                                                            item.title
                                                                        }
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="bold"
                                                                    />
                                                                    <TextStyles
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="normal"
                                                                        textcolor="#4E4F52"
                                                                        content={
                                                                            item.description
                                                                        }
                                                                    />
                                                                    {item.solution_exists ===
                                                                    true ? (
                                                                        <Accordion
                                                                            title="Resolutions"
                                                                            onClick={() =>
                                                                                openSolutionAccordian(
                                                                                    item,
                                                                                    index
                                                                                )
                                                                            }
                                                                            active={
                                                                                value.solutionAction
                                                                            }
                                                                            children={
                                                                                <TextStyles
                                                                                    content={
                                                                                        ''
                                                                                        // ele.answer
                                                                                    }
                                                                                    type="Paragraph"
                                                                                    paragraphTypes="MD-1.4"
                                                                                    lineHeight="LH-2.0"
                                                                                    textcolor="#4E4F52"
                                                                                />
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </FlexLayout>
                                                            </FlexLayout>
                                                            <hr />
                                                        </FlexLayout>
                                                    );
                                                }
                                            )}
                                        </Card>
                                    </Accordion>
                                );
                            }
                        )}
                </FlexLayout>
            </Modal>
        </>
    );
};

export default DI(ProductPage);
