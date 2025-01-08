import { useEffect, useState } from "react";
import Emails from "../../components/Emails"
import MngrNav from "../../components/navbars/MngrNav"
import Button from "../../components/button";

const MAX_CHARACTERS = 500;

function MngrAnnouncements() {
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
    const [numOfChar, setNumOfChar] = useState(0);
    const [isMaxCharReached, setIsMaxCharReached] = useState(false);

    const onMessageChange = (evt) => {
        let charLength = evt.target.value.length
        charLength > MAX_CHARACTERS ? setIsMaxCharReached(isMax => isMax = true) : setIsMaxCharReached(isMax => isMax = false) 
        
        setNumOfChar(n => n = charLength);
    }

    useEffect(() => {}, [numOfChar]);
    useEffect(() => {}, [isMaxCharReached]);

    return (
        <section className="flex w-full">
            <MngrNav />
            <section className="px-5 py-5 w-full">
                <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">new message</h5>
                <section className="flex flex-col gap-2 h-[50%]">
                    <section className="flex gap-2 border-b border-b-silver py-2">
                        <label htmlFor="" className="text-silver font-lato font-bold text-content-lrg">To:</label>
                        <input type="text" className="font-lato text-raisin-black w-[90%] text-content-lrg focus:outline-none"/>
                    </section>
                    <section className="flex gap-2 border-b border-b-silver py-2">
                        <label htmlFor="" className="text-silver font-lato font-bold text-content-lrg">Subject:</label>
                        <input type="text" className="font-lato text-raisin-black w-[90%] text-content-lrg focus:outline-none"/>
                    </section>
                    <section className="">
                        <section className="flex justify-between mb-1">
                            <label htmlFor="" className="text-silver font-lato font-bold text-content-lrg">Message:</label>
                            <p className={`font-lato ${isMaxCharReached ? 'text-fire-engine-red' : 'text-raisin-black'}`}>{numOfChar} / {MAX_CHARACTERS} characters</p>
                        </section>
                        <textarea onChange={(el) => onMessageChange(el)} name="" id="" className="px-2 w-full h-[150%] border border-silver resize-none font-lato text-content-lrg"></textarea>
                        <section className="relative w-fit mt-1">
                            <Button txtContent={"send message"} />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[16px] fill-white-smoke absolute top-2 right-3">
                                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                            </svg>
                        </section>
                    </section>
                </section>
                <section className="flex justify-between mt-5">
                    <section className="flex flex-col gap-5">
                        <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">announcements</h5>
                        <Emails mails={emails} isBodyIncluded={true}/>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default MngrAnnouncements