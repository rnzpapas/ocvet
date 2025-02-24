import Button from "@/components/Button"
import Footer from "@/components/Footer"
import InputField from "@/components/InputField"
import UserNav from "@/components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import axios from 'axios';
import { useNavigate } from "react-router";

function UserPetGroupRegistration() {
    useRedirectUser(`pets/group/register`);
    const navigate = useNavigate();
    let userParsed = JSON.parse(localStorage.getItem('user'));

    const [petTypes, setPetTypes] = useState();
    const [nickname, setNickname] = useState();
    const [atypeid, setAtypeId] = useState();
    const [population, setPopulation] = useState();
    const [isPetDropdownOpen, setIsPetDropdownOpen] = useState(false);
    const [pets, setPets] = useState();
    const [selectedPets, setSelectedPets] = useState([]);

    const loadPetType = async () => {
        let types;
        await axios.get('http://localhost:5001/api/atypes/sort')
        .then(res => types = res.data.data)
        .catch(err => console.error(err))
        return types;
    }

    const loadPets = async () => {
        let sessionToken = sessionStorage.getItem('jwt-token')
        let pet;
        await axios.get(`http://localhost:5001/api/pets/ownertype?uid=${userParsed.uid}&atypeid=${atypeid}`, 
            {headers: {'Authorization': `Bearer ${sessionToken}`}})
        .then(res => pet = res.data.data)
        .catch(err => console.error(err))
        return pet;
    }
 
    const loadPet = async (id) => {
        let pet;
        await axios.get(`http://localhost:5001/api/pets/details?petid=${id}`)
        .then((response) => pet = response.data.data)
        .catch((err) => console.error(err))
        return pet
    }

    const onChangeNickname = (evt) => {
        setNickname(evt.target.value);
    }

    const onChangeType = (evt) => {
        setAtypeId((at) => at = evt.target.value);
        setSelectedPets([]);
    }

    const onChangePopulation = (evt) => {
        setPopulation((p) => p = evt.target.value)
    }

    const selectPet = (evt) => {
        let petPromise = loadPet(evt.target.id);
        petPromise.then((p) => {
            let isDuplicate = selectedPets.some(pet => pet.nickname === p.nickname);

            if(!isDuplicate){
                setSelectedPets((sp) => [
                    ...sp,
                    p
                ]);
                setIsPetDropdownOpen(false)
            }
        });
    }
    
    const deselectPet = (evt) => {
        let newSelectedPets = selectedPets.filter((p) => p.PETID !== evt.target.id);
        setSelectedPets(newSelectedPets)
    }

    const onClickPetDropdown = () => {
        setIsPetDropdownOpen(!isPetDropdownOpen);
    }

    const registerPet = async () => {
        let sessionToken = sessionStorage.getItem('jwt-token');
        let userParsed = JSON.parse(localStorage.getItem('user'));

        let pets = selectedPets && (selectedPets.map((pet) => pet.PETID))
        let formData = new FormData();
        formData.append("PETS", pets || [])
        formData.append("ATYPEID", atypeid);
        formData.append("GROUP_NICKNAME", nickname || '');
        formData.append("PET_OWNER", userParsed.uid);
        pets.length > 0 ?
        formData.append("POPULATION", 0) :
        formData.append("POPULATION", population)
        
        await axios.post(`http://localhost:5001/api/animal/group/create`, formData, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(() => navigate('/user/pets'))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        let typePromise = loadPetType();
        typePromise.then(type => {
            setPetTypes((pt) => pt = type);
            setAtypeId((at) => at = type[0].ATYPEID);
        })
        setPopulation("1 to 50")
    },[]);

    useEffect(() => {
        let petsPromise = loadPets();
        petsPromise.then((p) => setPets(p));
    },[atypeid]);

    return (
        <>
            <UserNav />
            <section className="h-dvh flex items-center justify-center">
                <section className=" flex items-center flex-col shadow-[-1px_-1px_20px_rgba(0,0,0,0.25)] w-[350px] xl:w-[500px] px-5 py-5 rounded-2xl">
                    <h5 className="mt-10 font-instrument-sans font-bold lg:text-headline-md mb-8">Pet Group Registration</h5>
                    <form action="" className="w-full xl:w-[400px] flex flex-col gap-2 xl:gap-8" onSubmit={(e) => e.preventDefault()}>
                        <section className="flex flex-col gap-3">
                            <label htmlFor="pet_nickname" className="font-instrument-sans text-headline-sm font-semibold">Pet Group Nickname</label>
                            <InputField type={"text"} placeholder={"E.g. Tanuan Sheep Flock"} name={"pet_nickname"} onChangeFunc={onChangeNickname}/>
                        </section>
                        <section className="flex flex-col gap-3">
                            <label htmlFor="pet_breed" className="font-instrument-sans text-headline-sm font-semibold">Pet Type</label>
                            <select 
                                className='font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light cursor-pointer' 
                                onChange={onChangeType}
                                value={atypeid ? atypeid : petTypes && (petTypes[0].ATYPEID)}
                            >
                                {
                                    petTypes && (
                                        petTypes.map((pt) => (
                                            <option key={pt.ATYPEID} value={pt.ATYPEID} >{capitalizeFirstLetter(pt.animal_type)}</option>
                                        ))
                                    )
                                }
                            </select>
                        </section>
                        <section className="flex flex-col gap-3">
                            <h5 className="font-instrument-sans text-headline-sm font-semibold">Pets <i className="text-fire-engine-red text-content-xtrasm">(Optional)</i></h5>
                            <section className="flex flex-col relative">
                                <section className="max-h-19 flex items-center justify-between border rounded-[5px] border-silver py-2 px-2 hover:border-raisin-black-light">
                                    <section className="font-lato flex gap-2 overflow-x-auto">
                                        {selectedPets.length > 0 ? selectedPets.map((pet) => (
                                            <section key={pet.PETID} className={`flex gap-2 items-center px-2 py-2 ${selectedPets.length > 0 && ('mb-2')} rounded-full min-w-fit z-10 bg-raisin-black`}>
                                                <img src={`/pet/${pet.image}`} alt="z" className="h-[30px] w-[30px] aspect-square rounded-full"/>
                                                <h5 className="font-lato text-content-sm text-white-smoke">{pet.nickname}</h5>
                                                <section className="h-full w-5 cursor-pointer flex justify-center relative" >
                                                    <section className="w-full h-full absolute" id={pet.PETID} onClick={e => deselectPet(e)}></section>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-[12px] fill-white-smoke">
                                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                                    </svg>
                                                </section>
                                            </section>
                                        )): 'Select Pets'}
                                    </section>
                                    <section className="flex items-center justify-center w-[10%] max-h-20 cursor-pointer" onClick={onClickPetDropdown}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`h-[12px] ${isPetDropdownOpen ? 'hidden' : 'block'}`}>
                                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`h-[12px] ${isPetDropdownOpen ? 'block' : 'hidden'}`}>
                                            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                                        </svg>
                                    </section>
                                </section>
                                <section className={`${isPetDropdownOpen ? 'block' : 'hidden'} z-20 w-full bg-[#ffffff] absolute top-[41px] rounded-[10px] border border-silver min-h-[80px] max-h-[130px] overflow-y-auto`}>
                                    {
                                        pets && (
                                            pets.map((pet) => (
                                                <section key={pet.PETID} className="h-[50px] group hover:bg-azure relative">
                                                    <section className=" w-full h-full absolute" onClick={selectPet} id={pet.PETID}></section>
                                                    <section className="flex gap-5 items-center px-2 py-2w-full h-full">
                                                        <img src={`/pet/${pet.image}`} alt="z" className="h-[30px] w-[30px] aspect-square rounded-full"/>
                                                        <h5 className="font-lato group group-hover:text-white-smoke">{pet.nickname}</h5>
                                                    </section>
                                                </section>
                                            ))
                                        )
                                    }
                                </section>
                            </section>
                        </section>
                        {
                            selectedPets.length === 0 && (
                                <section className="flex flex-col gap-3">
                                    <label htmlFor="population" className="font-instrument-sans text-headline-sm font-semibold">Population <i className="text-fire-engine-red text-content-xtrasm">(Optional)</i></label>
                                    <select 
                                        className='font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light placeholder:font-lato' 
                                        onChange={onChangePopulation}
                                        value={!population ? "1 to 50" : population}
                                    >
                                        <option value="1 to 50"> 1 to 50 </option>
                                        <option value="51 to 100"> 51 to 100 </option>
                                        <option value="101 to 200"> 101 to 200 </option>
                                        <option value="201 to 300"> 201 to 300 </option>
                                        <option value="301 to 400"> 301 to 400 </option>
                                        <option value="401 to 500"> 401 to 500 </option>
                                        <option value="501 to 600"> 501 to 600 </option>
                                        <option value="601 to 700"> 601 to 700 </option>
                                        <option value="701 to 800"> 701 to 800 </option>
                                        <option value="801 to 900"> 801 to 900 </option>
                                        <option value="901 to 1000"> 901 to 1000 </option>
                                        <option value="Above 1001"> Above 1001 </option>
                                    </select>
                                </section>
                            )
                        }
                        <Button txtContent={"Register Pet Group"} onClickFunc={registerPet}/>                
                    </form>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPetGroupRegistration