import { useState } from "react"
import InputField from "./InputField"

function Modal({headline, fields, isActive, img}) {
    const [isModalActive, setIsModalActive]= useState(isActive)
    const exitModal = () => {
        setIsModalActive(!isModalActive)
    }   
    const onChangeVal = () => {}
    return (
        <>
            {isModalActive ? 
                <section className="absolute top-0 left-0 w-screen h-screen bg-raisin-black/25 flex items-center justify-center"> 
                    <section className="relative bg-white-smoke w-[500px] h-[500px] rounded-[10px] flex flex-col items-center py-7">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={exitModal} className="absolute top-3 right-4 w-[15px] cursor-pointer">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                        <h5 className="font-instrument-sans font-semibold text-headline-md text-raisin-black "> {headline} </h5>
                        <section className="flex flex-col gap-2 w-full px-10">
                            {fields.map((field, index) => (
                                <section key={index} className="flex flex-col gap-2">
                                    <label htmlFor={field.headers} className="font-instrument-sans font-semibold text-headline-sm">{field.headers}</label>
                                    {field.type === "image" ? 
                                        <section className="flex justify-center">
                                            <img 
                                                className="bg-fire-engine-red w-[100px] h-[100px] rounded-full" 
                                                src={img}
                                            />
                                        </section>
                                        :
                                        <InputField type={field.type} isReadOnly={true} value={field.txtContent} name={field.headers} onChangeFunc={onChangeVal}/>
                                    }
                                </section>
                            ))}
                        </section>
                    </section>
                </section>
                :
                ""
            }
        </>
       
    )
}

export default Modal