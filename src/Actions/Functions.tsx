import { APP_SOURCE_NAME, APP_TARGET_NAME } from '../Constant';

export function extractCurrentAccount(e: any, shop_url?: string | null) {
    let user_account: any = {
        source: {
            [APP_SOURCE_NAME]: [],
        },
        target: {
            [APP_TARGET_NAME]: [],
        },
    };

    let source = extractCurrentSourceShop(e, shop_url);
    if (!process.env.REACT_APP_PROD) {
        user_account['allsource'] = extractSourceShop(e);
    }
    // user_account['source'] = source;
    if (Object.keys(source).length > 1) {
        user_account['source'][APP_SOURCE_NAME] = [source];
        user_account['target'] = exportCurrentTargetShop(
            e,
            user_account['source'][APP_SOURCE_NAME][0]['_id']
        );
    }
    return user_account;
}

export function extractCurrentSelected(
    props: any,
    e: any,
    shop_url?: string | null
) {
    const current: any = {
        source: extractCurrentSourceShop(e, shop_url),
        target: {},
    };
    let target_id: any = null;
    if (props.di.globalState.get('target_id')) {
        target_id = props.di.globalState.get('target_id');
    }
    props.di.globalState.set('source_id', current['source']['_id']);
    props.di.globalState.set('source_name', current['source']['marketplace']);
    const target = exportCurrentTargetShop(e, current['source']['_id']);

    if (Object.keys(target).length > 0) {
        if (Object.values(target[Object.keys(target)[0]]).length > 0) {
            Object.values(target[Object.keys(target)[0]]).map((tAcc: any) => {
                if (tAcc['_id'] == target_id) {
                    current['target'] = tAcc;
                }
            });

            if (!target_id || Object.keys(current['target']).length == 0) {
                current['target'] = Object.values(
                    target[Object.keys(target)[0]]
                )[0];
                props.di.globalState.set('target_id', current['target']['_id']);
            }
        }
    }

    return current;
}

function exportCurrentTargetShop(e: any, shop_id?: any) {
    let user_account_new: any = {
        target: {
            [APP_TARGET_NAME]: [],
        },
    };
    Object.values(e.data)
        .filter((code: any) => code.is_target == 1 || code.is_source == 1)
        .filter(
            (code: any) =>
                typeof code.installed === 'object' &&
                Object.keys(code.installed).length > 0
        )
        .forEach((account: any) => {
            Object.values(account.installed).forEach((acc: any) => {
                // check using shopify data
                if (Object.keys(acc.sources ?? {}).length > 0) {
                    Object.values(acc.sources).forEach((acc2: any) => {
                        // check using shopify data
                        if (
                            acc2?.shop_id == shop_id &&
                            (acc.isDisconnect === false ||
                                acc.isDisconnect === undefined)
                        ) {
                            user_account_new['target'][acc.marketplace].push(
                                acc
                            );
                        }
                    });
                }
            });
        });
    return user_account_new['target'];
}
export function extractSourceShop(e: any) {
    let accountShop: any = {};
    Object.values(e.data)
        .filter(
            (code: any) =>
                typeof code.installed === 'object' &&
                Object.keys(code.installed).length > 0
        )
        .forEach((account: any) => {
            Object.values(account.installed).forEach((acc: any) => {
                // check using shopify data
                if (account.is_source == 1) {
                    if (!accountShop[acc['marketplace']]) {
                        accountShop[acc['marketplace']] = [];
                    }
                    accountShop[acc['marketplace']].push(acc);
                }
            });
        });

    return accountShop;
}
export function extractCurrentSourceShop(e: any, shop_url?: string | null) {
    let currentAccountShop: any = {};
    Object.values(e.data)
        .filter(
            (code: any) =>
                typeof code.installed === 'object' &&
                Object.keys(code.installed).length > 0 &&
                code.is_source == 1
        )
        .forEach((account: any) => {
            Object.values(account.installed).forEach((acc: any) => {
                // check using shopify data
                // if (acc.myshopify_domain === shop_url) {
                currentAccountShop = acc;
                // }
            });
        });

    return currentAccountShop;
}
