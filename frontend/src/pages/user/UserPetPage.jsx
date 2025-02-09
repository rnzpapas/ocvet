import { useEffect, useState } from "react"
import InputField from "../../components/InputField";
import UserNav from "../../components/navbars/UserNav";
import Footer from "../../components/Footer";
import Button from "../../components/button";
import PetCard from "../../components/PetCard";
import { Link } from "react-router";
import useRedirectUser from '../../auth/useRedirectUser';
import axios from "axios";

function UserPetPage() {
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
            await axios.post('http://localhost:5001/api/pets/nickname', body, {headers: {"Content-Type":  'application/json'}})
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
        let sessionToken = sessionStorage.getItem('jwt-token')
        let pets;
        await axios.get(`http://localhost:5001/api/pets/owner?uid=${userParsed.uid}`,
            {headers: {'Authorization': `Bearer ${sessionToken}`}}
        )
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
        await axios.get(`http://localhost:5001/api/vaccinations/owner/latest?uid=${userParsed.uid}`)
        .then(response => rv = response.data.data)
        .catch(err => console.error(err))
        return rv;
    }

    const loadPetGroups = async () => {
        let pg;
        await axios.get(`http://localhost:5001/api/animal/group/owner?id=${userParsed.uid}`)
        .then(response => pg = response.data.data)
        .catch(err => console.error(err))
        return pg;
    }

    useEffect(() => {
        let petsPromise = loadAllPets();
        if(search.length === 0) petsPromise.then(res => setPetsData(res));

        let vaxPromise = loadRecentVaccinations();
        vaxPromise.then(res => setRecentVaccinated(res));

        let pgPromise = loadPetGroups();
        pgPromise.then((pg) => setPetGroups(pg))

    },[petsData, recentVaccinated, petGroups, search])

    return (
        <>
            <UserNav />
            <section className="flex px-5 py-5 h-dvh">
                <section className="w-[20%] flex flex-col gap-8">
                    <section>
                        <h5 className="font-instrument-sans font-semibold uppercase text-content-sm mb-2.5">Recently Vaccinated Pets</h5>
                        <section className="flex gap-2">
                            {recentVaccinated && (
                               recentVaccinated.map((pet, index) => (
                                <div className="w-[50px] h-[50px]" key={index}>
                                    <img src={`/pet/${pet.image}`} alt={pet.image} className="h-full w-full object-fill rounded-full"/>
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
                <section className="w-[80%]">
                    <form className="flex gap-10" onSubmit={(evt) => evt.preventDefault()}>
                        <section className="w-[400px]">
                            <section className="relative">
                                <InputField type={"text"} placeholder={"Nickname..."} name="petSearch" style={"w-[100%]"} onChangeFunc={onChangeSearch}/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[28px] fill-silver absolute right-4 top-1.5">  
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                </svg>
                            </section>
                        </section>
                        <Button txtContent={"Search"} isActive={true} onClickFunc={searchPet}/>
                        {/* <Link to="/user/pets/register">
                            <Button txtContent={"Register Pet"} style={"ml-20"}/>
                        </Link> */}
                    </form>
                    <section className="mt-5 flex flex-wrap gap-5 max-h-[90%] overflow-y-auto overflow-x-hidden">
                        {
                            isDefaultView ? 
                                petsData && (petsData.map((pet, index) => (
                                    <Link to={`/user/pets/view/${pet.PETID}`} key={pet.PETID} className="w-[140px] h-[150px]">
                                        <PetCard petName={pet.nickname} img={pet.image} />
                                    </Link>
                                ))) 
                                :
                                searchedPets && searchedPets.length > 0 ? 
                                    (searchedPets.map((pet, index) => (
                                        <Link to={`/user/pets/view/${pet.PETID}`} key={pet.PETID} className="w-[140px] h-[150px]">
                                            <PetCard petName={pet.nickname} img={pet.image} />
                                        </Link>
                                    )))
                                    : 
                                    <h5> No pets found. </h5>
                        }
                        <Link to="/user/pets/register">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[100px] mt-5 fill-silver hover:fill-raisin-black">
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