import { APP_SOURCE_NAME, APP_TARGET_NAME } from '../Constant';
import { environmentI } from '../Core/@types';

export const environment: environmentI = {
    production: process.env.REACT_APP_PROD ? true : false,
    API_ENDPOINT: process.env.REACT_APP_END_POINT as string,
    AppName: process.env.REACT_APP_NAME as string,
    appCode: {
        [APP_SOURCE_NAME]: process.env.REACT_APP_SOURCE as string,
        [APP_TARGET_NAME]: process.env.REACT_APP_TARGET as string,
    },
    marketplace: process.env.REACT_APP_MP_NAME as string,
    appTag: 'bwp_meta',
    Bearer: process.env.REACT_APP_BEARER as string,
    isLive: undefined,
};
