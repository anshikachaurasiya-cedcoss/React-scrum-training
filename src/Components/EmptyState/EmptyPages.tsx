import { Button, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';
import EmptyState from './EmptyState';
import {
    NotFound,
    NoCamp,
    NoProduct1,
    EmptyNotification,
    NoAccount,
    BrokenPage,
    NoSearchResult,
    SessionExpire,
    Nofaq,
    NoCampFoundInSearch,
    NoProductFoundInSearch,
    NoInternet,
} from './EmptyIllustration';
import { Plus } from 'react-feather';
import './emptystate.css';

export const PageNotFound = (_props: any) => (
    <EmptyState
        extraclass="not_found_page"
        illustration={<NotFound />}
        title="Page Not Found"
        subTitle={
            <>
                <FlexLayout spacing="extraTight" direction="vertical">
                    <TextStyles
                        alignment="center"
                        fontweight="normal"
                        paragraphTypes="MD-1.4"
                        textcolor="light"
                        type="Paragraph"
                        utility="none">
                        The page you are looking for might have been removed,
                        modified, or temporarily unavailable.
                    </TextStyles>
                    <FlexLayout spacing="extraTight" halign="center">
                        <TextStyles
                            alignment="center"
                            fontweight="normal"
                            paragraphTypes="MD-1.4"
                            textcolor="light"
                            type="Paragraph"
                            utility="none">
                            Need Help? Read our
                        </TextStyles>
                        <Button
                            halign="Center"
                            iconAlign="left"
                            length="none"
                            onAction={function noRefCheck() {}}
                            onClick={() =>
                                window.open(
                                    `http://${window.location.host}/info/faq`
                                )
                            }
                            thickness="thin"
                            type="TextButton">
                            Help Doc
                        </Button>
                        <TextStyles
                            alignment="center"
                            fontweight="normal"
                            paragraphTypes="MD-1.4"
                            textcolor="light"
                            type="Paragraph"
                            utility="none">
                            for further details.
                        </TextStyles>
                    </FlexLayout>
                </FlexLayout>
            </>
        }
        action={
            <Button
                onClick={() => {
                    const user_id = _props.match.uId;
                    if (user_id == undefined) {
                        _props.history('/auth/login');
                    } else _props.history(`/panel/${user_id}/dashboard`);
                }}>
                Go to Home
            </Button>
        }
    />
);
export const EmptyCampaigns = (_props: any) => (
    <EmptyState
        title="Create your First Campaign"
        extraclass="empty_camp"
        subTitle={
            <>
                <FlexLayout spacing="extraTight" halign="center">
                    <TextStyles
                        alignment="center"
                        fontweight="normal"
                        paragraphTypes="MD-1.4"
                        textcolor="light"
                        type="Paragraph"
                        utility="with_action">
                        All you have to do now is start creating new campaigns.
                        You can view and manage all your campaigns here. In case
                        you need help understanding how to create and manage
                        campaigns, check out the{' '}
                        <Button
                            halign="Center"
                            iconAlign="left"
                            length="none"
                            onClick={() => {
                                window.open('');
                            }}
                            thickness="thin"
                            type="TextButton">
                            Help Doc.
                        </Button>
                    </TextStyles>
                </FlexLayout>
            </>
        }
        illustration={<NoCamp />}
        action={
            <Button
                halign="Center"
                icon={<Plus color="#fff" size={16} />}
                iconAlign="left"
                length="none"
                onAction={() => {}}
                onClick={() => {
                    const user_id = _props.match.uId;
                    _props.history(`/panel/${user_id}/dashboard/create`);
                }}
                thickness="large"
                type="Primary"
                iconRound={false}>
                Create Campaign
            </Button>
        }
    />
);
export const EmptyProduct = () => (
    <EmptyState
        extraclass="empty_product"
        title="No Product"
        subTitle={
            <FlexLayout spacing="extraTight" halign="center">
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action">
                    You haven’t any product yet. When you have, it'll show up
                    here.
                </TextStyles>
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action">
                    Need Help? Read our{' '}
                    <Button
                        halign="Center"
                        length="none"
                        onClick={() => {}}
                        thickness="thin"
                        type="TextButton">
                        Help doc
                    </Button>{' '}
                    for further details.
                </TextStyles>
            </FlexLayout>
        }
        illustration={<NoProduct1 />}
    />
);
export const NoNotification = (_props: any) => (
    <EmptyState
        illustration={<EmptyNotification />}
        title="No Notification"
        subTitle="Looks like you have no notifications yet."
        action={
            <Button
                halign="Center"
                length="none"
                onClick={() => {
                    const user_id = _props.match.uId;
                    _props.history(`/panel/${user_id}/dashboard`);
                }}
                thickness="large"
                type="Primary">
                Go to Home
            </Button>
        }
        extraclass="empty_notification"
    />
);

interface BrokenPage {
    cardType?:
        | 'Default'
        | 'Bordered'
        | 'Plain'
        | 'Subdued'
        | 'Shadowed'
        | undefined;
}
export const BrokenPage1 = (_props: BrokenPage) => (
    <EmptyState
        extraclass="empty_product"
        title="Broken Page"
        cardType={_props.cardType}
        subTitle={
            <FlexLayout
                spacing="extraTight"
                direction="vertical"
                halign="center">
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action">
                    Sorry! We have encountered an unidentified error.
                </TextStyles>
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action">
                    Need Help? Read our{' '}
                    <Button
                        halign="Center"
                        length="none"
                        onClick={() => {
                            window.open(
                                `http://${window.location.host}/info/faq`
                            );
                        }}
                        thickness="thin"
                        type="TextButton">
                        Help doc
                    </Button>{' '}
                    or Report this at{' '}
                    <Button
                        halign="Center"
                        length="none"
                        onClick={() => {
                            window.open('mailto:bwp_meta@cedcommerce.com');
                        }}
                        thickness="thin"
                        type="TextButton">
                        bwp_meta@cedcommerce.com
                    </Button>
                </TextStyles>
            </FlexLayout>
        }
        illustration={<BrokenPage />}
    />
);

export const FaqBroken = () => (
    <EmptyState
        extraclass="search_result"
        title="We’re facing a temporary issue"
        subTitle={
            <>
                <FlexLayout
                    spacing="extraTight"
                    halign="center"
                    direction="vertical">
                    <TextStyles
                        alignment="center"
                        fontweight="normal"
                        paragraphTypes="MD-1.4"
                        textcolor="light"
                        type="Paragraph"
                        utility="with_action">
                        Start counting to a hundred and we will be back right in
                        time.
                    </TextStyles>
                </FlexLayout>
            </>
        }
        illustration={<NoSearchResult />}
    />
);
export const SessionExpire1 = (_props: any, dispacher: any) => (
    <EmptyState
        cardType="Plain"
        extraclass="session_box"
        illustration={<SessionExpire />}
        title="Session Expired"
        subTitle={
            <TextStyles
                alignment="center"
                fontweight="normal"
                paragraphTypes="MD-1.4"
                textcolor="light"
                type="Paragraph"
                utility="with_action">
                Your session on this page has expired.
            </TextStyles>
        }
        action={
            <Button
                halign="Center"
                length="none"
                onAction={() => {}}
                onClick={() => {
                    _props.di.globalState.removeLocalStorage('auth_token');
                    _props.history('/auth/login');
                }}
                thickness="large"
                type="Primary">
                Login
            </Button>
        }
    />
);
export const Nofaqs = () => (
    <EmptyState
        extraclass="no_faq"
        illustration={<Nofaq />}
        title="No Search Result"
        subTitle={
            <TextStyles
                alignment="center"
                fontweight="normal"
                paragraphTypes="MD-1.4"
                textcolor="light"
                type="Paragraph"
                utility="with_action">
                We couldn't find a match for your search query. Please try
                again.
            </TextStyles>
        }
    />
);
export const NoCampFoundInSearchC = () => (
    <EmptyState
        extraclass="no_faq"
        illustration={<NoCampFoundInSearch />}
        title="No Campaigns found"
        subTitle={
            <TextStyles
                alignment="center"
                fontweight="normal"
                paragraphTypes="MD-1.4"
                textcolor="light"
                type="Paragraph"
                utility="with_action">
                Looks like your request does not match the listed campaigns.
            </TextStyles>
        }
    />
);

export const NoProductFoundInSearchC = () => (
    <EmptyState
        extraclass="no_faq"
        cardType="Plain"
        illustration={<NoProductFoundInSearch />}
        title="No Product found!"
        subTitle={
            <>
                <FlexLayout
                    spacing="extraTight"
                    halign="center"
                    direction="vertical">
                    <TextStyles
                        alignment="center"
                        fontweight="normal"
                        paragraphTypes="MD-1.4"
                        textcolor="light"
                        type="Paragraph"
                        utility="with_action">
                        Looks like your request does not match the listed
                        products.
                    </TextStyles>
                </FlexLayout>
            </>
        }
    />
);

export const OnboardingFallback = () => (
    <EmptyState
        extraclass="no_faq"
        illustration={<NoAccount />}
        title="there is some issue please come after some time!"
        subTitle={
            <FlexLayout
                spacing="extraTight"
                halign="center"
                direction="vertical">
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action">
                    Please retry loging in again to continue onboarding
                </TextStyles>
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action">
                    <Button
                        halign="Center"
                        length="none"
                        onClick={() => {}}
                        thickness="thin"
                        type="TextButton">
                        Report
                    </Button>{' '}
                    an issue to us.
                </TextStyles>
            </FlexLayout>
        }
    />
);

export const Nointernet = () => (
    <EmptyState
        extraclass="no_internet"
        illustration={<NoInternet />}
        title="Internet Connection Interrupted!"
        subTitle={
            <FlexLayout
                spacing="extraTight"
                halign="center"
                direction="vertical">
                <TextStyles
                    alignment="center"
                    fontweight="normal"
                    paragraphTypes="MD-1.4"
                    textcolor="light"
                    type="Paragraph"
                    utility="with_action mt-2">
                    We couldn’t connect to the Internet. Please check your
                    connection.
                </TextStyles>
            </FlexLayout>
        }
    />
);
