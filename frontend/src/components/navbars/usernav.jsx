import NavLink from "../NavLink"
import OcvetLogo from "../../assets/logo_img.png"
import { useEffect, useState } from "react"
import { Link } from "react-router";

function UserNav() {
  const [userID, setUserID] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = () => {
    document.body.style.overflow = 'hidden'
    setIsMobileNavOpen(true)
  }

  const closeMobileNav = () => {
    document.body.style.overflow = 'auto'
    setIsMobileNavOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = 'auto'
    let userData = localStorage.getItem('user');
    let parsedData = JSON.parse(userData);
    setUserID(parsedData.uaid);
  },[])

  return (
    <nav className="bg-linen h-[130px] flex items-center justify-between px-10 lg:justify-around z-50">
        <section className="flex items-center gap-5">
          {/* logo */}
          <Link to={'/user/home'}>
            <img 
                className="w-[60px] h-[60px] lg:w-[75px] lg:h-[75px]"
                src={OcvetLogo} alt="OCVET Logo"
            />
          </Link>
            {/* logo title */}
            <section className="hidden md:flex md:flex-col md:items-center md:gap-[2px]">
                <p className="uppercase text-content-xtrasm lg:text-content-sm font-lato">city government of tanuan</p>
                <div className="w-[220px] lg:w-[275px] h-[2.5px] bg-raisin-black rounded-[5px]"></div>
                <h5 className="uppercase font-extrabold text-content-xtrasm lg:text-content-sm font-lato">office of the city veterinarian</h5>
            </section>
        </section>
        <section className={`hidden md:flex md:justify-end md:gap-5 md:w-6/12`}>
          <NavLink navTitle={"APPOINTMENTS"} toPage={"/user/home"} />
          <NavLink navTitle={"PETS"} toPage={"/user/pets"} />
          <NavLink navTitle={"ACCOUNT"} toPage={`/user/account/${userID}`} />
        </section>
        {/* hamburger nav */}
        <section className="flex items-center gap-5" onClick={openMobileNav}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[40px] h-[40px] cursor-pointer md:hidden">
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
          </svg>
        </section>
        {/* navlinks hamb*/}
        <section className={`${isMobileNavOpen ? ('absolute top-0 left-0 w-full h-full bg-linen flex flex-col items-center justify-center gap-5 md:relative md:flex-row md:bg-transparent md:w-auto z-40') : 'hidden'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${isMobileNavOpen ? ('fill-raisin-black hover:fill-raisin-black w-[30px] absolute top-4 right-4 cursor-pointer') : 'hidden' }`} onClick={closeMobileNav}>
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
          </svg>
          <img 
              className="w-[75px] h-[75px] absolute top-5"
              src={OcvetLogo} alt="OCVET Logo"
          />
          <NavLink navTitle={"APPOINTMENTS"} toPage={"/user/home"}/>
          <NavLink navTitle={"PETS"} toPage={"/user/pets"}/>
          <NavLink navTitle={"ACCOUNT"} toPage={`/user/account/${userID}`}/>
        </section>
    </nav>
  )
}

export default UserNav