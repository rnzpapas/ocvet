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

function App() {
  const checkBtn = () => {
    alert("it is working")
  }
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
    }
  ]

  const headers = [
    {
      "title": "No.",
      "isSortable": true,
      "isSorted": false
    },
    {
      "title": "Client",
      "isSortable": true,
      "isSorted": false
    },
    {
      "title": "Date",
      "isSortable": true,
      "isSorted": false
    },
    {
      "title": "Time",
      "isSortable": true,
      "isSorted": false
    },
    {
      "title": "Status",
      "isSortable": false
    },
  ]
  const data = [
    {
      "number" : "1",
      "client_name": "John Doe",
      "date_of_transaction": "12/02/2024",
      "time_of_transaction": "03:13 PM"
    },
    {
      "number" : "2",
      "client_name": "Jane Doe",
      "date_of_transaction": "12/08/2024",
      "time_of_transaction": "05:13 PM"
    },
  ]
  return (
    <>
      <UserLogin />

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
        {/* <Modal headline={"Pet Information"} isActive={true} fields={fields} img={Doggy}/> */}
        {/* <Table headers={headers} data={data}/> */}
      </div>
    </> 
  )
}

export default App
