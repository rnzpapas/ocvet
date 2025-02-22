import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import Table from "../../components/Table";
import SuperAdminNav from "../../components/navbars/SuperAdminNav";
import axios from 'axios';
import { convertDate } from "../../utils/datetimeUtils"
import Modal from '../../components/Modal';


const HEADERS = [
    {
        "key": "No.",
        "isSortable": true,
        "isSorted": false
    },
    {
        "key": "Name",
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
    {
        "key": "Role",
        "isSortable": false,
        "isSorted": false
    },
]

const ADMIN_REGISTER_FIELDS = [
    {
        'headers': 'Firstname',
        'type': 'text',
        'txtContent': ''
    },
    {
        'headers': 'Surname',
        'type': 'text',
        'txtContent': ''
    },
    {
        'headers': 'Email',
        'type': 'text',
        'txtContent': ''
    },
    {
        'headers': 'Username',
        'type': 'text',
        'txtContent': ''
    },
    {
        'headers': 'Password',
        'type': 'password',
        'txtContent': ''
    },
    {
        'headers': 'Role',
        'type': 'select',
        'options': ['Staff', 'Manager', 'Super Administrator']
    },
]
function SAdminListAdmin() {
    let sessionToken = sessionStorage.getItem('jwt-token')
    const [adminDetails, setAdminDetails] = useState([]);
    const [isSearchOn, setSearchOn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onChangeSearch = async (evt) => {
        setSearchOn(true);
        let searchedContent = evt.target.value;
        let a = [];

        await axios.get(`http://localhost:5001/api/admin/all/find?query=${searchedContent}`, {headers:{'Authorization': `Bearer ${sessionToken}`}})
        .then((res) => {
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
        });
        setAdminDetails(a);
    }

    const deleteAdmin = async (id) => {
        await axios.delete(`http://localhost:5001/api/admin/${id}`, {headers:{'Authorization': `Bearer ${sessionToken}`}})
        .then(() => window.location.reload())
        .catch(err => console.error(err))
    }

    const loadAdmin = async () => {
        let a = [];
        await axios.get('http://localhost:5001/api/admin/all', {headers: {'Authorization': `Bearer ${sessionToken}`}})
        .then(res => {
            let admins = res.data.data;
            admins.map((admin) => {
                let adObj = {
                    No: admin.UAID,
                    name: `${admin.firstname} ${admin.surname}`,
                    email: admin.email,
                    username: admin.username,
                    joined: convertDate(admin.date_joined),
                    role: admin.role,
                    action: admin.UAID === 'UAID100007' ? '' : (
                        <p className="font-lato text-fire-engine-red cursor-pointer hover:underline" 
                        onClick={() => {deleteAdmin(admin.UAID)}}>
                            Delete
                        </p>
                    )
                }
                a.push(adObj);
            })
        })
        .catch(err => console.error(err))
        return a;
    }
    
    const openAdminRegisterModal = () => {setIsModalOpen(true)}

    const closeAdminRegisterModal = () => {setIsModalOpen(false)}

    const addAdmin = async (fields) => {
        let firstname = fields[0].content;
        let surname = fields[1].content;
        let email = fields[2].content;
        let username = fields[3].content;
        let password = fields[4].content;
        let role = fields[5].content;
        let dateNow = new Date();
        let dateStr = `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`
        if(firstname.trim().length === 0 || surname.trim().length === 0 || email.trim().length === 0 || username.trim().length === 0 || 
        password.trim().length === 0 || role.trim().length === 0) return alert('Please fill out all fields.');

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('surname', surname);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('date_joined', dateStr)

        await axios.post('http://localhost:5001/api/admin/register', formData, {headers: {'Authorization': `Bearer ${sessionToken}`, 'Content-Type': 'application/json'}})
        .then(() => window.location.reload())
        .catch(err => alert(err.data.message))
    }

    useEffect(() => {
        if(!isSearchOn){
            let adminpromise = loadAdmin();
            adminpromise.then(ap => setAdminDetails(ad => ad = ap))
        }
    }, [adminDetails])

    return (
        <section className="flex w-screen h-screen overflow-hidden">
            <SuperAdminNav/>
            <section className="px-5 py-5 w-full">
                <section className="flex items-center gap-2">
                    <h5 className="font-instrument-sans font-bold text-headline-lrg uppercase text-raisin-black">administrators</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                    className="w-[24px] fill-azure hover:fill-chefchaouen-blue cursor-pointer"
                    onClick={openAdminRegisterModal}
                    >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                    </svg>
                    <Modal 
                    isActive={isModalOpen} 
                    onClose={closeAdminRegisterModal} 
                    headline={'Administrator Registration'} 
                    fields={ADMIN_REGISTER_FIELDS} 
                    button={{'txtContent': 'Complete Registration', 'isDisplayed': true}}
                    onSubmitFunc={addAdmin}
                    />
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
                </section>
                <section className="w-full">
                    {
                        adminDetails.length > 0 && (
                            <Table headers={HEADERS} data={adminDetails} tableW={'w-[80%]'} tableH={'h-fit'}/>
                        )
                    }
                </section>
            </section>
        </section>
    )
}

export default SAdminListAdmin