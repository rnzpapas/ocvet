import { useEffect, useState } from "react"
import StaffNav from "@/components/navbars/StaffNav"
import Emails from "@/components/Emails";
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertEmailDate, convertTime } from "../../utils/datetimeUtils";

function StaffHome() {
  const userParsed = JSON.parse(localStorage.getItem('user'))
  const [emails, setEmails] = useState([]);
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
    let appointmentStatsPromise = loadAppointmentStats();
    appointmentStatsPromise.then((astats) => setStats(st => st = astats));
    let appointmentSuccessStatsPromise = loadAppointmentSuccessStats();
    appointmentSuccessStatsPromise.then((astats) => setSuccessStats(st => st = astats));
    let emailPromise = loadEmails();
    emailPromise.then((ep) => setEmails(ep))
  },[])

  return (
    <section className="flex w-full">
        <StaffNav />
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">announcements</h5>
            {/* <section className="grid grid-cols-3 gap-7">
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
            </section> */}
            <section className="flex flex-col gap-5">
                <Emails mails={emails} isRecipientsIncluded={false} isBodyIncluded={true}/>
            </section>
        </section>
    </section>
  )
}

export default StaffHome