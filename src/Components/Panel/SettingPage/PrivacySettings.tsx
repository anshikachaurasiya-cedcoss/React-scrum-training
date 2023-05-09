import { Card, CheckBox, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';

const PrivacySettings = () => {
    return (
        <Card
            title="Privacy Settings"
            primaryAction={{ content: 'Save Changes', type: 'Primary' }}>
            <FlexLayout direction="vertical" spacing="loose">
                <TextStyles content="Under state-specific privacy laws, your customers may have the right to opt out of your sale or sharing of their personal information for cross-context behavioral advertising. You can choose to restrict how your customers' personal information is used by your ad channels." />
                <TextStyles content="For the Meta CAPI, you can turn on the Limited Data Use flag below for all of your Buy with Prime orders." />
                <CheckBox labelVal="Turn on Limited Data Use flag for Meta CAPI" />
            </FlexLayout>
        </Card>
    );
};

export default PrivacySettings;
