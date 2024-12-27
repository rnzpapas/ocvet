import SideLogo from "../../components/SideLogo"
import InputField from "../../components/InputField"
import Button from "../../components/button"

function OTPVerification() {
    const [OTP, setOTP] = useState("");

    const onChangeOTP = (evt) => {setOTP(evt.val)}
    
    return (
        <section className="flex">
            <SideLogo style={"h-screen w-6/12"}/>
            <section className="flex flex-col gap-5 items-center justify-center w-6/12">
                <h5 className="font-instrument-sans text-headline-lrg font-bold"> Password Recovery</h5>
                <form className="flex flex-col gap-3 w-6/12 relative">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="OTP" className="font-instrument-sans text-headline-md font-semibold"> Username / E-Mail </label>
                        <InputField type="text" placeholder={"XXXXXX"} name="OTP" onChangeFunc={onChangeOTP}/>
                    </section>
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