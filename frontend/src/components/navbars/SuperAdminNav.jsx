import AdminNav from "./AdminNav"

function SuperAdminNav() {
    const superAdminLinks = [
        {
            "txtContent": "Dashboard",
            "targetElement": ""
        },
        ,
        {
            "txtContent": "Administrators",
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
       <AdminNav navLinks={superAdminLinks}/>
    )
}

export default SuperAdminNav