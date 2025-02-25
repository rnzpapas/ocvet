import UserLogin from "./pages/user/UserLogin"
import UserRegister from "./pages/user/UserRegister"
import ForgotPassword from "./pages/common/ForgotPassword"
import OTPVerification from "./pages/common/OTPVerification"
import ChangePassword from "./pages/common/ChangePassword"
import UserPetPage from "./pages/user/UserPetPage"
import UserPetRegistration from "./pages/user/UserPetRegistration"
import UserPetEditInfo from "./pages/user/UserPetEditInfo"
import UserPetInformation from "./pages/user/UserPetInformation"
import UserInformation from "./pages/user/UserInformation"
import AdminLogin from "./pages/common/AdminLogin"
import StaffHome from "./pages/staff/StaffHome"
import StaffPetOwners from "./pages/staff/StaffPetOwners"
import StaffPetList from "./pages/staff/StaffPetList"
import StaffAppointments from "./pages/staff/StaffAppointments"
import StaffUserInfo from "./pages/staff/StaffUserInfo"
import MngrHome from "./pages/manager/MngrHome"
import MngrPetList from "./pages/manager/MngrPetList"
import MngrPetOwners from "./pages/manager/MngrPetOwners"
import MngrAppointments from "./pages/manager/MngrAppointments"
import MngrAnnouncements from "./pages/manager/MngrAnnouncements"
import SAdminAppointments from "./pages/superadmin/SAdminAppointments"
import SAdminHome from "./pages/superadmin/SAdminHome"
import SAdminPetList from "./pages/superadmin/SAdminPetList"
import SAdminPetOwners from "./pages/superadmin/SAdminPetOwners"
import SAdminListAdmin from "./pages/superadmin/SAdminListAdmin"
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom"
import UserHome from "./pages/user/UserHome"
import NotFound from "./pages/NotFound"
import UserPetGroupRegistration from "./pages/user/UserPetGroupRegistration"
import UserPetGroupPage from "./pages/user/UserPetGroupPage"
import ForbiddenAccess from "./pages/ForbiddenAccess"
import MngrSettings from "./pages/manager/MngrSettings"
import SAdminSettings from "./pages/superadmin/SAdminSettings"
import SAdminAnnouncements from "./pages/superadmin/SAdminAnnouncements"

function App() {
  return (
    <>
      <Routes>
        {/* landing page */}
        <Route path="/" element={<LandingPage />}/>
        {/* user routes */}
        <Route path="/user/">
          <Route index path="home" element={<UserHome />}/>
          <Route path="login" element={<UserLogin />}/>
          <Route path="register" element={<UserRegister />}/>
          <Route path="pets/">
            <Route path="" element={<UserPetPage />}/>
            <Route path="register" element={<UserPetRegistration />}/>
            <Route path="view/:id" element={<UserPetInformation />}/>
            <Route path="edit/:id" element={<UserPetEditInfo />}/>
            <Route path="group/register" element={<UserPetGroupRegistration />}/>
            <Route path="group/view/:id" element={<UserPetGroupPage />}/>
          </Route>
          <Route path="account/:id" element={<UserInformation />}/>
        </Route>
        {/* staff routes */}
        <Route path="/staff/">
          <Route path="dashboard" element={<StaffHome />}/>
          <Route path="pets" element={<StaffPetList />}/>
          <Route path="owners" element={<StaffPetOwners />}/>
          <Route path="appointments" element={<StaffAppointments />}/>
          <Route path="account" element={<StaffUserInfo />}/>
        </Route>
        {/* mngr routes */}
        <Route path="/mngr/">
          <Route index path="dashboard" element={<MngrHome />}/>
          <Route path="pets" element={<MngrPetList />}/>
          <Route path="owners" element={<MngrPetOwners />}/>
          <Route path="appointments" element={<MngrAppointments />}/>
          <Route path="announcements" element={<MngrAnnouncements />}/>
          <Route path="settings" element={<MngrSettings />}/>
        </Route>
        {/* super admin routes */}
        <Route path="/sadm/">
          <Route index path="dashboard" element={<SAdminHome />}/>
          <Route path="pets" element={<SAdminPetList />}/>
          <Route path="owners" element={<SAdminPetOwners />}/>
          <Route path="appointments" element={<SAdminAppointments />}/>
          <Route path="announcements" element={<SAdminAnnouncements />}/>
          <Route path="admins" element={<SAdminListAdmin />}/>
          <Route path="settings" element={<SAdminSettings />}/>
        </Route>
        {/* staff, mngr, super administrator login (IN-PROGESS) */}
        <Route path="/admin/">
          <Route index path="role" element={<AdminLogin />}/>
          {/* Individual login pages here */}
        </Route>
        {/* Account recovery pages */}
        <Route path="/account-recovery">
          <Route index path="forgot-password" element={<ForgotPassword />}/>
          <Route path="changepw" element={<ChangePassword />}/>
          <Route path="OTP" element={<OTPVerification />}/>
        </Route>
        {/* Forbidden */}
        <Route path="/forbidden" element={<ForbiddenAccess />}></Route>
        {/* not found routes */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </> 
  )
}
export default App
