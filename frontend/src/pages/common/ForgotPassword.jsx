import { useState } from "react"
import InputField from "../../components/InputField"
import SideLogo from "../../components/SideLogo"
import Button from "../../components/button";
import { useNavigate } from "react-router";
import axios from "axios";

function ForgotPassword() {
    const navigate = useNavigate();

    const [unmail, setUnmail] = useState("");

    const onChangeUnmail = (evt) => {
        setUnmail(evt.target.value)
    }

    const cancelPasswordRecovery = () => {
        navigate('/user/login')
    }

    const sendOtp = () => {
        axios.put(`http://localhost:5001/api/user/account-recovery/otp-update?unmail=${unmail}`)
        .then(() => {})
        .catch((err) => {
            alert(err.response.data.message);
            console.error(err)
        })
        navigate(`/account-recovery/OTP?unmail=${unmail}`);
    }
    return (
        <section className="flex">
            <SideLogo style={"h-screen w-6/12"}/>
            <section className="flex flex-col gap-5 items-center justify-center w-6/12">
                <h5 className="font-instrument-sans text-headline-lrg font-bold"> Password Recovery</h5>
                <form className="flex flex-col gap-3 w-6/12 relative" onSubmit={(e) => e.preventDefault()}>
                    <section className="flex flex-col gap-1">
                        <label htmlFor="unmail" className="font-instrument-sans text-headline-md font-semibold"> Username / E-Mail </label>
                        <InputField type="text" placeholder={"yourusername123 or youremail@gmail.com"} name="unmail" onChangeFunc={onChangeUnmail}/>
                    </section>
                    <section className="flex gap-10  justify-between">
                        <Button txtContent={"Cancel"} isActive={false} style={"w-[300px]"} onClickFunc={cancelPasswordRecovery}/>
                        <Button txtContent={"Continue"} style={"border-2 border-raisin-black w-[300px]"} onClickFunc={sendOtp}/>
                    </section>
                </form>
            </section>
        </section>
    )
}

export default ForgotPassword