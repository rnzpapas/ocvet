import NavLink from "../NavLink"
import OcvetLogo from "../../assets/logo_img.png"
import { useEffect, useState } from "react"

function UserNav() {
  const [userID, setUserID] = useState('');
  
  useEffect(() => {
    let userData = localStorage.getItem('user');
    let parsedData = JSON.parse(userData);
    setUserID(parsedData.uaid);
  },[])

  return (
    <nav className="bg-linen h-[130px] flex justify-around">
        <section className="flex items-center gap-5">
          {/* logo */}
            <img 
                className="w-[75px] h-[75px]"
                src={OcvetLogo} alt="OCVET Logo"
            />
            {/* logo title */}
            <section className="hidden md:flex md:flex-col md:items-center md:gap-[2px]">
                <p className="uppercase md:text-content-sm font-lato">city government of tanuan</p>
                <div className="w-[275px] h-[2.5px] bg-raisin-black rounded-[5px]"></div>
                <h5 className="uppercase font-extrabold md:text-content-sm font-lato">office of the city veterinarian</h5>
            </section>
        </section>
        {/* hamburger nav */}
        <section className="flex items-center gap-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[50px] h-[50px] md:hidden">
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
          </svg>
        </section>
        {/* navlinks */}
        <section className="
        absolute w-full h-full bg-linen flex flex-col items-center justify-center gap-5 
        md:relative md:flex-row md:bg-transparent md:w-auto
        ">
          <NavLink navTitle={"HOME"} toPage={"/user/home"}/>
          <NavLink navTitle={"PETS"} toPage={"/user/pets"}/>
          <NavLink navTitle={"ACCOUNT"} toPage={`/user/account/${userID}`}/>
        </section>
    </nav>
  )
}

export default UserNav