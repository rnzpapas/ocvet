import { useEffect, useState } from "react";;
import Button from "../../components/button";
import InputField from "../../components/InputField";
import Table from "../../components/Table";
import SuperAdminNav from "../../components/navbars/SuperAdminNav";
import axios from 'axios';
import { convertDate } from "../../utils/datetimeUtils"

const HEADERS = [
    {
        "key": "No.",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Administrator",
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
    },
    {
        "key": "Role",
        "isSortable": true,
        "isSorted": false
    },
]
function SAdminListAdmin() {
    let sessionToken = sessionStorage.getItem('jwt-token')
    const [search, setSearch] = useState("");
    const onChangeSearch = (evt) => {setSearch(evt.val)}
    const [adminDetails, setAdminDetails] = useState([]);

    const loadAdmin = async () => {
        let a = [];
        await axios.get('http://localhost:5001/api/admin/all', {headers: {'Authorization': `Bearer ${sessionToken}`}})
        .then(res => {
            let admins = res.data.data;
            admins.map((admin) => {
                let adObj = {
                    "No": admin.UAID,
                    "name": `${admin.firstname} ${admin.surname}`,
                    "email": admin.email,
                    "username": admin.username,
                    "joined": convertDate(admin.date_joined),
                    "role": admin.role
                }
                a.push(adObj);
            })
        })
        .catch(err => console.error(err))
        return a;
    }

    useEffect(() => {
        let adminpromise = loadAdmin();
        adminpromise.then(ap => setAdminDetails(ad => ad = ap))
    }, [])

    return (
        <section className="flex w-full">
            <SuperAdminNav/>
            <section className="px-5 py-5 w-full">
                <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">administrators</h5>
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
                <section className="w-full">
                    {
                        adminDetails && adminDetails.length > 0 && (
                            <Table headers={HEADERS} data={adminDetails}/>
                        )
                    }
                </section>
            </section>
        </section>
    )
}

export default SAdminListAdmin