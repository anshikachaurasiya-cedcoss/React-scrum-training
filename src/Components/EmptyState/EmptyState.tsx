import { Card, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import React, { FC } from 'react';
import './emptystate.css';
const EmptyState: FC<EmptyStateI> = (props: EmptyStateI) => {
    return (
        <div className={`empty_state_pages ${props.extraclass}`}>
            <Card cardType={props.cardType ?? 'Default'}>
                <FlexLayout direction="vertical" spacing="tight" wrap='noWrap'>
                    <div className="empty_state_illustration">
                        {props.illustration}
                    </div>

                    <TextStyles
                        alignment="center"
                        fontweight="extraBold"
                        subheadingTypes="XS-1.6"
                        textcolor="dark"
                        type="SubHeading"
                        utility="none">
                        {props.title}
                    </TextStyles>

                    <div className="empty-subtitle">
                        <TextStyles
                            alignment="center"
                            fontweight="normal"
                            paragraphTypes="MD-1.4"
                            textcolor="light"
                            type="Paragraph"
                            utility="none">
                            {props.subTitle}
                        </TextStyles>
                    </div>
                    {props.action && (
                        <div className="state_actions">{props.action}</div>
                    )}
                </FlexLayout>
            </Card>
        </div>
    );
};
export interface EmptyStateI {
    title?: string | React.ReactNode;
    subTitle?: string | React.ReactNode;
    action?: React.ReactNode;
    illustration?: React.ReactNode;
    extraclass?: string;
    cardType?:
        | 'Default'
        | 'Bordered'
        | 'Plain'
        | 'Subdued'
        | 'Shadowed'
        | undefined;
}
export default EmptyState;
