import AccountInfo from "../../components/AccountInfo"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"

function UserInformation() {
  return (
    <>
        <UserNav />
        <section className="h-dvh px-5 py-5">
            <AccountInfo style={"px-48"}/>
        </section>
        <Footer />
    </>
  )
}

export default UserInformation