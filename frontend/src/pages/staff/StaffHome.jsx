import { useEffect, useState } from "react"
import StaffNav from "../../components/navbars/StaffNav"
import Emails from "../../components/Emails";
import BarChart from "../../components/charts/BarChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import axios from 'axios';

function StaffHome() {
  const [emails, setEmails] = useState([
    {
      "id": "MAIL100",
      "recipient": "OCVET_EMPLOYEES",
      "subject": "Medical Allowance 2025",
      "body": "We are pleased to announce that the company will now be offering a medical allowance to all eligible employees to help cover healthcare expenses. Further details on eligibility and the application process will be shared shortly. We encourage everyone to take advantage of this benefit for their well-being.",
      "date_sent": "Jan 12"
    },
    {
      "id": "MAIL101",
      "recipient": "OCVET_EMPLOYEES",
      "subject": "Raffle Winners",
      "body": "We are excited to announce the winners of our recent raffle! Congratulations to all winners! – please stay tuned for more details on how to claim your prizes.",
      "date_sent": "Dec 29"
    },
    {
      "id": "MAIL102",
      "recipient": "OCVET_EMPLOYEES",
      "subject": "13th Month Pay Announcement",
      "body": "We are pleased to inform you that the 13th month pay will be distributed today latest at 8PM. Please feel free to reach out if you have any questions regarding this payment.",
      "date_sent": "Dec 14"
    },
  ]);
  const [stats, setStats] = useState({ totalToday: 0, totalThisWeek: 0, totalThisMonth: 0 });
  const [successStats, setSuccessStats] = useState({ totalCompleted: 0, totalMissed: 0});

  const loadAppointmentStats = async () => {
    let a;
    await axios.get("http://localhost:5001/api/appointment/stats")
    .then(response => a = response.data.data)
    .catch(error => console.error("Error fetching data:", error));
    return a;
  }

  const loadAppointmentSuccessStats = async () => {
    let a;
    await axios.get("http://localhost:5001/api/appointment/stats/success")
    .then(response => a = response.data.data)
    .catch(error => console.error("Error fetching data:", error));
    return a;
  }

  useEffect(() => {
    let appointmentStatsPromise = loadAppointmentStats();
    appointmentStatsPromise.then((astats) => setStats(st => st = astats));
    let appointmentSuccessStatsPromise = loadAppointmentSuccessStats();
    appointmentSuccessStatsPromise.then((astats) => setSuccessStats(st => st = astats));
  },[])

  return (
    <section className="flex w-full">
        <StaffNav />
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
            </section>
            <section className="flex flex-col gap-5">
                <h5 className="font-lato text-raisin-black text-headline-md font-semibold">Announcements</h5>
                <Emails mails={emails} isBodyIncluded={true}/>
            </section>
        </section>
    </section>
  )
}

export default StaffHome