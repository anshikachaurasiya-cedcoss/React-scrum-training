import { FlexLayout, List, TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../Core';

const CustomHelpPpoints = (_props: DIProps) => {
    return (
        <div className="custom-help-points mt-10">
            <FlexLayout
                spacing="extraTight"
                wrap="noWrap"
                valign="start"
                direction="vertical">
                <TextStyles textcolor="light">
                    To create a strong password make sure the password contains:
                </TextStyles>
                <List type="disc">
                    <TextStyles textcolor="light">
                        A minimum of 8 characters
                    </TextStyles>
                    <TextStyles textcolor="light">
                        An uppercase and a lowercase letter
                    </TextStyles>
                    <TextStyles textcolor="light">A number</TextStyles>
                    <TextStyles textcolor="light">
                        One special character
                    </TextStyles>
                </List>
            </FlexLayout>
        </div>
    );
};

export default DI(CustomHelpPpoints);
