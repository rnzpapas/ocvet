import Button from "../../components/button"
import InputField from "../../components/InputField"
import SideLogo from "../../components/SideLogo"
function UserLogin() {
  return (
    <section className="flex">
        <SideLogo style={"h-screen w-[50%]"}/>
        <section className="flex flex-col gap-5 items-center justify-center w-[50%]">
            <h5 className="font-instrument-sans text-headline-md font-bold"> Sign Up</h5>
            <form className="flex flex-col gap-3 w-[50%]">
                <section className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-instrument-sans text-headline-sm font-semibold"> E-Mail </label>
                    <InputField type="email" placeholder={"youremail@gmail.com"} name="email" />
                </section>
                <section className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-instrument-sans text-headline-sm font-semibold"> Username </label>
                    <InputField type="text" placeholder={"yourusername123"} name="username" />
                </section>
                <section className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-instrument-sans text-headline-sm font-semibold"> Password </label>
                    <InputField type="passsword" placeholder={"youremail@gmail.com"} name="email" />
                </section>
                <section className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-instrument-sans text-headline-sm font-semibold"> Confirm Password </label>
                    <InputField type="password" placeholder={"youremail@gmail.com"} name="email" />
                </section>
                <Button txtContent={"sign up"}/>
            </form>
        </section>
    </section>
  )
}

export default UserLogin