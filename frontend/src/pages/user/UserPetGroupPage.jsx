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

    const loadPetGroup = async () => {
        let pg;
        await axios.get(`http://localhost:5001/api/animal/group?pgid=${id}`)
        .then(response => pg = response.data.data[0])
        .catch(err => console.error(err))
        console.log(typeof(pg.POPULATION))
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
        <section className="flex px-5 py-5 h-dvh">
            {
                petGroup && (
                    <> 
                        <section className="w-full h-[15%] border-b-2 border-silver">
                            <h5 className="font-lato text-headline-lrg font-bold">{petGroup.GROUP_NICKNAME}</h5>
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
            
        </section>
        <Footer />
    </>
    )
}

export default UserPetGroupPage