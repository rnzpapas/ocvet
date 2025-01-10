import UserNav from "./components/navbars/UserNav"
import Footer from "./components/Footer"
import SideLogo from "./components/SideLogo"
import Button from "./components/button"
import StaffNav from "./components/navbars/StaffNav"
import SuperAdminNav from "./components/navbars/SuperAdminNav"
import MngrNav from "./components/navbars/MngrNav"
import InputField from "./components/InputField"
import Link from "./components/Link"
import Modal from "./components/Modal"
import Doggy from "./assets/doggy.png"
import Table from "./components/Table"
import UserLogin from "./pages/user/UserLogin"
import UserRegister from "./pages/user/UserRegister"
import ForgotPassword from "./pages/common/ForgotPassword"
import OTPVerification from "./pages/common/OTPVerification"
import ChangePassword from "./pages/common/ChangePassword"
import PetCard from "./components/PetCard"
import UserPetPage from "./pages/user/UserPetPage"
import UserPetRegistration from "./pages/user/UserPetRegistration"
import UserPetEditInfo from "./pages/user/UserPetEditInfo"
import UserPetInformation from "./pages/user/UserPetInformation"
import UserInformation from "./pages/user/UserInformation"
import AdminLogin from "./pages/common/AdminLogin"
import Emails from "./components/Emails"
import StaffHome from "./pages/staff/StaffHome"
import StaffPetOwners from "./pages/staff/StaffPetOwners"
import StaffPetList from "./pages/staff/StaffPetList"
import StaffAppointments from "./pages/staff/StaffAppointments"
import StaffUserInfo from "./pages/staff/StaffUserInfo"
import MngrHome from "./pages/manager/MngrHome"
import MngrPetList from "./pages/manager/MngrPetList"
import MngrPetOwners from "./pages/manager/MngrPetOwners"
import MngrUserInfo from "./pages/manager/MngrUserInfo"
import MngrAppointments from "./pages/manager/MngrAppointments"
import MngrAnnouncements from "./pages/manager/MngrAnnouncements"
import SAdminAppointments from "./pages/superadmin/SAdminAppointments"
import SAdminHome from "./pages/superadmin/SAdminHome"
import SAdminPetList from "./pages/superadmin/SAdminPetList"
import SAdminPetOwners from "./pages/superadmin/SAdminPetOwners"
import SAdminUserInfo from "./pages/superadmin/SAdminUserInfo"
import SAdminListAdmin from "./pages/superadmin/SAdminListAdmin"
import { Route, Routes } from "react-router"
import UserHome from "./pages/user/UserHome"
import NotFound from "./pages/NotFound"

