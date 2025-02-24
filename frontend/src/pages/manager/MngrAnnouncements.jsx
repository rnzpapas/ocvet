import { useEffect, useState } from "react";
import Emails from "@/components/Emails"
import MngrNav from "@/components/navbars/MngrNav"
import Button from "@/components/Button";
import axiosInstance from "@/config/AxiosConfig.jsx"
import { convertEmailDate, convertTime } from '../../utils/datetimeUtils'
import EmailChip from "@/components/EmailChip";


const MAX_CHARACTERS = 500;

function MngrAnnouncements() {
    const userParsed = JSON.parse(localStorage.getItem('user'));
    const sessionToken = sessionStorage.getItem('jwt-token')

    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [suggestedEmails, setSuggestedEmails] = useState([]);
    const [emails, setEmails] = useState([]);
    const [mailGroups, setMailGroups] = useState([]);
    const [numOfChar, setNumOfChar] = useState(0);
    const [isMaxCharReached, setIsMaxCharReached] = useState(false);
    const [isCreateMssgOpened, setIsCreateMssgOpened] = useState(false);
    const [isEmailsDpOpened, setIsEmailDpOpened] = useState(false);
    const [emailSubject, setEmailSubject] = useState();
    const [emailMessage, setEmailMessage] = useState();


    const onMessageChange = (evt) => {
        let charLength = evt.target.value.length
        charLength > MAX_CHARACTERS ? setIsMaxCharReached(isMax => isMax = true) : setIsMaxCharReached(isMax => isMax = false) 
        
        setNumOfChar(n => n = charLength);
        setEmailMessage(evt.target.value);
    }

    const onSubjectChange = (evt) => {
        setEmailSubject(evt.target.value);
    }

    const onClickRecipient = (evt, id, email) => {
        evt.preventDefault();
        let selectedRecipientObj = {
            id: id,
            email: email
        }
        let isExistingEmail = selectedRecipients.some(s => s.email === email)
        if(!isExistingEmail) setSelectedRecipients((prevstate) => [...prevstate, selectedRecipientObj])
    }

    const onRemoveRecipient = (email) => {
        let filteredRecipients = selectedRecipients.filter(em => em.email !== email)
        setSelectedRecipients(filteredRecipients)
    }

    const onEmailSearch = async (evt) => {
        setSuggestedEmails(s => s = [])
        let email = evt.target.value;
        let emails = [];

        await axiosInstance.get(`http://localhost:5001/api/admin/email?email=${email}`,
        {headers: {'Authorization': `Bearer ${sessionToken}`}}
        )
        .then((res) => {
            let adminEmailRes = res.data.data;
            adminEmailRes.map(e => {
                let isNotSelected = selectedRecipients.some(em => em.email != e.email)
                if(isNotSelected){
                    let adminEmailObj = {
                        uaid: e.UAID,
                        email: e.email
                    }
                    emails.push(adminEmailObj)
                }
            })
            setSuggestedEmails(emails);
        })
        .catch(err => console.error(err))
        
    }

    const openEmailDp = () => {setIsEmailDpOpened(true)}
    const closeEmailDp = () => {setIsEmailDpOpened(false)}

    const openCreateMssg = () => {setIsCreateMssgOpened(!isCreateMssgOpened)}

    const loadEmails = async () => {
        let em = [];
        await axiosInstance.get(`http://localhost:5001/api/announcement/user?id=${userParsed.uaid}`, 
        {headers: {'Authorization': `Bearer ${sessionToken}`}})
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
    
    const loadMailGroups = async () => {
        let mg = [];
        await axiosInstance.get('http://localhost:5001/api/mail-groups')
        .then(res => {
            let mailGroupsData = res.data.data;
            mailGroupsData.map((mgd) => {
                mg.push(mgd)
            })
        })
        .catch(err => console.error(err))
        return mg;
    }

    const onSubmitAnnouncement = async () => {
        let tgids = selectedRecipients.filter(u => u.id.includes("TGID")).map(sr => sr.id)
        let uaids = selectedRecipients.filter(u => u.id.includes("UAID")).map(sr => sr.id)
        if(selectedRecipients.length === 0 || !emailSubject || !emailMessage) alert('Please fill out all required fields for announcements.')
        const formData = new FormData();
        formData.append('tgid', tgids);
        formData.append('uaid', uaids);
        formData.append('announcement_title', emailSubject)
        formData.append('message', emailMessage)

        await axiosInstance.post('http://localhost:5001/api/announcement/create', formData, {headers: {"Content-Type": 'application/json'}})
        .then(() => {window.location.reload()})
        .catch(err => console.error(err))
    }

    useEffect(() => {}, [numOfChar]);
    useEffect(() => {}, [isMaxCharReached]);
    useEffect(() => {}, [isCreateMssgOpened]);
    useEffect(() => {}, [suggestedEmails]);

    useEffect(() => {
        let emailPromise = loadEmails();
        emailPromise.then((ep) => setEmails(ep))
        let mailPromise = loadMailGroups();
        mailPromise.then((mp) => setMailGroups(mp))
    }, []);


    return (
        <section className="flex w-full">
            <MngrNav />
            <section className="px-5 py-5 w-full">
                <section className={`absolute ${isCreateMssgOpened ? 'top-1 right-2 px-3 py-3' : 'top-12 right-2  px-3 py-4' } flex justify-center items-center gap-2 bg-raisin-black rounded-full cursor-pointer hover:bg-raisin-black-light`} onClick={openCreateMssg}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${isCreateMssgOpened ? 'hidden' : 'w-[16px] h-[16px] fill-white-smoke'}`}>
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  className={`${isCreateMssgOpened ? 'w-[16px] h-[16px] fill-white-smoke' : 'hidden'}`}>
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                    </svg>
                    <h5 className={`${isCreateMssgOpened ? 'hidden' : 'font-lato font-semibold text-content-md capitalize text-white-smoke'}`}>
                        create message 
                    </h5>
                </section>
                <section className={`${isCreateMssgOpened ? 'flex flex-col gap-2 h-[50%]' : 'hidden'}`}>
                    <section className="flex gap-2 border-b border-b-silver py-2 relative">
                        <section className="flex gap-2">
                            <label htmlFor="to" className="text-silver font-lato font-bold text-content-lrg">To:</label>
                            <section className="flex gap-2">
                                {
                                    selectedRecipients.length > 0 && (
                                        selectedRecipients.map(sm => (
                                            <EmailChip key={sm.id} email={sm.email} onRemove={() => onRemoveRecipient(sm.email)}/>
                                        ))
                                    )
                                }
                                <input type="text" name="to" className="font-lato text-raisin-black w-[90%] text-content-lrg focus:outline-none" onFocus={openEmailDp} onBlur={closeEmailDp} onChange={e => onEmailSearch(e)}/>
                            </section>
                        </section>
                        <section className={`${isEmailsDpOpened ? `bg-white-smoke w-full h-fit a absolute ${selectedRecipients.length > 0 ? 'top-14' : 'top-12'}` : 'hidden'}`}>
                            <section className="border-b-silver ">
                                {
                                    mailGroups.length > 0 && (
                                        mailGroups.map((mg, index) => (
                                            <h5 key={mg.TGID} className="px-2 py-2 font-lato text-raisin-black hover:bg-raisin-black hover:text-white-smoke cursor-pointer" onMouseDown={(e) => onClickRecipient(e, mg.TGID, mg.group_nickname)}> {mg.group_nickname} </h5>
                                        ))
                                    )
                                }
                            </section>
                            <section className="border-b-silver">
                                {
                                    suggestedEmails.length > 0 && (
                                        suggestedEmails.map((sm, index) => (
                                            <h5 key={index} className=" px-2 py-2 font-lato text-raisin-black hover:bg-raisin-black hover:text-white-smoke cursor-pointer" onMouseDown={(e) => onClickRecipient(e, sm.uaid, sm.email)}> {sm.email} </h5>
                                        ))
                                    )
                                }
                            </section>
                        </section>
                    </section>
                    <section className="flex gap-2 border-b border-b-silver py-2">
                        <label htmlFor="" className="text-silver font-lato font-bold text-content-lrg">Subject:</label>
                        <input type="text" className="font-lato text-raisin-black w-[90%] text-content-lrg focus:outline-none" onChange={(e) => onSubjectChange(e)}/>
                    </section>
                    <section className="">
                        <section className="flex justify-between mb-1">
                            <label htmlFor="" className="text-silver font-lato font-bold text-content-lrg">Message:</label>
                            <p className={`font-lato ${isMaxCharReached ? 'text-fire-engine-red' : 'text-raisin-black'}`}>{numOfChar} / {MAX_CHARACTERS} characters</p>
                        </section>
                        <textarea onChange={(el) => onMessageChange(el)} name="" id="" className="px-2 w-full h-[150%] border border-silver resize-none font-lato text-content-lrg"></textarea>
                        <section className="relative w-fit mt-1">
                            <Button txtContent={"send message"} onClickFunc={onSubmitAnnouncement}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[16px] fill-white-smoke absolute top-2 right-3">
                                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                            </svg>
                        </section>
                    </section>
                </section>
                <section className="flex justify-between mt-5">
                    <section className="flex flex-col gap-5 w-full">
                        <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">announcements</h5>
                        <Emails mails={emails} isBodyIncluded={true}/>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default MngrAnnouncements