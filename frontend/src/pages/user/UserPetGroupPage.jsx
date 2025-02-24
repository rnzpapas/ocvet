import { useNavigate, useParams } from "react-router"
import Footer from "@/components/Footer"
import UserNav from "@/components/navbars/UserNav"
import axiosInstance from "@/config/AxiosConfig.jsx"
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from '../../utils/textUtils'
import { convertDate, convertTime } from '../../utils/datetimeUtils'
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import Button from "@/components/Button";


const headers = [
    {
        "key": "ID",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Service",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Diagnosis",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Vaccine",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Date",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Time",
        "isSortable": true
    },
    {
        "key": "Status",
        "isSortable": true
    }
]

function UserPetGroupPage() {
    const {id} = useParams();
    const userParsed = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [petGroup, setPetGroup] = useState();
    const [appointments, setAppointments] = useState();
    const [pets, setPets] = useState();
    const [atypeid, setAtypeid] = useState();
    const [petList, setPetList] = useState();
    const [animalType, setAnimalType] = useState();
    const [selectedPets, setSelectedPets] = useState([]);

    const [isPetListDpOpen, setIsPetListDpOpen] = useState(false);
    const [isAppointmentsDpOpen, setIsAppointmentsDpOpen] = useState(false);
    const [isAddPetModal, setIsAddPetModal] = useState(false);
    const [isPetDropdownOpen, setIsPetDropdownOpen] = useState(false);
    const [isPetEditModal, setIsPetEditModal] = useState(false);


    const addPetToGroup = () => {
        if(selectedPets && selectedPets.length > 0){
            selectedPets.map((pet) => {
                addPetToGroupDb(pet.PETID);
            })
            window.location.reload();
        }
    }

    const addPetToGroupDb = async (petid) => {
        await axiosInstance.put(`http://localhost:5001/api/animal/group/pet/add?petid=${petid}&pgid=${id}`)
    }

    const removePetToGroup = async (petid) => {
        await axiosInstance.put(`http://localhost:5001/api/animal/group/pet/remove?petid=${petid}&pgid=${id}`)

    }

    const loadPetsList = async () => {
        let sessionToken = sessionStorage.getItem('jwt-token')
        let pet;
        await axiosInstance.get(`http://localhost:5001/api/pets/ownertype?uid=${userParsed.uid}&atypeid=${atypeid}`, 
            {headers: {'Authorization': `Bearer ${sessionToken}`}})
        .then(res => pet = res.data.data)
        .catch(err => console.error(err))
        return pet;
    }

    const loadPetGroup = async () => {
        let pg;
        await axiosInstance.get(`http://localhost:5001/api/animal/group?pgid=${id}`)
        .then(response => pg = response.data.data[0])
        .catch(err => console.error(err))
        return pg;
    }

    const loadPetType = async (atypeid) => {
        let at;
        await axiosInstance.get(`http://localhost:5001/api/atypes?id=${atypeid}`)
        .then((response) => at = response.data.data)
        .catch((err) => console.error(err))
        return at;
    }

    const loadAppointment = async (pgid) => {
        let app = [];
        await axiosInstance.get(`http://localhost:5001/api/appointment/pet?id=${pgid}`)
        .then((response) =>{ 
            let appDatas = response.data.data
            appDatas.map((appData) => {
                let data = {
                    "number" : appData.ASID,
                    "service": appData.services,
                    "diagnosis": appData.diagnosis,
                    "vaccine": appData.vaccine_name || '', 
                    "date_of_transaction": convertDate(appData.date),
                    "time_of_transaction": convertTime(appData.time),
                    "status": {
                        "status": appData.status,
                        "isFinished": appData.status !== 'Scheduled' && (appData.status === 'Done' ? true : false)
                    }
                }
                app.push(data)
            })
        })
        .catch((err) => console.error(err));
        return app;
    }

    const loadPets = async () => {
        let pets;
        await axiosInstance.get(`http://localhost:5001/api/animal/group/petowner?id=${userParsed.uid}`)
        .then((response) => pets = response.data.data)
        .catch((err) => console.error(err));
        return pets;
    }

    const togglePetListDp = () => {
        setIsPetListDpOpen(!isPetListDpOpen);
        setIsAppointmentsDpOpen(false);

    }

    const toggleAppointmentDp = () => {
        setIsAppointmentsDpOpen(!isAppointmentsDpOpen);
        setIsPetListDpOpen(false);
    }

    const toggleAddPetModal = () => {
        setIsAddPetModal(!isAddPetModal);
        !isAddPetModal && (document.body.style.overflow = 'hidden');
        isAddPetModal && (document.body.style.overflow = '');

    }
    
    const onClickPetDropdown = () => {
        setIsPetDropdownOpen(!isPetDropdownOpen);
    }
    
    const loadPet = async (id) => {
        let pet;
        await axiosInstance.get(`http://localhost:5001/api/pets/details?petid=${id}`)
        .then((response) => pet = response.data.data)
        .catch((err) => console.error(err))
        return pet
    }

    const deselectPet = (evt) => {
        let removedPet =  selectedPets.filter((p) => p.PETID === evt.target.id);
        setPetList((pl) => [...pl, removedPet[0]]);
        let newSelectedPets = selectedPets.filter((p) => p.PETID !== evt.target.id);
        setSelectedPets(newSelectedPets)
    }

    const selectPet = (evt) => {
        let petPromise = loadPet(evt.target.id);
        petPromise.then((p) => {
            let isDuplicate = selectedPets.some(pet => pet.PETID === p.PETID);

            if(selectedPets && selectedPets.length === 0){
                setSelectedPets((sp) => sp = [p]);
            }

            if(!isDuplicate && selectedPets.length > 0){
                setSelectedPets((sp) => [
                    ...sp,
                    p
                ]);
            }
            setPetList((prevPetList) => {
               return [...prevPetList.filter((pet) => pet.PETID !== p.PETID)]
            });
            // setIsPetDropdownOpen(false);
        });
    }

    const toggleEditPetGroupModal = () => {
        setIsPetEditModal(!isPetEditModal);
        !isPetEditModal && (document.body.style.overflow = 'hidden');
        isPetEditModal && (document.body.style.overflow = '');
    }

    const editPetGroup = async (f) => {
        if(f[0].content.length > 30) return alert('Group nickname must maximum of 30 characters only.')
        let formData = new FormData();
        formData.append("PGID", id);
        formData.append("GROUP_NICKNAME", f[0].content);

        await axiosInstance.put('http://localhost:5001/api/animal/group/update', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => window.location.reload())
    }

    const removePetGroup = async () => {
        await axiosInstance.delete(`http://localhost:5001/api/animal/group/remove?id=${id}`)
        .then(() => navigate('/user/pets'))
    }

    useEffect(() => {
        let petGroupPromise = loadPetGroup();
        petGroupPromise.then((pg) => setPetGroup(pg));

        if(petGroup){
            setAtypeid(petGroup.ATYPEID);

            let appointmentPromise = loadAppointment(id)
            appointmentPromise.then((as) => setAppointments(as));

            let petsPromise = loadPets();
            petsPromise.then((pt) => setPets(pt));

            let petTypePromise = loadPetType(petGroup.ATYPEID);
            petTypePromise.then((type) => setAnimalType(capitalizeFirstLetter(type[0].animal_type)))
        }
    },[petGroup])

    useEffect(() => {
        let petListPromise = loadPetsList();
        petListPromise.then((p) => {
            if(selectedPets && selectedPets.length === 0){
                let petListFiltered = p.filter(pgp => !petGroup.PETS.includes(pgp.PETID))
                setPetList((pl) => pl = petListFiltered)
            }
        });
    }, [petList]);

    return (
    <>
        <UserNav />
        <section className="flex flex-col px-5 py-5 h-dvh">
            {
                petGroup && (
                    <> 
                        <section className="w-full xxl:h-[15%] border-b-2 border-silver relative">
                            <h5 className="font-instrument-sans xl:text-headline-md xxl:text-headline-lrg font-bold">{petGroup.GROUP_NICKNAME}</h5>
                            <section className="flex gap-2">
                                <p className="font-lato text-silver font-semibold xxl:text-content-lrg">{animalType}</p>
                                {
                                    petGroup.POPULATION !== '0' && (
                                        <>
                                            <p className="font-lato text-silver font-semibold xxl:text-content-lrg">  /  </p>
                                            <p className="font-lato text-silver font-semibold xxl:text-content-lrg">{petGroup.POPULATION}</p>
                                        </>
                                    )
                                }
                            </section>
                            <section className="absolute top-4 right-0 flex gap-2 lg:gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] fill-chefchaouen-blue cursor-pointer" onClick={toggleEditPetGroupModal}>
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] fill-fire-engine-red cursor-pointer" onClick={removePetGroup}>
                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </section>
                            <Modal headline={"Pet Group Information Update"} fields={[
                                {'headers': 'Pet Group Nickname','type': 'text', 'txtContent': petGroup.GROUP_NICKNAME},
                            ]} isActive={isPetEditModal} onClose={toggleEditPetGroupModal} onSubmitFunc={editPetGroup} button={{txtContent: 'Edit Pet Group', isDisplayed: true}}/>
                        </section>
                    </>
                )
            }
            {
                pets && petGroup.POPULATION === '0' &&(
                    <section> 
                        <section className="mt-8 px-4 py-4 bg-raisin-black hover:bg-raisin-black-light cursor-pointer flex items-center justify-between gap-14 h-[48px] rounded-sm" onClick={togglePetListDp}>
                            <h5 className="font-instrument-sans font-semibold lg:text-headline-md text-white-smoke">Pet list</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[16px] lg:w-[24px] fill-white-smoke ${isPetListDpOpen ? 'hidden' : 'block' }`}>
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[16px] lg:w-[24px] fill-white-smoke ${isPetListDpOpen ? 'block' : 'hidden' }`}>
                                <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                            </svg>
                        </section>
                        <section className={`${isPetListDpOpen ? 'max-h-fit flex gap-4 px-2 py-5 shadow-md' : 'h-0'} transition ease-in-out duration-500 `}>
                            {
                                pets.map(pet => (
                                    <section className={`${isPetListDpOpen ? 'w-[80px] h-[100px] lg:w-[150px] lg:h-[160px]' : 'h-0'} transition ease-in-out duration-500 cursor-pointer relative group`} key={pet.PETID}>
                                        <section className={`${isPetListDpOpen ? 'w-full h-full absolute items-center justify-center bg-raisin-black/25 hidden group-hover:flex' : 'h-0'}`}>
                                            <h5 className={`${isPetListDpOpen ? 'font-lato font-semibold text-white-smoke mr-4 flex gap-2 hover:underline' : 'hidden'}`} onClick={() => removePetToGroup(pet.PETID)}>
                                                Remove Pet
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${isPetListDpOpen ? 'w-[14px] fill-white-smoke' : 'hidden'}`}>
                                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                                </svg>
                                            </h5>
                                        </section>
                                        <section className={`${isPetListDpOpen ? 'h-[80%]' : 'h-0'}`}>
                                            <img src={`/pet/${pet.image}`} alt="as" className="h-full w-full object-cover rounded-tl-lg rounded-tr-lg" />
                                        </section>
                                        <section className={`bg-raisin-black ${isPetListDpOpen ? 'h-[20%] flex items-center justify-center w-full rounded-bl-lg rounded-br-lg' : 'h-0'}`}>
                                            <p className={`bg-raisin-black ${isPetListDpOpen ? 'text-white-smoke font-lato font-semibold text-content-xtrasm' : 'hidden'}`}> {pet.nickname} </p>
                                        </section>
                                    </section>
                                ))
                            }
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${isPetListDpOpen ? 'w-[60px] mt-2 lg:w-[80px] lg:mt-3 xl:w-[100px] fill-silver hover:fill-raisin-black cursor-pointer' : 'hidden'}`} onClick={toggleAddPetModal}>
                                <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                            </svg>
                            <section className={`${isAddPetModal ? 'fixed top-0 left-0 w-full h-full overflow-hidden bg-raisin-black/25 flex items-center justify-center z-10': 'hidden'}`}> 
                                <section className="relative bg-white-smoke w-[500px] h-[500px] rounded-[10px] flex flex-col items-center py-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={toggleAddPetModal} className="absolute top-3 right-4 w-[15px] cursor-pointer">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>
                                    <h5 className="font-instrument-sans font-semibold text-headline-md text-raisin-black ">  Pet Group Animal Registration </h5>
                                    <section className="flex flex-col gap-2 w-full px-10 relative">
                                        <section className="h-48 flex items-center justify-between border rounded-[5px] border-silver py-2 px-2 hover:border-raisin-black-light">
                                            <section className="font-lato flex flex-wrap gap-2 overflow-x-auto">
                                                {
                                                    selectedPets.length > 0 ? selectedPets.map((pet) => (
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
                                                    )): <h5 className="font-lato text-content-md">Select Pets</h5>
                                                }
                                            </section>
                                            <section className="flex items-center justify-center w-[10%] h-full cursor-pointer" onClick={onClickPetDropdown}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`h-[12px] ${isPetDropdownOpen ? 'hidden' : 'block'}`}>
                                                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`h-[12px] ${isPetDropdownOpen ? 'block' : 'hidden'}`}>
                                                    <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                                                </svg>
                                            </section>
                                        </section>
                                        <section className={`${isPetDropdownOpen ? 'flex' : 'hidden'} flex flex-col ${petList && petList.length === 0 && ('items-center justify-center h-80')} gap-4 z-20 w-full bg-[#ffffff] rounded-[10px] border border-silver min-h-fit max-h-[170px] overflow-y-auto`}>
                                            {
                                                petList && petList.length > 0 ? (
                                                    petList.map((pet) => (
                                                        <section key={pet.PETID} className="flex items-center py-5 h-[60px] group hover:bg-azure relative">
                                                            <section className=" w-full h-full absolute" onClick={selectPet} id={pet.PETID}></section>
                                                            <section className="flex gap-5 items-center px-5 w-full h-full ">
                                                                <img src={`/pet/${pet.image}`} alt="z" className="h-[50px] w-[50px] aspect-square rounded-full"/>
                                                                <h5 className="font-lato group group-hover:text-white-smoke">{pet.nickname}</h5>
                                                            </section>
                                                        </section>
                                                    ))
                                                ) :
                                                <h5 className="font-lato italic"> No pets available. </h5>
                                            }
                                        </section>
                                    </section>
                                    <Button txtContent={"Add to Pet Group"} style={"absolute bottom-4 w-[80%]"} onClickFunc={addPetToGroup}/>
                                </section>
                            </section>
                        </section>
                    </section>
                )
            }
            {
                appointments && (
                    <section> 
                        <section className="mt-8 px-4 py-4 bg-raisin-black hover:bg-raisin-black-light cursor-pointer flex items-center justify-between gap-14 h-[48px] rounded-sm" onClick={toggleAppointmentDp}>
                            <h5 className="font-instrument-sans font-semibold lg:text-headline-md text-white-smoke">Clinic Records</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[16px] lg:w-[24px] fill-white-smoke ${isAppointmentsDpOpen ? 'hidden' : 'block' }`}>
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[16px] lg:w-[24px] fill-white-smoke ${isAppointmentsDpOpen ? 'block' : 'hidden' }`}>
                                <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                            </svg>
                        </section>
                        <section className={`${isAppointmentsDpOpen ? 'max-h-fit flex gap-4 px-2 py-5 shadow-md' : 'h-0'} transition ease-in-out duration-500 `}>
                            {
                                <Table headers={headers} data={appointments} style={`${isAppointmentsDpOpen ? 'max-h-fit w-full' : 'hidden'}`}/>
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