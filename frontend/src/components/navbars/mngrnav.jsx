import AdminNav from "./AdminNav";

function MngrNav() {
    const mngrLinks = [
        {
            "txtContent": "Dashboard",
            "targetElement": "/mngr/dashboard"
        },
        {
            "txtContent": "Clients",
            "targetElement": "/mngr/owners"
        },
        {
            "txtContent": "Pets",
            "targetElement": "/mngr/pets"
        },
        {
            "txtContent": "Appointments",
            "targetElement": "/mngr/appointments"
        },
        {
            "txtContent": "Announcements",
            "targetElement": "/mngr/announcements"
        },,
        {
            "txtContent": "Settings",
            "targetElement": "/mngr/settings"
        },

    ]
    return (
       <AdminNav navLinks={mngrLinks}/>
    )
}

export default MngrNav