import { useEffect, useState } from "react"
import InputField from "./InputField"
import Button from "./Button"
import Link from "./Link"
import NoImg from '@/assets/noimg.png';

function Modal({headline, fields, isActive = false, onClose, img, inputStyle, 
    onChangeFunc, isReadOnly = false, isDisabled = false, isTextBox = false,
    onSubmitFunc, textAreaHeight,
    button = {"txtContent" : "", "isActive" : true, "isDisplayed": true},
    link = {"txtContent" : "", "isActive" : true, "isDisplayed": true},
    clickableLink = {"txtContent" : "", "isActive" : true, "isDisplayed": true, "onClickFunc": undefined}
    }) {
    let imgDirSrc = import.meta.env.VITE_AWS_BUCKET_CONNECTION;

    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [isModalActive, setIsModalActive]= useState(isActive);
    const [isExitModalClicked, setIsExitModalClicked] = useState(false);
    const [password, setPassword] = useState("");
    const [formFields, setFormFields] = useState(fields);

    const handleFieldChange = (index, event) => {
        const updatedFields = [...formFields];
        const { type, name, checked, value } = event.target;
    
        if (type === "checkbox") {
            if (!Array.isArray(updatedFields[index].txtContent)) {
                updatedFields[index].txtContent = [];
            }
        
            if (checked) {
                if (!updatedFields[index].txtContent.includes(name)) {
                    updatedFields[index].txtContent.push(name);
                }
            } else {
                updatedFields[index].txtContent = updatedFields[index].txtContent.filter(item => item !== name);
            }
        } else {
            updatedFields[index] = {
                ...updatedFields[index],
                txtContent: value
            };
        }
    
        setFormFields(updatedFields);
    };
  
    const togglePasswordField = () => {
        setIsHiddenPassword(!isHiddenPassword);
    }

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
                    <section className="relative bg-white-smoke w-[350px] min-h-fit max-h-[500px] xl:w-[500px] rounded-[10px] flex flex-col items-center py-7">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={onClose} className="absolute top-3 right-4 w-[15px] cursor-pointer">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                        <h5 className="font-instrument-sans font-semibold lg:text-headline-md text-raisin-black mb-5"> {headline} </h5>
                        <section className="flex flex-col gap-2 w-full px-10 relative h-full">
                            {formFields.map((field, index) => (
                                <section key={index} className="flex flex-col gap-2">
                                    <label htmlFor={field.headers} className="font-instrument-sans font-semibold text-headline-sm">{field.headers}</label>
                                    {field.type === "image" ? 
                                        <section className="flex justify-center">
                                            <img 
                                                className="bg-fire-engine-red w-[100px] h-[100px] rounded-full aspect-square" 
                                                src={`${field.img ? `${imgDirSrc}/pet/${field.img}` : NoImg}`}
                                                alt={`${field.img ? field.img : "No Image"}`}
                                            />
                                        </section>
                                        : field.type === "password" ? 
                                            <section className="flex flex-col gap-1">
                                                <section className="relative">
                                                    <InputField type={`${isHiddenPassword ? 'password' : 'text'}`} placeholder={"E.g. y0uRp4ssW0rd@!"} name="password" style={"w-[100%]"} onChangeFunc={(e) => handleFieldChange(index, e)}/>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={togglePasswordField} className={`w-[28px] fill-silver cursor-pointer hover:fill-raisin-black-light absolute right-4 top-2.5 ${isHiddenPassword ? '' : 'hidden'}`}>
                                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" onClick={togglePasswordField} className={`w-[28px] fill-silver cursor-pointer hover:fill-raisin-black-light absolute right-4 top-2.5 ${isHiddenPassword ? 'hidden' : ''}`}>
                                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                                                    </svg>
                                                </section>
                                            </section>
                                            :
                                            <section className="flex flex-col gap-1 overflow-y-auto max-h-[100px]">
                                                {field.type !== "textarea" ? 
                                                    field.type !== 'select' ?
                                                        field.type !== 'checkbox' ?
                                                            <InputField type={field.type} isReadOnly={field.readOnly} value={field.txtContent} name={field.headers} onChangeFunc={field.readOnly ? undefined : ((e) => handleFieldChange(index, e))} style={inputStyle} />
                                                        :
                                                            (
                                                                field.options && Array.isArray(field.options) && (
                                                                    field.options.map((option, checkboxIndex) => {
                                                                      if (typeof option === "object" && !Array.isArray(option)) {
                                                                        const values = Object.values(option);
                                                                        const label = `${values[0]} (${values[1]})`;
                                                                        const isDisabled = values[1] == 0;
                                                                  
                                                                        return (
                                                                          <section key={checkboxIndex} className="flex gap-2 items-center">
                                                                            <input
                                                                              type="checkbox"
                                                                              name={values[0]}
                                                                              id={values[0]}
                                                                              onChange={isDisabled ? undefined : (e) => handleFieldChange(index, e)}
                                                                              disabled={isDisabled}
                                                                            />
                                                                            <label htmlFor={values[0]} className="flex items-center gap-2">
                                                                                {label}  
                                                                                <span className={values[1] == 0 ? "text-sm italic text-fire-engine-red" : "hidden" }>
                                                                                    {values[1] == 0 ? "Out of Stock" : "" }
                                                                                </span>
                                                                            </label>
                                                                          </section>
                                                                        );
                                                                      } else {
                                                                        const label = String(option);
                                                                        return (
                                                                          <section key={checkboxIndex} className="flex gap-2 items-center">
                                                                            <input
                                                                              type="checkbox"
                                                                              name={label}
                                                                              id={label}
                                                                              onChange={(e) => handleFieldChange(index, e)}
                                                                            />
                                                                            <label htmlFor={label}>{label}</label>
                                                                          </section>
                                                                        );
                                                                      }
                                                                    })
                                                                  )
                                                            )
                                                        :
                                                        <select className="font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light" 
                                                        value={field.txtContent} 
                                                        onChange={field.readOnly ? undefined : ((e) => handleFieldChange(index, e))}>
                                                            <option value="" >None</option>
                                                            {
                                                                field.options && (
                                                                    field.options.map((option, index) => (
                                                                        <option key={index} value={option}>{option}</option>
                                                                    
                                                                    ))
                                                                )
                                                            }
                                                        </select>
                                                    :
                                                    <textarea className={`${textAreaHeight} w-full resize-none font-lato border rounded-[5px] border-silver py-2 px-2 focus:outline-raisin-black-light ${field.readOnly ? 'bg-silver/50' : 'bg-none'} `} readOnly={field.readOnly} value={field.txtContent} onChange={field.readOnly ? undefined : ((e) => handleFieldChange(index, e))}></textarea>
                                                }
                                            </section>
                                    }
                                </section>
                            ))}
                            <section className="w-full flex justify-end">
                                {
                                    link.txtContent.length > 0 && link.isDisplayed &&
                                    (<Link txtContent={link.txtContent} />)
                                }
                                {
                                    clickableLink  && (
                                        <h5 className="font-lato text-azure font-semibold cursor-pointer hover:underline" onClick={clickableLink.onClickFunc ? clickableLink.onClickFunc : undefined}> {clickableLink.txtContent} </h5>
                                    )
                                }
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