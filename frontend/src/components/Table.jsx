import React, { useEffect, useState } from "react";
import { convertObjectArrayToString } from "../utils/textUtils";

function Table({headers, data, tableW, tableH, style, acceptAppointment, rejectAppointment, markAsCompleted, showProofImage}) {
    const MAX_ROWS = 10;
    const [pageData, setPageData] = useState([]);
    const [sorted, setSorted] = useState({keyToSort: "", sortMode: "asc"});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const sortCol = (key) => {
        if(sorted.sortMode === "desc"){
            setSorted({keyToSort: key, sortMode: "asc"})
        }
        if(sorted.sortMode === "asc"){
            setSorted({keyToSort: key, sortMode: "desc"})
        }

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

    useEffect(() => {
        if(data) {
            setTotalPages(Math.ceil(data.length / MAX_ROWS));
            let dataSliced = data.slice(((currentPage - 1) * MAX_ROWS), ((currentPage - 1) * MAX_ROWS) + MAX_ROWS - 1)
            setPageData(() => dataSliced);
        }
    },[currentPage])


    useEffect(() => {
    },[sorted])
    return (
        <section className={`flex flex-col max-h-fit ${tableW} ${tableH} ${style}`}>
            <section className="overflow-y-auto overflow-x-auto">
                <table className="w-full border-collapse"> 
                    <thead className="bg-raisin-black sticky top-0 z-20">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={`${index+1}-${header.key}`} className={` text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 ${header.isSortable ? 'cursor-pointer' : ''}`} onClick={() => sortCol(header.key)}> 
                                    <section className="flex gap-2 items-center justify-center relative text-nowrap">
                                        <p>{header.key}</p>
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
                    <tbody className="text-raisin-black z-10">
                        {pageData.length > 0 ? 
                            (pageData.map((info, index) => (
                                (
                                    index < MAX_ROWS && (
                                        <tr key={index} className="border-b-2 border-silver hover:bg-silver">
                                            {Object.keys(info).map((key, index) => (
                                                key !== "status" && typeof info[key] == "object"  && !(React.isValidElement(info[key])) ?
                                                    <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md whitespace-nowrap" key={`${key}-${index}`}> 
                                                        {convertObjectArrayToString(info[key])} 
                                                    </td>
                                                : key === "action" ?
                                                <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md whitespace-nowrap" key={`${key}-${index}`}> 
                                                    <section 
                                                        className={`border-2 px-3 py-1 border-azure cursor-pointer rounded-2xl group hover:bg-azure`} 
                                                        onClick={() => markAsCompleted(info.number)}
                                                    >
                                                        <h5 className="font-lato text-content-xtrasm lg:text-content-md group-hover:text-white-smoke text-raisin-black text-nowrap">Mark As Completed</h5>
                                                    </section>
                                                </td>
                                                : key == 'hasEvidence' ?
                                                <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md whitespace-nowrap" key={`${key}-${index}`}> 
                                                    <h5 
                                                    className={`${info[key] ? 'font-lato text-content-xtrasm lg:text-content-md text-azure text-nowrap cursor-pointer hover:underline' : 'hidden'}`}
                                                    onClick={() => showProofImage(info.number)}
                                                    >
                                                        Show Image
                                                    </h5>
                                                </td>
                                                : key !== "status" ?
                                                    <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md text-nowrap" key={`${key}-${index}`}> {info[key]} </td>
                                                
                                                : info.status.status == 'Scheduled' ? 
                                                    <td className="py-2 px-2 lg:px-14" key={`${key}-${index}`}> 
                                                        <section className=" bg-raisin-black  flex items-center justify-center px-2 py-1 rounded-sm">
                                                            <p className="font-lato font-semibold uppercase text-content-xtrasm text-white-smoke"> Scheduled </p>
                                                        </section>
                                                    </td>
                                                : info.status.withCheckboxes ? 
                                                    <td key={`${key}-${index}`} >
                                                        <section className="flex gap-2 items-center justify-center py-3">
                                                            <section 
                                                            className={`border-2 px-3 py-1 border-raisin-black cursor-pointer rounded-2xl group hover:border-fire-engine-red`} 
                                                            onClick={(el) => rejectAppointment(info.number)}>
                                                                <h5 className="font-lato text-content-xtrasm lg:text-content-md text-raisin-black group-hover:text-fire-engine-red">Reject</h5>
                                                            </section>
                                                            <section className={`border-2 px-3 py-1 border-azure cursor-pointer rounded-2xl group
                                                         hover:bg-azure`} 
                                                            onClick={(el) => acceptAppointment(info.number)}>
                                                                <h5 className="font-lato text-content-xtrasm lg:text-content-md group-hover:text-white-smoke text-raisin-black text-nowrap">Show Details</h5>

                                                            </section>
                                                        </section>
                                                    </td> 
                                                : info.status.isOngoing ? 
                                                    <td className="py-2 px-2 lg:px-14" key={`${key}-${index}`}> 
                                                        <section className="bg-azure flex items-center justify-center px-2 py-1 rounded-sm">
                                                            <p className="font-lato font-semibold uppercase text-content-xtrasm text-white-smoke"> Ongoing </p>
                                                        </section>
                                                    </td>
                                                : info.status.isFinished ?
                                                    <td className="py-2 px-2 lg:px-14" key={`${key}-${index}`}> 
                                                        <section className=" bg-lime-green  flex items-center justify-center px-2 py-1 rounded-sm">
                                                            <p className="font-lato font-semibold uppercase text-content-xtrasm text-white-smoke"> Done </p>
                                                        </section>
                                                    </td>
                                                : 
                                                    <td className="py-2 px-2 lg:px-14" key={`${key}-${index}`}> 
                                                        <section className=" bg-[#515151] flex items-center justify-center px-2 py-1 rounded-sm">
                                                            <p className="font-lato font-bold uppercase text-content-xtrasm text-white-smoke"> Pending </p>
                                                        </section>
                                                    </td>
                                                
                                            )) }
                                        </tr>
                                    )
                                )
                            )))
                            :
                            <tr></tr>
                        }
                    </tbody>
                </table>
            </section>
            {
                data.length > 1 && 
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