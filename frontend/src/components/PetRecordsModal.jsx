import { useEffect, useState } from "react"
import InputField from "./InputField"
import Button from "./Button"
import Link from "./Link"
import NoImg from '@/assets/noimg.png';

function Modal({headline, isActive = false, onClose, img, onSubmitFunc, button = {"txtContent" : "", "isActive" : true, "isDisplayed": true}, tableData = []}) {
    let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;

    const [isModalActive, setIsModalActive]= useState(isActive);

    const handleSubmit = () => {
        const updatedData = formFields.map(field => ({
          header: field.headers,
          content: field.txtContent
        }));
    
        onSubmitFunc(updatedData);
    };

    useEffect(() => {
        isActive ? setIsModalActive((isOpen) => isOpen = true) : setIsModalActive((isOpen) => isOpen = false);
    },[isActive])

    return (
        <>
            {isModalActive && (
                <section className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-raisin-black/25 flex items-center justify-center z-50"> 
                    <section className="relative bg-white-smoke w-[90%] min-h-fit max-h-[720px] rounded-[10px] flex flex-col items-center py-7">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={onClose} className="absolute top-3 right-4 w-[15px] cursor-pointer">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                        <section className="flex flex-col gap-2 w-full px-10 relative h-full">
                            <section className="flex flex-col justify-center gap-2">
                                <img 
                                    className="bg-fire-engine-red w-[100px] h-[100px] rounded-full aspect-square" 
                                    src={`${img ? `${imgDirSrc}/pet/${img}` : NoImg}`}
                                    alt={`${img ? img : "No Image"}`}
                                />
                                <h5 className="font-instrument-sans font-semibold lg:text-headline-md text-raisin-black mb-5"> {headline} </h5> 
                            </section>
                            <section className="overflow-y-auto overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead className="bg-raisin-black sticky top-0 z-20">
                                        <tr>
                                            <th> PETID </th>
                                            <th> Nickname </th>
                                            <th> Animal Type </th>
                                            <th> Owner </th>
                                            <th> Vaccine </th>
                                            <th> Service </th>
                                            <th> Diagnosis </th>
                                            <th> Appointment Date </th>
                                            <th> Appointment Time </th>
                                            <th> Remarks </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tableData.length > 0 && (
                                                tableData.map(data => (
                                                    <tr>
                                                        <td> {data.PETID} </td>
                                                        <td> {data.nickname} </td>
                                                        <td> {data.animal_type} </td>
                                                        <td> {data.owner} </td>
                                                        <td> {data.vaccine} </td>
                                                        <td> {data.services} </td>
                                                        <td> {data.diagnosis} </td>
                                                        <td> {data.appointment_date} </td>
                                                        <td> {data.appointment_time} </td>
                                                        <td> {data.remarks} </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>            
                            </section>
                            {
                                button.txtContent.length > 0 && button.isDisplayed &&
                                (<Button txtContent={button.txtContent} onClickFunc={handleSubmit} style={"sticy bottom-0 w-full"}/> )
                            }
                        </section>
                    </section>
                </section>
            )}
        </>
       
    )
}

export default Modal