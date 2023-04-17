import { Card, CardHeader, FlexLayout } from '@cedcommerce/ounce-ui';
import MobileLogo from '../../../Asests/Images/svg/MobileLogo';
import React from 'react';

const OnBoardingPage = () => {
    return (
        <>
            <FlexLayout>
                <Card>
                    <CardHeader
                        action={<MobileLogo />}
                        title={'Welcome!'}
                        subTitle="Social Ads for Buy with Prime"></CardHeader>
                </Card>
            </FlexLayout>
        </>
    );
};

export default OnBoardingPage;
