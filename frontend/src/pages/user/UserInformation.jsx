import { useParams } from "react-router"
import useRedirectUser from "../../auth/useRedirectUser"
import AccountInfo from "../../components/AccountInfo"
import PersonalDetails from "../../components/PersonalDetails"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"
import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal"


function UserInformation() {
  const [accFields, setAccFields] = useState();
  const [personalFields, setPersonalFields] = useState();
  const [userData, setUserData] = useState();
  const [isAccModalNotOpen, setIsAccModalNotOpen] = useState(false);
  const [isPersonalModalNotOpen, setIsPersonalModalNotOpen] = useState(false);

  const { id } = useParams();
  useRedirectUser(`account/${id}`);
  
  const getUserFullDetails = async (id) => {
    let sessionToken = sessionStorage.getItem('jwt-token');
    let userFullDetails;
    await axios.get(`http://localhost:5001/api/user/account/full-details/${id}`, 
    {headers: {'Authorization': `Bearer ${sessionToken}`}})
    .then(response => {
      userFullDetails = response.data.data;
    })
    .catch(err => {
      console.error(err)
    })

    return userFullDetails;
  }
  
  const onOpenAccountEdit = () => {
    setIsAccModalNotOpen(true);
  }

  const onOpenPersonalEdit = () => {
    setIsPersonalModalNotOpen(true);
  }

  const onCloseAccountEdit = () => {
    setIsAccModalNotOpen(false);
  }

  const onClosePersonalEdit = () => {
    setIsPersonalModalNotOpen(false);
  }

  const onChangeEmail = (evt) => {
    console.log(evt.target.value);
  }

  const onChangeUsername = (evt) => {
    console.log(evt.target.value);
  }

  const onChangeFullname = (evt) => {
    personalFields.fullname = evt.target.value;
    console.log(personalFields.fullname)
  }

  const onChangeAddress = (evt) => {
    console.log(evt.target.value);
  }

  const onChangeGender = (evt) => {
    console.log(evt.target.value);
  }

  useEffect( () => {
    let userPromise = getUserFullDetails(id);
    userPromise.then((user) => {
      setUserData(ud => ud = user);
      
      setAccFields(af => af = [
        {
          "headers": "E-Mail",
          "txtContent": user.email,
          "type": "text",
          "onChangeHandler": onChangeEmail
        },
        {
          "headers": "Username",
          "txtContent": user.username,
          "type": "text",
          "onChangeHandler": onChangeUsername
        },
        {
          "headers": "Date Joined",
          "txtContent": user.date_joined,
          "type": "text"
        }
      ]);
    
      setPersonalFields(pf => pf = [
        {
          "headers": "Full Name",
          "txtContent": `${user.surname}, ${user.firstname} ${user.middlename}`,
          "type": "text",
          "onChangeHandler": onChangeFullname
        },
        {
          "headers": "Address",
          "txtContent": user.address,
          "type": "textarea",
          "onChangeHandler": onChangeAddress
        },
        {
          "headers": "Gender",
          "txtContent": user.gender,
          "type": "select",
          "options": ["Male", "Female"],
          "onChangeHandler": onChangeGender,

        }
      ]);
    })

  },[accFields, personalFields, userData])

  return (
    <div className={`${!isAccModalNotOpen || !isPersonalModalNotOpen && ("overflow-hidden")}`}>
      <UserNav />
      <section className="h-dvh px-5 py-5">
        {userData && (
          <>
            <AccountInfo style={"px-48"} 
              eMail={userData.email}
              username={userData.username}
              onEditClick={onOpenAccountEdit}
            />
            <Modal 
              headline={"Edit Account Information"}
              isActive={isAccModalNotOpen}
              fields={accFields}
              onClose={onCloseAccountEdit}
              button={{
                txtContent: 'Update Account Information',
                isActive: true,
                isDisplayed: true
              }}
            />
            <PersonalDetails style={"px-48"}
              fullName={`${userData.surname}, ${userData.firstname} ${userData.middlename}`}
              address={userData.address}
              gender={userData.gender}
              onEditClick={onOpenPersonalEdit}
            />
            <Modal 
              headline={"Edit Personal Information"}
              isActive={isPersonalModalNotOpen}
              fields={personalFields}
              onClose={onClosePersonalEdit}
              button={{
                txtContent: 'Update Personal Information',
                isActive: true,
                isDisplayed: true
              }}
            />

          </>
        )}
      </section>
      <Footer />
    </div>
  )
}

export default UserInformation