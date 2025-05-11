import { useEffect, useState } from "react"
import InputField from "./InputField"
import Button from "./Button"
import Link from "./Link"
import NoImg from '@/assets/noimg.png';

function Modal({headline, 
    isActive = false, 
    onClose, 
    img, 
    onSubmitFunc, 
    button = {"txtContent" : "", "isActive" : true, "isDisplayed": true}, tableData = [], exportPetRecords}) {
    let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;

    const [isModalActive, setIsModalActive]= useState(isActive);

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
                        <section className="flex flex-col gap-5 w-full px-10 relative h-full">
                            <section className="flex flex-col items-center justify-center gap-2 w-full ">
                                <img 
                                    className="bg-fire-engine-red w-[100px] h-[100px] rounded-full aspect-square" 
                                    src={`${img ? `${imgDirSrc}/pet/${img}` : NoImg}`}
                                    alt={`${img ? img : "No Image"}`}
                                />
                                <section className="flex items-center gap-1.5">
                                    <h5 className="font-instrument-sans font-semibold lg:text-headline-md text-raisin-black"> {headline} </h5> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={'w-[18px] fill-raisin-black cursor-pointer hover:fill-raisin-black-light'} onClick={exportPetRecords}>
                                        <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                                    </svg>
                                </section>
                            </section>
                            <section className="overflow-y-auto overflow-x-auto min-h-[200px] max-h-[600px]">
                                <table className="w-full h-full border-collapse">
                                    <thead className="bg-raisin-black sticky top-0 z-20">
                                        <tr className="py-4">
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> PETID </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Nickname </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Animal Type </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Owner </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Vaccine </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Service </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Diagnosis </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Appointment Date </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Appointment Time </th>
                                            <th className="text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap"> Remarks </th>
                                        </tr>
                                    </thead>
                                    {
                                        tableData.length > 0 ? (
                                            <tbody>
                                                {
                                                    tableData.map((data, index) => (
                                                        <tr key={index}>
                                                            <td className="text-center font-lato"> {data.PETID} </td>
                                                            <td className="text-center font-lato"> {data.nickname} </td>
                                                            <td className="text-center font-lato"> {data.animal_type} </td>
                                                            <td className="text-center font-lato"> {data.owner} </td>
                                                            <td className="text-center font-lato"> {data.vaccine || "No vaccine injected."} </td>
                                                            <td className="text-center font-lato"> {data.services} </td>
                                                            <td className="text-center font-lato"> {data.diagnosis} </td>
                                                            <td className="text-center font-lato"> {data.appointment_date} </td>
                                                            <td className="text-center font-lato"> {data.appointment_time} </td>
                                                            <td className="text-center font-lato"> {data.remarks} </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            ) :
                                            <tr> <td className="font-lato text-center" colSpan={6}> No pet medical records.</td> </tr>
                                    }
                                </table>            
                            </section>
                            {
                                button.txtContent.length > 0 && button.isDisplayed &&
                                (<Button txtContent={button.txtContent} onClickFunc={onSubmitFunc} style={"sticy bottom-0 w-full text-content-md py-3"}/> )
                            }
                        </section>
                    </section>
                </section>
            )}
        </>
       
    )
}

export default Modal