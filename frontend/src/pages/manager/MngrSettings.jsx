import React, { useEffect, useState } from 'react'
import MngrNav from '@/components/navbars/MngrNav'
import AccountInfo from '@/components/AccountInfo'
import Modal from '@/components/Modal';
import axiosInstance from "@/config/AxiosConfig.jsx"
import { useNavigate } from 'react-router';
import { convertDate } from '../../utils/datetimeUtils';
import { capitalizeFirstLetter } from '../../utils/textUtils'
import PersonalDetails from '@/components/PersonalDetails';
import InputField from '@/components/InputField';
import Button from '@/components/Button';

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

function MngrSettings() {
    const navigate = useNavigate();

    const [accFields, setAccFields] = useState();
    const [personalFields, setPersonalFields] = useState();
    const [userData, setUserData] = useState();
    const [isAccModalNotOpen, setIsAccModalNotOpen] = useState(false);
    const [isPersonalModalNotOpen, setIsPersonalModalNotOpen] = useState(false);
    const [isChangePwModalNotOpen, setIsChangePwModalNotOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);
    const [animalType, setAnimalType] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [emailGroups, setEmailGroups] = useState([]);
    const [serviceField, setServiceField] = useState();
    const [diagnosisField, setDiagnosisField] = useState();
    const [animalTypeField, setAnimalTypeField] = useState();
    const [vaccineField, setVaccineField] = useState();
    const [emailGroupField, setEmailGroupField] = useState();
    const [isMailGroupModalOpen, setIsMailGroupModalOpen] = useState(false);
    const [mailGroupFields, setMailGroupFields] = useState([]);
    const [adminObj, setAdminObj] = useState([])
    
    // useRedirectUser(``);
    let userParsed = JSON.parse(localStorage.getItem('user'));
    let sessionToken = sessionStorage.getItem('jwt-token');

    const getUserFullDetails = async (id) => {
        let sessionToken = sessionStorage.getItem('jwt-token');
        let userFullDetails;
        await axiosInstance.get(`/api/user/account/admin-full-details/${userParsed.uaid}`, 
        {headers: {'Authorization': `Bearer ${sessionToken}`}})
        .then(response => {
            userFullDetails = response.data.data;
            
        })
        .catch(err => {
        console.error(err)
        })

        return userFullDetails;
    }
    
    const onOpenMailGroup = () => {
      
      setIsMailGroupModalOpen(true)

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
        document.body.style.overflow = 'hidden';
    }

    const onCloseOpenMailGroup = (process) => {
      setIsMailGroupModalOpen(false);
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

        await axiosInstance.put(`/api/user/account/details/update`, formData, 
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

        await axiosInstance.put(`/api/user/${userData.UID}`, formData, 
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


        await axiosInstance.put(`/api/user/account/pw`, formData, 
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

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/admin/role');
    }
    
    const loadService = async () => {
      let arr = [];

      await axiosInstance.get('/api/service')
      .then(res => {
        let apiRes = res.data.data;
        apiRes.map(result => arr.push(result))
      })
      .catch(err => console.error(err));
      return arr;
    }

    const loadDiagnosis = async () => {
      let arr = [];

      await axiosInstance.get('/api/diagnosis')
      .then(res => {
        let apiRes = res.data.data;
        apiRes.map(result => arr.push(result))
      })
      .catch(err => console.error(err));
      return arr;
    }

    const loadAnimalTypes = async () => {
      let arr = [];

      await axiosInstance.get('/api/atypes/sort')
      .then(res => {
        let apiRes = res.data.data;
        apiRes.map(result => arr.push(result))
      })
      .catch(err => console.error(err));
      return arr;
    }

    const loadVaccines = async () => {
      let arr = [];

      await axiosInstance.get('/api/vaccine')
      .then(res => {
        let apiRes = res.data.data;
        apiRes.map(result => arr.push(result))
      })
      .catch(err => console.error(err));
      return arr;
    }

    const loadMailGroups = async () => {
      let arr = [];

      await axiosInstance.get('/api/mail-groups')
      .then(res => {
        let apiRes = res.data.data;
        apiRes.map(result => arr.push(result))
      })
      .catch(err => console.error(err));
      return arr;
    }

    const onChangeServiceField = async (evt) => {
      setServiceField(evt.target.value)
    }

    const onChangeDiagnosisField = async (evt) => {
      setDiagnosisField(evt.target.value)
      
    }

    const onChangeAnimalTypeField = async (evt) => {
      setAnimalTypeField(evt.target.value)
      
    }

    const onChangeVaccinesField = async (evt) => {
      setVaccineField(evt.target.value)
      
    }

    const addService = async () => {
      if(!serviceField || serviceField.trim().length === 0) return alert('Please fill out fields.')
      const formData = new FormData();
      formData.append('service', serviceField);
      await axiosInstance.post('/api/service/add', formData, {headers: {"Content-Type": 'application/json'}})
      .then(() => window.location.reload())

    }

    const addDiagnosis = async () => {
      if(!diagnosisField || diagnosisField.trim().length === 0) return alert('Please fill out fields.')
        const formData = new FormData();
        formData.append('diagnosis', diagnosisField);
        await axiosInstance.post('/api/diagnosis/add', formData, {headers: {"Content-Type": 'application/json'}})
        .then(() => window.location.reload())
    }

    const addAnimalType = async () => {
      if(!animalTypeField || animalTypeField.trim().length === 0) return alert('Please fill out fields.')
        const formData = new FormData();
        formData.append('animal_type', animalTypeField);
        await axiosInstance.post('/api/atypes/add', formData, {headers: {"Content-Type": 'application/json'}})
        .then(() => window.location.reload())
    }

    const addVaccines = async () => {
      if(!vaccineField || vaccineField.trim().length === 0) return alert('Please fill out fields.')
        const formData = new FormData();
        formData.append('vaccine', vaccineField);
        await axiosInstance.post('/api/vaccine/add', formData, {headers: {"Content-Type": 'application/json'}})
        .then(() => window.location.reload())
    }

    const addMailGroup = async(fields) => {
      let groupNickname = fields[0].content;
      let chosenEmails = fields[1].content
      let members = adminObj.filter(admin => 
        chosenEmails.includes(admin.email) 
      );
      let ids = [];
      members.map(member => ids.push(member.UAID));
      const formData = new FormData();
      formData.append('audience', ids);
      formData.append('nickname', groupNickname);

      await axiosInstance.post('/api/mail-groups/add', formData, {headers: {'Content-Type': 'application/json'}})
      .then(() => window.location.reload())
    }

    const removeMailGroup = async (tgid) => {
      await axiosInstance.delete(`/api/mail-groups/remove/${tgid}`)
      .then(() => window.location.reload())
    }

    const removeService = async (id) => {
      await axiosInstance.delete(`/api/service/remove/${id}`)
      .then(() => window.location.reload())
    }

    const removeDiagnosis = async (id) => {
      await axiosInstance.delete(`/api/diagnosis/remove/${id}`)
      .then(() => window.location.reload())
    }

    const removeAnimalType = async (id) => {
      await axiosInstance.delete(`/api/atypes/remove/${id}`)
      .then(() => window.location.reload())
    }

    const removeVaccine = async (id) => {
      await axiosInstance.delete(`/api/vaccine/remove/${id}`)
      .then(() => window.location.reload())
    }

    const loadAdminEmail = async () => {
      let email = [];
      await axiosInstance.get('/api/admin/email/all', {headers:{'Authorization': `Bearer ${sessionToken}`}})
      .then(res => {
        let emailRes = res.data.data;
        emailRes.map(em => {
          email.push(em)
        })
      })
      .catch(err => console.error(err));
      return email;
    }

    useEffect( () => {
        let userPromise = getUserFullDetails();
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
      let servicePromise = loadService();
      let diagnosisPromise = loadDiagnosis();
      let typePromise = loadAnimalTypes();
      let vaccinePromise = loadVaccines();
      let mailGroupPromise = loadMailGroups();

      servicePromise.then(res => setServices(res));
      diagnosisPromise.then(res => setDiagnosis(res));
      typePromise.then(res => setAnimalType(res));
      vaccinePromise.then(res => setVaccines(res));
      mailGroupPromise.then(res => setEmailGroups(res));
      

    },[])

    useEffect(() => {
      let adminEmailpromise = loadAdminEmail();
      adminEmailpromise.then(res => {
        setAdminObj(res)
        setMailGroupFields(() => [
          {
            'type': 'text',
            'txtContent': '',
            'headers': 'Group Nickname'
          },
          {
            'type': 'checkbox',
            'options': res.map(e => e.email),
            'headers': 'Members'
          }
        ])
      })
     

    }, [isMailGroupModalOpen]);

    return (
      <section className="flex w-full">
        <MngrNav />
        <section className='h-screen overflow-y-auto w-full'>
          {/* user info */}
          <section className='px-5 py-5'>
            <h5 className='font-instrument-sans text-headline-lrg font-bold'>Account and Personal Details</h5>
            {userData && (
            <section className="gap-10 flex">
              <section className="flex flex-col gap-5">
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
            </section>
            )}
          </section>
          {/* services */}
          <section className='px-5 py-5'>
            <h5 className='font-instrument-sans text-headline-lrg font-bold'>Clinic Service</h5>
            <section>
              <section className='flex gap-3 mb-3'>
                <InputField onChangeFunc={(e) => onChangeServiceField(e)}/>
                <Button txtContent={"add"} style={`h-11`} onClickFunc={addService}/>
              </section>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-raisin-black border-r-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Service</th>
                    <th className='border border-raisin-black border-l-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    services.length > 0 && (
                      services.map(s => (
                        <tr>
                          <td className='border border-raisin-black font-lato text-center'>{s.service}</td>
                          <td 
                          className='border border-raisin-black font-lato text-center text-fire-engine-red hover:underline cursor-pointer'
                          onClick={() => removeService(s.SERVICEID)}
                          >Remove</td>
                        </tr>
                      ))
                    )
                  }
                  
                </tbody>
              </table>
            </section>
          </section>
          {/* diagnosis */}
          <section className='px-5 py-5'>
            <h5 className='font-instrument-sans text-headline-lrg font-bold'>Diagnosis List</h5>
            <section>
              <section className='flex gap-3 mb-3'>
                <InputField onChangeFunc={(e) => onChangeDiagnosisField(e)}/>
                <Button txtContent={"add"} style={`h-11`} onClickFunc={addDiagnosis}/>
              </section>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-raisin-black border-r-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Service</th>
                    <th className='border border-raisin-black border-l-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    diagnosis.length > 0 && (
                      diagnosis.map(d => (
                        <tr>
                          <td className='border border-raisin-black font-lato text-center'>{d.diagnosis}</td>
                          <td 
                          className='border border-raisin-black font-lato text-center text-fire-engine-red hover:underline cursor-pointer'
                          onClick={() => removeDiagnosis(d.DIAGID)}
                          >Remove</td>
                        </tr>
                      ))
                    )
                  }
                  
                </tbody>
              </table>
            </section>
          </section>
          {/* animal type */}
          <section className='px-5 py-5'>
            <h5 className='font-instrument-sans text-headline-lrg font-bold'>Animal Types</h5>
            <section>
              <section className='flex gap-3 mb-3'>
                <InputField onChangeFunc={(e) => onChangeAnimalTypeField(e)}/>
                <Button txtContent={"add"} style={`h-11`} onClickFunc={addAnimalType}/>
              </section>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-raisin-black border-r-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Animal Type</th>
                    <th className='border border-raisin-black border-l-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    animalType.length > 0 && (
                      animalType.map(a => (
                        <tr>
                          <td className='border border-raisin-black font-lato text-center'>{capitalizeFirstLetter(a.animal_type)}</td>
                          <td 
                          className='border border-raisin-black font-lato text-center text-fire-engine-red hover:underline cursor-pointer'
                          onClick={() => removeAnimalType(a.ATYPEID)}
                          >Remove</td>
                        </tr>
                      ))
                    )
                  }
                  
                </tbody>
              </table>
            </section>
          </section>
          {/* vaccines */}
          <section className='px-5 py-5'>
            <h5 className='font-instrument-sans text-headline-lrg font-bold'>Vaccines</h5>
            <section>
              <section className='flex gap-3 mb-3'>
                <InputField onChangeFunc={(e) => onChangeVaccinesField(e)}/>
                <Button txtContent={"add"} style={`h-11`} onClickFunc={addVaccines}/>
              </section>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-raisin-black border-r-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Vaccine</th>
                    <th className='border border-raisin-black border-l-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    vaccines.length > 0 && (
                      vaccines.map(v => (
                        <tr>
                          <td className='border border-raisin-black font-lato text-center'>{v.vaccine_name}</td>
                          <td 
                          className='border border-raisin-black font-lato text-center text-fire-engine-red hover:underline cursor-pointer'
                          onClick={() => removeVaccine(v.VACCID)}
                          >Remove</td>
                        </tr>
                      ))
                    )
                  }
                 
                </tbody>
              </table>
            </section>
          </section>
          {/* email group */}
          <section className='px-5 py-5'>
            <section className='flex items-center gap-3'>
              <h5 className='font-instrument-sans text-headline-lrg font-bold'>Email Groups</h5>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
              className="w-[24px] fill-azure hover:fill-chefchaouen-blue cursor-pointer"
              onClick={onOpenMailGroup}
              >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
              </svg>
              {
                mailGroupFields.length > 0 && (
                  <Modal headline={'E-Mail Group'} isActive={isMailGroupModalOpen} fields={mailGroupFields} onClose={onCloseOpenMailGroup} button={{isDisplayed: true, txtContent:'REGISTER GROUP'}} onSubmitFunc={addMailGroup}/>

                )
              }

            </section>
            <section>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-raisin-black border-r-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Group Nickname</th>
                    <th className='border border-raisin-black border-l-white-smoke bg-raisin-black px-2 py-2 w-[500px] text-center font-instrument-sans font-semibold text-white-smoke'>Group Members</th>
                    <th className='border border-raisin-black border-l-white-smoke bg-raisin-black px-2 py-2 w-[200px] text-center font-instrument-sans font-semibold text-white-smoke'>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      emailGroups.length > 0 && (
                        emailGroups.map(eg => (
                          <tr>
                            <td className='px-2 py-2 border border-raisin-black font-lato text-center'>{eg.group_nickname}</td>
                            <td className='px-2 py-2 border border-raisin-black font-lato text-center'>{eg.email}</td>
                            <td className='px-2 py-2 border border-raisin-black font-lato text-center text-fire-engine-red hover:underline cursor-pointer' onClick={() => removeMailGroup(eg.TGID)}>Remove</td>
                          </tr>
                        ))
                      )
                    }
                  
                </tbody>
              </table>
            </section>
          </section>
        </section>
      </section>
    )
}

export default MngrSettings