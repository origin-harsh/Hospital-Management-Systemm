import React from 'react'
import Header from '../Components/Header/Header'
import Sidebart from '../Components/Sidebar/Sidebart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Random from '../Components/Random'
import AdminDashboard from '../Layout/AdminDashboard'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}>
            <Route path='/dashboard' element={<Random/>}/>
            <Route path='/doctors' element={<Random/>} />
            <Route path='/patients' element={<Random/>} />
            <Route path='/appointments' element={<Random/>} />
            <Route path='/pharmacy' element={<Random/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes