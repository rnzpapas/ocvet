import { useEffect, useState } from "react";;
import InputField from "@/components/InputField";
import SuperAdminNav from "@/components/navbars/SuperAdminNav";
import Table from "@/components/Table";
import axios from 'axios';
import { convertDate } from "../../utils/datetimeUtils"

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
    let sessionToken = sessionStorage.getItem('jwt-token');
    const [search, setSearch] = useState("");
    const [petOwnersDetails, setPetOwnerDetails] = useState();

    const loadPetOwners = async () => {
        let petOwnersArr = [];
        await axios.get(`http://localhost:5001/api/user/account/petowners`, 
            {
                headers: {'Authorization': `Bearer ${sessionToken}`}
            }
        )
        .then((res) => {
            let petOwnerList = res.data.data;
            if(petOwnerList.length > 0){
                petOwnerList.map((petOwner, index) => {
                    let po = {
                        "ID": petOwner.UAID,
                        "fullname": `${petOwner.firstname} ${petOwner.surname}`,
                        "email": petOwner.email,
                        "usename": petOwner.username,
                        "joined_date": convertDate( petOwner.date_joined)
                    }

                    petOwnersArr.push(po);
                })
            }
        }).catch(err => console.error(err))
        return petOwnersArr;
    }

    const searchPetOwners = async () => {
        let petOwnersArr = [];
        await axios.get(`http://localhost:5001/api/user/account/full-details-search?namemail=${search}`,
            {
                headers: {'Authorization': `Bearer ${sessionToken}`}
            }
        )
        .then((res) => {
            let petOwnerList = res.data.data;
            if(petOwnerList.length > 0){
                petOwnerList.map((petOwner, index) => {
                    let po = {
                        "ID": petOwner.UAID,
                        "fullname": `${petOwner.firstname} ${petOwner.surname}`,
                        "email": petOwner.email,
                        "usename": petOwner.username,
                        "joined_date": convertDate( petOwner.date_joined)
                    }

                    petOwnersArr.push(po);
                })
            }
        }).catch(err => console.error(err))
        return petOwnersArr;
    }

    const onChangeSearch = (evt) => {setSearch(evt.target.value)}

    const exportPetOwners = async () => {
        await axios.get('http://localhost:5001/api/user/account/petowners/export', {headers: {'Authorization': `Bearer ${sessionToken}`}, responseType: 'blob'},)
        .then(res => {
          const disposition = res.headers['content-disposition'];
          const matches = /filename="(.+)"/.exec(disposition);
          const filename = matches != null && matches[1] ? matches[1] : 'appointment_history.pdf';
          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename; 
          link.click(); d
          window.URL.revokeObjectURL(url); 
      
        })
    }

    useEffect(() => {
        let petOwnerPromise = loadPetOwners();
        let searchPromise = searchPetOwners();
        
        search.length === 0 ? petOwnerPromise.then((po) => setPetOwnerDetails((pod) => pod = po)) : searchPromise.then((po) => setPetOwnerDetails((pod) => pod = po))

    },[search]);

    return (
        <section className="flex w-screen h-screen overflow-hidden">
            <SuperAdminNav />
            <section className="px-5 py-5 w-full">
                <section className="flex gap-5">
                    <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">pet owners</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`w-[24px] fill-silver cursor-pointer hover:fill-raisin-black`} onClick={exportPetOwners}>
                        <path d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                    </svg>
                </section>
                <section className="flex gap-10 mb-10">
                    <section className="w-[400px]">
                        <section className="relative">
                            <InputField type={"text"} placeholder={"Name, e-mail..."} name="petSearch" style={"w-[100%]"} onChangeFunc={onChangeSearch}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[28px] fill-silver absolute right-4 top-1.5">  
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </section>
                    </section>
                    {/* <Button txtContent={"Search"} isActive={true} /> */}
                </section>
                {
                    petOwnersDetails && petOwnersDetails.length > 0 &&(
                        <Table headers={HEADERS} data={petOwnersDetails}/>
                    )
                }
            </section>
        </section>
    )
}

export default SAdminPetOwners