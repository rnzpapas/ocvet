import { useState } from 'react'
import Table from '../../components/Table';
import MngrNav from '../../components/navbars/MngrNav';

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
function MngrAppointments() {
    // Upcoming appointments
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
    // Recent Appointments
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
    // Appointment History
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

    return (
        <section className="flex w-full overflow-hidden">
            <MngrNav />
            <section className="px-5 py-5 w-full ">
                <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">appointments</h5>
                <section className="flex flex-wrap justify-between h-full">
                    <section className='w-[50%] flex flex-col gap-3'>
                        <h5 className="font-lato text-raisin-black text-headline-md font-semibold"> Upcoming Appointments</h5>
                        <Table headers={HEADERS} data={UAData} tableW={"w-[90%]"} tableH={"ma"}/>
                    </section>
                    <section className='w-[50%] flex flex-col gap-3'>
                        <h5 className="font-lato text-raisin-black text-headline-md font-semibold"> Recent Appointments</h5>
                        <Table headers={HEADERS} data={RAData} tableW={"w-[90%]"}/>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h5 className="font-lato text-raisin-black text-headline-md font-semibold"> Appointment History</h5>
                        <Table headers={HEADERS} data={AHData} tableW={"w-[90%]"} tableH={"ma"}/>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default MngrAppointments