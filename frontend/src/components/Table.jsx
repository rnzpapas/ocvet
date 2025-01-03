import { useState } from "react";

function Table({headers, data}) {
    const [sorted, setIsSorted] = useState({keyToSort: "Client", sortMode: "asc"});
    const [isMarkedChecked, setIsMarkedChecked] = useState(false);
    const [isMarkedX, setIsMarkedX] = useState(false)

    const sortCol = (key) => {
        if(sorted.sortMode === "desc"){
            setIsSorted({keyToSort: key, sortMode: "asc"})
        }
        if(sorted.sortMode === "asc"){
            setIsSorted({keyToSort: key, sortMode: "desc"})
        }
    }

    const toggleCheck = () => {
        isMarkedChecked ? setIsMarkedChecked(false) : setIsMarkedChecked(true)
        isMarkedChecked ? setIsMarkedX(true) : setIsMarkedX(false)
    }

    const toggleX = () => {
        isMarkedX ? setIsMarkedX(false) : setIsMarkedX(true)
        isMarkedX ? setIsMarkedChecked(true) : setIsMarkedChecked(false)
    }

    return (
        <table> 
            <thead className="bg-raisin-black">
                <tr className=" rounded-[10px]">
                    {headers.map((header, index) => (
                        <th key={`${index+1}-${header.key}`} className={`text-white-smoke font-lato text-content-md py-2 px-14 ${header.isSortable ? 'cursor-pointer' : ''}`} onClick={() => sortCol(header.key)}> 
                            <section className="flex gap-2 items-center">
                                <p>{header.key} </p>
                                {header.isSortable ? 
                                    <section>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={`fill-white-smoke w-[10px] ${header.key === sorted.keyToSort && sorted.sortMode === "asc" && header.isSortable ? 'block' : 'hidden'}`}>
                                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={`fill-white-smoke w-[10px]  ${header.key === sorted.keyToSort && sorted.sortMode === "desc" && header.isSortable ? 'block' : 'hidden'}`}>
                                            <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                                        </svg>
                                    </section>
                                    :
                                    ""
                                }
                            </section>   
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? 
                    data.map((info, index) => (
                        <tr key={index} className="border-b-2 border-silver group hover:bg-silver">
                            {Object.keys(info).map((key, index) => (
                                key !== "withCheckboxes" ?
                                <td className="py-2 px-14" key={`${key}-${index}`}> {info[key]} </td>
                                :
                                <td>
                                    <section className="flex gap-2 items-center justify-center">
                                        <section className={`border-2 rounded-[2px] px-1 py-1 border-silver cursor-pointer ${isMarkedChecked ? 'fill-raisin-black' : 'fill-silver'} group-hover:border-raisin-black`} onClick={() => toggleCheck()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[15px] h-[15px] group-hover:fill-raisin-black">
                                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                            </svg>
                                        </section>
                                        <section className={`border-2 rounded-[2px] px-1 py-1 border-silver cursor-pointer ${isMarkedX ? 'fill-raisin-black' : 'fill-silver'} group-hover:border-raisin-black`} onClick={() => toggleX()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-[15px] h-[15px] group-hover:fill-raisin-black">
                                                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                                            </svg>
                                        </section>
                                    </section>
                                </td> 
                            )) }
                            
                        </tr>
                    ))
                    :
                    ""
                }
            </tbody>
        </table>
    )
}

export default Table