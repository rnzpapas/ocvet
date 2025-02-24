import Button from "@/components/Button"
import Footer from "@/components/Footer"
import InputField from "@/components/InputField"
import UserNav from "@/components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';
import Pomeranian from "../../assets/pomeranian.png"
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import axiosInstance from "@/config/AxiosConfig.jsx"
import { useNavigate } from "react-router";

function UserPetRegistration() {
    useRedirectUser(`pets/register`);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState();
    const [petTypes, setPetTypes] = useState();
    const [nickname, setNickname] = useState();
    const [atypeid, setAtypeId] = useState();
    const [imgFile, setImgFile] = useState();


    const loadPetType = async () => {
        let types;
        await axiosInstance.get('http://localhost:5001/api/atypes/sort')
        .then(res => types = res.data.data)
        .catch(err => console.error(err))
        return types;
    }

    const onChangeNickname = (evt) => {
        setNickname(evt.target.value);
    }

    const onChangeType = (evt) => {
        setAtypeId((at) => at = evt.target.value);
    }

    const handleImgBtnClick = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if(file && file.type === "image/jpeg" || file.type === "image/png"){

            const reader = new FileReader();
      
            reader.onloadend = () => {
                setImageSrc(reader.result); 
            };

            reader.readAsDataURL(file);
            setImgFile((fl) => fl = file);
            // await axiosInstance.put(`http://localhost:5001/api/pets/update/image/${id}`, formData,
            // {
            //     headers: {
            //     'Authorization': `Bearer ${sessionToken}`,
            //     'Content-Type': 'multipart/form-data'}
            // })
            // .then((res) => window.location.reload())
        }else{
            alert('Invalid file type')
        }
    };

    const registerPet = async () => {
        let sessionToken = sessionStorage.getItem('jwt-token');
        let userParsed = JSON.parse(localStorage.getItem('user'));
        let formData = new FormData();
        formData.append("atypeid", atypeid);
        formData.append("nickname", nickname);
        formData.append("pet_owner", userParsed.uid);
        formData.append("image", imgFile);
        await axiosInstance.post(`http://localhost:5001/api/pets/register`, formData, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(() => navigate('/user/pets'))
    };

    useEffect(() => {
        let typePromise = loadPetType();
        typePromise.then(type => {
            setPetTypes((pt) => pt = type);
            setAtypeId((at) => at = type[0].ATYPEID);
        })

    },[]);

    return (
        <>
            <UserNav />
            <section className="h-dvh flex items-center justify-center">
                <section className="flex items-center flex-col shadow-[-1px_-1px_20px_rgba(0,0,0,0.25)] w-[350px] xl:w-[500px] px-5 py-5 rounded-2xl">
                    <h5 className="xl:mt-10 font-instrument-sans font-bold lg:text-headline-md">Pet Registration</h5>
                    <form action="" className="w-full xl:w-[400px] flex flex-col gap-2 xl:gap-8" onSubmit={(e) => e.preventDefault()}>
                        <section className="flex flex-col gap-3">
                            <label htmlFor="photo" className="font-instrument-sans text-headline-sm font-semibold">Pet Photo</label>
                            <section className="flex justify-center">
                                <section className="relative">
                                    {imageSrc ? 
                                        <img src={imageSrc} alt="" className="w-[100px] h-[100px] bg-azure rounded-full" />
                                        :
                                        <>
                                            <img src={Pomeranian} alt="" className="w-[100px] h-[100px] bg-raisin-black rounded-full" />
                                        </>
                                    }
                                    <section className="absolute bottom-0 right-0 bg-silver rounded-full h-[30px] w-[30px] flex items-center justify-center cursor-pointer">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            style={{ display: 'none' }} 
                                            onChange={handleFileChange}
                                            accept="image/jpeg, image/png"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white-smoke h-[20px] w-[20px]" onClick={handleImgBtnClick}>
                                            <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                                        </svg>
                                    </section>
                                </section>
                            </section>
                        </section> 
                        <section className="flex flex-col gap-3">
                            <label htmlFor="pet_nickname" className="font-instrument-sans text-headline-sm font-semibold">Pet Nickname</label>
                            <InputField type={"text"} placeholder={"E.g. Moosey"} name={"pet_nickname"} onChangeFunc={onChangeNickname}/>
                        </section>
                        <section className="flex flex-col gap-3">
                            <label htmlFor="pet_breed" className="font-instrument-sans text-headline-sm font-semibold">Pet Type</label>
                            <select 
                                className='font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light placeholder:font-lato' 
                                onChange={onChangeType}
                                value={atypeid ? atypeid : petTypes && (petTypes[0].ATYPEID)}
                            >
                                {
                                    petTypes && (
                                        petTypes.map((pt) => (
                                            <option key={pt.ATYPEID} value={pt.ATYPEID}>{capitalizeFirstLetter(pt.animal_type)}</option>
                                        ))
                                    )
                                }
                            </select>
                        </section>
                        <Button txtContent={"Register Pet"} onClickFunc={registerPet}/>                
                    </form>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPetRegistration