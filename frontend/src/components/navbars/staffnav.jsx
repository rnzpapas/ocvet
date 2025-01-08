import AdminNav from "./AdminNav"

function StaffNav() {
    const staffLinks = [
        {
            "txtContent": "Dashboard",
            "targetElement": "/staff/dashboard"
        },
        {
            "txtContent": "Clients",
            "targetElement": "/staff/owners"
        },
        {
            "txtContent": "Pets",
            "targetElement": "/staff/pets"
        },
        {
            "txtContent": "Appointments",
            "targetElement": "/staff/appointments"
        },
        {
            "txtContent": "Account",
            "targetElement": "/staff/account"
        },

    ]
    return (
       <AdminNav navLinks={staffLinks}/>
    )
}

export default StaffNav