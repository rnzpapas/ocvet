import { useParams } from "react-router"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"
import axios from "axios";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from '../../utils/textUtils'

function UserPetGroupPage() {
    const {id} = useParams();
    const userParsed = JSON.parse(localStorage.getItem('user'));
    const [petGroup, setPetGroup] = useState();
    const [appointments, setAppointments] = useState();
    const [pets, setPets] = useState();
    const [animalType, setAnimalType] = useState();
    const [isPetListDpOpen, setIsPetListDpOpen] = useState(false);

    const loadPetGroup = async () => {
        let pg;
        await axios.get(`http://localhost:5001/api/animal/group?pgid=${id}`)
        .then(response => pg = response.data.data[0])
        .catch(err => console.error(err))
        return pg;
    }

    const loadPetType = async (atypeid) => {
        let at;
        await axios.get(`http://localhost:5001/api/atypes?id=${atypeid}`)
        .then((response) => at = response.data.data)
        .catch((err) => console.error(err))
        return at;
    }

    const loadAppointment = async (pgid) => {
        let app;
        await axios.get(`http://localhost:5001/api/appointment/pet?id=${pgid}`)
        .then((response) => app = response.data.data)
        .catch((err) => console.error(err));
        return app;
    }

    const loadPets = async () => {
        let pets;
        await axios.get(`http://localhost:5001/api/animal/group/petowner?id=${userParsed.uid}`)
        .then((response) => pets = response.data.data)
        .catch((err) => console.error(err));
        return pets;
    }

    const togglePetListDp = () => {
        setIsPetListDpOpen(!isPetListDpOpen);
    }

    useEffect(() => {
        let petGroupPromise = loadPetGroup();
        petGroupPromise.then((pg) => setPetGroup(pg));

        if(petGroup){
            let appointmentPromise = loadAppointment()
            appointmentPromise.then((as) => setAppointments(as));


            let petsPromise = loadPets();
            petsPromise.then((pt) => setPets(pt));

            let petTypePromise = loadPetType(petGroup.ATYPEID);
            petTypePromise.then((type) => setAnimalType(capitalizeFirstLetter(type[0].animal_type)))
        }
    },[petGroup, appointments, pets, animalType])

    return (
    <>
        <UserNav />
        <section className="flex flex-col px-5 py-5 h-dvh">
            {
                petGroup && (
                    <> 
                        <section className="w-full h-[15%] border-b-2 border-silver">
                            <h5 className="font-instrument-sans text-headline-lrg font-bold">{petGroup.GROUP_NICKNAME}</h5>
                            <section className="flex gap-2">
                                <p className="font-lato text-silver font-semibold text-content-lrg">{animalType}</p>
                                {
                                    petGroup.POPULATION !== '0' && (
                                        <>
                                            <p className="font-lato text-silver font-semibold text-content-lrg">  /  </p>
                                            <p className="font-lato text-silver font-semibold text-content-lrg">{petGroup.POPULATION}</p>
                                        </>
                                    )
                                }
                            </section>
                        </section>
                    </>
                )
            }
            {
                pets && (
                    <section> 
                        <section className="mt-8 px-4 py-4 bg-raisin-black hover:bg-raisin-black-light cursor-pointer flex items-center justify-between gap-14 h-[48px] rounded-sm" onClick={togglePetListDp}>
                            <h5 className="font-instrument-sans font-semibold text-headline-md text-white-smoke">Pet list</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[24px] fill-white-smoke ${isPetListDpOpen ? 'hidden' : 'block' }`}>
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[24px] fill-white-smoke ${isPetListDpOpen ? 'block' : 'hidden' }`}>
                                <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                            </svg>
                        </section>
                        <section className={`${isPetListDpOpen ? 'max-h-fit' : 'h-0'} transition ease-in-out duration-500 flex gap-4 px-2 py-5 shadow-md`}>
                            {
                                pets.map(pet => (
                                    <section className="w-[180px] h-[190px] cursor-pointer relative group" key={pet.PETID}>
                                        <section className="absolute w-full h-full items-center justify-center bg-raisin-black/25 hidden group-hover:flex">
                                            <h5 className="font-lato font-semibold text-white-smoke mr-4">Remove Pet</h5>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] fill-white-smoke">
                                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                            </svg>
                                        </section>
                                        <section className=" h-[80%]">
                                            <img src={`/pet/${pet.image}`} alt="as" className="h-full w-full object-cover rounded-tl-lg rounded-tr-lg" />
                                        </section>
                                        <section className="bg-raisin-black h-[20%] flex items-center justify-center w-full rounded-bl-lg rounded-br-lg ">
                                            <p className="text-white-smoke font-lato font-semibold text-content-xtrasm"> {pet.nickname} </p>
                                        </section>
                                    </section>
                                ))
                            }
                        </section>
                    </section>
                )
            }
        </section>
        <Footer />
    </>
    )
}

export default UserPetGroupPage