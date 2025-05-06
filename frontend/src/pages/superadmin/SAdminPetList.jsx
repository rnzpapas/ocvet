import { useEffect, useState } from 'react';
import InputField from '@/components/InputField';
import SuperAdminNav from '@/components/navbars/SuperAdminNav';
import PetCard from '@/components/PetCard';
import axiosInstance from "@/config/AxiosConfig.jsx"
import Modal from '@/components/Modal';
import { capitalizeFirstLetter } from '../../utils/textUtils';

function SAdminPetList() {
    let sessionToken = sessionStorage.getItem('jwt-token');

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
        try{

            let res = await axiosInstance.get('/api/pets/all', 
                {
                    headers: {
                        'Authorization': `Bearer ${sessionToken}`
                    }
                }
            )
           if(res){
                let p = res.data.data
                return p;
            }
        }catch(err){
            let message = err.response?.data?.message || "Fetching of pets data failed.";
            alert(message);
            console.error(err);
        }
    }

    const searchPetDetails = async () => {
        setPets([]);
        let p;
        await axiosInstance.get(`/api/pets/admin/nickname?pet=${search}`, 
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

    const exportPets = async () => {
        await axiosInstance.get('/api/pets/all/export', {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
        .then(res => {
          const disposition = res.headers['content-disposition'];
          const matches = /filename="(.+)"/.exec(disposition);
          const filename = matches != null && matches[1] ? matches[1] : 'appointment_history.pdf';
          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename; 
          link.click(); d
          window.URL.revokeObjectURL(url); 
      
        })
      }

    useEffect(() => {
        const dataPromise = async () => {
            let searchPromise = [];
            let petsPromise = await loadPetDetails();
            if(search){
                searchPromise = await searchPetDetails();
            }
            searchPromise.length === 0 ? 
            setPets(petsPromise) :  setPets(searchPromise) 
        }
        dataPromise();
    },[search])

    useEffect(() => {}, [petSelected])


    return (
        <section className="flex w-screen h-screen overflow-hidden">
            <SuperAdminNav />
            <section className="px-5 py-5 w-full">
                <section className="flex gap-5">
                    <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">pets</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`w-[24px] fill-silver cursor-pointer hover:fill-raisin-black`} onClick={exportPets}>
                        <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                    </svg>
                </section>
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

export default SAdminPetList