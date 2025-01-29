import Button from "../../components/button"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import UserNav from "../../components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';
import Pomeranian from "../../assets/pomeranian.png"
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import axios from 'axios';
import { useNavigate } from "react-router";

function UserPetGroupRegistration() {
    useRedirectUser(`pets/group/register`);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState();
    const [petTypes, setPetTypes] = useState();
    const [nickname, setNickname] = useState();
    const [atypeid, setAtypeId] = useState();
    const [imgFile, setImgFile] = useState();


    const loadPetType = async () => {
        let types;
        await axios.get('http://localhost:5001/api/atypes/sort')
        .then(res => types = res.data.data)
        .catch(err => console.error(err))
        return types;
    }

    const onChangeNickname = (evt) => {
        setNickname(evt.target.value);
    }

    const onChangeType = (evt) => {
        console.log(petTypes[0].ATYPEID)
        console.log(evt.target.value)
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
            // await axios.put(`http://localhost:5001/api/pets/update/image/${id}`, formData,
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
        
        await axios.post(`http://localhost:5001/api/animal/group/create`, formData, 
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
                <section className=" flex items-center flex-col shadow-[-1px_-1px_20px_rgba(0,0,0,0.25)] w-[500px] px-5 py-5 rounded-2xl">
                    <h5 className="mt-10 font-instrument-sans font-bold text-headline-md mb-8">Pet Group Registration</h5>
                    <form action="" className="w-[400px] flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                        <section className="flex flex-col gap-3">
                            <label htmlFor="pet_nickname" className="font-instrument-sans text-headline-sm font-semibold">Pet Group Nickname</label>
                            <InputField type={"text"} placeholder={"E.g. Tanuan Sheep Flock"} name={"pet_nickname"} onChangeFunc={onChangeNickname}/>
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
                        <Button txtContent={"Register Pet Group"} onClickFunc={registerPet}/>                
                    </form>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPetGroupRegistration