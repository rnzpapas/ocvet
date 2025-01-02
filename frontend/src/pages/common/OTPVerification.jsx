import { useEffect, useMemo, useState } from "react";
import SideLogo from "../../components/SideLogo"
import InputField from "../../components/InputField"
import Button from "../../components/button"
import Link from "../../components/Link";


const DEFAULT_SECONDS = 15;
const SECOND_DECREMENT = 1;

function OTPVerification() {
    const [OTP, setOTP] = useState("");
    const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
    const [isCountdownRunning, setIsCountdownRunning] = useState(false);
    const isCountdownOngoing = useMemo(() => isCountdownRunning, [isCountdownRunning])
    const onChangeOTP = (evt) => {setOTP(evt.val)}
    
    const resendCode = () => {setIsCountdownRunning(() => !isCountdownOngoing )}

    useEffect(() => {
        let interval;
        if(isCountdownRunning){
            interval = setInterval(() => {
                if(seconds > 0){
                    setSeconds((s) => s - SECOND_DECREMENT);

                }else{
                    setIsCountdownRunning((isRunning) => isRunning = !isCountdownOngoing);
                    setSeconds((s) => s = DEFAULT_SECONDS );
                }
                
            },1000)
        }
    },[isCountdownRunning])

    return (
        <section className="flex">
            <SideLogo style={"h-screen w-6/12"}/>
            <section className="flex flex-col gap-5 items-center justify-center w-6/12">
                <h5 className="font-instrument-sans text-headline-lrg font-bold"> Password Recovery</h5>
                <form className="flex flex-col gap-3 w-6/12 relative">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="OTP" className="font-instrument-sans text-headline-md font-semibold"> One-Time Password (OTP) </label>
                        {isCountdownRunning ? <p className="font-lato text-content-sm mb-4"> We sent a 6 digit verification code to your e-mail.</p> : ""}
                        <InputField type="text" placeholder={"XXXXXX"} name="OTP" onChangeFunc={onChangeOTP}/>
                    </section>
                    <Link txtContent={`Resend Code ${isCountdownRunning ? `(${seconds}s)` : '' }`} onClickFunc={resendCode} style={"flex justify-end text-azure font-lato font-semibold hover:underline cursor-pointer"}/>
                    <section className="flex gap-10 justify-between">
                        <Button txtContent={"Cancel"} isActive={false} style={"w-[300px]"}/>
                        <Button txtContent={"Continue"} style={"border-2 border-raisin-black w-[300px]"}/>
                    </section>
                </form>
            </section>
        </section>
    )
}

export default OTPVerification