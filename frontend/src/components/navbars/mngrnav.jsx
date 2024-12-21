import AdminNav from "./AdminNav";

function MngrNav() {
    const mngrLinks = [
        {
            "txtContent": "Dashboard",
            "targetElement": ""
        },
        {
            "txtContent": "Clients",
            "targetElement": ""
        },
        {
            "txtContent": "Pets",
            "targetElement": ""
        },
        {
            "txtContent": "Appointments",
            "targetElement": ""
        },
        {
            "txtContent": "Announcements",
            "targetElement": ""
        },,
        {
            "txtContent": "Account",
            "targetElement": ""
        },

    ]
    return (
       <AdminNav navLinks={mngrLinks}/>
    )
}

export default MngrNav