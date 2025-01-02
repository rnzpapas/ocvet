import { useEffect, useState } from "react";
import SideLogo from "../../components/SideLogo"
import InputField from "../../components/InputField"
import Button from "../../components/button"
import Link from "../../components/Link";

function OTPVerification() {
    const [OTP, setOTP] = useState("");
    const [seconds, setSeconds] = useState(15);
    const [isCountdownStarted, setIsCountdownStarted] = useState(false);

    const onChangeOTP = (evt) => {setOTP(evt.val)}
    
    const resendCode = () => {setIsCountdownStarted(true)}

    useEffect(() => {
        if(isCountdownStarted){
            setInterval(() => {
                if(seconds == 0){
                    alert("finish timer")
                    setSeconds((seconds) => seconds = 15);
                    setIsCountdownStarted(false)
                }
                if(seconds > 0){
                    setSeconds((seconds) => seconds - 1);
                }
                
            },[1000])
        }
    },[isCountdownStarted])

    return (
        <section className="flex">
            <SideLogo style={"h-screen w-6/12"}/>
            <section className="flex flex-col gap-5 items-center justify-center w-6/12">
                <h5 className="font-instrument-sans text-headline-lrg font-bold"> Password Recovery</h5>
                <form className="flex flex-col gap-3 w-6/12 relative">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="OTP" className="font-instrument-sans text-headline-md font-semibold"> One-Time Password (OTP) </label>
                        {isCountdownStarted ? <p className="font-lato text-content-sm mb-4"> We sent a 6 digit verification code to your e-mail.</p> : ""}
                        <InputField type="text" placeholder={"XXXXXX"} name="OTP" onChangeFunc={onChangeOTP}/>
                    </section>
                    <Link txtContent={`Resend Code ${isCountdownStarted ? `(${seconds}s)` : '' }`} onClickFunc={resendCode} style={"flex justify-end text-azure font-lato font-semibold hover:underline cursor-pointer"}/>
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