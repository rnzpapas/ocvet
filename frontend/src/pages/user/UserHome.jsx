import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"
import useRedirectUser from '../../auth/useRedirectUser';

function UserHome() {
  useRedirectUser();

  return (
    <>
      <UserNav />
      <section className="h-dvh"></section>
      <Footer/>
    </>
  )
}

export default UserHome