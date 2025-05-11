import { useEffect, useState } from "react"
import Emails from "@/components/Emails";
import MngrNav from "@/components/navbars/MngrNav";
import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertEmailDate, convertTime } from '../../utils/datetimeUtils'


function MngrHome() {
  const userParsed = JSON.parse(localStorage.getItem('user'))
  const [emails, setEmails] = useState([]);
  const [vaccines, setVaccines] = useState([]);

  const [stats, setStats] = useState({ totalToday: 0, totalThisWeek: 0, totalThisMonth: 0 });
  const [successStats, setSuccessStats] = useState({ totalCompleted: 0, totalMissed: 0});

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

  const loadVaccineStats = async () => {
    try{
      let res = await axiosInstance.get("/api/vaccinations/demand");
      if(res.data){
        console.log(res.data.data)
        return res.data.data;
      }
    }catch(err){
      let message = 'Failed to fetch vaccine data';
      console.error(message);
      console.error(err);
    }
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

  useEffect(() => {
    const dataPromise = async () => {
      let appointmentStatsPromise = await loadAppointmentStats();
      setStats(appointmentStatsPromise);
      let appointmentSuccessStatsPromise = await loadAppointmentSuccessStats();
      setSuccessStats(appointmentSuccessStatsPromise);
      let emailPromise = await loadEmails();
      setEmails(emailPromise);
      let vaccinePromise = await loadVaccineStats();
      setVaccines(vaccinePromise);;
    }
    dataPromise();
  },[])

  return (
    <section className="flex w-full">
        <MngrNav />
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">dashboard</h5>
            <section className="grid grid-cols-3 gap-7">
                <section className="flex flex-col gap-5 items-center">
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
                <section className="flex flex-col gap-5 items-center">
                    <h5 className="font-lato text-raisin-black text-headline-sm font-semibold"> Appointments Summary </h5>
                    <section className="h-60">
                      {
                        vaccines && (
                          <BarChart 
                          chartH={'h-full'}
                          labels={vaccines.map((v) => v.vaccine_name)} 
                          datasetLabel={"Number of Injections"}
                          datasetData={vaccines.map((v) => v.demand_count)}
                          optionTooltipLabel={'Injected'}
                          />
                        )
                      }
                    </section>
                </section>
            </section>
            <section className="flex flex-col gap-5">
                <h5 className="font-lato text-raisin-black text-headline-md font-semibold">Announcements</h5>
                <Emails mails={emails} isRecipientsIncluded={false} isBodyIncluded={true}/>
            </section>
        </section>
    </section>
  )
}

export default MngrHome