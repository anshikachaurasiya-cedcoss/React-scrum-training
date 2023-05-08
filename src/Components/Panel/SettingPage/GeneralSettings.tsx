import { Button, Card, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';
import { Edit } from 'react-feather';
import './SettingsPage.css';

const GeneralSettings = () => {
    return (
        <Card title="General Details">
            <FlexLayout direction="vertical" spacing="loose">
                <FlexLayout direction="vertical" spacing="extraTight">
                    <TextStyles content="Store URL" />
                    <TextStyles
                        content="amzn://apps/android?"
                        utility="light--text"
                    />
                </FlexLayout>
                <FlexLayout direction="vertical" spacing="extraTight">
                    <TextStyles content="Email" />
                    <TextStyles
                        content="jessica.hanson@example.com"
                        utility="light--text"
                    />
                </FlexLayout>
                <FlexLayout wrap="noWrap" halign="fill">
                    <FlexLayout direction="vertical" spacing="extraTight">
                        <TextStyles content="Store / Brand Name" />
                        <TextStyles
                            content="Hanson Shop"
                            utility="light--text"
                        />
                    </FlexLayout>
                    <Button icon={<Edit size={16} />} type="Outlined">
                        Edit
                    </Button>
                </FlexLayout>
            </FlexLayout>
        </Card>
    );
};

export default GeneralSettings;
