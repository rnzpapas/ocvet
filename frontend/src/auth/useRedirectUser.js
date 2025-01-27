import { useEffect } from "react";
import { useNavigate } from "react-router";

const useRedirectUser = (page = null) => {
    const navigate = useNavigate();

    useEffect(() => {
        let userData = localStorage.getItem('user') || null;
        let userToken = sessionStorage.getItem('jwt-token') || null;
        
        let parsedUserData = JSON.parse(userData);
        // if the user is not yet authenticated and tried to access protected routes
        if(!userData || !userToken){

        }
        // if other authenticated user role attempts to go to another role pages and any other common pages e.g. login page, registration page
        if(userData && userToken){
            switch(parsedUserData.role){
                case 'User':
                    page === null && (page = 'home');
                    navigate(`/user/${page}`);
                    break;
                case 'Staff':
                    page === null && (page = 'dashboard');
                    navigate(`/staff/${page}`);
                    break;
                case 'Manager':
                    page === null && (page = 'dashboard');
                    navigate(`/mngr/${page}`);
                    break;
                case 'Super Administrator':
                    page === null && (page = 'dashboard');
                    navigate(`/sadm/${page}`);
                    break;
                default:
                    navigate('/');
                    break;
            }
        }

        
    },[]);
}

export default useRedirectUser;