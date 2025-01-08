import { Link } from "react-router"

function NavLink({navTitle, toPage}) {
    return (
        <Link to={toPage} className="text-content-xtralrg hover:font-semibold cursor-pointer md:text-content-md lg:text-content-lrg"> 
          {navTitle} 
        </Link>
    )
}

export default NavLink