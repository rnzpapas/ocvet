import { useEffect, useState } from "react"
import Footer from "@/components/Footer"
import UserNav from "@/components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';
import Calendar from "@/components/Calendar";
import { adjustDayVisuals, adjustMonthVisuals, convertDate, convertTime } from "../../utils/datetimeUtils";
import axios from 'axios'

const timeSlot = [
  '08:00 AM', 
  '09:00 AM', 
  '10:00 AM', 
  '11:00 AM', 
  '12:00 PM', 
  '01:00 PM', 
  '02:00 PM', 
  '03:00 PM', 
  '04:00 PM',
  '05:00 PM'
];

function UserHome() {
  useRedirectUser();
  let userParsed = JSON.parse(localStorage.getItem('user'));
  let sessionToken = sessionStorage.getItem('jwt-token');

  const [pets, setPets] = useState();
  const [petGroup, setPetGroup] = useState();
  const [clinicAppointments, setClinicAppointments] = useState([]);
  const [petSelected, setPetSelected] = useState([]);
  const [petGroupSelected, setPetGroupSelected] = useState([]);
  const [appointments, setAppointments] = useState();
  const [services, setServices] = useState();
  const [servicesSelected, setServicesSelected] = useState([]);
  const [isServicesDpOpened, setIsServicesDpOpened] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [diagnosisSelected, setDiagnosisSelected] = useState([]);
  const [isDiagnosisDpOpened, setIsDiagnosisDpOpened] = useState();
  const [dateOfAppointment, setDateOfAppointment] = useState();
  const [timeOfAppointment, setTimeOfAppointment] = useState();
  const [appointmentPage, setAppointmentPage] = useState(1);
  const [isPetsDpOpened, setIsPetsDpOpened] = useState(false);
  const [isPetGroupDpOpened, setIsPetGroupDpOpened] = useState(false);

  const loadPets = async () => {
    let p;
    let sessionToken = sessionStorage.getItem('jwt-token');
    await axios.get(`http://localhost:5001/api/pets/owner?uid=${userParsed.uid}`,
      {
        headers : {
          'Authorization': `Bearer ${sessionToken}`
        }
      }
    )
    .then((res) => {
      p = res.data.data;
    })
    .catch(err => console.error(err))
    return p
  }

  const loadPetGroup = async () => {
    let p;
    await axios.get(`http://localhost:5001/api/animal/group/owner?id=${userParsed.uid}`)
    .then(res => {
      p = res.data.data
    })
    .catch(err => console.error(err))
    return p;
  }

  const loadClinicAppointment = async () => {
    let appointmentSchedObj = [];
    await axios.get('http://localhost:5001/api/appointment/all')
    .then((res) => {
      let apiResponse = res.data.data;
      let dateObj;
      let isDateExists = false;
      apiResponse.map((appointmentOne) => {
        if(appointmentSchedObj.length > 0){
          isDateExists= appointmentSchedObj.some(a => convertDate(a.date) === convertDate(appointmentOne.date));
        }

        if(!isDateExists){
          dateObj = {
            "date": convertDate(appointmentOne.date),
            "time": [convertTime(appointmentOne.time)]
          }
          appointmentSchedObj.push(dateObj);

        }else{
          appointmentSchedObj.map(asobj => {
            asobj.date === convertDate(appointmentOne.date) && (asobj.time.push(convertTime(appointmentOne.time)))
          })
        }

      })
    })
    .catch(err => console.error(err))
    return appointmentSchedObj;
  }

  const loadAppointment = async () => {
    let apts;
    await axios.get(`http://localhost:5001/api/appointment/user?id=${userParsed.uid}`,
      {headers: {'Authorization': `Bearer ${sessionToken}`}}
    )
    .then(res => apts = res.data.data)
    .catch(err => console.error(err));
    return apts;
  }

  const loadServices = async () => {
    let svcs;
    await axios.get(`http://localhost:5001/api/service`)
    .then(res => svcs = res.data.data)
    .catch(err => console.error(err));
    return svcs;
  }

  const loadDiagnosis = async () => {
    let dgs;
    await axios.get(`http://localhost:5001/api/diagnosis`)
    .then(res => dgs = res.data.data)
    .catch(err => console.error(err));
    return dgs;
  }

  const selectDate = (year, month, day) => {
    let modifiedMonth = adjustMonthVisuals(month-1);
    let selectedDate = `${modifiedMonth}-${adjustDayVisuals(day)}-${year}`;
    setDateOfAppointment((prev) => prev = selectedDate);
    setAppointmentPage(appointmentPage + 1);
  }

  const selectTime = (evt) => {
    setTimeOfAppointment((ta) => ta = evt.target.textContent);
    setAppointmentPage(appointmentPage + 1);

  }

  const nextAppointmentPage = () => {
    if(servicesSelected.length > 0 || diagnosisSelected.length > 0) setAppointmentPage(appointmentPage + 1)
    
  }

  const prevAppointmentPage = () => {
    if(appointmentPage > 1){
      setAppointmentPage(appointmentPage - 1)
    }
  }

  const toggleService = (evt) => {
    let serviceChosen = evt.target.parentElement.parentElement.children[1].id;
    let isServiceAlreadySelected = servicesSelected.some((s) => s === serviceChosen);

    if(isServiceAlreadySelected){
      let newServicesSelected = servicesSelected.filter((s) => s !== serviceChosen);
      setServicesSelected((s) => s = newServicesSelected);
      evt.target.classList.remove("bg-raisin-black");
    }else{
      servicesSelected.length > 0 ?
      setServicesSelected((prevSelected) => [...prevSelected, serviceChosen]) : setServicesSelected((s) => s = [serviceChosen]);
      evt.target.classList.add("bg-raisin-black");
    }
  }

  const toggleDiagnosis = (evt) => {
    let diagnosisChosen = evt.target.parentElement.parentElement.children[1].id;
    let isDiagnosisAlreadySelected = diagnosisSelected.some((s) => s === diagnosisChosen);
    if(isDiagnosisAlreadySelected){
      let newDiagnosisSelected = diagnosisSelected.filter((s) => s !== diagnosisChosen);
      setDiagnosisSelected((s) => s = newDiagnosisSelected);
      evt.target.classList.remove("bg-raisin-black");
    }else{
      diagnosisSelected.length > 0 ?
      setDiagnosisSelected((prevSelected) => [...prevSelected, diagnosisChosen]) : setDiagnosisSelected((s) => s = [diagnosisChosen]);
      evt.target.classList.add("bg-raisin-black");
    }
  }

  const togglePetsDp = () => {
    setIsPetGroupDpOpened(false);
    setIsPetsDpOpened(b => b = !isPetsDpOpened)
  }

  const togglePetGroupDp = () => {
    setIsPetsDpOpened(false);

    setIsPetGroupDpOpened(b => b = !isPetGroupDpOpened)
  }

  const selectPetForAppointment = (evt) => {
    petGroupSelected.length > 0 && (setPetGroupSelected([]))
    setPetSelected(ps => ps = evt.target.id);
    setAppointmentPage(appointmentPage + 1)
  }

  const selectPetGroupForAppointment = (evt) => {
    petSelected.length > 0 && (setPetSelected([]))
    setPetGroupSelected(pg => pg = evt.target.id);
    setAppointmentPage(appointmentPage + 1)
  }

  const bookAppointment = async () => {
    if(diagnosisSelected.length === 0){
      alert('Choose at least one clinical signs to proceed.');
      return;
    }
    const formData = new FormData();
    formData.append("PETID", petSelected || null)
    formData.append("PGID", petGroupSelected || null)
    formData.append("SERVICEIDS", servicesSelected || [])
    formData.append("DIAGNOSIS", diagnosisSelected || [])
    formData.append("remarks", "")
    formData.append("status", "Scheduled")
    formData.append("date", dateOfAppointment)
    formData.append("time", timeOfAppointment)

    await axios.post('http://localhost:5001/api/appointment/create', formData, 
    {
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setPetSelected([]);
      setPetGroupSelected([]);
      setServicesSelected([]);
      setDiagnosisSelected([]);
      setDateOfAppointment("");
      setTimeOfAppointment("");
      alert('Appointment success.');
      window.location.reload();
    })
  }

  useEffect(() => {
    let atsPromise = loadAppointment();
    let scvs = loadServices();
    let dgs = loadDiagnosis();
    let aatsPromise = loadClinicAppointment();

    atsPromise.then(al => setAppointments(at => at = al));
    scvs.then(scv => setServices(ss => ss = scv));
    dgs.then(dg => setDiagnosis(ds => ds = dg));
    aatsPromise.then(at => setClinicAppointments((ca) => ca = at));
  },[])

  useEffect(() => {
    let petPromise = loadPets();
    let petGroupPromise = loadPetGroup();

    petPromise.then(r => setPets(p => p = r));
    petGroupPromise.then(r => setPetGroup(p => p = r));
  }, [])

  useEffect(() => {}, [servicesSelected, diagnosisSelected, isPetsDpOpened, isPetGroupDpOpened])

  return (
    <section className="overflow-hidden">
      <UserNav />
      <section className="h-fit flex flex-col lg:flex-row">
        <section className="lg:w-[40%] flex justify-center">
          <section className="bg-white-smoke shadow-md px-2 py-5 h-[300px] w-[90%] max-h-[500px] overflow-y-auto mt-16 rounded-md">
            <h5 className="font-lato font-semibold text-headline-md mb-4">Upcoming Appointments</h5>
            <section className="flex flex-col gap-2">
              {/* appointment list */}
              {
                appointments && (
                  appointments.map((a, index) => (
                    <section key={index} className="grid grid-cols-3 w-full border-b border-b-silver">
                      <section className="flex flex-col">
                        <h5 className="font-lato text-content-xtrasm md:text-content-md text-raisin-black font-semibold">{convertDate(a.date)}</h5>
                        <p className="font-lato text-content-xtrasm md:text-content-md text-silver font-semibold">{convertTime(a.time)}</p>
                      </section>
                      <h5 className={`font-lato text-content-xtrasm md:text-content-md text-raisin-black font-semibold`}>{a.client}</h5>
                      <p className="font-lato text-content-xtrasm md:text-content-md text-raisin-black">{a.service}</p>
                    </section>
                  ))
                )
              }
            </section>
          </section>
        </section>
        <section className="lg:w-[60%] mt-16 flex flex-col items-center">
          <section className="w-[90%] min-h-[500px] shadow-md bg-white-smoke px-4 py-4 rounded-md relative">
            <h5 className="font-lato font-semibold text-headline-md mb-2">Book An Appointment</h5>
            {/* Stepper */}
            <section className="flex items-center justify-center flex-wrap w-full gap-2">
                {/* step 1 */}
                <section className="flex items-center justify-center gap-2">
                  {
                    appointmentPage > 1 ?  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] h-[16px] fill-azure rounded-full">
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg> 
                    : 
                    <section className="bg-raisin-black rounded-full px-2 py-2 w-[16px] h-[16px] flex justify-center items-center">
                      <h5 className="text-white-smoke font-lato font-semibold text-[8px]">1</h5>
                    </section>
                  }
                  <p className={`${appointmentPage === 1 && ('font-semibold')} text-content-sm text-nowrap`}>Set Date</p>
                </section>
                <span className={`w-[40px] mt-1 h-[2px] ${appointmentPage > 1 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
                {/* step 2 */}
                <section className="flex items-center justify-center gap-2">
                  {
                    appointmentPage > 2 ?  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] h-[16px] fill-azure rounded-full">
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg> 
                    : 
                    <section className="bg-raisin-black rounded-full px-2 py-2 w-[16px] h-[16px] flex justify-center items-center">
                      <h5 className="text-white-smoke font-lato font-semibold text-[8px]">2</h5>
                    </section>
                  }
                  <p className={`${appointmentPage === 2 && ('font-semibold')} text-content-sm text-nowrap`}>Choose Timeslot</p>
                </section>
                <span className={`w-[40px] mt-1 h-[2px] ${appointmentPage > 2 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
                {/* step 3 */}
                <section className="flex items-center justify-center gap-2">
                  {
                    appointmentPage > 3 ?  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] h-[16px] fill-azure rounded-full">
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg> 
                    : 
                    <section className="bg-raisin-black rounded-full px-2 py-2 w-[16px] h-[16px] flex justify-center items-center">
                      <h5 className="text-white-smoke font-lato font-semibold text-[8px]">3</h5>
                    </section>
                  }
                  <p className={`${appointmentPage === 3 && ('font-semibold')} text-content-sm text-nowrap`}>Pick Service</p>
                </section>
                <span className={`w-[40px] mt-1 h-[2px] ${appointmentPage > 3 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
                {/* step 4 */}
                <section className="flex items-center justify-center gap-2">
                  {
                    appointmentPage > 4 ?  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] h-[16px] fill-azure rounded-full">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg> 
                    : 
                    <section className="bg-raisin-black rounded-full px-2 py-2 w-[16px] h-[16px] flex justify-center items-center">
                      <h5 className="text-white-smoke font-lato font-semibold text-[8px]">4</h5>
                    </section>
                  }
                  <p className={`${appointmentPage === 4 && ('font-semibold')} text-content-sm text-nowrap`}>Select Pet</p>
                  <span className={`w-[40px] mt-1 h-[2px] ${appointmentPage > 4 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
                </section>
                {/* step 5 */}
                <section className="flex items-center justify-center gap-2">
                  {
                    appointmentPage > 5 ?  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[16px] h-[16px] fill-azure rounded-full">
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg> 
                    : 
                    <section className="bg-raisin-black rounded-full px-2 py-2 w-[16px] h-[16px] flex justify-center items-center">
                      <h5 className="text-white-smoke font-lato font-semibold text-[8px]">5</h5>
                    </section>
                  }
                  <p className={`${appointmentPage === 4 && ('font-semibold')} text-content-sm text-nowrap`}>Select Pet Diagnosis</p>
                </section>
            </section>
            {/* Appointment pages */}
            <section className="flex justify-center py-5">
              {/* calendar */}
              <section className={`${appointmentPage == 1 ? 'block' : 'hidden'}`}>
                <Calendar onSelectDate={selectDate}/>
              </section>
              {/* time slot */}
              <section className={`${appointmentPage == 2 ? 'w-full max-h-[500px] px-3 py-3 gap-3 rounded-md grid grid-cols-3' : 'hidden'}`}>
                {
                  timeSlot.map((time, index) => (
                    <div key={index} className={`border border-raisin-black 
                      ${clinicAppointments.some(caobj => caobj.date === dateOfAppointment && caobj.time.includes(time)) ? 
                      'hidden' : 'flex items-center justify-center rounded-3xl cursor-pointer h-[32px] group hover:bg-raisin-black'}`} onClick={(evt) => selectTime(evt)}>
                      <p className="font-lato text-raisin-black group group-hover:text-white-smoke">{time}</p>
                      
                    </div>
                  ))
                }
              </section>
              {/* services */}
              <section className={`${appointmentPage === 3 ? 'max-w-fit max-h-[500px] px-3 py-3 gap-3 rounded-md grid grid-cols-3' : 'hidden'} `}>
                {
                  services && (
                    services.map((svcs,index) => (
                      <section key={index} className="flex items-center gap-4 relative">
                        <section className="flex items-center justify-center w-[16px] h-[16px] border border-raisin-black group cursor-pointer">
                          <section className={`w-[12px] h-[12px] group group-hover:bg-raisin-black-light`} onClick={(e) => toggleService(e)}></section>
                        </section>
                        <h5 id={svcs.SERVICEID} className="font-lato text-content-sm lg:text-content-md">{svcs.service}</h5>
                      </section>
                    ))
                  )
                }
              </section>
              {/* pets / pet group*/}
              <section className={`${appointmentPage === 4 ? 'w-full max-h-[500px] px-3 py-3 gap-3 rounded-md flex flex-col' : 'hidden'}`}>
                <section className="w-full h-fit flex flex-col gap-4">
                  {/* PETS */}
                  <section className="h-fit">
                    <section className="flex justify-between cursor-pointer px-2 py-2 bg-raisin-black" onClick={togglePetsDp}>
                      <h5 className="font-lato text-white-smoke">Pets</h5>     
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${isPetsDpOpened ? 'hidden' : 'w-[12px] fill-white-smoke'}`}>
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${!isPetsDpOpened ? 'hidden' : 'w-[12px] fill-white-smoke'}`}>  
                        <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                      </svg>
                    </section>
                  </section>
                  <section className={`${isPetsDpOpened ? 'h-40 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-10 overflow-y-auto overflow-x-hidden' : 'hidden'}`}>
                    {
                      pets ? 
                        pets.map(pet => (
                          <section key={pet.PETID} className="relative group cursor-pointer ">
                            <section id={pet.PETID} className="w-full h-full bg-raisin-black absolute rounded-full opacity-0" onClick={(evt) => selectPetForAppointment(evt)}></section>
                            <section className="flex items-center gap-2 px-2 py-2 rounded-full group-hover:bg-chefchaouen-blue">
                              <img src={`/pet/${pet.image}`} className="w-[48px] h-[48px] aspect-square rounded-full"/>
                              <h5 className="text-content-sm md:text-content-md w-full font-lato text-raisin-black group group-hover:text-white-smoke group-hover:font-semibold">{pet.nickname}</h5>
                            </section>
                          </section>
                        ))  
                      :
                      <h5> Register a pet</h5>
                    }
                  </section>

                  {/* PET GROUP */}
                  <section className="h-fit">
                    <section className="flex justify-between cursor-pointer px-2 py-2 bg-raisin-black" onClick={togglePetGroupDp}>
                      <h5 className="font-lato text-white-smoke">Pet Group</h5>     
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${isPetGroupDpOpened ? 'hidden' : 'w-[12px] fill-white-smoke'}`}>
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${!isPetGroupDpOpened ? 'hidden' : 'w-[12px] fill-white-smoke'}`}>  
                        <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                      </svg>
                    </section>
                  </section>
                  <section className={`${isPetGroupDpOpened ? 'h-40 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-10 overflow-y-auto' : 'hidden'}`}>
                  {
                      petGroup ? 
                        petGroup.map(pet => (
                          <section key={pet.PGID} id={pet.PGID} className="relative h-fit w-fit">
                            <section id={pet.PGID} className="flex items-center gap-2 px-2 py-2 cursor-pointer group" onClick={(evt) => selectPetGroupForAppointment(evt)}>
                              <h5 id={pet.PGID} className="w-full font-lato text-raisin-black text-nowrap group group-hover:underline underline-offset-4 text-content-xtrasm md:text-content-sm lg:text-content-md">{pet.GROUP_NICKNAME}</h5>
                            </section>
                          </section>
                        ))  
                      :
                      <h5> Register a pet group</h5>
                    }
                  </section>

                </section>
              </section>
              {/* diagnosis */}
              <section className={`${appointmentPage === 5 ? 'max-w-fit max-h-[200px] px-3 py-3 gap-4 rounded-md grid grid-cols-2 lg:grid-cols-3 overflow-y-auto overflow-x-hidden' : 'hidden'} `}>
                {
                  diagnosis && (
                    diagnosis.map((svcs,index) => (
                      <section key={index} className="flex items-center gap-4 relative">
                        <section className="flex items-center justify-center w-[16px] h-[16px] border border-raisin-black group cursor-pointer">
                          <section className={`w-[12px] h-[12px] group group-hover:bg-raisin-black-light`} onClick={(e) => toggleDiagnosis(e)}></section>
                        </section>
                        <h5 id={svcs.DIAGID} className="font-lato text-content-xtrasm md:text-content-md">{svcs.diagnosis}</h5>
                      </section>
                    ))
                  )
                }
                
              </section>
            </section>
            {/* form controls */}
            <section className="absolute left-0 bottom-0 px-2 py-2 flex justify-between w-full">
              <button className={`${appointmentPage == 1 ? 'hidden' : 'bg-raisin-black text-white-smoke px-6 py-1.5 font-lato rounded-sm hover:bg-raisin-black-light'}`} onClick={prevAppointmentPage}> Back </button>
              <button className={`${appointmentPage == 3 ? 'bg-raisin-black text-white-smoke px-6 py-1.5 font-lato rounded-sm hover:bg-raisin-black-light' : 'hidden'}`} onClick={nextAppointmentPage}> Next </button>
              <button className={`${appointmentPage == 5 ? 'bg-raisin-black text-white-smoke px-6 py-1.5 font-lato rounded-sm hover:bg-raisin-black-light' : 'hidden'}`} onClick={bookAppointment}> Book Appointment </button>
            </section>
          </section>
        </section>
      </section>
      <Footer/>
    </section>
  )
}

export default UserHome