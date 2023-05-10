import { Card, CheckBox, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../../../Core';
import { urlFetchCalls } from '../../../Constant';

interface privacyProps extends DIProps {
    privacy: {
        privacyChecked: boolean;
        checkedValue: boolean;
        btnLoading: boolean;
    };
    setPrivacy: React.Dispatch<
        React.SetStateAction<{
            privacyChecked: boolean;
        }>
    >;
    getPrivacyConfig: () => void;
}
const PrivacySettings = (_props: privacyProps) => {
    const {
        privacy,
        setPrivacy,
        di: { POST },
        success,
        error,
        getPrivacyConfig,
    } = _props;
    const {
        post: { updateConfigUrl },
    } = urlFetchCalls;
    const { checkedValue, privacyChecked, btnLoading } = privacy;
    const checkHandler = () => {
        privacy.checkedValue = !privacy.checkedValue;
        setPrivacy({ ...privacy });
    };
    const savePrivacy = () => {
        privacy.btnLoading = true;
        setPrivacy({ ...privacy });
        let params = {
            data: [
                { group_code: 'meta_TnC', data: { meta_LDU: checkedValue } },
            ],
        };
        POST(updateConfigUrl, params).then((res) => {
            privacy.btnLoading = false;
            if (res.success) {
                getPrivacyConfig();
                success('Privacy policy updates successfully!!');
            } else {
                error(res.message);
            }
        });
    };
    return (
        <Card
            title="Privacy Settings"
            primaryAction={{
                content: 'Save Changes',
                type: 'Primary',
                disable: privacyChecked === checkedValue ? true : false,
                onClick: () => savePrivacy(),
                loading: btnLoading,
            }}>
            <FlexLayout direction="vertical" spacing="loose">
                <TextStyles content="Under state-specific privacy laws, your customers may have the right to opt out of your sale or sharing of their personal information for cross-context behavioral advertising. You can choose to restrict how your customers' personal information is used by your ad channels." />
                <TextStyles content="For the Meta CAPI, you can turn on the Limited Data Use flag below for all of your Buy with Prime orders." />
                <CheckBox
                    labelVal="Turn on Limited Data Use flag for Meta CAPI"
                    checked={checkedValue}
                    onClick={checkHandler}
                />
            </FlexLayout>
        </Card>
    );
};

export default DI(PrivacySettings);
