import { useState } from "react"
import StaffNav from "../../components/navbars/StaffNav"
import Emails from "../../components/Emails";

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
  return (
    <section className="flex w-full">
        <StaffNav />
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">dashboard</h5>
            <section className="flex flex-col gap-5">
                <h5 className="font-lato text-raisin-black text-headline-md font-semibold"> Visit this week</h5>
                <section className="w-full h-60"></section>
            </section>
            <section className="flex justify-between">
                <section className="flex flex-col gap-5">
                    <h5 className="font-lato text-raisin-black text-headline-md font-semibold">Pet assists</h5>
                </section>
                <section className="flex flex-col gap-5">
                    <h5 className="font-lato text-raisin-black text-headline-md font-semibold">Announcements</h5>
                    <Emails mails={emails} isBodyIncluded={false}/>
                </section>
            </section>
        </section>
    </section>
  )
}

export default StaffHome