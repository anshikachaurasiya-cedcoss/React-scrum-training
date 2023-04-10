import React from 'react';
import * as queryString from 'query-string';
import { DI, DIProps } from '../../../Core';

const Message = (_props: DIProps) => {
    const queryParams = queryString.parse(_props.location.search);
    if (queryParams.success !== undefined && queryParams.success !== null) {
        if (queryParams.success === 'true') {
            localStorage.setItem('CanImport', 'true');
            window.close();
        } else if (queryParams.success === 'false') {
            localStorage.setItem('CanImport', 'false');
            const setMessage = queryParams.message + _props.location.hash;
            localStorage.setItem('errorMsgForFB', setMessage);
            window.close();
        }
    }

    return <></>;
};

export default DI(Message);
