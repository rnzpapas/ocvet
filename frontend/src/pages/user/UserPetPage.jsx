import { useEffect, useState } from "react"
import InputField from "@/components/InputField";
import UserNav from "@/components/navbars/UserNav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import PetCard from "@/components/PetCard";
import { Link } from "react-router";
import useRedirectUser from '../../auth/useRedirectUser';
import axiosInstance from "@/config/AxiosConfig.jsx"
import NoImg from '@/assets/noimg.png';

function UserPetPage() {
    let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;

    let user = localStorage.getItem("user");
    let userParsed = JSON.parse(user);
    useRedirectUser(`pets/`);

    const [petsData, setPetsData] = useState();
    const [searchedPets, setSearchedPets] = useState();
    const [recentVaccinated, setRecentVaccinated] = useState();
    const [petGroups, setPetGroups] = useState();
    const [search, setSearch] = useState("");
    const [isDefaultView, setIsDefaultView] = useState(true);

    const onChangeSearch = (evt) => {
        setSearch(evt.target.value)
        search.length === 0 && (setIsDefaultView(true));
    }

    const searchPet = async () => {
        if(search.length > 0){
            const body = {
                'pet_owner': userParsed.uid,
                'nickname': search
            }
            await axiosInstance.post('/api/pets/nickname', body)
            .then(res => {
                if(res.data.data.length > 0) {
                    setIsDefaultView(false)
                    setSearchedPets((sp) => sp = res.data.data);
                }else{
                    setIsDefaultView(true)
                    setSearchedPets((sp) => sp = []);
                }
            })
            .catch(err => console.error(err))
        }else{
            setSearchedPets('');
            setIsDefaultView(true)
        }
    }

    const loadAllPets = async () => {
        let pets;
        await axiosInstance.get(`/api/pets/owner?uid=${userParsed.uid}`)
        .then(response => {
            pets = response.data.data
        })
        .catch(err => {
            console.error(err)
        })
        return pets;
    }

    const loadRecentVaccinations = async () => {
        let rv;
        await axiosInstance.get(`/api/vaccinations/owner/latest?uid=${userParsed.uid}`)
        .then(response => rv = response.data.data)
        .catch(err => console.error(err))
        return rv;
    }

    const loadPetGroups = async () => {
        let pg;
        await axiosInstance.get(`/api/animal/group/owner?id=${userParsed.uid}`)
        .then(response => pg = response.data.data)
        .catch(err => console.error(err))
        return pg;
    }

    useEffect(() => {
        let petsPromise = loadAllPets();
        if (search.length === 0) {
            petsPromise.then(res => setPetsData(res));
        }
    
        loadRecentVaccinations().then(res => setRecentVaccinated(res));
        loadPetGroups().then(pg => setPetGroups(pg));
    
    }, [search]);
    

    return (
        <>
            <UserNav />
            <section className="flex flex-col-reverse lg:flex-row px-5 py-5 gap-5 lg:gap-0 lg:h-dvh">
                <section className="lg:w-[20%] flex flex-col gap-8">
                    <section>
                        <h5 className="font-instrument-sans font-semibold uppercase text-content-sm mb-2.5">Recently Vaccinated Pets</h5>
                        <section className="flex gap-2">
                            {recentVaccinated && (
                               recentVaccinated.map((pet, index) => (
                                <div className="w-[50px] h-[50px]" key={index}>
                                    <img src={pet.image ? `${imgDirSrc}/pet/${pet.image}` : NoImg}
                                        alt={pet.image || "No Image"} 
                                        className="h-full w-full object-fill rounded-full"
                                    />
                                </div>
                               ))
                            )}
                            {/* <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div>
                            <div className="bg-fire-engine-red w-[40px] h-[40px] rounded-full"></div> */}
                        </section>
                    </section>
                    <section className="flex flex-col gap-3">
                        <section className="flex items-center gap-2">
                            <h5 className="font-instrument-sans font-semibold uppercase text-content-sm ">Pet Groups</h5>
                            <Link to="/user/pets/group/register">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[16px] fill-azure hover:fill-chefchaouen-blue">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                                </svg>
                            </Link>
                        </section>
                        {
                            petGroups && (
                                <section className="flex gap-1 flex-col">
                                    {petGroups.map((pg) => (
                                        <Link to={`/user/pets/group/view/${pg.PGID}`} className="hover:underline" key={pg.PGID}>
                                            <h5>{pg.GROUP_NICKNAME}</h5>
                                        </Link>
                                    ))}
                                </section>
                            )
                        }
                    </section>
                </section>
                <section className="lg:w-[80%]">
                    <form className="flex gap-2 lg:gap-10" onSubmit={(evt) => evt.preventDefault()}>
                        <section className="w-[250px] lg:w-[400px]">
                            <section className="relative">
                                <InputField type={"text"} placeholder={"Nickname..."} name="petSearch" style={"w-[100%]"} onChangeFunc={onChangeSearch}/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[28px] fill-silver absolute right-4 top-1.5">  
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                </svg>
                            </section>
                        </section>
                        <Button txtContent={"Search"} isActive={true} onClickFunc={searchPet} style={'w-[100px] md:w-fit md:px-4'}/>
                        {/* <Link to="/user/pets/register">
                            <Button txtContent={"Register Pet"} style={"ml-20"}/>
                        </Link> */}
                    </form>
                    <section className="mt-5 flex flex-wrap gap-2 lg:gap-5 max-h-[90%] overflow-y-auto overflow-x-hidden">
                        {
                            isDefaultView ? 
                                petsData && (petsData.map((pet, index) => (
                                    <Link to={`/user/pets/view/${pet.PETID}`} key={pet.PETID} className="">
                                        <PetCard petName={pet.nickname} img={pet.image} />
                                    </Link>
                                ))) 
                                :
                                searchedPets && searchedPets.length > 0 ? 
                                    (searchedPets.map((pet, index) => (
                                        <Link to={`/user/pets/view/${pet.PETID}`} key={pet.PETID} className="">
                                            <PetCard petName={pet.nickname} img={pet.image} />
                                        </Link>
                                    )))
                                    : 
                                    <h5> No pets found. </h5>
                        }
                        <Link to="/user/pets/register">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[60px] mt-5 lg:w-[80px] lg:mt-3 xl:w-[100px] fill-silver hover:fill-raisin-black">
                                <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                            </svg>
                        </Link>
                    </section>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPetPage