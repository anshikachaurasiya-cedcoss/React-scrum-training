import { FlexLayout, TextStyles } from '@cedcommerce/ounce-ui';
import React from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

export const gridData = [
    // {
    //     campaign_name: 'retargeting campaign 1',
    //     campaign_id: '23854594149590431',
    //     daily_budget: 86,
    //     status: 'PENDING',
    //     campaign_placement: ['facebook'],
    //     user_id: '643fa76ff0ed0bf6ab0c2c82',
    //     shop_id: 902,
    //     start_date: '04/28/2023',
    //     end_date: '05/01/2023',
    //     spend: 0,
    //     impressions: 0,
    //     clicks: 0,
    //     orders: 0,
    //     sales: 0,
    //     roas: 0,
    // },
    // {
    //     campaign_name: 'retargeting campaign 2',
    //     campaign_id: '23854594149590432',
    //     daily_budget: 86,
    //     status: 'PAUSED',
    //     campaign_placement: ['facebook'],
    //     user_id: '643fa76ff0ed0bf6ab0c2c82',
    //     shop_id: 902,
    //     start_date: '04/28/2023',
    //     end_date: '',
    //     spend: 0,
    //     impressions: 0,
    //     clicks: 0,
    //     orders: 0,
    //     sales: 0,
    //     roas: 0,
    // },
    // {
    //     campaign_name: 'retargeting campaign 3',
    //     campaign_id: '23854594149590433',
    //     daily_budget: 86,
    //     status: 'ERRORS',
    //     campaign_placement: ['facebook'],
    //     user_id: '643fa76ff0ed0bf6ab0c2c82',
    //     shop_id: 902,
    //     start_date: '04/28/2023',
    //     end_date: '05/01/2023',
    //     spend: 0,
    //     impressions: 0,
    //     clicks: 0,
    //     orders: 0,
    //     sales: 0,
    //     roas: 0,
    // },
    // {
    //     campaign_name: 'retargeting campaign 4',
    //     campaign_id: '23854594149590434',
    //     daily_budget: 86,
    //     status: 'SCHEDULED',
    //     campaign_placement: ['facebook'],
    //     user_id: '643fa76ff0ed0bf6ab0c2c82',
    //     shop_id: 902,
    //     start_date: '04/28/2023',
    //     end_date: '05/01/2023',
    //     spend: 0,
    //     impressions: 0,
    //     clicks: 0,
    //     orders: 0,
    //     sales: 0,
    //     roas: 0,
    // },
    // {
    //     campaign_name: 'retargeting campaign 5',
    //     campaign_id: '23854594149590435',
    //     daily_budget: 86,
    //     status: 'ACTIVE',
    //     campaign_placement: ['facebook', 'instagram'],
    //     user_id: '643fa76ff0ed0bf6ab0c2c82',
    //     shop_id: 902,
    //     start_date: '04/28/2023',
    //     end_date: '',
    //     spend: 0,
    //     impressions: 0,
    //     clicks: 0,
    //     orders: 0,
    //     sales: 0,
    //     roas: 0,
    // },
    // {
    //     campaign_name: 'retargeting campaign 6',
    //     campaign_id: '23854594149590436',
    //     daily_budget: 86,
    //     status: 'ENDED',
    //     campaign_placement: ['instagram'],
    //     user_id: '643fa76ff0ed0bf6ab0c2c82',
    //     shop_id: 902,
    //     start_date: '04/28/2023',
    //     end_date: '05/01/2023',
    //     spend: 0,
    //     impressions: 0,
    //     clicks: 0,
    //     orders: 0,
    //     sales: 0,
    //     roas: 0,
    // },
];

export const pageArr = [
    {
        label: '5',
        value: '5',
    },
    {
        label: '10',
        value: '10',
    },
    {
        label: '15',
        value: '15',
    },
    {
        label: '20',
        value: '20',
    },
    {
        label: '25',
        value: '25',
    },
];

export const filterVal = [
    { status: 'Archived', checked: false },
    { status: 'Active', checked: false },
    { status: 'Disconnected', checked: false },
    { status: 'Ended', checked: false },
    { status: 'Error', checked: false },
    { status: 'Paused', checked: false },
    { status: 'Pending', checked: false },
    { status: 'Scheduled', checked: false },
];
export const gridHead = [
    {
        dataIndex: 'campaign_name',
        fixed: 'left',
        key: 'campaign_name',
        title: (
            <TextStyles
                content="Campaigns"
                utility="dashedLine dashedLine--block"
                type="Paragraph"
                paragraphTypes="MD-1.4"
                fontweight="bold"
            />
        ),
    },
    {
        dataIndex: 'statusComponent',
        fixed: 'left',
        key: 'status',
        title: (
            <TextStyles
                content="Status"
                utility="dashedLine dashedLine--block"
                type="Paragraph"
                paragraphTypes="MD-1.4"
                fontweight="bold"
            />
        ),
    },
    {
        dataIndex: 'campaign_placement',
        key: 'campaign_placement',
        title: (
            <TextStyles
                content="Placement"
                utility="dashedLine dashedLine--block"
                type="Paragraph"
                paragraphTypes="MD-1.4"
                fontweight="bold"
            />
        ),
    },
    {
        dataIndex: 'start_date',
        key: 'start_date',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Start Date"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
    },
    {
        dataIndex: 'end_date',
        key: 'end_date',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="End Date"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
    },
    {
        dataIndex: 'daily_budget',
        key: 'daily_budget',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Daily Budget"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
    },
    {
        dataIndex: 'spend',
        key: 'spend',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Spend"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />{' '}
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
    },
    {
        dataIndex: 'sales',
        key: 'sales',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Sales"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
    },
];
export const newColumns = [
    {
        dataIndex: 'impressions',
        key: 'impressions',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Impressions"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
        heading: 'Impressions',
        checked: false,
        columnWidth: 270,
    },
    {
        dataIndex: 'clicks',
        key: 'clicks',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Clicks"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />{' '}
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
        heading: 'Clicks',
        checked: false,
        columnWidth: 270,
    },
    {
        dataIndex: 'orders',
        key: 'orders',
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="Orders"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />{' '}
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
        columnWidth: 270,
        heading: 'Orders',
        checked: false,
    },
    {
        dataIndex: 'roas',
        key: 'roas',
        columnWidth: 270,
        title: (
            <FlexLayout spacing="loose" valign="center" wrap="noWrap">
                <TextStyles
                    content="ROAS"
                    utility="dashedLine dashedLine--block"
                    type="Paragraph"
                    paragraphTypes="MD-1.4"
                    fontweight="bold"
                />
                <div className="sorting--div">
                    <ChevronUp
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                    <ChevronDown
                        size={16}
                        color="#70747E"
                        alignmentBaseline="central"
                    />
                </div>
            </FlexLayout>
        ),
        heading: 'ROAS',
        checked: false,
    },
];
