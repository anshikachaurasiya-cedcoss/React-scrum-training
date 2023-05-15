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
import React, { useEffect } from 'react';
import GenerateTicket from '../../../Asests/Images/svg/GenerateTicket';
import EmailHelp from '../../../Asests/Images/svg/EmailHelp';
import { DI, DIProps } from '../../../Core';
import { FaqBroken } from '../../../Components/EmptyState/EmptyPages';

interface helpProps extends DIProps {
    menu: (
        | {
              id: string;
              content: string;
              icon: JSX.Element;
              path: string;
              extraClass?: undefined;
          }
        | {
              id: string;
              content: string;
              icon: JSX.Element;
              path: string;
              extraClass: string;
          }
    )[];
    changeHandler: (e: any) => void;
    faq: any;
    setFaq: React.Dispatch<any>;
}

const HelpPage = (_props: helpProps) => {
    const { menu, changeHandler, faq, setFaq } = _props;

    const { faqData, dataLoading, helpFaqData } = faq;
    useEffect(() => {
        if (Object.keys(faqData).length > 0) {
            renderTopFaq();
        }
    }, [faqData]);

    const renderTopFaq = () => {
        Object.entries(faqData).forEach(([key, value]: any) => {
            Object.entries(value).forEach(([innerKey, innerValue]: any) => {
                if (innerValue.data.length > 0) {
                    let obj = { faqOpen: false };
                    Object.assign(obj, innerValue.data[0]);
                    faq.helpFaqData.push(obj);
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
                        <Button
                            type="TextButton"
                            onClick={() => changeHandler(menu[4])}>
                            View All FAQ Articles
                        </Button>
                    }>
                    {dataLoading === true && <Skeleton />}

                    {helpFaqData.length > 0 ? (
                        helpFaqData.map((ele: any, index: number) => {
                            return (
                                <Accordion
                                    title={ele.title}
                                    key={ele}
                                    onClick={() => {
                                        helpFaqData[index].faqOpen =
                                            !helpFaqData[index].faqOpen;
                                        setFaq({ ...faq });
                                    }}
                                    active={ele.faqOpen}
                                    children={
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: ele.answer,
                                            }}
                                        />
                                    }
                                />
                            );
                        })
                    ) : (
                        <FaqBroken />
                    )}
                </Card>
            </FlexLayout>
        </>
    );
};

export default DI(HelpPage);
