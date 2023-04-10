import { TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';
import { DI, DIProps } from '../../../Core';
function CedFooter(_props: DIProps) {
    return (
        <div className="inte-auth__Footer">
            <TextStyles textcolor="light" type="heading">
                A CedCommerce Inc Product @2022.
            </TextStyles>
        </div>
    );
}

export default DI(CedFooter);