function App() {
  const checkBtn = () => {
    alert("it is working")
  }
  // modal fields
  const fields = [
    {
      "headers": "Pet Photo",
      "txtContent": "",
      "type": "image",
      "imgSrc": {Doggy}
    },
    {
      "headers": "Pet Nickname",
      "txtContent": "Moosey",
      "type": "text"
    },
    {
      "headers": "Breed",
      "txtContent": "Golden Retriever",
      "type": "text"
    },
    {
      "headers": "Password",
      "txtContent": "Golden Retriever",
      "type": "password"
    }
  ]
  // table headers
  const headers = [
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
      "key": "Date",
      "isSortable": true,
      "isSorted": false
    },
    {
      "key": "Time",
      "isSortable": true,
      "isSorted": false
    },
    // {
    //   "key": "Status",
    //   "isSortable": false,
    // },
    {
      "key": "Status",
      "isSortable": true
    }
  ]
  // table data
  const data = [
    {
      "number" : "1",
      "client_name": "John Doe",
      "date_of_transaction": "12/02/2024",
      "time_of_transaction": "03:13 PM",
      "status": {
        "isFinished": false,
        "withCheckboxes" : false,
      }
    },
    {
      "number" : "2",
      "client_name": "Jane Doe",
      "date_of_transaction": "12/08/2024",
      "time_of_transaction": "05:13 PM",
      "status": {
        "isFinished": true,
        "withCheckboxes" : false,
      }
    },
  ]
  // mails
  const emails = [
    {
      "id": "MAIL100",
      "recipient": "OCVET_EMPLOYEES",
      "subject": "Medical Allowance 2025",
      "body": "We are pleased to announce that the company will now be offering a medical allowance to all eligible employees to help cover healthcare expenses. Further details on eligibility and the application process will be shared shortly. We encourage everyone to take advantage of this benefit for their well-being.",
      "date_sent": "Jan 12"
    },
    {
      "id": "MAIL101",
      "recipient": "OCVET_EMPLOYEES",
      "subject": "Raffle Winners",
      "body": "We are excited to announce the winners of our recent raffle! Congratulations to all winners! – please stay tuned for more details on how to claim your prizes.",
      "date_sent": "Dec 29"
    },
    {
      "id": "MAIL102",
      "recipient": "OCVET_EMPLOYEES",
      "subject": "13th Month Pay Announcement",
      "body": "We are pleased to inform you that the 13th month pay will be distributed today latest at 8PM. Please feel free to reach out if you have any questions regarding this payment.",
      "date_sent": "Dec 14"
    },
  ]
  return (
    <>
      {/* <UserLogin /> */}
      {/* <UserRegister /> */}
      {/* <ForgotPassword /> */}
      {/* <OTPVerification /> */}
      {/* <ChangePassword /> */}
      {/* <UserPetPage /> */}
      {/* <UserPetRegistration /> */}
      {/* <UserPetEditInfo /> */}
      {/* <UserPetInformation /> */}
      {/* <UserInformation /> */}
      {/* <AdminLogin /> */}
      {/* <StaffHome /> */}
      {/* <StaffPetOwners /> */}
      {/* <StaffPetList /> */}
      {/* <StaffAppointments /> */}
      {/* <StaffUserInfo /> */}
      {/* <MngrHome /> */}
      {/* <MngrPetList /> */}
      {/* <MngrPetOwners /> */}
      {/* <MngrUserInfo /> */}
      {/* <MngrAppointments /> */}
      {/* <MngrAnnouncements /> */}
      {/* <SAdminAppointments /> */}
      {/* <SAdminHome /> */}
      {/* <SAdminPetList /> */}
      {/* <SAdminPetOwners /> */}
      {/* <SAdminUserInfo /> */}
      {/* <SAdminListAdmin /> */}
      <Routes>
        {/* user routes */}
        <Route path="/user/">
          <Route path="login" element={<UserLogin />}/>
          <Route path="register" element={<UserRegister />}/>
          <Route path="home" element={<UserHome />}/>
          <Route path="pets/">
            <Route path="" element={<UserPetPage />}/>
            <Route path="register" element={<UserPetRegistration />}/>
            <Route path="view/:id" element={<UserPetInformation />}/>
            <Route path="edit/:id" element={<UserPetEditInfo />}/>
          </Route>
          <Route path="account/:id" element={<UserInformation />}/>
        </Route>
        {/* staff routes */}
        <Route path="/staff/">
          <Route path="dashboard" element={<StaffHome />}/>
          <Route path="pets" element={<StaffPetList />}/>
          <Route path="owners" element={<StaffPetOwners />}/>
          <Route path="appointments" element={<StaffAppointments />}/>
          <Route path="account" element={<StaffUserInfo />}/>
        </Route>
        {/* mngr routes */}
        <Route path="/mngr/">
          <Route path="dashboard" element={<MngrHome />}/>
          <Route path="pets" element={<MngrPetList />}/>
          <Route path="owners" element={<MngrPetOwners />}/>
          <Route path="appointments" element={<MngrAppointments />}/>
          <Route path="announcements" element={<MngrAnnouncements />}/>
          <Route path="account" element={<MngrUserInfo />}/>
        </Route>
        {/* super admin routes */}
        <Route path="/sadm/">
          <Route path="dashboard" element={<SAdminHome />}/>
          <Route path="pets" element={<SAdminPetList />}/>
          <Route path="owners" element={<SAdminPetOwners />}/>
          <Route path="appointments" element={<SAdminAppointments />}/>
          <Route path="admins" element={<SAdminListAdmin />}/>
          <Route path="account" element={<SAdminUserInfo />}/>
        </Route>
        {/* staff, mngr, super administrator login (IN-PROGESS) */}
        <Route path="/admin/">
          <Route path="role" element={<AdminLogin />}/>
          {/* Individual login pages here */}
        </Route>
        {/* Account recovery pages */}
        <Route path="/account-recovery">
          <Route path="changepw" element={<ChangePassword />}/>
          <Route path="forgot-password" element={<ForgotPassword />}/>
          <Route path="OTP" element={<OTPVerification />}/>
        </Route>
        {/* not found routes */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </> 
  )
}
<div className="flex items-center justify-center w-full h-screen">
    {/* <UserNav/>
    <Footer /> 
    <SideLogo style={""}/>
    <Button txtContent={"Sign Up"} onClickFunc={checkBtn}/>
    <StaffNav />
    <SuperAdminNav />
    <MngrNav /> */}
    {/* <InputField type={"password"} placeholder={"myusername123"} style={"w-[500px]"}/> */}
    {/* <Link txtContent={"Already have an account?"}/> */}
    {/* <Modal 
      headline={"Pet Information"} 
      isActive={true} 
      fields={fields} 
      img={Doggy} 
      isReadOnly={true} 
      inputStyle={"cursor-default"} 
      button={{txtContent : "Update Password", isDisplayed: true}}
      link={{txtContent : "Update Password", isDisplayed: true}}
    /> */}
    {/* <Table headers={headers} data={data}/> */}
    {/* <PetCard petName={"Ora"}/>  */}
    {/* <Emails mails={emails} isBodyIncluded={false}/> */}
</div>
export default App
