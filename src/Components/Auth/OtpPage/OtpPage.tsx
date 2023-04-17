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

interface OtpProps extends DIProps {
    otpModal: boolean;
    openModal: () => void;
    getMail: (num: number) => void;
    emailResponse: any;
    email: string;
}

const OtpPage = (_props: OtpProps) => {
    const {
        email,
        otpModal,
        openModal,
        getMail,
        emailResponse: { no_of_attempts_left, success },
    } = _props;
    let inpRef = useRef<any>([]);
    let timeRef = useRef<any>();
    let [sec, setSec] = useState(60);
    let [disable, setDisable] = useState({
        loader: false,
        btnDisable: true,
        msg: '',
        border: '',
    });
    useEffect(() => {
        clearInterval(timeRef.current);
        timeRef.current = setInterval(timer, 1000);
        if (sec === 0) {
            setDisable({ ...disable, btnDisable: false });
        }
    }, [sec]);
    useEffect(() => {
        inpRef.current[0].focus();
        if (success) {
            setDisable({
                ...disable,
                loader: false,
            });
            setTimeout(() => {
                setDisable({ ...disable, msg: '', loader: false });
            }, 5000);
            setSec(60);
        }
        if (no_of_attempts_left < 4) {
            setDisable({
                ...disable,
                msg: 'One-time passcode sent successfully!',
            });
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

    const changeHandler = (e: any, i: number) => {
        setDisable({ ...disable, msg: '', border: '' });
        let arr: any = [];
        if (e.match(/^[0-9]{1}$/)) {
            inpRef.current[i].value = e;
            if (
                inpRef.current[i].value !== '' &&
                inpRef.current[i + 1] !== undefined
            ) {
                inpRef.current[i + 1].focus();
            }
            let count: boolean = true;
            let check = (ele: any) => ele.value === '';
            let val = inpRef.current.find(check);
            if (val) {
                count = false;
            }
            if (count) {
                inpRef.current.map((ele: any) => {
                    arr.push(ele.value);
                });
                checkOtp(arr);
            }
        } else {
            inpRef.current[i].value = '';
        }
    };
    const {
        di: { POST },
    } = _props;

    const checkOtp = (arr: any) => {
        setDisable({ ...disable, loader: true });
        let otp = parseInt(arr.join(''));
        const {
            post: { validateOtp },
        } = urlFetchCalls;
        POST(validateOtp, { otp: otp, email: email }).then((res) => {
            setDisable({ ...disable, loader: false });
            if (res.success) {
                setDisable({ ...disable, border: 'Success' });
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
        inpRef.current.map((ele: any) => {
            ele.value = '';
        });
    };

    const backspaceHandler = (i: number) => {
        if (inpRef.current[i].value === '') {
            inpRef.current[i - 1].focus();
        }
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
                                {[1, 2, 3, 4, 5].map((item, i) => {
                                    return (
                                        <TextField
                                            controlStates={disable.border}
                                            key={item}
                                            type="text"
                                            ref={(ref) =>
                                                (inpRef.current[i] = ref)
                                            }
                                            onChange={(e) =>
                                                changeHandler(e, i)
                                            }
                                            onBackspace={() =>
                                                backspaceHandler(i)
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
                                    ? 'success'
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
