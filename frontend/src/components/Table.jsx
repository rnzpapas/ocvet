import { useState } from "react";

function Table({headers, data, tableW, tableH, tpages = 1, cpage = 1, tlimit = 5, style, 
    resetPageFunc = undefined, nextPageFunc = undefined, prevPageFunc = undefined, goLastPageFunc = undefined
}) {
    const [sorted, setIsSorted] = useState({keyToSort: "Client", sortMode: "asc"});
    const [isMarkedChecked, setIsMarkedChecked] = useState(false);
    const [isMarkedX, setIsMarkedX] = useState(false)
    const [totalPages, setTotalPages] = useState(tpages);
    const [currentPage, setCurrentPage] = useState(cpage);

    const sortCol = (key) => {
        if(sorted.sortMode === "desc"){
            setIsSorted({keyToSort: key, sortMode: "asc"})
        }
        if(sorted.sortMode === "asc"){
            setIsSorted({keyToSort: key, sortMode: "desc"})
        }
    }

    const toggleCheck = (el) => {
        el.target.classList.add("fill-raisin-black");
        // isMarkedChecked ? setIsMarkedChecked(false) : setIsMarkedChecked(true)
        // isMarkedChecked ? setIsMarkedX(true) : setIsMarkedX(false)
    }

    const toggleX = (el) => {
        el.target.classList.add("fill-raisin-black");
        // isMarkedX ? setIsMarkedX(false) : setIsMarkedX(true)
        // isMarkedX ? setIsMarkedChecked(true) : setIsMarkedChecked(false)
    }

    const goToNextPage = () => {
        currentPage < totalPages && (setCurrentPage((n) => n+1));
        nextPageFunc && (nextPageFunc());
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((n) => n-1)
        prevPageFunc && (prevPageFunc())
    };

    const goToFirstPage = () => {
        setCurrentPage((n) => n = 1)
        resetPageFunc && (resetPageFunc())
    };

    const goToLastPage = () => {
        setCurrentPage((n) => n = totalPages)
        goLastPageFunc && (goLastPageFunc())
    };


    return (
        <section className={`flex flex-col ${tableW} ${tableH} ${style}`}>
            <section className="overflow-y-auto overflow-x-auto">
                <table className="w-full"> 
                    <thead className="bg-raisin-black">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={`${index+1}-${header.key}`} className={`text-white-smoke font-lato text-content-md py-2 px-14 ${header.isSortable ? 'cursor-pointer' : ''}`} onClick={() => sortCol(header.key)}> 
                                    <section className="flex gap-2 items-center justify-center relative">
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
                    <tbody className="text-raisin-black">
                        {data.length > 0 &&  
                            (data.map((info, index) => (
                                <tr key={index} className="border-b-2 border-silver group hover:bg-silver">
                                    {Object.keys(info).map((key, index) => (
                                        key !== "status" ?
                                            <td className="py-2 px-14 items-center" key={`${key}-${index}`}> {info[key]} </td>
                                        : info.status.withCheckboxes ? 
                                            <td key={`${key}-${index}`} >
                                                <section className="flex gap-2 items-center justify-center">
                                                    <section className={`border-2 rounded-[2px] px-1 py-1 border-silver cursor-pointer fill-silver group-hover:border-raisin-black`} onClick={(el) => toggleCheck(el)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[15px] h-[15px] group-hover:fill-raisin-black">
                                                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                                        </svg>
                                                    </section>
                                                    <section className={`border-2 rounded-[2px] px-1 py-1 border-silver cursor-pointer fill-silver group-hover:border-raisin-black`} onClick={(el) => toggleX(el)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-[15px] h-[15px] group-hover:fill-raisin-black">
                                                            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                                                        </svg>
                                                    </section>
                                                </section>
                                            </td> 
                                        : info.status.isFinished ?
                                            <td className="py-2 px-14" key={`${key}-${index}`}> 
                                                <section className=" bg-lime-green  flex items-center justify-center px-2 py-1 rounded-sm">
                                                    <p className="font-lato font-semibold uppercase text-content-xtrasm text-white-smoke"> Done </p>
                                                </section>
                                            </td>
                                        : 
                                            <td className="py-2 px-14" key={`${key}-${index}`}> 
                                                <section className=" bg-fire-engine-red flex items-center justify-center px-2 py-1 rounded-sm">
                                                    <p className="font-lato font-bold uppercase text-content-xtrasm text-white-smoke"> Missed </p>
                                                </section>
                                            </td>
                                    )) }
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </section>
            {
                data.length > 0 && 
                (
                    <section className={`relative flex items-center justify-center mt-3 ${tableW}`}>
                        <section className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[25px] h-[25px] cursor-pointer fill-raisin-black-light"
                                onClick={goToFirstPage}
                            >
                                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-[25px] h-[25px] cursor-pointer fill-raisin-black-light"
                                onClick={goToPrevPage}
                            >
                                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-[25px] h-[25px] cursor-pointer fill-raisin-black-light"
                                onClick={goToNextPage}
                            >
                                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[25px] h-[25px] cursor-pointer fill-raisin-black-light"
                                onClick={goToLastPage}
                            >
                                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                            </svg>
                        </section>
                        <p className="absolute right-0">Page {currentPage} of {totalPages}</p>
                    </section>
                )  
            }
        </section>
    )
}

export default Table