import AdminNav from "./AdminNav"

function SuperAdminNav() {
    const superAdminLinks = [
        {
            "txtContent": "Dashboard",
            "targetElement": "/sadm/dashboard"
        },
        {
            "txtContent": "Administrators",
            "targetElement": "/sadm/admins"
        },
        {
            "txtContent": "Clients",
            "targetElement": "/sadm/owners"
        },
        {
            "txtContent": "Pets",
            "targetElement": "/sadm/pets"
        },
        {
            "txtContent": "Appointments",
            "targetElement": "/sadm/appointments"
        },
        {
            "txtContent": "Account",
            "targetElement": "/sadm/account"
        },

    ]
    return (
       <AdminNav navLinks={superAdminLinks}/>
    )
}

export default SuperAdminNav