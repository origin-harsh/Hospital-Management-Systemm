import React from 'react'
import Sidebart from '../Components/Admin/Sidebar/Sidebart'
import Header from '../Components/Header/Header'
import { Outlet, Route, Routes } from 'react-router-dom'
import Random from '../Components/Random'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
   const jwt = useSelector((state:any)=>state.jwt);
  return (
   <div className="flex">
      <Sidebart />
      <div className='w-full flex flex-col'>
        <Header />
       <Outlet />
      </div>
     
    </div>
  )
}

export default AdminDashboard