import React, { useEffect, useState } from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
import { getUserProfile } from '../../../apis/userData'
import { getAdminProfile } from '../../../apis/adminData'
import Loader from '../../../components/Loader/loader'
function Profile() {
    const [loadingState, setLoadingState] = useState(false)
    const [testProfileData, setData] = useState({})
    const {loginUserId} = useSelector(state=>state.transaction)
    
    useEffect(()=>{
      (async()=>{
        setLoadingState(true)
        loginUserId !==3 ? setData(await getUserProfile(loginUserId)) : setData(await getAdminProfile(loginUserId))
        setLoadingState(false)
      })()
    },[loginUserId])

    if(loadingState){
      return <Loader /> 
    }
  return (
    <div className='profileTab'>
        <div className='largeScreen'>
            <img src={'/adminProfile.png'} alt='profile' className='profile' />
            <div className='profileDetails'>
                <div>
                    <h1>Your Name</h1>
                    <p>{testProfileData.name}</p>
                    <h1>Email</h1>
                    <p>{testProfileData.email}</p>
                    <h1>Date of Birth</h1>
                    <p>{testProfileData.date_of_birth}</p>
                    <h1>Permanent Address</h1>
                    <p>{testProfileData.permanent_address}</p>
                    <h1>Postal Code</h1>
                    <p>{testProfileData.postal_code}</p>
                </div>
                <div>
                    <h1>User Name</h1>
                    <p>{testProfileData.name}</p>
                    <h1>Password</h1>
                    <p>******</p>
                    <h1>Present Address</h1>
                    <p>{testProfileData.present_address || testProfileData.permanent_address}</p>
                    <h1>City</h1>
                    <p>{testProfileData.city}</p>
                    <h1>Country</h1>
                    <p>{testProfileData.country || 'India'}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile