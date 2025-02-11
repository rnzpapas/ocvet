import React, { useEffect, useState } from 'react'
import SuperAdminNav from '../../components/navbars/SuperAdminNav';
import Table from '../../components/Table';
import axios from 'axios';
import { convertDate, convertTime } from '../../utils/datetimeUtils'

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

function SAdminAppointments() {
  let sessionToken = sessionStorage.getItem('jwt-token')
  const [tab, setTab] = useState(1);
  const [UAData, setUADATA] = useState([
      {
        "number" : "1",
        "client_name": "John Doe",
        "date_of_transaction": "12/02/2024",
        "time_of_transaction": "03:13 PM",
        "status": {
          "isFinished": false,
          "withCheckboxes" : true,
        }
      },
      {
        "number" : "2",
        "client_name": "Jane Doe",
        "date_of_transaction": "12/08/2024",
        "time_of_transaction": "05:13 PM",
        "status": {
          "isFinished": true,
          "withCheckboxes" : true,
        }
      },
  ]);
  const [RAData, setRAData] = useState([
      {
        "number" : "1",
        "client_name": "John Doe",
        "date_of_transaction": "12/02/2024",
        "time_of_transaction": "03:13 PM",
        "status": {
          "isFinished": false,
          "withCheckboxes" : false,
        }
      },
      {
        "number" : "2",
        "client_name": "Jane Doe",
        "date_of_transaction": "12/08/2024",
        "time_of_transaction": "05:13 PM",
        "status": {
          "isFinished": true,
          "withCheckboxes" : false,
        }
      },
  ]);
  const [AHData, setAHData] = useState([
      {
        "number" : "1",
        "client_name": "John Doe",
        "date_of_transaction": "12/02/2024",
        "time_of_transaction": "03:13 PM",
        "status": {
          "isFinished": false,
          "withCheckboxes" : false,
        }
      },
      {
        "number" : "2",
        "client_name": "Jane Doe",
        "date_of_transaction": "12/08/2024",
        "time_of_transaction": "05:13 PM",
        "status": {
          "isFinished": true,
          "withCheckboxes" : false,
        }
      },
  ]);

  const changeTab = (tabNum) => {
    setTab(prev => prev = tabNum)
  }

  const loadAppointmentHistory = async () => {
    let atmt = [];
    await axios.get('http://localhost:5001/api/appointment/all', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
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
    await axios.get('http://localhost:5001/api/appointment/all/recent', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
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
    await axios.get('http://localhost:5001/api/appointment/all/upcoming', {headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => {
      let apps = res.data.data;
      apps.map(app => {
        let sched = {
          'number' : app.ASID,
          'client': app.nickname || app.GROUP_NICKNAME,
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
    await axios.get('http://localhost:5001/api/appointment/all/history/export', {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
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
    await axios.get('http://localhost:5001/api/appointment/all/upcoming/export', {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
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

  useEffect(() => {
    let ahPromise = loadAppointmentHistory();
    let raPromise = loadRecentAppointment();
    let uaPromise = loadUpcomingAppointment();

    ahPromise.then((ahist) => setAHData(ahist))
    raPromise.then((rce) => setRAData(rce))
    uaPromise.then((up) => setUADATA(up))

  })
    
  return (
    <section className="flex w-full overflow-hidden">
        <SuperAdminNav />
        <section className="px-5 py-5 w-full relative">
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
          <section className="flex flex-wrap justify-between h-full">
            <section className={`${tab === 1 ? 'w-full' : 'hidden'}`}>
                <Table headers={HEADERS} data={UAData} tableW={"w-[100%]"} tableH={"ma"}/>
            </section>
            <section className={`${tab === 2 ? 'w-full' : 'hidden'}`}>
                <Table headers={HEADERS} data={RAData} tableW={"w-[100%]"}/>
            </section>
            <section className={`${tab === 3 ? 'w-full' : 'hidden'}`}>
                <Table headers={HEADERS} data={AHData} tableW={"w-[100%]"} tableH={"ma"}/>
            </section>
          </section>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${tab === 1 ? 'w-[40px] fill-silver absolute bottom-8 right-4 cursor-pointer hover:fill-raisin-black' : 'hidden'}`} onClick={exportUpcomingAppointment}>
            <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${tab === 3 ? 'w-[40px] fill-silver absolute bottom-8 right-4 cursor-pointer hover:fill-raisin-black' : 'hidden'}`} onClick={exportAppointmentHistory}>
            <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
          </svg>
        </section>
    </section>
  )
}

export default SAdminAppointments