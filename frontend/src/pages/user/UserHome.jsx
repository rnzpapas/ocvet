import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';
import Calendar from "../../components/Calendar";
import { adjustMonthVisuals, convertDate, convertTime } from "../../utils/datetimeUtils";
import axios from 'axios'

const timeSlot = [
  '08:00 AM', '08:30 AM',
  '9:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM'
];

function UserHome() {
  useRedirectUser();
  let userParsed = JSON.parse(localStorage.getItem('user'));

  const [clinicAppointments, setClinicAppointments] = useState();
  const [appointments, setAppointments] = useState();
  const [services, setServices] = useState();
  const [servicesSelected, setServicesSelected] = useState();
  const [isServicesDpOpened, setIsServicesDpOpened] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [diagnosisSelected, setDiagnosisSelected] = useState();
  const [isDiagnosisDpOpened, setIsDiagnosisDpOpened] = useState();
  const [dateOfAppointment, setDateOfAppointment] = useState();
  const [timeOfAppointment, setTimeOfAppointment] = useState();
  const [appointmentPage, setAppointmentPage] = useState(1);


  const loadClinicAppointment = async () => {
    let ap = [];
    await axios.get('http://localhost:5001/api/appointment/all')
    .then((res) => {
      let apiResponse = res.data.data;

      apiResponse.map((appointment) => {
        let schedule = {
          "date": convertDate(appointment.date),
          "time": appointment.time
        }
        ap.push(schedule);
      })
    })
    .catch(err => console.error(err))
    return ap;
  }

  const loadAppointment = async () => {
    let apts;
    await axios.get(`http://localhost:5001/api/appointment/user?id=${userParsed.uid}`)
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
    let selectedDate = `${year}-${modifiedMonth}-${day}`;
    setDateOfAppointment((da) => da = selectedDate);
    setAppointmentPage(appointmentPage + 1);
  }

  const selectTime = (evt) => {
    setTimeOfAppointment((ta) => ta = evt.target.textContent);
    setAppointmentPage(appointmentPage + 1);

  }

  const prevAppointmentPage = () => {
    if(appointmentPage > 1){
      setAppointmentPage(appointmentPage - 1)
    }
  }

  const selectService = (evt) => {

  }

  const deselectService = (evt) => {
    
  }

  const selectDiagnosis = (evt) => {

  }

  const deselectDiagnosis = (evt) => {
    
  }
  useEffect(() => {
    let atsPromise = loadAppointment();
    let scvs = loadServices();
    let dgs = loadDiagnosis();
    let aatsPromise = loadClinicAppointment();

    atsPromise.then(al => setAppointments(at => at = al));
    scvs.then(scv => setServices(ss => ss = scv));
    dgs.then(dg => setDiagnosis(ds => ds = dg));
    aatsPromise.then(at => setClinicAppointments(ca => ca = at));

  },[])

  return (
    <>
      <UserNav />
      <section className="h-dvh flex">
        <section className="w-[40%] flex justify-center">
          <section className="bg-white-smoke shadow-md px-10 py-5 w-[600px] max-h-[300px] overflow-y-auto mt-16">
            <h5 className="font-lato font-semibold text-headline-md mb-4">Upcoming Appointments</h5>
            <section className="flex flex-col gap-2">
              {/* appointment list */}
              {
                appointments && (
                  appointments.map(a => (
                    <section className="flex items-center justify-between border-b border-b-silver">
                      <section className="flex flex-col">
                        <h5 className="font-lato text-content-md text-raisin-black font-semibold">{convertDate(a.date)}</h5>
                        <p className="font-lato text-content-md text-silver font-semibold">{convertTime(a.time)}</p>
                      </section>
                      <section>
                        <h5 className="font-lato text-content-md text-raisin-black font-semibold">{a.PETID ? a.nickname : a.GROUP_NICKNAME}</h5>
                        <h5 className={`font-lato text-content-md text-silver font-semibold ${a.PETID && ('hidden')}`}>{a.nickname}</h5>
                      </section>
                      <p className="font-lato text-content-md text-raisin-black">{a.service}</p>
                    </section>
                  ))
                )
              }

            </section>
          </section>
        </section>
        <section className="w-[60%] mt-16 flex flex-col items-center">
          <h5 className="font-lato font-semibold text-headline-md mb-4">Book An Appointment</h5>
          {/* Stepper */}
          <section className="flex items-center justify-center gap-2">
              {/* step 1 */}
              <section className="flex items-center justify-center gap-2">
                {
                appointmentPage > 1 ?  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[32px] h-[32px] fill-white-smoke bg-chefchaouen-blue rounded-full px-2 py-2">
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg> 
                : 
                <section className="bg-raisin-black rounded-full px-2 py-2 w-[32px] h-[32px] flex justify-center items-center">
                  <h5 className="text-white-smoke font-lato font-semibold text-content-sm">1</h5>
                </section>
                }
                <p className={`${appointmentPage === 1 && ('font-semibold')} text-content-md`}>Set Date</p>
              </section>
              <span className={`w-[20px] mt-2 h-[2px] ${appointmentPage > 1 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
              {/* step 2 */}
              <section className="flex items-center justify-center gap-2">
                {
                appointmentPage > 2 ?  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[32px] h-[32px] fill-white-smoke bg-chefchaouen-blue rounded-full px-2 py-2`}>
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg> 
                : 
                <section className="bg-raisin-black rounded-full px-2 py-2 w-[32px] h-[32px] flex justify-center items-center">
                  <h5 className="text-white-smoke font-lato font-semibold text-content-sm">2</h5>
                </section>
                }
                <p className={`${appointmentPage === 2 && ('font-semibold')} text-content-md`}>Choose Timeslot</p>
              </section>
              <span className={`w-[20px] mt-2 h-[2px] ${appointmentPage > 2 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
              {/* step 3 */}
              <section className="flex items-center justify-center gap-2">
                {
                appointmentPage > 3 ?  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[32px] h-[32px] fill-white-smoke bg-chefchaouen-blue rounded-full px-2 py-2`}>
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg> 
                : 
                <section className="bg-raisin-black rounded-full px-2 py-2 w-[32px] h-[32px] flex justify-center items-center">
                  <h5 className="text-white-smoke font-lato font-semibold text-content-sm">3</h5>
                </section>
                }
                <p className={`${appointmentPage === 3 && ('font-semibold')} text-content-md`}>Pick Service</p>
              </section>
              <span className={`w-[20px] mt-2 h-[2px] ${appointmentPage > 3 ? ' bg-chefchaouen-blue' : ' bg-silver' }`}></span>
              {/* step 4 */}
              <section className="flex items-center justify-center gap-2">
                {
                appointmentPage > 3 ?  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-[32px] h-[32px] fill-white-smoke bg-chefchaouen-blue rounded-full px-2 py-2`}>
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg> 
                : 
                <section className="bg-raisin-black rounded-full px-2 py-2 w-[32px] h-[32px] flex justify-center items-center">
                  <h5 className="text-white-smoke font-lato font-semibold text-content-sm">4</h5>
                </section>
                }
                <p className={`${appointmentPage === 3 && ('font-semibold')} text-content-md`}>Select Pet Diagnosis</p>
              </section>
          </section>
          {/* Appointment pages */}
          <section className="relative py-12">
            {/* calendar */}
            <section className={`${appointmentPage == 1 ? 'block' : 'hidden'}`}>
              <Calendar onSelectDate={selectDate}/>
            </section>
            {/* time slot */}
            <section className={`${appointmentPage == 2 ? 'block' : 'hidden'} bg-white-smoke shadow-md max-w-fit max-h-[500px] px-3 py-3 gap-3 rounded-md grid grid-cols-5`}>
              {
                timeSlot.map(time => (
                  appointments ? (
                    appointments.map((aps) => (
                      <div className={`border border-raisin-black ${convertTime(aps.time) === time ? 'hidden' : 'flex'}  items-center justify-center px-2 rounded-md cursor-pointer max-h-[75px] group hover:bg-raisin-black`} onClick={(evt) => selectTime(evt)}>
                        <p className="font-lato text-raisin-black group group-hover:text-white-smoke">{time}</p>
                      </div>
                    ))
                  )
                  :
                  <div className="border border-raisin-black flex items-center justify-center px-2 rounded-md cursor-pointer max-h-[75px] group hover:bg-raisin-black" onClick={(evt) => selectTime(evt)}>
                    <p className="font-lato text-raisin-black group group-hover:text-white-smoke">{time}</p>
                  </div>
                ))
              }
            </section>
            {/* services */}
            <section className={`${appointmentPage === 3 ? 'block' : 'hidden'} bg-white-smoke shadow-md max-w-fit max-h-[500px] px-3 py-3 gap-3 rounded-md grid grid-cols-5`}>
              {
                services && (
                  services.map(svcs => (
                    <section className="flex flex-col relative">
                      <section className="max-h-19 flex items-center justify-between border rounded-[5px] border-silver py-2 px-2 hover:border-raisin-black-light">
                          <section className="font-lato flex gap-2 overflow-x-auto">
                              {servicesSelected.length > 0 ? servicesSelected.map((svc) => (
                                  <section key={svc.SERVICEID} className={`flex gap-2 items-center px-2 py-2 ${selectedPets.length > 0 && ('mb-2')} rounded-full min-w-fit z-10 bg-raisin-black`}>
                                      <h5 className="font-lato text-content-sm text-white-smoke">{svc.service}</h5>
                                      <section className="h-full w-5 cursor-pointer flex justify-center relative" >
                                          <section className="w-full h-full absolute" id={svc.SERVICEID} onClick={e => deselectPet(e)}></section>
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-[12px] fill-white-smoke">
                                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                          </svg>
                                      </section>
                                  </section>
                              )): 'Select Pets'}
                          </section>
                          <section className="flex items-center justify-center w-[10%] max-h-20 cursor-pointer" onClick={onClickPetDropdown}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`h-[12px] ${isPetDropdownOpen ? 'hidden' : 'block'}`}>
                                  <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`h-[12px] ${isPetDropdownOpen ? 'block' : 'hidden'}`}>
                                  <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                              </svg>
                          </section>
                      </section>
                      <section className={`block z-20 w-full bg-[#ffffff] rounded-[10px] border border-silver min-h-[80px] max-h-[130px] overflow-y-auto`}>
                          {
                              services && (
                                  services.map((svc) => (
                                      <section key={svc.SERVICEID} className="h-[50px] group hover:bg-azure relative">
                                          <section className=" w-full h-full absolute" onClick={selectPet} id={svc.PETID}></section>
                                          <section className="flex gap-5 items-center px-2 py-2w-full h-full">
                                              <img src={`/pet/${svc.image}`} alt="z" className="h-[30px] w-[30px] aspect-square rounded-full"/>
                                              <h5 className="font-lato group group-hover:text-white-smoke">{svc.nickname}</h5>
                                          </section>
                                      </section>
                                  ))
                              )
                          }
                      </section>
                    </section>
                  ))
                )
              }
            </section>
            <button className={`${appointmentPage == 1 ? 'hidden' : 'block'} bg-raisin-black text-white-smoke px-3 py-2 font-lato absolute left-0 bottom-0 rounded-sm hover:bg-raisin-black-light`} onClick={prevAppointmentPage}> Back </button>
          </section>
        </section>
      </section>
      <Footer/>
    </>
  )
}

export default UserHome