import {
    Alert,
    Badge,
    Button,
    Card,
    FlexChild,
    FlexLayout,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { Edit, Plus } from 'react-feather';
import FbDisabled from '../../../Asests/Images/svg/FbDisabled';
import FbEnable from '../../../Asests/Images/svg/FbEnable';
import InstaEnable from '../../../Asests/Images/svg/InstaEnable';
import { DI, DIProps } from '../../../Core';
import './SettingsPage.css';

const AccountSettings = (_props: DIProps) => {
    return (
        <Card cardType="Default" title="Accounts">
            <FlexLayout spacing="loose" direction="vertical">
                <Card cardType="Bordered" title="Facebook / Instagram Accounts">
                    <FlexLayout spacing="loose" direction="vertical">
                        <FlexLayout wrap="noWrap" spacing="mediumTight">
                            <FbEnable />
                            <FlexChild desktopWidth="100">
                                <FlexLayout
                                    direction="vertical"
                                    spacing="loose">
                                    <FlexLayout
                                        wrap="noWrap"
                                        halign="fill"
                                        valign="center">
                                        <FlexLayout
                                            spacing="extraTight"
                                            direction="vertical">
                                            <TextStyles
                                                content="FB Account Name "
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                fontweight="extraBold"
                                            />
                                            <TextStyles
                                                content="Ads account name"
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                utility="light--text"
                                            />
                                            <Badge
                                                type="Positive-100"
                                                size="small">
                                                Active Account
                                            </Badge>
                                        </FlexLayout>
                                        <Button type="Outlined">Update</Button>
                                    </FlexLayout>
                                    <FlexLayout
                                        wrap="noWrap"
                                        valign="center"
                                        halign="fill">
                                        <FlexLayout
                                            spacing="extraTight"
                                            direction="vertical">
                                            <TextStyles
                                                content="Pixel ID"
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                            />
                                            <TextStyles
                                                content="277632452644288"
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                utility="light--text"
                                            />
                                        </FlexLayout>
                                        <Button
                                            type="Outlined"
                                            icon={<Edit size={20} />}>
                                            Edit
                                        </Button>
                                    </FlexLayout>
                                    <FlexLayout
                                        wrap="noWrap"
                                        halign="fill"></FlexLayout>
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                        <FlexLayout wrap="noWrap" spacing="tight">
                            <InstaEnable />
                            <FlexLayout
                                spacing="extraTight"
                                direction="vertical">
                                <TextStyles
                                    content="Instagram Account "
                                    utility="light--text"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                />
                                <TextStyles
                                    utility="blue--text"
                                    content="Learn how to connect your instagram account"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                />
                                <Badge type="Neutral-200" size="small">
                                    Not Connected
                                </Badge>
                            </FlexLayout>
                        </FlexLayout>
                    </FlexLayout>
                </Card>
                <Card cardType="Bordered" title="Disconnected Accounts">
                    <FlexLayout
                        spacing="loose"
                        direction="vertical"
                        valign="start">
                        <Alert destroy={false} type="info">
                            <TextStyles
                                utility="light--text"
                                content="We are currently retrieving information regarding your disconnected account. The details will be available shortly."
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                textcolor="#4E4F52"
                            />
                        </Alert>
                        <FlexLayout
                            spacing="loose"
                            halign="center"
                            wrap="noWrap"
                            valign="center">
                            <FbDisabled />
                            <FlexLayout
                                spacing="extraTight"
                                direction="vertical">
                                <TextStyles
                                    content="FB Account Name "
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    fontweight="extraBold"
                                />
                                <TextStyles
                                    utility="light--text"
                                    content="Ads account name"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                />
                            </FlexLayout>
                        </FlexLayout>
                        <FlexLayout
                            spacing="loose"
                            halign="center"
                            wrap="noWrap"
                            valign="center">
                            <FbDisabled />
                            <FlexLayout
                                spacing="extraTight"
                                direction="vertical">
                                <TextStyles
                                    content="FB Account Name "
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    fontweight="extraBold"
                                />
                                <TextStyles
                                    content="Ads account name"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    utility="light--text"
                                />
                            </FlexLayout>
                        </FlexLayout>
                        <FlexLayout
                            spacing="loose"
                            halign="center"
                            wrap="noWrap"
                            valign="center">
                            <FbDisabled />
                            <FlexLayout
                                spacing="extraTight"
                                direction="vertical">
                                <TextStyles
                                    content="FB Account Name "
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    fontweight="extraBold"
                                />
                                <TextStyles
                                    content="Ads account name"
                                    type="Paragraph"
                                    paragraphTypes="MD-1.4"
                                    utility="light--text"
                                />
                            </FlexLayout>
                        </FlexLayout>
                    </FlexLayout>
                </Card>
                <hr />
                <Button
                    icon={<Plus size={20} color="#3B424F" />}
                    content="Connect New Account"
                    type="Plain"
                    iconAlign="left"
                />
            </FlexLayout>
        </Card>
    );
};

export default DI(AccountSettings);
