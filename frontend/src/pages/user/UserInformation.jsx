import { useNavigate, useParams } from "react-router"
import useRedirectUser from "../../auth/useRedirectUser"
import AccountInfo from "../../components/AccountInfo"
import PersonalDetails from "../../components/PersonalDetails"
import Footer from "../../components/Footer"
import UserNav from "../../components/navbars/UserNav"
import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal"
import { convertDate } from "../../utils/datetimeUtils"
import DoughnutChart from "../../components/charts/DoughnutChart"
import { capitalizeFirstLetter } from '../../utils/textUtils';

const pwFields = [
  {
    'headers': 'Old Password',
    'txtContent': '',
    'type': 'password'
  },
  {
    'headers': 'New Password',
    'txtContent': '',
    'type': 'password'
  },
  {
    'headers': 'Confirm Password',
    'txtContent': '',
    'type': 'password'
  }
]

function UserInformation() {
  const navigate = useNavigate();
  const [accFields, setAccFields] = useState();
  const [personalFields, setPersonalFields] = useState();
  const [userData, setUserData] = useState();
  const [isAccModalNotOpen, setIsAccModalNotOpen] = useState(false);
  const [isPersonalModalNotOpen, setIsPersonalModalNotOpen] = useState(false);
  const [isChangePwModalNotOpen, setIsChangePwModalNotOpen] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [perPetCount, setPerPetCount] = useState();

  const { id } = useParams();
  useRedirectUser(`account/${id}`);
  let userParsed = JSON.parse(localStorage.getItem('user'));
  
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
    document.body.style.overflow = 'hidden';
  }

  const onOpenPersonalEdit = () => {
    setIsPersonalModalNotOpen(true);
    document.body.style.overflow = 'hidden';
  }
  
  const onOpenChangePwEdit = () => {
    setIsChangePwModalNotOpen(true);
    setIsAccModalNotOpen(false);
    console.log('as')
    document.body.style.overflow = 'hidden';
  }

  const onCloseAccountEdit = () => {
    setIsAccModalNotOpen(false);
    document.body.style.overflow = '';
  }

  const onClosePwEdit = () => {
    setIsChangePwModalNotOpen(false);
    document.body.style.overflow = '';
  }

  const onClosePersonalEdit = () => {
    setIsPersonalModalNotOpen(false);
    document.body.style.overflow = '';
  }

  const updateAccInfo = async (info) => {
    let sessionToken = sessionStorage.getItem('jwt-token');
  
    let formData = new FormData();
    formData.append('old_username', userData.username);
    formData.append('username', info[1].content);
    formData.append('email', info[0].content);

    await axios.put(`http://localhost:5001/api/user/account/details/update`, formData, 
      {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      } 
    )
    .then(() => window.location.reload())
  }

  const updateDetailsInfo = async (info) => {
    let sessionToken = sessionStorage.getItem('jwt-token');

    let formData = new FormData();
    let fn = info[0].content.split(',')[1].trim().split(' ')[0] + ' ' + info[0].content.split(',')[1].trim().split(' ')[1]
    formData.append('firstname', fn)
    formData.append('middlename', info[0].content.split(',')[1].trim().split(' ')[2])
    formData.append('surname', info[0].content.split(',')[0])
    formData.append('address', info[1].content);
    formData.append('gender', info[2].content);

    await axios.put(`http://localhost:5001/api/user/${userData.UID}`, formData, 
      {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => window.location.reload());
  }

  const updateChangePwInfo = async (info) => {
    let sessionToken = sessionStorage.getItem('jwt-token');
    let formData = new FormData();
    formData.append('old_pw', info[0].content)
    formData.append('pw', info[1].content)
    formData.append('cpw', info[2].content)
    formData.append('uaid', userParsed.uaid)


    await axios.put(`http://localhost:5001/api/user/account/pw`, formData, 
      {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      alert('Successfully updated your password.');
      window.location.reload();
    });
  }

  const loadAllPetCount = async () => {
    let sessionToken = sessionStorage.getItem('jwt-token');
    let count;
    await axios.get(`http://localhost:5001/api/pets/owner/count?uid=${userParsed.uid}`, 
      {'headers': {'Authorization': `Bearer ${sessionToken}`}})
    .then((response) => count = response.data.data.count)
    .catch(err => console.error(err));
    return count;
  }
  
  const loadPerPetCount = async () => {
    let sessionToken = sessionStorage.getItem('jwt-token');
    let pets;
    await axios.get(`http://localhost:5001/api/pets/owner/pet/count?uid=${userParsed.uid}`, 
      {'headers': {'Authorization': `Bearer ${sessionToken}`}})
    .then((response) => pets = response.data.data)
    .catch(err => console.error(err));
    return pets;
  }

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/user/login');
  }
  
  useEffect( () => {
    let userPromise = getUserFullDetails(id);
    !userData && (
      userPromise.then((user) => {
        setUserData(ud => ud = user);
        
        setAccFields(af => af = [
          {
            "headers": "E-Mail",
            "txtContent": user.email,
            "type": "text",
            "readOnly": false
          },
          {
            "headers": "Username",
            "txtContent": user.username,
            "type": "text",
            "readOnly": false
          },
          {
            "headers": "Date Joined",
            "txtContent": convertDate(user.date_joined),
            "type": "text",
            "readOnly": true
          }
        ]);
      
        setPersonalFields(pf => pf = [
          {
            "headers": "Full Name",
            "txtContent": `${user.surname}, ${user.firstname} ${user.middlename}`,
            "type": "text",
          },
          {
            "headers": "Address",
            "txtContent": user.address,
            "type": "textarea",
          },
          {
            "headers": "Gender",
            "txtContent": user.gender,
            "type": "select",
            "options": ["Male", "Female"],
          }
        ]);
      })
    )
  },[accFields, personalFields, userData])

  useEffect(() => {
    let petCountPromise = loadAllPetCount();
    petCountPromise.then((count) => setPetCount(count));

    let perPetCountPromise = loadPerPetCount();
    perPetCountPromise.then((pets) => setPerPetCount(pets))

  },[])

  return (
    <div className={`${!isAccModalNotOpen || !isPersonalModalNotOpen && ("overflow-hidden")}`}>
      <UserNav />
        {userData && (
          <section className="h-dvh gap-10 flex">
            <section className="flex flex-col gap-5 px-5 py-5">
              <section>
                <AccountInfo style={""} 
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
                  onSubmitFunc={updateAccInfo}
                  clickableLink={{"txtContent" : "Change Password?", "isActive" : true, "isDisplayed": true, "onClickFunc": onOpenChangePwEdit}}
                />
                <h5 className="text-azure cursor-pointer hover:underline w-fit" onClick={logout}>Logout</h5>
                <Modal 
                  headline={"Update Password"}
                  isActive={isChangePwModalNotOpen}
                  fields={pwFields}
                  onClose={onClosePwEdit}
                  button={{
                    txtContent: 'Change Password',
                    isActive: true,
                    isDisplayed: true
                  }}
                  onSubmitFunc={updateChangePwInfo}
                />
              </section>
              <section>
                <PersonalDetails style={""}
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
                  onSubmitFunc={updateDetailsInfo}
                />
              </section>
            </section>
            <section className="flex justify-evenly px-5 py-5 w-full">
              <section className="w-[300px] h-[150px] px-3 py-2 flex flex-col items-center justify-center shadow-[3px_5px_15px_rgba(0,0,0,0.25)] bg-raisin-black rounded-lg relative">
                <h5 className="font-lato font-semibold text-headline-sm tracking-wide text-white-smoke absolute top-3 left-5">Registered Pets</h5>
                <section className="">
                  <h3 className="font-lato text-headline-xtralrg text-white-smoke">{petCount}</h3>
                </section>
              </section>
              <section className="px-3 py-2 shadow-[3px_5px_15px_rgba(0,0,0,0.25)] rounded-lg h-fit">
                {
                  perPetCount && (
                    <DoughnutChart 
                      datasetLabel={'Your Pets'}
                      datasetData={perPetCount.map(animal => {return animal.animal_count})}
                      labels={perPetCount.map(animal => {return capitalizeFirstLetter(animal.animal_type)})}
                      optionTooltipLabel={'pets'}
                      optionLegendPos="top"
                      chartLabel={'Account Summary'} 
                      chartW={'w-[300px]'}
                      chartH={'h-fit'}
                    />
                  )
                }
              </section>
            </section>
          </section>
        )}
      <Footer />
    </div>
  )
}

export default UserInformation