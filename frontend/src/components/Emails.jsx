import { useEffect, useState } from "react"
import Modal from "./Modal"

function Emails({mails = {}, isRecipientsIncluded = true, isBodyIncluded = true}) {
    const [emailSelected, setEmailSelected] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [numberOfEmail, setNumberOfEmail] = useState(0);
    const [emailsIDSelected, setEmailsIdSelected] = useState([]);

    const openModal = (evt) => {
        let RECIPIENT, SUBJECT, MESSAGE;
        if(evt.target.parentElement.children.length > 3){
            RECIPIENT = evt.target.parentElement.children[0].textContent;
            SUBJECT = evt.target.parentElement.children[1].textContent;
            MESSAGE = evt.target.parentElement.children[2].textContent;
            
            const EMAIL = [
                {
                    "headers": "To:",
                    "txtContent": RECIPIENT,
                    "type": "text",
                    "readOnly": true
                },
                {
                    "headers": "Subject:",
                    "txtContent": SUBJECT,
                    "type": "text",
                    "readOnly": true
                },
                {
                    "headers": "Message:",
                    "txtContent": MESSAGE,
                    "type": "textarea",
                    "readOnly": true
                }
            ];
            setEmailSelected(EMAIL);
            setIsModalActive(true)
        }
    }
    const closeModal = () => {
        setIsModalActive(false)
    }
    const checkEmail = (evt) => {
        if(evt.target.checked){
            evt.target.parentElement.classList.add('bg-raisin-black');
            evt.target.parentElement.children[1].children[0].classList.add("text-white-smoke");
            evt.target.parentElement.children[1].children[1].classList.add("text-white-smoke");
            evt.target.parentElement.children[1].children[2].classList.add("text-white-smoke");
            evt.target.parentElement.children[1].children[3].classList.add("text-white-smoke");
            setEmailsIdSelected((ids) => {
                let newIdsArr = [...ids];
                newIdsArr.push(evt.target.id);
                return newIdsArr;
            });
            setNumberOfEmail(num => num + 1);
        }else{
            evt.target.parentElement.classList.remove('bg-raisin-black');
            evt.target.parentElement.children[1].children[0].classList.remove("text-white-smoke");
            evt.target.parentElement.children[1].children[1].classList.remove("text-white-smoke");
            evt.target.parentElement.children[1].children[2].classList.remove("text-white-smoke");
            evt.target.parentElement.children[1].children[3].classList.remove("text-white-smoke");
            setEmailsIdSelected((ids) =>{ 
                let newFilteredIds = ids.filter((id) => id !== evt.target.id);
                return newFilteredIds;
            })
            setNumberOfEmail(num => num - 1);
        }
    }
    
    useEffect(() => {},[isModalActive,emailSelected]);
    useEffect(() => {},[emailsIDSelected]);

    return (
        <section>
            {
                emailSelected.length > 0 && (
                    <Modal headline="E-Mail" fields={emailSelected} isActive={isModalActive} onClose={closeModal} />
                )
            }
            {numberOfEmail > 0 && (
                <section className="flex items-center justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-fire-engine-red w-[20px] h-[20px] ml-1 cursor-pointer">
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                        <p className="font-lato italic mb-2 text-content-md text-raisin-black">{numberOfEmail} selected </p> 
                </section>
            )}
            {mails.map((mail,index) => (
                <section key={index} className="relative hover:bg-raisin-black group">
                    <input type="checkbox" name="" id={mail.id} className="w-5 h-5 border-2 border-silver rounded-sm appearance-none checked:bg-fire-engine-red checked:border-fire-engine-red absolute left-1 top-2" onClick={checkEmail}/>
                    <section className="gap-5 border-b-silver border-b-2 cursor-pointer py-1.5 px-2" onClick={(el) => openModal(el)}>
                        <section className="flex items-center ml-10 gap-2">
                            <h5 className={`font-lato font-semibold w-fit text-content-xtrasm md:text-content-md group-hover:text-white-smoke ${isRecipientsIncluded ? 'block' : 'hidden'}`}>{mail.recipient}</h5>
                            <h5 className="font-lato font-semibold w-[20%] text-content-xtrasm md:text-content-md group-hover:text-white-smoke">{mail.subject}</h5>
                            <p className={`font-lato w-[75%] truncate text-content-xtrasm md:text-content-md text-silver group-hover:text-white-smoke ${isBodyIncluded ? 'block' : 'hidden'} `}>{mail.body}</p>
                            <h5 className="font-lato font-semibold text-content-xtrasm md:text-content-md group-hover:text-white-smoke w-[10%] text-center">{mail.date_sent}</h5>
                        </section>
                    </section>
                </section>
             ))}
        </section>
    )
}

export default Emails