import {
    Button,
    FlexLayout,
    List,
    Modal,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../../../Core/DependencyInjection';

interface errorProps extends DIProps {
    errorModal: boolean;
    openModalFunc: () => void;
    fbResponse: any;
}

const OnBoardingErrorModal = (_props: errorProps) => {
    const {
        errorModal,
        openModalFunc,
        fbResponse: { message },
    } = _props;
    return (
        <Modal
            open={errorModal}
            close={openModalFunc}
            heading="Account Connection Error"
            primaryAction={
                <Button thickness="large" onClick={openModalFunc}>
                    Okay
                </Button>
            }>
            <FlexLayout direction="vertical">
                <TextStyles
                    paragraphTypes="MD-1.4"
                    lineHeight="LH-2.0"
                    content="An error occured while connecting your Facebook account. Here are some of the reasons why this happened."
                    type="Paragraph"
                />
                <List type="disc">{message}</List>
            </FlexLayout>
        </Modal>
    );
};

export default DI(OnBoardingErrorModal);
