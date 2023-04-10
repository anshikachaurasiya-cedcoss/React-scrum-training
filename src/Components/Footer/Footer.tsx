import React from 'react';
import { Button, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import { DI, DIProps } from '../../Core';
import './footer.css';
interface Props extends DIProps {
    hideSupport?: boolean;
}
function Footer(_props: Props) {
    const path = window.location.pathname;
    const help = path.includes('help');
    return (
        <>
            <div className="app-footer pb-20">
                <FlexLayout
                    spacing="extraTight"
                    halign="center"
                    valign="center">
                    <TextStyles
                        alignment="left"
                        fontweight="normal"
                        textcolor="light"
                        type="none"
                        utility="none">
                        CedCommerce Inc Product @2022.
                    </TextStyles>
                    {_props.hideSupport != true && !help && (
                        <TextStyles
                            alignment="left"
                            fontweight="normal"
                            textcolor="light"
                            type="none"
                            utility="none">
                            Need Help?
                        </TextStyles>
                    )}
                    {_props.hideSupport != true && !help && (
                        <Button
                            halign="Center"
                            iconAlign="left"
                            length="none"
                            onAction={() => {}}
                            onClick={() => {
                                if (_props.di.user_id == '1') {
                                    window.open(
                                        'http://' +
                                            window.location.host +
                                            '/info/help'
                                    );
                                } else {
                                    if (_props?.redux?.basic?.stepActive) {
                                        const steps: any =
                                            _props.redux.basic.stepActive;
                                        if (steps == 1) {
                                            _props.history(
                                                `/panel/${_props.di.user_id}/help`
                                            );
                                        } else {
                                            window.open(
                                                'http://' +
                                                    window.location.host +
                                                    '/info/help'
                                            );
                                        }
                                    } else {
                                        window.open(
                                            'http://' +
                                                window.location.host +
                                                '/info/help'
                                        );
                                    }
                                }
                            }}
                            thickness="thin"
                            type="TextButton">
                            Get Support
                        </Button>
                    )}
                </FlexLayout>
            </div>
        </>
    );
}
export default DI(Footer);
