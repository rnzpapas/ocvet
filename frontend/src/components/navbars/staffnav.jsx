import AdminNav from "./AdminNav"

function StaffNav() {
    const staffLinks = [
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
            "txtContent": "Account",
            "targetElement": ""
        },

    ]
    return (
       <AdminNav navLinks={staffLinks}/>
    )
}

export default StaffNav