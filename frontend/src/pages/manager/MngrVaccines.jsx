import { useEffect, useState } from 'react';
import MngrNav from '@/components/navbars/MngrNav'
import axiosInstance from '@/config/AxiosConfig';
import Modal from '@/components/Modal';
import { convertDate } from '@/utils/datetimeUtils';

function MngrVaccines() {
    const [vaccineStocks, setVaccineStocks] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [vaccineSelected, setVaccineSelected] = useState("");
    const [isStockModal, setIsStockModal] = useState(false);

    const loadVaccines = async () => {
        try{
            let res = await axiosInstance.get('/api/vaccine');
            if(res.data){
                return res.data.data;
            }
        }catch(err){
            let message = err.response?.data?.message || "Failed to fetch vaccines."
            console.error(message);
            console.error(err);
        }
    }

    const openStockModal = async (VACCID) => {
        let filteredVacc = vaccines.filter((v)=> v.VACCID == VACCID);
        let vaccineFields = [
            {
                type: "text",
                txtContent: filteredVacc[0].vaccine_name,
                headers: "Vaccine Name",
                readOnly: true
            },
            {
                type: "text",
                txtContent: filteredVacc[0].stock,
                headers: "Stock"
            }
        ];

        setVaccineStocks(vaccineFields)
        setVaccineSelected(VACCID);
        setIsStockModal(true);

    }

    const adjustVaccineStock = async (fields) => {

        try{

            let stockInput = fields[1].content;
        
            if (!/^-?\d+$/.test(stockInput)) {
                alert("Stock count must be a number, and cannot contain alphabetic or special characters.");
                console.error("Stock count must be a number, and cannot contain alphabetic or special characters.");
                return;
            }
            
            let stock = parseInt(stockInput || 0, 10);

            if(isNaN(stock)){
                alert("Stock count cannot be alphabetic characters or special characters.")
                console.error("Stock count cannot be negative");
                return;
            }
            if (stock < 0) {
                alert("Stock count cannot be negative")
                console.error("Stock count cannot be negative");
                return;
            }

            if (!vaccineSelected) {
                console.error("No vaccine selected");
                window.location.reload();
                return;
            }
            let body = {
            new_count: fields[1].content,
            vaccid: vaccineSelected
            }
            
            let res = await axiosInstance.put('/api/vaccine/update/stock', body);
            if (res.status === 200) {
                window.location.reload(); 
            } else {
                console.error("Failed to update stock, unexpected response status:", res.status);
            }
        }catch(err){
            let message = err.response?.data?.message || "Failed to update stock";
            console.error(message);
            console.error(err);
        }
    }

    useEffect(() => {
        const dataPromise = async () => {
            let vaccs = await loadVaccines();
            setVaccines(vaccs);
        }
        dataPromise();
    },[])
    return (
    <section className="flex w-full">
        <MngrNav />
        <section className="px-5 py-5 w-full">
            <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">VACCINES</h5>
            <section className="overflow-y-auto overflow-x-auto w-[95%]">
                <table className="w-full border-collapse">
                    <thead className="bg-raisin-black sticky top-0 z-20">
                        <tr>
                            <th className={` text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14`}> VACCID </th>
                            <th className={` text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap`}> Vaccine Name </th>
                            <th className={` text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14`}> Stock </th>
                            <th className={` text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14 text-nowrap`}> Last Restock Date </th>
                            <th className={` text-white-smoke font-lato text-content-xtrasm lg:text-content-md py-2 px-2 lg:px-14`}> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vaccines && (
                                vaccines.map((vacc) => (
                                    <tr key={vacc.VACCID}>
                                        <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md text-nowrap text-center"> {vacc.VACCID} </td>
                                        <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md text-nowrap text-center"> {vacc.vaccine_name} </td>
                                        <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md text-nowrap text-center"> {vacc.stock} </td>
                                        <td className="py-2 px-2 lg:px-14 items-center font-lato text-content-xtrasm lg:text-content-md text-nowrap text-center"> {vacc.last_restock_date ? convertDate(vacc.last_restock_date) : ''} </td>
                                        <td className='flex items-center'>
                                            <section 
                                                className={`border-2 px-3 py-1 border-azure cursor-pointer rounded-2xl group hover:bg-azure w-fit`} 
                                                onClick={() => openStockModal(vacc.VACCID)}
                                            >
                                                <h5 className="font-lato text-content-xtrasm lg:text-content-md group-hover:text-white-smoke text-raisin-black text-nowrap">Update Stock</h5>
                                            </section>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
                {
                    isStockModal && vaccineStocks.length > 0 && (
                        <Modal 
                        headline={"Vaccine Stock Details"} 
                        isActive={isStockModal} 
                        fields={vaccineStocks}
                        button={{isDisplayed: true, txtContent: "Confirm Changes"}}
                        onSubmitFunc={adjustVaccineStock}
                        />
                    )
                }
            </section>
        </section>
    </section>
    )
}

export default MngrVaccines
