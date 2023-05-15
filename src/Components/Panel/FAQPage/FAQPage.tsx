import {
    Accordion,
    AutoComplete,
    Button,
    Card,
    FlexLayout,
    PageHeader,
    Skeleton,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef } from 'react';
import { PlusCircle } from 'react-feather';
import './FAQPage.css';
import { Nofaqs } from '../../../Components/EmptyState/EmptyPages';
import { DI, DIProps } from '../../../Core';
import { APP_TARGET_NAME, urlFetchCalls } from '../../../Constant';

interface faqProps extends DIProps {
    faq: any;
    setFaq: React.Dispatch<any>;
}
const FAQPage = (_props: faqProps) => {
    const {
        faq,
        setFaq,
        di: { POST },
        error,
    } = _props;
    const {
        post: { faqGetData },
    } = urlFetchCalls;
    const {
        faqData,
        dataLoading,
        faqs,
        btnLoading,
        searchValue,
        searchedData,
        renderSearcedData,
        showSearch,
    } = faq;
    const controller = useRef<any>(null);
    useEffect(() => {
        if (Object.keys(faqData).length > 0) renderFaq();
    }, [faqData]);

    const renderFaq = () => {
        let innerObj: any = {};
        Object.values(faqData).forEach((value: any) => {
            Object.entries(value).forEach(([innerKey, innerValue]: any) => {
                let newObj = innerValue.data.map((ele: any) => {
                    return Object.assign(ele, { faqOpen: false });
                });
                if (!Object.keys(faqs).includes(innerValue.group_name)) {
                    innerObj[innerValue.group_name] = {
                        arr: newObj,
                        next_page: innerValue.next_page,
                    };
                    faq.faqs = innerObj;
                } else {
                    Object.entries(faqs).forEach(([keys, values]: any) => {
                        if (innerValue.group_name === keys) {
                            values.next_page = innerValue.next_page;
                            values.arr = [...values.arr, ...newObj];
                        }
                    });
                }
            });
        });
        setFaq({ ...faq });
    };

    const getNextFaq = (key: any, value: any) => {
        setFaq({ ...faq, btnLoading: true });
        let params = {
            group: key.toLowerCase(),
            next: true,
            marketplace: APP_TARGET_NAME,
            limit: 5,
            lastId: value.arr[value.arr.length - 1]._id,
        };
        POST(faqGetData, params).then((res) => {
            faq.btnLoading = false;
            if (res.success) {
                faq.faqData = res.data;
            } else {
                error(res.message);
            }
            setFaq({ ...faq });
        });
    };
    useEffect(() => {
        if (searchValue !== '') {
            setFaq({ ...faq, btnLoading: true });
            controller.current = new AbortController();
            const { signal } = controller.current;
            let search = setTimeout(() => {
                let params: any = {
                    keyword: searchValue,
                    limit: 10,
                    marketplace: APP_TARGET_NAME,
                };
                fetch(
                    'https://testing-app-backend.bwpapps.com/webapi/rest/v1/faq/search',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(params),
                        signal,
                    }
                )
                    .then((res) => res.json())
                    .then((res) => {
                        faq.btnLoading = false;
                        if (res.success) {
                            Object.entries(res.data).forEach(
                                ([key, value]: any) => {
                                    Object.entries(value).forEach(
                                        ([innerKey, innerValue]: any) => {
                                            innerValue.data.forEach(
                                                (ele: any) => {
                                                    let obj: any = {
                                                        value: ele.title,
                                                        label: ele.title,
                                                    };
                                                    Object.assign(obj, ele);
                                                    faq.searchedData.push(obj);
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                        setFaq({ ...faq });
                    });
            }, 2000);
            return () => {
                clearTimeout(search);
                controller.current.abort();
            };
        }
    }, [searchValue]);

    const searchHandler = (value: any) => {
        faq.showSearch = true;
        searchedData.forEach((ele: any) => {
            if (ele.title === value) {
                faq.renderSearcedData = ele;
                let obj = { faqOpen: false };
                Object.assign(obj, ele);
                faq.renderSearcedData = obj;
            }
        });
        setFaq({ ...faq });
    };
    return (
        <>
            <PageHeader title="Frequently Asked Questions" />
            <FlexLayout desktopWidth="100" direction="vertical" spacing="loose">
                <AutoComplete
                    clearButton={searchValue !== '' ? true : false}
                    clearFunction={() =>
                        setFaq({
                            ...faq,
                            showSearch: false,
                            renderSearcedData: {},
                            searchValue: '',
                        })
                    }
                    options={searchedData}
                    placeHolder="Search"
                    value={searchValue}
                    onChange={(value: any) =>
                        setFaq({ ...faq, searchValue: value })
                    }
                    setHiglighted
                    loading={btnLoading}
                    onClick={(value: any) => searchHandler(value)}
                />
                {showSearch === true ? (
                    <Card>
                        <Accordion
                            title={renderSearcedData.title}
                            active={renderSearcedData.faqOpen}
                            onClick={() => {
                                renderSearcedData.faqOpen =
                                    !renderSearcedData.faqOpen;
                                setFaq({ ...faq });
                            }}
                            children={
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: renderSearcedData.answer,
                                    }}
                                />
                            }
                        />
                    </Card>
                ) : dataLoading === true ? (
                    <Skeleton line={10} />
                ) : Object.entries(faqs).length > 0 ? (
                    Object.entries(faqs).map(([key, value]: any) => {
                        return (
                            <Card title={key} key={key}>
                                <FlexLayout
                                    spacing="loose"
                                    direction="vertical">
                                    {value.arr.map((innerEle: any) => {
                                        return (
                                            <Accordion
                                                title={innerEle.title}
                                                key={innerEle._id}
                                                active={innerEle.faqOpen}
                                                onClick={() => {
                                                    innerEle.faqOpen =
                                                        !innerEle.faqOpen;
                                                    setFaq({ ...faq });
                                                }}>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: innerEle.answer,
                                                    }}
                                                />
                                            </Accordion>
                                        );
                                    })}
                                    {value.next_page !== null ? (
                                        <div className="faq--btn">
                                            <Button
                                                loading={btnLoading}
                                                onClick={() =>
                                                    getNextFaq(key, value)
                                                }
                                                icon={
                                                    <PlusCircle
                                                        size={20}
                                                        color="#5C5F62"
                                                    />
                                                }
                                                type="Outlined">
                                                <TextStyles
                                                    content="Show more"
                                                    fontweight="extraBold"
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                />
                                            </Button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </FlexLayout>
                            </Card>
                        );
                    })
                ) : (
                    <Nofaqs />
                )}
            </FlexLayout>
        </>
    );
};

export default DI(FAQPage);
