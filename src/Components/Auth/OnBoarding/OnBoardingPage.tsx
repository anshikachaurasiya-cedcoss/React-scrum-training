import {
    Alert,
    Button,
    Card,
    FlexChild,
    FlexLayout,
    Image,
    List,
    Loader,
    TextLink,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import './OnBoardingPage.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Footer from '../../Footer/Footer';
import fbicon from '../../../Asests/Images/fbicon.png';
import onboardinglogo from '../../../Asests/Images/onboardinglogo.png';
import CheckField from '../../../Asests/Images/svg/CheckField';
import { DI, DIProps } from '../../../Core/DependencyInjection';
import { syncNecessaryInfo, syncConnectorInfo } from '../../../Actions';
import { urlFetchCalls } from '../../../Constant';
import { parseJwt } from '../../../Core';
import { StoreDispatcher } from '../../../';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Panel from '../../Panel/Panel';
import OnBoardingErrorModal from './OnBoardingErrorModal';

interface PropsI extends DIProps {
    syncNecessaryInfo: () => void;
    syncConnectorInfo: (_props: DIProps) => void;
}

const OnBoardingPage = (_props: PropsI) => {
    const {
        di: {
            globalState: { get },
            GET,
        },
        syncNecessaryInfo,
        syncConnectorInfo,
    } = _props;
    const {
        get: { installtionForm },
    } = urlFetchCalls;
    const [errorModal, setErrorModal] = useState(false);
    const [redirectLoader, setRedirectLoader] = useState(true);
    const [sec, setSec] = useState(2);
    const [fbResponse, setFbResponse] = useState<any>({});
    const timeRef = useRef<any>();

    let dispatcher = useContext(StoreDispatcher);
    let [searchParams] = useSearchParams();

    useEffect(() => {
        let success = searchParams.get('success');
        let message = searchParams.get('message');
        let auth_token = get('auth_token');
        if (success) {
            let obj = {
                success: false,
                message: message,
            };
            localStorage.removeItem('user_token');
            setFbResponse({ ...obj });
        }
        if (auth_token) {
            dispatcher({
                type: 'user_id',
                state: { user_id: parseJwt(auth_token).user_id },
            });
            syncConnectorInfo(_props);
        }
    }, []);

    useEffect(() => {
        clearInterval(timeRef.current);
        setInterval(() => {
            if (sec > 0) {
                setSec((sec) => sec - 1);
            }
        }, 1000);
        if (sec === 0) {
            syncNecessaryInfo();
            setRedirectLoader(false);
        }
    }, [sec]);
    const registerError = () => {
        openModalFunc();
    };

    const openModalFunc = () => {
        setErrorModal(!errorModal);
    };

    const connectFb = () => {
        let id = '';
        let token = get('auth_token');
        if (token) {
            id = parseJwt(token).user_id;
        }
        GET(installtionForm, {
            code: 'meta',
            state: {
                source_shop_id: get('source_id', true),
                app_tag: get('source_name', true),
                app_code: { onyx: 'bwp', meta: 'meta' },
                user_id: id,
                source: get('source_name', true),
            },
            bearer: token,
            currency: 'USD',
            timezone: 'EST',
        }).then((res) => {
            if (token !== null) {
                localStorage.setItem('user_token', token);
            }
        });
    };

    return (
        <>
            {redirectLoader || _props.redux.basic?.stepActive === undefined ? (
                <Loader type="Loader1" />
            ) : (
                <>
                    {Number(_props.redux.basic?.stepActive) === 0 ? (
                        <>
                            <div className="onBoarding__wrapper">
                                <FlexLayout direction="vertical">
                                    <FlexLayout
                                        wrap="noWrap"
                                        valign="center"
                                        spacing="loose">
                                        <img src={onboardinglogo} alt="" />
                                        <FlexLayout
                                            direction="vertical"
                                            spacing="extraTight">
                                            <TextStyles
                                                content="Welcome!"
                                                type="Heading"
                                                headingTypes="LG-2.8"
                                                textcolor="light"
                                                fontweight="light"
                                                lineHeight="LH-3.6"
                                            />
                                            <TextStyles
                                                content="Social Ads for Buy with Prime"
                                                type="Heading"
                                                headingTypes="LG-2.8"
                                                fontweight="extraBold"
                                                lineHeight="LH-3.6"
                                            />
                                        </FlexLayout>
                                    </FlexLayout>
                                    <Card>
                                        <FlexLayout
                                            wrap="noWrap"
                                            directionMob="vertical"
                                            wrapMob="wrap"
                                            spacing="loose">
                                            <FlexChild
                                                desktopWidth="50"
                                                tabWidth="50"
                                                mobileWidth="100">
                                                <Card cardType="Bordered">
                                                    <FlexLayout
                                                        spacing="tight"
                                                        direction="vertical"
                                                        valign="start">
                                                        <TextStyles
                                                            content="Things You Should know!"
                                                            type="subHeading"
                                                            subheadingTypes="XS-1.6"
                                                            fontweight="extraBold"
                                                        />
                                                        <List type="disc">
                                                            <TextStyles
                                                                type="Paragraph"
                                                                paragraphTypes="MD-1.4"
                                                                fontweight="light">
                                                                NOTE: Before
                                                                linking your
                                                                Meta account,
                                                                make sure your
                                                                Buy with Prime
                                                                catalog includes
                                                                all fields
                                                                required by
                                                                Meta, including
                                                                optional fields
                                                                not required by
                                                                Buy with Prime.
                                                                This includes
                                                                your site's
                                                                product detail
                                                                page URL and
                                                                your product
                                                                description.
                                                                These fields are
                                                                required to
                                                                build landing
                                                                pages for your
                                                                campaigns.
                                                                <TextLink
                                                                    extraClass="link--style"
                                                                    url="https://www.facebook.com/business/help/120325381656392?id=725943027795860"
                                                                    label="Check out this
                                            guide to know more"
                                                                />
                                                            </TextStyles>
                                                            <TextStyles>
                                                                Please note that
                                                                once you link
                                                                your account to
                                                                the app you will
                                                                be able to see
                                                                the Buy with
                                                                Prime catalog
                                                                everywhere you
                                                                manage Facebook
                                                                campaigns
                                                                including the
                                                                Facebook Ads
                                                                manager account.
                                                            </TextStyles>
                                                            <TextStyles>
                                                                Make sure the
                                                                product titles
                                                                are the same as
                                                                the Direct to
                                                                Consumer site
                                                                product titles
                                                                as these will
                                                                reflect on the
                                                                Ad copy.
                                                            </TextStyles>
                                                            <TextStyles>
                                                                The Pixel ID you
                                                                connect for
                                                                Social Ads for
                                                                Buy with Prime
                                                                will be added to
                                                                your Buy with
                                                                Prime checkout
                                                                pages. You will
                                                                see this
                                                                reflected in
                                                                your Buy with
                                                                Prime console
                                                                settings.
                                                            </TextStyles>
                                                            <TextStyles>
                                                                We will use Meta
                                                                Pixel to
                                                                leverage
                                                                customer data to
                                                                personalize
                                                                advertising for
                                                                customers with
                                                                the best
                                                                performance of
                                                                the campaigns in
                                                                mind. This data
                                                                is shared with
                                                                Facebook. Check
                                                                out this
                                                                <TextLink
                                                                    extraClass="link--style"
                                                                    label=" About Meta Pixel "
                                                                    url="https://www.facebook.com/business/help/471978536642445?id=1205376682832142"
                                                                />
                                                                guide to
                                                                understand more
                                                                about privacy
                                                                and safety.
                                                            </TextStyles>
                                                            <TextStyles>
                                                                For optimum
                                                                performance and
                                                                results, check
                                                                out this
                                                                <TextLink
                                                                    extraClass="link--style"
                                                                    label=" guide on Facebook
                                            catalogs."
                                                                    url="https://www.facebook.com/business/help/2086567618225367?id=725943027795860"
                                                                />
                                                            </TextStyles>
                                                        </List>
                                                    </FlexLayout>
                                                </Card>
                                            </FlexChild>
                                            <FlexChild
                                                desktopWidth="50"
                                                tabWidth="50"
                                                mobileWidth="100">
                                                <FlexLayout
                                                    spacing="loose"
                                                    direction="vertical">
                                                    {fbResponse.success ===
                                                    false ? (
                                                        <>
                                                            <Alert
                                                                destroy={false}
                                                                type="danger"
                                                                desciption={
                                                                    <TextLink
                                                                        onClick={
                                                                            registerError
                                                                        }
                                                                        label="Wondering what went wrong?"
                                                                        extraClass="link--style"
                                                                    />
                                                                }
                                                                children={
                                                                    <TextStyles
                                                                        content="Unable to connect your account. Please try again."
                                                                        textcolor="dark"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                    />
                                                                }
                                                            />
                                                            <OnBoardingErrorModal
                                                                fbResponse={
                                                                    fbResponse
                                                                }
                                                                errorModal={
                                                                    errorModal
                                                                }
                                                                openModalFunc={
                                                                    openModalFunc
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <FlexLayout
                                                        spacing="tight"
                                                        direction="vertical">
                                                        <TextStyles
                                                            content="Link Your Facebook Account"
                                                            type="subHeading"
                                                            subheadingTypes="XS-1.6"
                                                            fontweight="extraBold"
                                                            lineHeight="LH-2.4"
                                                        />
                                                        <TextStyles
                                                            type="Paragraph"
                                                            paragraphTypes="MD-1.4"
                                                            fontweight="light"
                                                            lineHeight="LH-2.0"
                                                            content="To create, manage, and publish your campaigns on Facebook, link your account with Social Ads for Buy with Prime account."
                                                        />
                                                        <Card cardType="Subdued">
                                                            <FlexLayout
                                                                spacing="tight"
                                                                wrap="noWrap"
                                                                direction="vertical">
                                                                <TextStyles
                                                                    content="Your Journey ahead!"
                                                                    type="Paragraph"
                                                                    paragraphTypes="MD-1.4"
                                                                    fontweight="extraBold"
                                                                    lineHeight="LH-2.0"
                                                                />
                                                                <TextStyles
                                                                    type="Paragraph"
                                                                    paragraphTypes="MD-1.4"
                                                                    fontweight="light"
                                                                    lineHeight="LH-2.0"
                                                                    content="Check on the following action items before proceeding:"
                                                                />
                                                                <FlexLayout
                                                                    spacing="tight"
                                                                    wrap="noWrap">
                                                                    <CheckField />
                                                                    <TextStyles
                                                                        content="Select Business Manager"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="light"
                                                                    />
                                                                </FlexLayout>
                                                                <FlexLayout
                                                                    spacing="tight"
                                                                    wrap="noWrap">
                                                                    <CheckField />
                                                                    <TextStyles
                                                                        content="Select an active Facebook Page"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="light"
                                                                    />
                                                                </FlexLayout>
                                                                <FlexLayout
                                                                    spacing="tight"
                                                                    wrap="noWrap">
                                                                    <CheckField />
                                                                    <TextStyles
                                                                        content="Select an active Instagram Profile"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="light"
                                                                    />
                                                                </FlexLayout>
                                                                <FlexLayout
                                                                    spacing="tight"
                                                                    wrap="noWrap">
                                                                    <CheckField />
                                                                    <TextStyles
                                                                        content="Connect Facebook Ad Account"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="light"
                                                                    />
                                                                </FlexLayout>
                                                                <FlexLayout
                                                                    spacing="tight"
                                                                    wrap="noWrap">
                                                                    <CheckField />
                                                                    <TextStyles
                                                                        content="Select Meta Pixel ID"
                                                                        type="Paragraph"
                                                                        paragraphTypes="MD-1.4"
                                                                        fontweight="light"
                                                                    />
                                                                </FlexLayout>
                                                            </FlexLayout>
                                                        </Card>
                                                        <hr />
                                                        <div className="custom--button">
                                                            <Button
                                                                length="fullBtn"
                                                                content="Authorize and Connect"
                                                                icon={
                                                                    <Image
                                                                        src={
                                                                            fbicon
                                                                        }
                                                                        alt=""
                                                                        width={
                                                                            24
                                                                        }
                                                                        height={
                                                                            24
                                                                        }
                                                                    />
                                                                }
                                                                type="Primary"
                                                                onClick={
                                                                    connectFb
                                                                }
                                                            />
                                                        </div>
                                                    </FlexLayout>
                                                </FlexLayout>
                                            </FlexChild>
                                        </FlexLayout>
                                    </Card>
                                </FlexLayout>
                            </div>
                            <Footer />
                        </>
                    ) : (
                        <Panel />
                    )}
                </>
            )}
        </>
    );
};

export default DI(OnBoardingPage, {
    func: { syncNecessaryInfo, syncConnectorInfo },
});
