import { useEffect, useState } from "react"
import SuperAdminNav from "@/components/navbars/SuperAdminNav";
import DoughnutChart from "@/components/charts/DoughnutChart";
import BarChart from "@/components/charts/BarChart";
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertEmailDate, convertTime } from "../../utils/datetimeUtils";
import { capitalizeFirstLetter } from '../../utils/textUtils'
import Emails from "@/components/Emails";

function SAdminHome() {
  const userParsed = JSON.parse(localStorage.getItem('user'));
  const sessionToken = sessionStorage.getItem('jwt-token');
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState({ totalToday: 0, totalThisWeek: 0, totalThisMonth: 0 });
  const [successStats, setSuccessStats] = useState({ totalCompleted: 0, totalMissed: 0});
  const [animalPopulation, setAnimalPopulation] = useState([])
  const [employeePopulation, setEmployeePopulation] = useState(0);
  const loadAppointmentStats = async () => {
    let a;
    await axiosInstance.get("/api/appointment/stats")
    .then(response => a = response.data.data)
    .catch(error => console.error("Error fetching data:", error));
    return a;
  }

  const loadAppointmentSuccessStats = async () => {
    let a;
    await axiosInstance.get("/api/appointment/stats/success")
    .then(response => a = response.data.data)
    .catch(error => console.error("Error fetching data:", error));
    return a;
  }

  const loadEmails = async () => {
    let em = [];
    await axiosInstance.get(`/api/announcement/user?id=${userParsed.uaid}`)
    .then(res => {
      let emailResponse = res.data.data;
      emailResponse.map(er => {
        let emailObj = {
          "id": er.ANNID,
          "recipient": er.group_nickname || er.user_emails,
          "subject": er.announcement_title,
          "body": er.message,
          "date_sent": convertEmailDate(er.date),
          "time_sent": convertTime(er.time)
        }
        em.push(emailObj)
      })
    })
    return em;
  }

  const employeeCount = async () => {
    let n;
    await axiosInstance.get('/api/admin/count',{headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => n = res.data.data[0].count)
    .catch(err => console.error(err))
    console.log(n)
    return n;
  }

  const animalTypeCount = async () => {
    let a;
    await axiosInstance.get('/api/pets/type/count',{headers:{'Authorization': `Bearer ${sessionToken}`}})
    .then((res) => a = res.data.data)
    .catch(err => console.error(err))
    return a;
  }

  useEffect(() => {
    let appointmentStatsPromise = loadAppointmentStats();
    appointmentStatsPromise.then((astats) => setStats(st => st = astats));
    let appointmentSuccessStatsPromise = loadAppointmentSuccessStats();
    appointmentSuccessStatsPromise.then((astats) => setSuccessStats(st => st = astats));
    let emailPromise = loadEmails();
    emailPromise.then((ep) => setEmails(ep))
    let animalTypeCountPromise = animalTypeCount();
    animalTypeCountPromise.then((atc) => setAnimalPopulation(atc));
    let employeeCountPromise = employeeCount();
    employeeCountPromise.then((atc) => setEmployeePopulation(atc));
  },[])
  return (
    <section className="flex w-screen h-screen overflow-hidden">
        <SuperAdminNav/>
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">dashboard</h5>
            <section className="grid grid-cols-3 gap-7">
                <section className="flex flex-col gap-5">
                    <h5 className="font-lato text-raisin-black text-headline-sm font-semibold"> Appointments Summary </h5>
                    <section className="h-60">
                      {
                        stats && (
                          <BarChart 
                          chartH={'h-full'}
                          labels={["Today", "This Week", "This Month"]} 
                          datasetLabel={"Total Appointments"}
                          datasetData={[stats.totalToday, stats.totalThisWeek, stats.totalThisMonth]}
                          optionTooltipLabel={'Appointments'}
                          />
                        )
                      }
                    </section>
                </section>
                <section className="flex flex-col gap-5  items-center">
                    <h5 className="font-lato text-raisin-black text-headline-sm font-semibold">Appointment Completion Overview</h5>
                    <section className="h-60 flex justify-center">
                    {
                      successStats && (
                        <DoughnutChart 
                        chartH={'h-48'}
                        labels={["Total Completed", "Total Missed"]} 
                        datasetLabel={"Total Appointments"}
                        datasetData={[successStats.totalCompleted, successStats.totalMissed]}
                        optionTooltipLabel={'Appointments'}
                        />
                      )
                    }
                </section>
                </section>
                <section className="flex flex-col gap-5">
                    <h5 className="font-lato text-raisin-black text-headline-sm font-semibold"> Employee Summary </h5>
                    <section className="h-40 flex flex-col items-center justify-center bg-raisin-black p-10 rounded-xl">
                      <h5 className="font-lato font-semibold text-[40px] text-white-smoke">{employeePopulation}</h5>
                      <p className="font-lato text-white-smoke capitalize font-medium italic mb-4">Active employees</p>
                    </section>
                </section>
                <section className="flex flex-col gap-5 items-center col-span-2">
                    <h5 className="font-lato text-raisin-black text-headline-sm font-semibold"> Animal Population </h5>
                    <section className="xxl:h-fit xxl:max-h-40 overflow-x-auto min-w-[50%] max-w-[90%]">
                      {
                        animalPopulation && (
                          <BarChart 
                          chartH={'h-full'}
                          labels={animalPopulation.map(item => capitalizeFirstLetter(item.animal_type))} 
                          datasetLabel={"Total Population"}
                          datasetData={animalPopulation.map(item => item.total_population)}
                          optionTooltipLabel={'Population'}
                          />
                        )
                      }
                    </section>
                </section>
            </section>
            <section className="flex flex-col gap-5 max-h-64 min-h-40">
                <h5 className="font-lato text-raisin-black text-headline-md font-semibold">Announcements</h5>
                <Emails mails={emails} isRecipientsIncluded={false} isBodyIncluded={true}/>
            </section>
        </section>
    </section>
  )
}

export default SAdminHome