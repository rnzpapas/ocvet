import { useState } from "react";;
import Button from "../../components/button";
import InputField from "../../components/InputField";
import Table from "../../components/Table";
import SuperAdminNav from "../../components/navbars/SuperAdminNav";

const HEADERS = [
    {
        "key": "No.",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Client",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "E-Mail",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Username",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Joined Date",
        "isSortable": true,
        "isSorted": false    
    }
  ]
function SAdminPetOwners() {
    const [search, setSearch] = useState("");
    const onChangeSearch = (evt) => {setSearch(evt.val)}
    const [petOwnersDetails, setPetOwnerDetails] = useState([
        {
            "number" : "1",
            "client_name": "John Doe",
            "email": "john.doe@gmai.com",
            "username": "jjdoe3",
            "joined_date": "12/02/2024"
        },
        {
            "number" : "2",
            "client_name": "Jane Doe",
            "email": "jane.doe@gmai.com",
            "username": "jjanedoe3",
            "joined_date": "12/02/2024"
        },
    ]);

    return (
        <section className="flex w-full">
            <SuperAdminNav/>
            <section className="px-5 py-5 w-full">
                <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">pet owners</h5>
                <section className="flex gap-10 mb-10">
                    <section className="w-[400px]">
                        <section className="relative">
                            <InputField type={"text"} placeholder={"Name, e-mail..."} name="petSearch" style={"w-[100%]"} onChangeFunc={onChangeSearch}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[28px] fill-silver absolute right-4 top-1.5">  
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </section>
                    </section>
                    <Button txtContent={"Search"} isActive={true} />
                </section>
                <Table headers={HEADERS} data={petOwnersDetails}/>
            </section>
        </section>
    )
}

export default SAdminPetOwners