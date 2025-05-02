import { useEffect, useState } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import SideLogo from "@/components/SideLogo";
import { Link as RouterLink, useNavigate} from "react-router";
import Link from "@/components/Link";
import useRedirectUser from '@/auth/useRedirectUser';
import axiosInstance from "@/config/AxiosConfig.jsx"
import Spinner from "@/components/Spinner";

function UserLogin() {
    useRedirectUser();

    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onChangeUsername = (evt) => {
        setUsername(evt.target.value);
    }

    const onChangePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const togglePasswordField = () => {
        setIsHiddenPassword(!isHiddenPassword);
    }

    const onLogin = async (evt) => {

        evt.preventDefault();

        try{
            setIsLoading(true);
            const loginRes = await axiosInstance.post('/api/user/login', {
                username: username,
                password: password
            }, {headers: {'Content-Type': 'application/json'}})
            
            const { access_token, uaid } = loginRes.data.data;
    
            const detailsRes = await axiosInstance.get(`/api/user/account/full-details/${uaid}`, 
                    {headers: {'Authorization': `Bearer ${access_token}`}})
            
            let userFullDetails = detailsRes.data.data;
            const userData = {
                "uid": userFullDetails.UID,
                "uaid": userFullDetails.UAID,
                "email": userFullDetails.email,
                "role": userFullDetails.role,
                "date_joined": userFullDetails.date_joined
            }

            localStorage.setItem("user", JSON.stringify(userData));
            sessionStorage.setItem('jwt-token', access_token);
            setIsLoading(false);
            navigate('/user/home');

        }catch(err){
            console.log(err)
            const message = err.response?.data?.message || "Login failed.";
            alert(message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        let sessionToken = sessionStorage.getItem('jwt-token');
        let user = localStorage.getItem('user');

        !sessionToken && user && (localStorage.clear());
        sessionToken && !user && (sessionStorage.clear());
    },[]);

    return (
        <section className="flex flex-col lg:flex-row md:w-screen bg-linen lg:bg-opacity-0 h-screen lg:h-auto">
            {
                isLoading && <Spinner />
            }
            <SideLogo style={"lg:h-screen lg:w-6/12"}/>
            <section className="flex flex-col gap-5 items-center justify-center lg:w-6/12">
                <h5 className="font-instrument-sans text-headline-md xl:text-headline-lrg font-bold"> Sign In</h5>
                <form className="flex flex-col gap-3 w-[75%] xl:w-[60%] relative">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="username" className="font-instrument-sans text-headline-sm xl:text-headline-md font-semibold"> Username </label>
                        <InputField type="text" placeholder={"yourusername123"} name="username" onChangeFunc={onChangeUsername}/>
                    </section>
                    <section className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-instrument-sans text-headline-sm xl:text-headline-md font-semibold"> Password </label>
                        <section className="relative">
                            <InputField type={`${isHiddenPassword ? 'password' : 'text'}`} placeholder={"E.g. y0uRp4ssW0rd@!"} name="password" style={"w-[100%]"} onChangeFunc={onChangePassword}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={togglePasswordField} className={`w-[28px] fill-silver cursor-pointer hover:fill-raisin-black-light absolute right-4 top-2.5 ${isHiddenPassword ? '' : 'hidden'}`}>
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" onClick={togglePasswordField} className={`w-[28px] fill-silver cursor-pointer hover:fill-raisin-black-light absolute right-4 top-2.5 ${isHiddenPassword ? 'hidden' : ''}`}>
                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                            </svg>
                        </section>
                    </section>
                    <Link txtContent={"Forgot Password?"} style={"flex justify-end text-azure font-lato font-semibold hover:underline cursor-pointer text-content-sm xl:text-content-md"} toPage={"/account-recovery/forgot-password"}/>
                    <Button txtContent={"sign in"} onClickFunc={(evt) => onLogin(evt)}/>
                </form>
                <section className="flex items-center justify-center gap-2">
                    <div className="w-[150px] md:w-[300px] lg:w-[180px] xl:w-[200px] xxl:w-[250px] h-[2px] bg-raisin-black"></div>
                    <h5 className="uppercase font-lato text-raisin-black"> or </h5>
                    <div className="w-[150px] md:w-[300px] lg:w-[180px] xl:w-[200px] xxl:w-[250px] h-[2px] bg-raisin-black"></div>
                </section>
                <RouterLink to="/user/register" className="w-[75%] xl:w-[60%]">
                    <Button txtContent={"sign up"} style={"w-full"} isActive={false}/>
                </RouterLink>
            </section>
        </section>
    )
}

export default UserLogin;