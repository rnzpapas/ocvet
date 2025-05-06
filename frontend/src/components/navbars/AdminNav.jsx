import { Link, useNavigate } from "react-router"
import OcvetLogo from "../../assets/logo_img.png"

function AdminNav({navLinks}) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/admin/role');
      }
    return (
        <nav className="w-[280px] h-screen bg-linen flex flex-col items-center">
            <section className="h-[30%] flex items-center justify-center w-full cursor-pointer">
                <img src={OcvetLogo} alt="ocvet_logo" className="w-[100px] h-[100px]"/>
            </section>
            <section className="w-full h-[60%] flex flex-col gap-3">
                {navLinks.map((navLink, index) => (
                    <Link to={navLink.targetElement} key={index}>
                        <section id={index} className="w-full flex justify-end px-5 py-3 hover:bg-raisin-black-light cursor-pointer"> 
                                <h5 className=" font-instrument-sans text-headline-md font-semibold text-raisin-black hover:text-white-smoke uppercase cursor-pointer">{navLink.txtContent}</h5>
                        </section>
                    </Link>
                ))}
            </section>
            <section className="h-[10%] flex gap-2 items-center justify-center cursor-pointer" onClick={logout}>
                <p className="font-instrument-sans uppercase font-semibold text-raisin-black">logout</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[15px] h-[15px] fill-raisin-black">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                </svg>
            </section>
        </nav>
    )
}

export default AdminNav