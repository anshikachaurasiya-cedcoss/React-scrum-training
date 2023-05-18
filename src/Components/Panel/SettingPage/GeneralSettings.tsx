import {
    Button,
    Card,
    FlexLayout,
    Modal,
    TextField,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React from 'react';
import { Edit } from 'react-feather';
import './SettingsPage.css';
import { DI, DIProps } from '../../../Core';
import { APP_SOURCE_NAME, urlFetchCalls } from '../../../Constant';

interface generalProps extends DIProps {
    general: {
        store_url: string;
        brand: string;
        editModal: boolean;
        brandValue: string;
        brandError: boolean;
        btnLoading: boolean;
    };
    setGeneral: React.Dispatch<
        React.SetStateAction<{
            store_url: string;
            brand: string;
            editModal: boolean;
            brandValue: string;
            brandError: boolean;
        }>
    >;
    getConfig: () => void;
}

const GeneralSettings = (_props: generalProps) => {
    const {
        redux: { current },
        di: { POST },
        getConfig,
        general,
        success,
    } = _props;
    const { store_url, brand, editModal, brandValue, brandError, btnLoading } =
        general;
    const {
        post: { updateConfigUrl },
    } = urlFetchCalls;
    const openModal = () => {
        _props.general.editModal = !_props.general.editModal;
        _props.setGeneral({ ..._props.general });
    };
    // function handles the input handler inside the modal
    const changeHandler = (value: any) => {
        if (value === '') {
            _props.general.brandError = true;
        } else {
            _props.general.brandError = false;
        }
        _props.general.brandValue = value;
        _props.setGeneral({ ..._props.general });
    };
    // function hits the api of update brand
    const editBrand = () => {
        _props.general.btnLoading = true;
        _props.setGeneral({ ..._props.general });
        let params = {
            source: {
                shopId: current?.source._id,
                marketplace: APP_SOURCE_NAME,
            },
            data: [{ group_code: 'bwp-product', data: { brand: brandValue } }],
        };
        POST(updateConfigUrl, params).then((res) => {
            _props.general.btnLoading = false;
            if (res.success) {
                getConfig();
                success('Store / Brand name updated successfully!!');
                openModal();
            }
        });
    };
    return (
        <Card title="General Details">
            <FlexLayout direction="vertical" spacing="loose">
                <FlexLayout direction="vertical" spacing="extraTight">
                    <TextStyles content="Store URL" />
                    <TextStyles content={store_url} utility="light--text" />
                </FlexLayout>
                <FlexLayout direction="vertical" spacing="extraTight">
                    <TextStyles content="Email" />
                    <TextStyles
                        content={current?.source.email}
                        utility="light--text"
                    />
                </FlexLayout>
                <FlexLayout wrap="noWrap" halign="fill">
                    <FlexLayout direction="vertical" spacing="extraTight">
                        <TextStyles content="Store / Brand Name" />
                        <TextStyles content={brand} utility="light--text" />
                    </FlexLayout>
                    <Button
                        icon={<Edit size={16} />}
                        type="Outlined"
                        onClick={openModal}>
                        Edit
                    </Button>
                </FlexLayout>
                <Modal
                    open={editModal}
                    close={openModal}
                    heading="Edit Store / Brand Name"
                    primaryAction={{
                        content: 'Save Changes',
                        type: 'Primary',
                        disable: brand === brandValue ? true : false,
                        onClick: () => editBrand(),
                        loading: btnLoading,
                    }}
                    secondaryAction={{
                        content: 'Cancel',
                        type: 'Outlined',
                        onClick: openModal,
                    }}>
                    <TextField
                        name="Add New Store / Brand Name"
                        value={brandValue}
                        onChange={(value) => changeHandler(value)}
                        error={brandError}
                    />
                </Modal>
            </FlexLayout>
        </Card>
    );
};

export default DI(GeneralSettings);
