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
        <Table headers={headers} data={data}/>
        {/* <PetCard petName={"Ora"}/>  */}
      </div>
    </> 
  )
}
  
export default App
