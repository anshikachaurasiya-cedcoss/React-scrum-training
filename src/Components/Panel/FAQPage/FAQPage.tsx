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
import React from 'react';
import { PlusCircle } from 'react-feather';
import './FAQPage.css';

const FAQPage = () => {
    return (
        <>
            <PageHeader title="Frequently Asked Questions" />
            <FlexLayout desktopWidth="100" direction="vertical" spacing="loose">
                <AutoComplete options={[]} placeHolder="Search" />
                <Card title="Common Queries">
                    <FlexLayout spacing="loose" direction="vertical">
                        {[1, 2, 3, 4, 5].map((ele) => {
                            return <Accordion title="dsdsd dsdsd dsds " />;
                        })}
                        <div className="faq--btn">
                            <Button
                                icon={<PlusCircle size={20} color="#5C5F62" />}
                                type="Outlined">
                                <TextStyles
                                    content="Show more"
                                    fontweight="extraBold"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                />
                            </Button>
                        </div>
                    </FlexLayout>
                </Card>
                <Card>
                    <Skeleton line={5} />
                </Card>
                <Card>
                    <Skeleton line={5} />
                </Card>
            </FlexLayout>
        </>
    );
};

export default FAQPage;
