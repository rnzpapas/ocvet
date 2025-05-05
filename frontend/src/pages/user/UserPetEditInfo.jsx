import Button from "@/components/Button"
import Footer from "@/components/Footer"
import InputField from "@/components/InputField"
import UserNav from "@/components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from '../../utils/textUtils'
import axiosInstance from "@/config/AxiosConfig.jsx"

function UserPetEditInfo() {
    let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;
    const {id} = useParams();
    useRedirectUser(`pets/edit/${id}`);
    const navigate = useNavigate();
    
    const [petInfo, setPetInfo] = useState();
    const [petTypes, setPetTypes] = useState();
    const [nickname, setNickname]= useState();
    const [atypeId, setAtypeId] = useState();
    const [atype, setAtype] = useState("Pet");

    const loadPetInfo = async () => {
        let pet;
        await axiosInstance.get(`/api/pets/details?petid=${id}`)
        .then((response) => pet = response.data.data)
        .catch(err => console.error(err))
        return pet;
    }

    const loadPetType = async () => {
        let types;
        await axiosInstance.get('/api/atypes/sort')
        .then(res => types = res.data.data)
        .catch(err => console.error(err))
        return types;
    }

    const onChangeNickname = (evt) => {
        setNickname(evt.target.value);
    }

    const onChangeType = (evt) => {
        setAtypeId(evt.target.value);
    }

    const updatePetDetails = async () => {
        const body = {
            "pet_owner": petInfo.pet_owner, 
            "atypeid": atypeId || petInfo.ATYPEID, 
            "nickname": nickname || petInfo.nickname
        }
        await axiosInstance.put(`/api/pets/update?petid=${id}`, body,
            {headers: {
                'Content-Type': 'application/json'
            }}
        )
        .then(() => navigate(`/user/pets/view/${id}`))
        .catch(err => {
            let message = err.response?.data?.message || "Update failed.";
            alert(message);
            return;
        })
        
    }

    useEffect(() => {
        let petDataPromise = loadPetInfo();
        petDataPromise.then(pet => {
            setPetInfo(info => info = pet);
            setNickname(pet.nickname)
            setAtypeId(pet.ATYPEID)
        });

        let typePromise = loadPetType();
        typePromise.then(type => {setPetTypes((pt) => pt = type)})

    },[]);
    
    return (
        <>
            <UserNav />
            <section className="h-dvh flex items-center justify-center">
                <section className="flex items-center flex-col shadow-[-1px_-1px_20px_rgba(0,0,0,0.25)] w-[350px] xl:w-[500px] px-5 py-5 rounded-2xl">
                    <h5 className="xl:mt-10 font-instrument-sans font-bold lg:text-headline-md">Edit Pet Information</h5>
                    {petInfo && (
                        <form action="" className="w-full xl:w-[400px] flex flex-col gap-2 xl:gap-8" onSubmit={(e) => e.preventDefault()}>
                            <section className="flex flex-col gap-3 mt-5">
                                <section className="flex justify-center">
                                    <section className="w-[100px] h-[100px] md:w-[125px] md:h-[125px] relative">
                                        <img src={`${imgDirSrc}/pet/${petInfo.image}`} alt="" className="h-full w-full object-cover bg-azure rounded-full" />
                                    </section>
                                </section>
                            </section> 
                            <section className="flex flex-col gap-3">
                                <label htmlFor="pet_nickname" className="font-instrument-sans text-headline-sm font-semibold">Pet Nickname</label>
                                <InputField type={"text"} placeholder={"E.g. Moosey"} name={"pet_nickname"} value={nickname} onChangeFunc={onChangeNickname}/>
                            </section>
                            <section className="flex flex-col gap-3">
                                <label htmlFor="pet_breed" className="font-instrument-sans text-headline-sm font-semibold">Pet Type</label>
                                <select 
                                    className='font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light placeholder:font-lato' 
                                    onChange={onChangeType}
                                >
                                    {
                                        petTypes && (
                                            petTypes.map((pt) => (
                                                <option key={pt.ATYPEID} value={pt.ATYPEID} selected={pt.ATYPEID === petInfo.ATYPEID ? true : false}>{capitalizeFirstLetter(pt.animal_type)}</option>
                                            ))
                                        )
                                    }
                                </select>
                            </section>
                            <Button txtContent={"Update Pet Information"} onClickFunc={updatePetDetails}/>                
                        </form>
                    )}
                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPetEditInfo