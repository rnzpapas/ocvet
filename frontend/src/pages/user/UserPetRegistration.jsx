import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import UserNav from "../../components/navbars/UserNav"

function UserPetRegistration() {
  return (
    <>
        <UserNav />
        <section>
            <h5>Pet Registration</h5>
            <form action="">
                <section>
                    <h5>Pet Photo</h5>
                    <div></div>
                </section> 
                <section>
                    <h5>Pet Nickname</h5>
                    <InputField type={"text"} placeholder={"E.g. Moosey"}/>
                </section>
                <section>
                    <h5>Pet Breed</h5>
                    <InputField type={"text"} placeholder={"E.g. Dog"}/>
                </section>
            </form>
        </section>
        <Footer />
    </>
  )
}

export default UserPetRegistration