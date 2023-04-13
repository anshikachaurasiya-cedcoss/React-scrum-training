import { Card, Modal } from '@cedcommerce/ounce-ui';
import React from 'react';

type OtpProps = {
    otpModal: boolean;
    openModal: () => void;
};

const OtpPage = (props: OtpProps) => {
    const { otpModal, openModal } = props;
    return (
        <>
            <Modal
                open={otpModal}
                close={() => openModal}
                heading="Verify Email Address">
                <Card>
                    <h2>hello</h2>
                </Card>
            </Modal>
        </>
    );
};

export default OtpPage;
