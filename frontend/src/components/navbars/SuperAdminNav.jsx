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
            "txtContent": "Announcements",
            "targetElement": "/sadm/announcements"
        },
        {
            "txtContent": "Settings",
            "targetElement": "/sadm/settings"
        },

    ]
    return (
       <AdminNav navLinks={superAdminLinks}/>
    )
}

export default SuperAdminNav