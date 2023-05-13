import {
    Accordion,
    Button,
    Card,
    FlexChild,
    FlexLayout,
    PageHeader,
    Skeleton,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import GenerateTicket from '../../../Asests/Images/svg/GenerateTicket';
import EmailHelp from '../../../Asests/Images/svg/EmailHelp';
import { DI, DIProps } from '../../../Core';
import { APP_TARGET_NAME, urlFetchCalls } from '../../../Constant';

const HelpPage = (_props: DIProps) => {
    const {
        di: { POST },
    } = _props;
    const {
        post: { faqGetData },
    } = urlFetchCalls;
    const [faq, setFaq] = useState<any>({ faqData: [] });
    const { faqData } = faq;
    useEffect(() => {
        getFaqData();
    }, []);
    const getFaqData = () => {
        POST(faqGetData, { marketplace: APP_TARGET_NAME, limit: 5 }).then(
            (res) => {
                if (res.success) {
                    renderTopFaq(res.data);
                }
            }
        );
    };

    const renderTopFaq = (data: any) => {
        Object.entries(data).forEach(([key, value]: any) => {
            Object.entries(value).forEach(([innerKey, innerValue]: any) => {
                if (innerValue.data.length > 0) {
                    faq.faqData.push(innerValue.data[0]);
                }
            });
        });
        setFaq({ ...faq });
    };
    return (
        <>
            <PageHeader title="Help" />
            <FlexLayout spacing="loose" direction="vertical">
                <FlexLayout spacing="loose" valign="center" desktopWidth="100">
                    <Card>
                        <FlexLayout spacing="loose" valign="center">
                            <FlexChild
                                desktopWidth="50"
                                tabWidth="100"
                                mobileWidth="100">
                                <Card cardType="Bordered">
                                    <FlexLayout wrap="noWrap" halign="fill">
                                        <FlexLayout
                                            spacing="extraLoose"
                                            direction="vertical">
                                            <FlexLayout
                                                spacing="extraTight"
                                                direction="vertical">
                                                <TextStyles
                                                    content="Email"
                                                    fontweight="extraBold"
                                                    type="SubHeading"
                                                    subheadingTypes="XS-1.6"
                                                />
                                                <TextStyles
                                                    content="We love hearing from you. Your feedback and suggestions are appreciated."
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                />
                                            </FlexLayout>
                                            <Button
                                                type="Outlined"
                                                onClick={() =>
                                                    (window.location.href =
                                                        'mailto:socialads@cedcommerce.com')
                                                }>
                                                Write To Us
                                            </Button>
                                        </FlexLayout>
                                        <EmailHelp />
                                    </FlexLayout>
                                </Card>
                            </FlexChild>
                            <FlexChild
                                desktopWidth="50"
                                tabWidth="100"
                                mobileWidth="100">
                                <Card cardType="Bordered">
                                    <FlexLayout wrap="noWrap" halign="fill">
                                        <FlexLayout
                                            spacing="extraLoose"
                                            direction="vertical">
                                            <FlexLayout
                                                spacing="extraTight"
                                                direction="vertical">
                                                <TextStyles
                                                    content="Generate Ticket"
                                                    fontweight="extraBold"
                                                    type="SubHeading"
                                                    subheadingTypes="XS-1.6"
                                                />
                                                <TextStyles
                                                    content="Is something bothering you? Raise a ticket for a quick resolution."
                                                    type="Paragraph"
                                                    paragraphTypes="MD-1.4"
                                                />
                                            </FlexLayout>
                                            <Button
                                                type="Outlined"
                                                onClick={() =>
                                                    window.open(
                                                        'https://socialsadsforbwp.freshdesk.com/en/support/home'
                                                    )
                                                }>
                                                Generate Ticket
                                            </Button>
                                        </FlexLayout>
                                        <GenerateTicket />
                                    </FlexLayout>
                                </Card>
                            </FlexChild>
                        </FlexLayout>
                    </Card>
                </FlexLayout>
                <Card
                    title="Frequently Asked Question"
                    action={
                        <Button type="TextButton">View All FAQ Articles</Button>
                    }>
                    {console.log(faqData)}
                    {faqData.length === 0 ? (
                        <Skeleton line={5} />
                    ) : (
                        faqData.map((ele: any) => {
                            return <Accordion title={ele.title} />;
                        })
                    )}
                </Card>
            </FlexLayout>
        </>
    );
};

export default DI(HelpPage);
