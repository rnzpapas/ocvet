import { useEffect, useState } from "react";
import SideLogo from "@/components/SideLogo";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";

const DEFAULT_SECONDS = 15;
const SECOND_DECREMENT = 1;

function OTPVerification() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [OTP, setOTP] = useState("");
    const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
    const [isCountdownRunning, setIsCountdownRunning] = useState(false);

    const onChangeOTP = (evt) => {setOTP(evt.target.value)}
    
    const resendCode = async () => {
        if (!isCountdownRunning) {
            await axios.put(`http://localhost:5001/api/user/account-recovery/otp-update?unmail=${searchParams.get('unmail')}`)
            .then((res) => {
                setSeconds(s => s = DEFAULT_SECONDS);
            })
            .catch(err => {
                alert(err.response.data.message)
            })
        }
    }

    const onResendCode = async () => {
        setIsCountdownRunning((ir) => ir = true);
        resendCode();
    };

    const verifyOTP = async () => {
        const formData = new FormData();
        formData.append('otp', OTP);
        await axios.post(`http://localhost:5001/api/user/account-recovery/otp-verify?unmail=${searchParams.get('unmail')}`, formData, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => {
            let uaid = res.data.data[0].UAID
            navigate(`/account-recovery/changepw?uaid=${uaid}`);
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
    }

    const cancelOtp = async () => {
        navigate('/user/login')
    }
    useEffect(() => {
        let interval;
        if (isCountdownRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds > 0) {
                        return prevSeconds - SECOND_DECREMENT;
                    } else {
                        setIsCountdownRunning((ir) => ir = false);
                        return DEFAULT_SECONDS;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCountdownRunning]);

    return (
        <section className="flex flex-col lg:flex-row md:w-screen bg-linen lg:bg-opacity-0 h-screen lg:h-auto">
            <SideLogo style={"lg:h-screen lg:w-6/12"}/>
            <section className="flex flex-col gap-5 items-center justify-center lg:w-6/12">
                <h5 className="font-instrument-sans text-headline-md xxl:text-headline-lrg font-bold"> Password Recovery</h5>
                <section className="flex flex-col gap-3 w-[80%] xxl:w-6/12 relative">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="OTP" className="font-instrument-sans text-headline-sm xxl:text-headline-md font-semibold"> One-Time Password (OTP) </label>
                        {isCountdownRunning ? <p className="font-lato text-content-sm mb-4"> We sent a 6 digit verification code to your e-mail.</p> : ""}
                        <InputField type="text" placeholder={"XXXXXX"} name="OTP" maxlength={6} onChangeFunc={onChangeOTP}/>
                    </section>
                    <h5 onClick={onResendCode}
                    className="font-lato text-azure font-semibold cursor-pointer hover:underline flex justify-end text-content-sm xl:text-content-md"
                    >
                        {`Resend Code ${isCountdownRunning ? `(${seconds}s)` : '' }`}
                    </h5>
                    {/* <Link txtContent={`Resend Code ${isCountdownRunning ? `(${seconds}s)` : '' }`}  onClickFunc={resendCode} style={"flex justify-end text-azure font-lato font-semibold hover:underline cursor-pointer"}/> */}
                    <section className="flex gap-10 justify-between">
                        <Button txtContent={"Cancel"} isActive={false} style={"w-[300px]"} onClickFunc={cancelOtp}/>
                        <Button txtContent={"Continue"} style={"border-2 border-raisin-black w-[300px]"} onClickFunc={verifyOTP}/>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default OTPVerification