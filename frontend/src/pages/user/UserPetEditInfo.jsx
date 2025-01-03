import Button from "../../components/button"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import UserNav from "../../components/navbars/UserNav"

function UserPetEditInfo() {
  return (
    <>
        <UserNav />
        <section className="h-dvh flex items-center flex-col">
            <h5 className="mt-10 font-instrument-sans font-bold text-headline-md">Edit Pet Information</h5>
            <form action="" className="w-[400px] flex flex-col gap-8">
                <section className="flex flex-col gap-3">
                    <label htmlFor="photo" className="font-instrument-sans text-headline-sm font-semibold">Pet Photo</label>
                    <section className="flex justify-center">
                        <section className="relative">
                            <img src="" alt="" className="w-[100px] h-[100px] bg-azure rounded-full" />
                            <section className="absolute bottom-0 right-0 bg-silver rounded-full h-[30px] w-[30px] flex items-center justify-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white-smoke h-[20px] w-[20px]">
                                    <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                                </svg>
                            </section>
                        </section>
                    </section>
                </section> 
                <section className="flex flex-col gap-3">
                    <label htmlFor="pet_nickname" className="font-instrument-sans text-headline-sm font-semibold">Pet Nickname</label>
                    <InputField type={"text"} placeholder={"E.g. Moosey"} name={"pet_nickname"}/>
                </section>
                <section className="flex flex-col gap-3">
                    <label htmlFor="pet_breed" className="font-instrument-sans text-headline-sm font-semibold">Pet Breed</label>
                    <InputField type={"text"} placeholder={"E.g. Dog"} name={"pet_breed"}/>
                </section>
                <Button txtContent={"Update Pet Information"}/>                
            </form>
        </section>
        <Footer />
    </>
  )
}

export default UserPetEditInfo