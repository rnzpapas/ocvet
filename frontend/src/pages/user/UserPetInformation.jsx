import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import UserNav from "@/components/navbars/UserNav";
import Table from "@/components/Table";
import { Link, useNavigate, useParams } from "react-router";
import useRedirectUser from '../../auth/useRedirectUser';
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertDate, convertTime } from "../../utils/datetimeUtils";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import NoImg from '@/assets/noimg.png';

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
function UserPetInformation() {
  let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;

    const {id} = useParams();
    if(!id) useRedirectUser();
    useRedirectUser(`pets/view/${id}`);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
  
    const [petInfo, setPetInfo] = useState();
    const [vaxData, setVaxData] = useState();
  
    const loadPetInfo = async () => {
      let pet;
      await axiosInstance.get(`/api/pets/details?petid=${id}`)
      .then((response) => pet = response.data.data)
      .catch(err => console.error(err))
      return pet;
    }

    const loadPetVaccinations = async () => {
      let vaccs = []
      await axiosInstance.get(`/api/appointment/pet?id=${id}`)
      .then(response => {
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
              vaccs.push(data)
          })
      })
      .catch(err => console.error(err))
      return vaccs;
    }

    const handleImgBtnClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if(file.type === "image/jpeg" || file.type === "image/png"){
        let sessionToken = sessionStorage.getItem('jwt-token')
        let formData = new FormData();
        formData.append("image", file)

        await axiosInstance.put(`/api/pets/update/image/${id}?folder=pet`, formData,
          {
            headers: {
              'Authorization': `Bearer ${sessionToken}`,
              'Content-Type': 'multipart/form-data'}
          })
          .then((res) => window.location.reload())
      }else{
        alert('Invalid file type')
      }
      
    };
    
    const deletePet = async () => {
      let sessionToken = sessionStorage.getItem('jwt-token');
      await axiosInstance.delete(`/api/pets/remove/${id}`, 
        {
          headers: {
            'Authorization': `Bearer ${sessionToken}`
          }
        }
      )
      .then(() => navigate('/user/pets'))
    }
    
    useEffect(() => {
      let petDataPromise = loadPetInfo();
      petDataPromise.then(pet => setPetInfo(info => info = pet));
    },[])

    useEffect(() => {
      let vaccPromise = loadPetVaccinations();
      vaccPromise.then(newState => setVaxData(newState) )
    },[])
    return (
      <>
        <UserNav />
        <section className="h-dvh">
          {petInfo && (
            <section className="py-4 lg:py-6 flex relative items-center justify-center">
              <section className="flex flex-col gap-2 items-center ">
                <section className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px]">
                    <img src={`${petInfo.image ? `${imgDirSrc}/pet/${petInfo.image}` : NoImg}`} alt="" className=" w-full h-full object-cover bg-azure rounded-full" />
                    <section className="absolute bottom-0 right-0 md:bottom-1 md:right-1 bg-silver rounded-full h-[26px] w-[26px] md:h-[30px] md:w-[30px] lg:h-[38px] lg:w-[38px] flex items-center justify-center cursor-pointer">
                      <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white-smoke h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[22px] lg:w-[22px]" onClick={handleImgBtnClick}>
                          <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                      </svg>
                    </section>
                </section>
                <h5 className="font-instrument-sans font-semibold text-headline-md"> {petInfo.nickname} </h5>
                <h5 className="font-lato text-content-md text-white-smoke bg-raisin-black rounded-full p-2 capitalize font-medium"> 
                  {petInfo.breed_name ? `${capitalizeFirstLetter(petInfo.breed_name)} (${capitalizeFirstLetter(petInfo.animal_type)})` : capitalizeFirstLetter(petInfo.animal_type)}   
                </h5>
              </section>
              <section className="absolute top-10 right-10  flex flex-col gap-2">
                <section className="flex items-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[22px] h-[22px] lg:w-[15px] lg:h-[15px] fill-azure">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                  </svg>
                  <Link to={`/user/pets/edit/${id}`}>
                    <p className="font-lato hidden lg:block lg:text-content-md hover:underline text-azure">Edit Profile</p>
                  </Link>
                </section>
                <section className="flex items-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[22px] h-[22px] lg:w-[15px] lg:h-[15px] fill-fire-engine-red">
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                  </svg>
                  <p className="font-lato hidden lg:block lg:text-content-md hover:underline text-fire-engine-red" onClick={deletePet}>Delete Profile</p>
                </section>
              </section>
            </section>
          )}
          <section className=" flex flex-col gap-3 ml-5 mt-5">
            <h5 className="font-instrument-sans font-semibold text-headline-md">Clinic Records</h5>
            {vaxData && (
              <Table headers={headers} data={vaxData} tableW={'w-[90%]'}/>
            )}
          </section>
        </section>
        <Footer />
      </>
    )
}

export default UserPetInformation