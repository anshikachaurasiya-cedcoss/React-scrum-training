/**
 * App Source Name
 */
export const APP_SOURCE_NAME = 'onyx';
/**
 * App Target Name
 */
export const APP_TARGET_NAME = 'meta';

/**
 * Title Headers on Auth section
 */
export const cardTitleAuth = {
    login: 'Login',
    register: 'Create Account',
    forgot: 'Generate Password Reset link',
    reset: 'Reset password',
    default: '',
};
export const currency = 'USD';
export const timezone = 'EST';
export const mail_id = 'support@cedcommerce.com';
/**
 * Constant for REGEX we are using on app
 */
export const regexValidation = {
    emailFormat:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/,
};
/**
 * url Endpoints (GET POST PUT DELETE) and redirection url
 */
export const urlFetchCalls = {
    get: {
        sendUserMail: 'onyx/user/sendUserMail',
        otpMail: 'user/otpMail',
        installtionForm: 'connector/get/installationForm',
        getRefineProductsUrl: 'connector/product/getRefineProducts',
        queuedTaskUrl: 'connector/get/allQueuedTasks',
        getRefineProductsCountsUrl: 'connector/product/getRefineProductCount',
        abortImportUrl: 'connector/get/feedAbort',
        getCampaignsUrl: 'meta/campaign/getCampaigns',
        getCampaignUrl: 'meta/campaign/getCampaign',
        initCampaignUrl: 'meta/campaign/initCampaign',
        bulkExportCSV: 'meta/campaign/bulkExportCampaign',
        getCampaignsAutoCompleteUrl: 'meta/campaign/campaignAutoComplete',
        setDataInDynamo: 'onyx/user/setDataInDynamo',
        accountStatus: 'meta/account/accountStatus',
        getDisconnectedAccountUrl: 'meta/account/getDisconnectedAccount',
        getPixelsUrl: 'meta/account/getAccountPixels',
        getAudience: 'meta/campaign/getAudience',
        faqSearch: 'webapi/rest/v1/faq/search',
    },
    post: {
        userLogin: 'user/login',
        forgotPassword: 'user/forgot',
        forgotReset: 'core/user/forgotreset',
        resetPassword: 'core/user/resetpassword',
        createUser: 'onyx/user/createUser',
        validateOtp: 'user/validateOtp',
        emailExistsCheck: 'onyx/user/isEmailExist',
        productImport: 'connector/product/import',
        syncProductsUrl: 'connector/product/syncSourceProduct',
        solutionsUrl: 'webapi/rest/v1/solution/get',
        customAudience: 'meta/account/createCustomAudience',
        getConfigUrl: 'connector/config/getConfig',
        updateConfigUrl: 'connector/config/saveConfig',
        updatePixelUrl: 'meta/account/updatePixel',
        createCustomAudience: 'meta/account/createCustomAudience',
        updateCampaign: 'meta/campaign/updateCampaign',
        publishCampaign: 'meta/campaign/publishCampaign',
    },
    put: {
        pauseCampaignUrl: 'meta/campaign/pauseCampaign',
        activeCampaignUrl: 'meta/campaign/activeCampaign',
    },
    delete: {
        archiveCampaignUrl: 'meta/campaign/archiveCampaign',
    },
    redirect: {
        resetPage: '/auth/reset/',
        loginPage: '/auth/login',
    },
};

/**
 * Email Templates Mail Subjects
 */
export const subject = {
    passwordReset: 'Reset your password for React-Boiler Plate',
    otpMailSend: 'Your One-time passcode for Email verification',
};
