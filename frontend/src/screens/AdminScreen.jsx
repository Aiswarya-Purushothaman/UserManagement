import React,{useEffect} from 'react'
import Adminlist from './Adminlist'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminScreen = () => {
  const {userInfo}=useSelector((state)=>state.auth)
const navigate =useNavigate()

  useEffect(()=>{
    if (userInfo) {
      if (userInfo.isAdmin === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }else{
      navigate('/login')
    }
  },[navigate,userInfo])
  return (

    <Adminlist/>
  )
}

export default AdminScreen  