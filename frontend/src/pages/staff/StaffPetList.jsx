import { useEffect, useState } from 'react';
import Button from '../../components/button';
import InputField from '../../components/InputField';
import StaffNav from '../../components/navbars/StaffNav'
import PetCard from '../../components/PetCard';
import axios from 'axios';
import Modal from '../../components/Modal';
import { capitalizeFirstLetter } from '../../utils/textUtils';

function StaffPetList() {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    const [isPetModalOpened, setIsPetModalOpened] = useState(false);
    const [petSelected, setPetSelected] = useState([])

    const onChangeSearch = (evt) => {setSearch(evt.target.value)};

    const onClickPetCard = (evt) => {
        document.body.style.overflow = 'hidden';
        const petId = evt.target.parentElement.id;
        let pet = pets.filter((p) => p.PETID === petId);
        let modalInfo = [
            {
                "type": 'image',
                "img": pet[0].image,
                "headers": ""
            },
            {
                "type": 'text',
                "txtContent": pet[0].nickname,
                "headers": "Nickname",
                "readOnly": true
            },
            {
                "type": 'text',
                "txtContent": capitalizeFirstLetter(pet[0].animal_type),
                "headers": "Type",
                "readOnly": true
            },
            {
                "type": 'text',
                "txtContent": `${pet[0].firstname} ${pet[0].surname}`,
                "headers": "Owner",
                "readOnly": true
            },
        ]
        setPetSelected(modalInfo)
        setIsPetModalOpened(true);
    }

    const closeModal = () => {
        setIsPetModalOpened(false)
        document.body.style.overflow = '';
    }

    const loadPetDetails = async () => {
        let p;
        let sessionToken = sessionStorage.getItem('jwt-token');
        await axios.get('http://localhost:5001/api/pets/all', 
            {
                headers: {
                    'Authorization': `Bearer ${sessionToken}`
                }
            }
        )
        .then((res) => {
            p = res.data.data
        })
        .catch(err => console.error(err))
        return p;
    }

    const searchPetDetails = async () => {
        let p;
        let sessionToken = sessionStorage.getItem('jwt-token');
        await axios.get(`http://localhost:5001/api/pets/admin/nickname?pet=${search}`, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionToken}`
                }
            }
        )
        .then((res) => {
            p = res.data.data
        })
        .catch(err => console.error(err))
        return p;
    }

    useEffect(() => {
        let petsPromise = loadPetDetails();
        let searchPromise = searchPetDetails();

        search.length === 0 ? petsPromise.then((pt) => setPets(p => p = pt)) :  searchPromise.then((pt) => setPets(p => p = pt)) 

    },[search])

    useEffect(() => {}, [petSelected])

    return (
        <section className="flex w-full">
            <StaffNav />
            <section className="px-5 py-5 w-full">
                <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">pets</h5>
                <section className="flex gap-10 mb-10">
                    <section className="w-[400px]">
                        <section className="relative">
                            <InputField type={"text"} placeholder={"Nickname.."} name="petSearch" style={"w-[100%]"} onChangeFunc={onChangeSearch}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[28px] fill-silver absolute right-4 top-1.5">  
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </section>
                    </section>
                    {/* <Button txtContent={"Search"} isActive={true} /> */}
                </section>
                <section className='flex flex-wrap gap-5 max-w-full max-h-[75%] overflow-y-auto'>
                    {
                        pets && pets.length > 0 && (
                            pets.map(pet => (
                                <section className='w-fit h-full relative' id={pet.PETID}  key={pet.PETID} >
                                    <section className='bg-raisin-black w-full h-full absolute top-0 left-0 z-10 opacity-0 cursor-pointer' onClick={(el) => onClickPetCard(el)}></section>
                                    <PetCard petName={pet.nickname} id={pet.PETID} key={pet.PETID} img={pet.image}/>
                                </section>
                            ))
                        )
                    }
                    {
                    petSelected.length > 0 && (
                        <Modal 
                            headline={"Pet Details"} 
                            isActive={isPetModalOpened} 
                            fields={petSelected}
                            onClose={closeModal} 
                        />
                    )
                }
                </section>
            </section>
        </section>
    )
}

export default StaffPetList