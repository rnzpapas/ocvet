import { useParams } from "react-router"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"
import axios from "axios";
import { useEffect, useState } from "react";

function UserPetGroupPage() {
    const {id} = useParams();
    const [petGroup, setPetGroup] = useState();

    const loadPetGroup = async () => {
        let pg;
        await axios.get(`http://localhost:5001/api/animal/group?pgid=${id}`)
        .then(response => pg = response.data.data[0])
        .catch(err => console.error(err))
        return pg;
    }

    useEffect(() => {
        let petGroupPromise = loadPetGroup();
        petGroupPromise.then((pg) => setPetGroup(pg));
    },[petGroup])

    return (
    <>
        <UserNav />
        <section className="flex px-5 py-5 h-dvh">
            {
                petGroup && (
                    <> 
                        <section className="w-full h-[10%] border-b-4">
                            <h5 className="font-lato text-headline-xtralrg font-bold">{petGroup.GROUP_NICKNAME}</h5>
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