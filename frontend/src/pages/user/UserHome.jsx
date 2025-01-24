import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"

function UserHome() {
  const [token, setToken] = useState("as");
  useEffect(() => {
    setToken(sessionStorage.getItem('jwt-token'))
  },[])
  return (
    <>
      <UserNav />
      <section className="h-dvh flex justify-center items-center overflow-hidden">
        <h5 className="w-80 break-words">{token}</h5>
      </section>
      <Footer/>
    </>
  )
}

export default UserHome