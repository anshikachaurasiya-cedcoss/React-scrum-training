import {
    Button,
    FlexLayout,
    Image,
    Modal,
    TextField,
    TextStyles,
} from '@cedcommerce/ounce-ui';
import React, { useEffect, useRef, useState } from 'react';
import { urlFetchCalls } from '../../../Constant';
import { DI, DIProps } from '../../../Core/DependencyInjection';
import './OtpPage.css';
import loaderImage from '../../../Asests/Images/loaderImage.gif';
import { syncConnectorInfo } from '../../../Actions/NecessaryFun';

interface OtpProps extends DIProps {
    otpModal: boolean;
    openModal: () => void;
    getMail: (num: number) => void;
    emailResponse: any;
    email: string;
    setAccountCreate: React.Dispatch<React.SetStateAction<{}>>;
    createUser: () => void;
}

const OtpPage = (_props: OtpProps) => {
    const {
        email,
        otpModal,
        openModal,
        getMail,
        setAccountCreate,
        emailResponse: { no_of_attempts_left, success },
        createUser,
    } = _props;

    const [otp, setOtp] = useState([
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
    ]);
    let inpRef = useRef<any>([]);
    let timeRef = useRef<any>();
    let [sec, setSec] = useState(60);
    let [disable, setDisable] = useState({
        loader: false,
        btnDisable: true,
        msg: '',
        border: '',
    });
    // function sets the timer of 1 sec after component mount
    useEffect(() => {
        clearInterval(timeRef.current);
        timeRef.current = setInterval(timer, 1000);
        if (sec === 0) {
            setDisable({ ...disable, btnDisable: false });
        }
    }, [sec]);
    //
    useEffect(() => {
        inpRef.current[0].focus();

        if (no_of_attempts_left < 4) {
            setDisable({
                ...disable,
                msg: 'One-time passcode sent successfully!',
                loader: false,
            });
        }
        if (success) {
            setTimeout(() => {
                setDisable({ ...disable, msg: '', loader: false });
            }, 5000);
            setSec(60);
        }
    }, [no_of_attempts_left]);

    const timer = () => {
        if (sec > 0) {
            sec--;
            setSec(sec);
        }
    };

    const resendHandler = () => {
        getMail(0);
        disable.loader = true;
        disable.btnDisable = true;
        disable.border = '';
        disable.msg = '';
        setDisable({ ...disable });
        reset();
    };

    const changeHandler = (e: any, index: number, item: any) => {
        let arr: any = [];
        setDisable({ ...disable, msg: '', border: '' });
        let ind = otp.findIndex((ele, i) => i === index);
        if (e !== '') {
            if (e.match(/^[0-9]{1}$/)) {
                otp[ind].value = e;
                if (otp[ind].value !== '') {
                    if (inpRef.current[index + 1])
                        inpRef.current[index + 1].focus();
                }
            } else if (otp[ind].value !== '') {
                let len = e.split('').length;
                if (e.split('')[len - 1].match(/^[0-9]$/) !== null) {
                    otp[ind].value = e.split('').slice(len - 1);
                    if (inpRef.current[index + 1])
                        inpRef.current[index + 1].focus();
                }
            }
            setOtp([...otp]);
        }
        let count: boolean = true;

        let val = otp.find((ele) => ele.value === '');
        if (val) {
            count = false;
        }
        if (count) {
            otp.forEach((ele) => {
                arr.push(ele.value);
            });
            let otpArr = arr.join('');
            checkOtp(otpArr);
        }
    };
    const {
        di: { POST },
    } = _props;

    const checkOtp = (arr: any) => {
        setDisable({ ...disable, loader: true });
        let otp = parseInt(arr);
        const {
            post: { validateOtp },
        } = urlFetchCalls;
        POST(validateOtp, { otp: otp, email: email }).then((res) => {
            setDisable({ ...disable, loader: false });
            if (res.success) {
                setDisable({ ...disable, border: 'Success' });
                openModal();
                setAccountCreate(res);
                createUser();
            } else {
                reset();
                setDisable({
                    ...disable,
                    msg: res.message,
                    border: 'Error',
                });
            }
        });
    };

    const reset = () => {
        inpRef.current[0].focus();
        otp.forEach((ele: any) => {
            ele.value = '';
        });
        setOtp([...otp]);
    };

    const backspaceHandler = (index: number, item: any) => {
        let ind = otp.findIndex((ele, i) => i === index);
        if (index > 0) inpRef.current[index - 1].focus();
        if (otp[ind].value !== '') {
            otp[ind].value = '';
        } else if (otp[ind].value === '') {
            if (ind > 0) otp[ind - 1].value = '';
        }
        setOtp([...otp]);
    };

    const { btnDisable, loader } = disable;
    return (
        <>
            <Modal
                open={otpModal}
                close={() => openModal()}
                heading="Verify Email Address">
                <FlexLayout direction="vertical" spacing="loose">
                    <FlexLayout>
                        <TextStyles
                            content="An email with a verification code has been sent to"
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            fontweight="normal"
                        />
                        <TextStyles
                            content={email}
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            fontweight="extraBold"
                        />
                    </FlexLayout>
                    <FlexLayout spacing="loose" direction="vertical">
                        <TextStyles
                            content="Enter your code here:"
                            type="Paragraph"
                            paragraphTypes="MD-1.4"
                            fontweight="normal"
                        />
                        <div className="custom--style">
                            <FlexLayout
                                wrap="noWrap"
                                spacing="tight"
                                valign="center">
                                {otp.map((item: any, i: number) => {
                                    return (
                                        <TextField
                                            controlStates={disable.border}
                                            key={item}
                                            type="text"
                                            value={item.value}
                                            ref={(ref) =>
                                                (inpRef.current[i] = ref)
                                            }
                                            onChange={(e) =>
                                                changeHandler(e, i, item)
                                            }
                                            onBackspace={() =>
                                                backspaceHandler(i, item)
                                            }
                                        />
                                    );
                                })}
                                {loader ? (
                                    <Image
                                        src={loaderImage}
                                        alt=""
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <></>
                                )}
                            </FlexLayout>
                        </div>
                        <TextStyles
                            content={disable.msg}
                            type="Paragraph"
                            textcolor={
                                disable.msg ===
                                'One-time passcode sent successfully!'
                                    ? 'positive'
                                    : 'negative'
                            }
                            paragraphTypes="MD-1.4"
                        />
                    </FlexLayout>
                    <FlexLayout halign="fill" spacing="loose" wrap="noWrap">
                        <FlexLayout spacing="loose" wrap="noWrap">
                            <Button
                                type="TextButton"
                                content="Resend One-time passcode"
                                disable={btnDisable}
                                onClick={resendHandler}
                            />

                            <TextStyles
                                content={`(${
                                    no_of_attempts_left
                                        ? no_of_attempts_left
                                        : '0'
                                } attempts left)`}
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                textcolor={
                                    no_of_attempts_left > 0
                                        ? 'light'
                                        : 'negative'
                                }
                            />
                        </FlexLayout>
                        {sec > 0 ? (
                            <TextStyles
                                textcolor="negative"
                                content={`00:${
                                    sec.toString().length === 1
                                        ? '0'.concat(sec.toString())
                                        : sec
                                } sec`}
                                type="Paragraph"
                                paragraphTypes="MD-1.4"
                                fontweight="bold"
                            />
                        ) : (
                            <></>
                        )}
                    </FlexLayout>
                </FlexLayout>
            </Modal>
        </>
    );
};

export default DI(OtpPage);
