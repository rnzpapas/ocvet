import React, { useEffect, useState } from 'react'
import StaffNav from '@/components/navbars/StaffNav'
import Table from '@/components/Table';
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertDate, convertTime } from '../../utils/datetimeUtils';
import Modal from '@/components/Modal';
import ConfirmationModal from '@/components/ConfirmationModal';
import PetRecordsModal from '@/components/PetRecordsModal';

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
      "key": "Evidence",
      "isSortable": false,
      "isSorted": false
  },
  {
      "key": "Status",
      "isSortable": true
  }
];

const UPCOMING_HEADERS = [
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
      "key": "Evidence",
      "isSortable": false,
      "isSorted": false
  },
  {
      "key": "Actions",
      "isSortable": true
  }
];

const ONGOING_HEADERS = [
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
      "key": "Evidence",
      "isSortable": false,
      "isSorted": false
  },
  {
      "key": "Status",
      "isSortable": true
  },
  {
    "key": "Actions",
    "isSortable": true
  }
];

function StaffAppointments() {
  let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;
  let sessionToken = sessionStorage.getItem('jwt-token');
  
  const [tab, setTab] = useState(1);
  const [UAData, setUADATA] = useState([]);
  const [OAData, setOAData] = useState([]);
  const [RAData, setRAData] = useState([]);
  const [AHData, setAHData] = useState([]);
  const [UAFull, setUAFull] = useState([]);
  const [OAFull, setOAFull] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentSelected,setAppointmentSelected] = useState({asid: ''});
  const [isAppModalOpened, setIsAppModalOpened] = useState(false);
  const [vaccineObj, setVaccineObj] = useState([]);
  const [vaccineNames, setVaccineNames] = useState([]);
  const [proofImage, setProofImage] = useState();
  const [petMedicalRecords, setPetMedicalRecords] = useState([]);
  const [vModalFields, setVModalFields] = useState();
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [isMedicalRecordsModal, setIsMedicalRecordsModal] = useState(false);
  const [isProofImageViewer, setIsProofImageViewer] = useState(false);
  const [currentPetName, setCurrentPetName] = useState("");
  const [currentPetImage, setCurrentPetImage] = useState("");


  const openPetMedicalRecords = (asid) => {
    let filteredUA = UAFull.filter((uaf) => uaf.ASID === asid);
    setCurrentPetImage(filteredUA[0].image)
    setCurrentPetName(filteredUA[0].nickname);
    setAppointmentSelected({asid: asid});
    setIsMedicalRecordsModal(true);
  };

  const closePetMedicalRecords = () => {
    setCurrentPetName("");
    setAppointmentSelected({asid: ''});
    setPetMedicalRecords([]);
    setIsMedicalRecordsModal(false);
  };

  const showProofImage = (ASID) => {
    const ahistory = appointments.filter(d => d.ASID == ASID);
    setProofImage(ahistory[0].proof_image);
    setIsProofImageViewer(true);
  };

  const closeProofImage = () => {
    setProofImage("");
    setIsProofImageViewer(false);
  }

  const changeTab = (tabNum) => {
    setTab(prev => prev = tabNum)
  }

  const loadVaccines = async () => {
    try{
      let v;
      let vaccine_details = [];
      let res = await axiosInstance.get('/api/vaccine')
  
      if(res.data) {
        v = res.data.data
        v.map(vaccine => {
          vaccine_details.push({
            data_one: vaccine.vaccine_name,
            data_two: parseInt(vaccine.stock)
          })
        })
      }
      return [v, vaccine_details];
    }catch(err){
      console.error(err);
    }
  }

  const loadAppointmentHistory = async () => {
    let atmt = [];
    await axiosInstance.get('/api/appointment/all', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      setAppointments(apps);
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
          'service': app.service,
          'diagnosis': app.diagnosis,
          'date': convertDate(app.date),
          'time': convertTime(app.time),
          'hasEvidence': app.proof_image ? true : false,
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
          'hasEvidence': app.proof_image ? true : false,
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
          'hasEvidence': app.proof_image ? true : false,
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

  const loadOngoingAppointment = async () => {
    let atmt = [];
    await axiosInstance.get('/api/appointment/all/ongoing', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      setOAFull(apps);
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
          'service': app.service,
          'diagnosis': app.diagnosis,
          'date': convertDate(app.date),
          'time': convertTime(app.time),
          'hasEvidence': app.proof_image ? true : false,
          "status": {
            "isOngoing": true,
            "isFinished": undefined,
            "withCheckboxes" : false,
          },
          "action": true
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

  const loadPetMedicalRecords = async () => {
    try{
      let recordArr = [];
      let filteredUA = UAFull.filter((uaf) => uaf.ASID === appointmentSelected.asid);

      let res = await axiosInstance.get(`/api/pet/records?PETID=${filteredUA[0].PETID}`);
      if(res.data){
        let records = res.data.data;
        records.map(record => {
          let recordObj = {
            PETID: record.PETID,
            nickname: record.nickname,
            animal_type: record.animaltype,
            owner: record.fullname,
            vaccine: record.vaccine_name,
            services: record.service,
            diagnosis: record.diagnosis,
            appointment_date: record.date,
            appointment_time: convertTime(record.time),
            remarks: record.remarks
          }
          recordArr.push(recordObj);
        });
        return recordArr;
      }
    }catch(err){
      let message = err.response?.data?.message || 'Error on fetching medical records.';
      console.error(message);
      console.error(err);
    }
  }

  const exportPetMedicalRecords = async () => {
    let filteredUA = UAFull.filter((uaf) => uaf.ASID === appointmentSelected.asid);

    await axiosInstance.get(`/api/pet/records/export?PETID=${filteredUA[0].PETID}`, {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
    .then(res => {
      const disposition = res.headers['content-disposition'];
      const matches = /filename="(.+)"/.exec(disposition);
      const filename = matches != null && matches[1] ? matches[1] : 'pet_records.pdf';
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename; 
      link.click();
      window.URL.revokeObjectURL(url); 
    })
  }

  const openAcceptAppointmentModal = () => setIsConfirmationModal(true);

  const openAppointmentModal = (asid) => {
    setIsAppModalOpened(true);
    setAppointmentSelected({asid: asid});
  };

  const closeAppointmentModal = () => {
    setIsAppModalOpened(false);
    setAppointmentSelected({asid: ''});

  }

  const rejectAppointment = (asid) => {
    setAppointmentSelected({asid: asid})
    onUpdateAppointmentStatus('Rejected', '');
  }

  const closeConfirmationModal = () => setIsConfirmationModal(false);

  const updateAppointmentOngoing = () => {
    onUpdateAppointmentStatus('Ongoing', '');
    setIsConfirmationModal(false);
    window.location.reload();
  }

  const fulfillAppointment = async (fields) => {
    try{
      let filteredOA = OAFull.filter((uaf) => uaf.ASID === appointmentSelected.asid);
      let vaccinesModalValues = fields[1].content;
      if(vaccinesModalValues && Array.isArray(vaccinesModalValues)){
        vaccinesModalValues.forEach(async (vcc) => {
          let filteredVaccine = vaccineObj.filter(v => v.vaccine_name == vcc);
          let new_stock_count = parseInt(filteredVaccine[0].stock) - 1;
          let body = {
            new_count: new_stock_count, 
            vaccid: filteredVaccine[0].VACCID
          }
          let res = await axiosInstance.put("/api/vaccine/update/stock", body, {headers: {"Content-Type" : 'application/json'}});
  
          if(res.status == 200){
            const formData = new FormData();
            formData.append('vaccid', filteredVaccine[0].VACCID || '');
            formData.append('petid', filteredOA[0].PETID || null);
            formData.append('pgid', filteredOA[0].PGID || null);
            formData.append('asid', appointmentSelected.asid);
            let res = await axiosInstance.post('/api/vaccinations/create', formData, {headers: {"Content-Type" : 'application/json'}})
            
            if(res.status == 201){
              console.log('vaccines appointment to update status...')
              onUpdateAppointmentStatus('Done', fields[0].content || '');
            }
          }
        });
      }else{
        onUpdateAppointmentStatus('Done', fields[0].content || '');
      }
    }catch(err){
      let message = err.response?.data?.message || "Failed to fullfil appointment.";
      console.error(message);
      console.error(err);
    }
  }
  
  const onUpdateAppointmentStatus = async (status, remarks) => {
    try{
      const formData = new FormData();
      formData.append('status', status);
      formData.append('remarks', remarks || '');
  
      let res = await axiosInstance.put(`/api/appointment/status?asid=${appointmentSelected.asid}`, formData, {headers: {'Content-Type': 'application/json'}})
      console.log(res)
      if(res.status == 200) window.location.reload();
    }catch(err){
      let message = err.response?.data?.message || "Failed to update appointment status.";
      console.error(message);
      console.error(err);
    }
  }

  useEffect(() => {
    const allPromises = async () => {
      let ah = await loadAppointmentHistory();
      let ra = await loadRecentAppointment();
      let ua = await loadUpcomingAppointment();
      let oa = await loadOngoingAppointment();
      
      setAHData(ah);
      setRAData(ra);
      setUADATA(ua);
      setOAData(oa);
    }

    allPromises();
  },[])

  useEffect(() => {
      const fetchVaccines = async () => {
        try {
          const v = await loadVaccines();
          setVaccineNames(v[1]);
          setVaccineObj(v[0]);
          setVModalFields([
            {
              "type": 'textarea',
              "headers": 'Remarks'
            },
            {
              "type": 'checkbox',
              "headers": 'Vaccine (If any)',
              "options": v[1],
              "txtContent": "None"
            }
          ]);
        } catch (error) {
          console.error("Error loading vaccines:", error);
        }
      };
      fetchVaccines()
  },[])

  useEffect(() => {
    let recordsPromise = async () => {
      if(appointmentSelected.asid && isMedicalRecordsModal){
        let pm = await loadPetMedicalRecords();
        setPetMedicalRecords(pm);
      }
    }
    recordsPromise();
  },[appointmentSelected])

  return (
    <section className="flex w-screen h-screen overflow-hidden">
        <StaffNav />
        <section className="flex-1 overflow-x-auto px-4">
          <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">appointments</h5>
          <section className='flex gap-0.5 mb-5'>
            <div className={` border-b-4 ${tab === 1 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(1)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 1 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Upcoming Appointments</h5>
            </div>
            <div className={` border-b-4 ${tab === 2 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(2)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 2 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Ongoing Appointments</h5>
            </div>
            <div className={` border-b-4 ${tab === 3 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(3)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 3 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Recent Appointments</h5>
            </div>
            <div className={` border-b-4 ${tab === 4 ? ('border-b-azure') : 'border-silver'} cursor-pointer hover:ring-raisin-black-light`} onClick={() => changeTab(4)}>
              <h5 className={`font-lato px-2 py-4 ${tab === 4 ? ('text-raisin-black font-semibold') : 'text-silver'}`}>Appointment History</h5>
            </div>
          </section>
          <section className="flex flex-wrap justify-between max-w-[calc(100vw-280px)] overflow-hidden relative h-[80%]">
            <section className={`${tab === 1 ? 'w-[95%]' : 'hidden'}`}>
                {
                  UAData.length > 0 && (
                    <Table headers={UPCOMING_HEADERS} data={UAData} tableW={"w-full"} tableH={'h-fit'}
                      acceptAppointment={openPetMedicalRecords}
                      rejectAppointment={rejectAppointment}
                      showProofImage={showProofImage}
                    />
                  )
                }
                {
                  isMedicalRecordsModal && (
                    <PetRecordsModal 
                    headline={`${currentPetName}'s Medical Records`} 
                    tableData={petMedicalRecords} 
                    isActive={isMedicalRecordsModal} 
                    onClose={closePetMedicalRecords} 
                    img={currentPetImage} 
                    onSubmitFunc={openAcceptAppointmentModal}
                    button={{isDisplayed:true, txtContent: 'Begin Appointment'}}
                    exportPetRecords={exportPetMedicalRecords}
                    />
                  )
                }
                {
                  isConfirmationModal && (
                    <ConfirmationModal title={"Confirm Appointment Status"} message={"Mark this appointment as ongoing?"} isOpen={isConfirmationModal} onClose={closeConfirmationModal} onConfirm={updateAppointmentOngoing}/>
                  )
                }
            </section>
            <section className={`${tab === 2 ? 'w-[95%]' : 'hidden'}`}>
              {
                OAData.length > 0 && (
                  <Table headers={ONGOING_HEADERS} data={OAData} tableW={"w-full"} tableH={'h-fit'} markAsCompleted={openAppointmentModal} showProofImage={showProofImage}/>
                )
              }
              {
                  isAppModalOpened && vModalFields && (
                    <Modal 
                    headline={''} 
                    isActive={isAppModalOpened} 
                    onClose={closeAppointmentModal} 
                    fields={vModalFields} 
                    button={{txtContent: 'Complete Appointment', isDisplayed: true}}
                    onSubmitFunc={fulfillAppointment}
                    showProofImage={showProofImage}

                    />
                  )
              }
            </section>
            <section className={`${tab === 3 ? 'w-[95%]' : 'hidden'}`}>
              {
                RAData.length > 0 && (
                  <Table headers={HEADERS} data={RAData} tableW={"w-full"} tableH={'h-fit'} showProofImage={showProofImage} />
                )
              }
            </section>
            <section className={`${tab === 4 ? 'w-[95%]' : 'hidden'}`}>
              {
                AHData.length > 0 && (
                  <Table headers={HEADERS} data={AHData} tableW={"w-full"} tableH={'h-fit'} showProofImage={showProofImage}/>
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
          {
            isProofImageViewer && (
              <section className='absolute top-0 left-0 bg-raisin-black/50 flex items-center justify-center w-screen h-screen z-50'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='absolute top-3 right-3 fill-white-smoke cursor-pointer h-10 w-10' onClick={closeProofImage}>
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
                <img src={`${imgDirSrc}/appointment/${proofImage}`} className='h-[500px]'/>
              </section>
            )
          }
        </section>
    </section>
  )
}

export default StaffAppointments