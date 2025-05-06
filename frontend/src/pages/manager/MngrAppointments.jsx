import React, { useEffect, useState } from 'react'
import MngrNav from '@/components/navbars/MngrNav';
import Table from '@/components/Table';
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertDate, convertTime } from '../../utils/datetimeUtils'
import Modal from '@/components/Modal';

const HEADERS = [
  {
      "key": "No.",
      "isSortable": true,
      "isSorted": false
  },
  {
      "key": "Client",
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
      "key": "Date",
      "isSortable": true,
      "isSorted": false
  },
  {
      "key": "Time",
      "isSortable": true,
      "isSorted": false
  },
  {
      "key": "Status",
      "isSortable": true
  }
];

function MngrAppointments() {
  let sessionToken = sessionStorage.getItem('jwt-token')
  const [tab, setTab] = useState(1);
  const [UAData, setUADATA] = useState([]);
  const [RAData, setRAData] = useState([]);
  const [AHData, setAHData] = useState([]);
  const [UAFull, setUAFull] = useState([]);
  const [appointmentSelected,setAppointmentSelected] = useState({asid: ''});
  const [isAppModalOpened, setIsAppModalOpened] = useState(false);
  const [vaccineObj, setVaccineObj] = useState([]);
  const [vaccineNames, setVaccineNames] = useState([]);
  const [vModalFields, setVModalFields] = useState();

  const changeTab = (tabNum) => {
    setTab(prev => prev = tabNum)
  }

  const loadVaccines = async () => {
    let v;
    let vaccine_names = [];
    await axiosInstance.get('/api/vaccine')
    .then(res => {
      v = res.data.data
      v.map(vaccine => vaccine_names.push(vaccine.vaccine_name))
    })
    .catch(err => console.error(err))
    return [v, vaccine_names];
  }

  const loadAppointmentHistory = async () => {
    let atmt = [];
    await axiosInstance.get('/api/appointment/all', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
          'service': app.service,
          'diagnosis': app.diagnosis,
          'date': convertDate(app.date),
          'time': convertTime(app.time),
          "status": {
            "isFinished": app.status.trim() === 'Done' ? true : false,
            "withCheckboxes" : false,
          }
        }
        atmt.push(sched)
      })
    })
    .catch(err => console.error(err))
    return atmt
  }

  const loadRecentAppointment = async () => {
    let atmt = [];
    await axiosInstance.get('/api/appointment/all/recent', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
          'service': app.service,
          'diagnosis': app.diagnosis,
          'date': convertDate(app.date),
          'time': convertTime(app.time),
          "status": {
            "isFinished": app.status.trim() === 'Done' ? true : false,
            "withCheckboxes" : false,
          }
        }
        atmt.push(sched)
      })
    })
    .catch(err => console.error(err))
    return atmt
  }

  const loadUpcomingAppointment = async () => {
    let atmt = [];
    await axiosInstance.get('/api/appointment/all/upcoming', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      setUAFull(apps)
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
          'service': app.service,
          'diagnosis': app.diagnosis,
          'date': convertDate(app.date),
          'time': convertTime(app.time),
          "status": {
            "isFinished": false,
            "withCheckboxes" : true,
          }
        }
        atmt.push(sched)
      })
    })
    .catch(err => console.error(err))
    return atmt
  }

  const exportAppointmentHistory = async () => {
    await axiosInstance.get('/api/appointment/all/history/export', {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
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

  const exportUpcomingAppointment = async () => {
    await axiosInstance.get('/api/appointment/all/upcoming/export', {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
    .then(res => {
      const disposition = res.headers['content-disposition'];
      const matches = /filename="(.+)"/.exec(disposition);
      const filename = matches != null && matches[1] ? matches[1] : 'upcoming_appointments.pdf';
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename; 
      link.click(); d
      window.URL.revokeObjectURL(url); 
  
    })
  }

  const openAcceptAppointmentModal = (asid) => {
    setAppointmentSelected({asid: asid})
    setIsAppModalOpened(true)
  }

  const closeAppointmentModal = () => {
    setIsAppModalOpened(false)
  }

  const rejectAppointment = (asid) => {
    setAppointmentSelected({asid: asid})
    onUpdateAppointmentStatus('Rejected', '');
  }

  const fulfillAppointment = async (fields) => {
    let filteredUA = UAFull.filter((uaf) => uaf.ASID === appointmentSelected.asid)
    
    if(fields[1].content.length !== 0){
      let filteredVaccine = vaccineObj.filter(v => v.vaccine_name == fields[1].content)
      const formData = new FormData();
      formData.append('vaccid', filteredVaccine[0].VACCID || '');
      formData.append('petid', filteredUA[0].PETID || null);
      formData.append('pgid', filteredUA[0].PGID || null);
      formData.append('asid', appointmentSelected.asid)
      await axiosInstance.post('/api/vaccinations/create', formData, {headers: {"Content-Type" : 'application/json'}})
      .then(() => {
        onUpdateAppointmentStatus('Done', fields[0].content || '');
      })
    }else{
      onUpdateAppointmentStatus('Done', fields[0].content || '');
    }
  }
  
  const onUpdateAppointmentStatus = async (status, remarks) => {
    const formData = new FormData();
    formData.append('status', status);
    formData.append('remarks', remarks || '');

    await axiosInstance.put(`/api/appointment/status?asid=${appointmentSelected.asid}`, formData, {headers: {'Content-Type': 'application/json'}})
    .then(() => window.location.reload())
  }

  useEffect(() => {
    let ahPromise = loadAppointmentHistory();
    let raPromise = loadRecentAppointment();
    let uaPromise = loadUpcomingAppointment();

    ahPromise.then((ahist) => setAHData(ahist))
    raPromise.then((rce) => setRAData(rce))
    uaPromise.then((up) => setUADATA(up))

  },[])

  useEffect(() => {
      const fetchVaccines = async () => {
        try {
          const v = await loadVaccines();
          setVaccineNames(v[1]);
          setVaccineObj(v[0]);
          setVModalFields(prevState => prevState = [
            {
              "type": 'textarea',
              "headers": 'Remarks'
            },
            {
              "type": 'select',
              "headers": 'Vaccine (If any)',
              "options": v[1],
              "txtContent": v[1][0]
            }
          ])
        } catch (error) {
          console.error("Error loading vaccines:", error);
        }
      };
      fetchVaccines()
  },[])

  return (
    <section className="flex w-screen h-screen overflow-hidden">
        <MngrNav />
        <section className="flex-1 overflow-x-auto px-4">
          <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">appointments</h5>
          <section className='flex gap-0.5 mb-5'>
            <div className={` border-b-4 ${tab === 1 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(1)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 1 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Upcoming Appointments</h5>
            </div>
            <div className={` border-b-4 ${tab === 2 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(2)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 2 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Recent Appointments</h5>
            </div>
            <div className={` border-b-4 ${tab === 3 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(3)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 3 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Appointment History</h5>
            </div>
          </section>
          <section className="flex flex-wrap justify-between max-w-[calc(100vw-280px)] overflow-hidden relative h-[80%]">
            <section className={`${tab === 1 ? 'w-[95%]' : 'hidden'}`}>
                {
                  UAData.length > 0 && (
                    <Table headers={HEADERS} data={UAData} tableW={"w-full"} tableH={'h-fit'}
                      acceptAppointment={openAcceptAppointmentModal}
                      rejectAppointment={rejectAppointment }
                      />
                  )
                }
                {
                  vModalFields && (
                    <Modal 
                    headline={''} 
                    isActive={isAppModalOpened} 
                    onClose={closeAppointmentModal} 
                    fields={vModalFields} 
                    button={{txtContent: 'Complete Appointment', isDisplayed: true}}
                    onSubmitFunc={fulfillAppointment}
                    />
                  )
                }
                
            </section>
            <section className={`${tab === 2 ? 'w-[95%]' : 'hidden'}`}>
              {
                RAData.length > 0 && (
                  <Table headers={HEADERS} data={RAData} tableW={"w-full"} tableH={'h-fit'}/>
                )
              }
            </section>
            <section className={`${tab === 3 ? 'w-[95%]' : 'hidden'}`}>
              {
                AHData.length > 0 && (
                  <Table headers={HEADERS} data={AHData} tableW={"w-full"} tableH={'h-fit'}/>
                )
              }
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${tab === 1 ? 'w-[40px] fill-raisin-black absolute bottom-8 left-4 cursor-pointer hover:fill-raisin-black-light' : 'hidden'}`} onClick={exportUpcomingAppointment}>
              <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${tab === 3 ? 'w-[40px] fill-raisin-black absolute  bottom-8 left-4 cursor-pointer hover:fill-raisin-black-light' : 'hidden'}`} onClick={exportAppointmentHistory}>
              <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
            </svg>
          </section>
        </section>
    </section>
  )
}

export default MngrAppointments