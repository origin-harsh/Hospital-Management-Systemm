import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Random from '../Components/Random'
import AdminDashboard from '../Layout/AdminDashboard'
import Login from '../Pages/Login'
import RegisterPage from '../Pages/RegisterPage'
import PublicRoute from './PublicRoutes'
import ProtectedRoute from './ProtectedRoute'
import PatientDashboard from '../Layout/PatientDashboard'
import PatientProfilePage from '../Pages/Patient/PatientProfilePage'
import DoctorDashboard from '../Layout/DoctorDashboard'
import DoctorProfilePage from '../Pages/Doctor/DoctorProfilePage'
import PatientAppointmentPage from '../Pages/Patient/PatientAppointmentPage'
import DoctorAppointmentPage from '../Pages/Doctor/DoctorAppointmentPage'
import DoctorAppointmentDetailsPage from '../Pages/Doctor/DoctorAppointmentDetailsPage'
import FallBack from '../Components/FallBack'
import MedcinePage from '../Pages/Admin/MedcinePage'
import InventoryPage from '../Pages/Admin/InventoryPage'
import SalesPage from '../Pages/Admin/SalesPage'
import AdminPatientPage from '../Pages/Admin/AdminPatientPage'
import AdminDoctorPage from '../Pages/Admin/AdminDoctorPage'
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage'
import DoctorDashboardPage from '../Pages/Doctor/DoctorDashboardPage'
import PatientDashboardPage from '../Pages/Patient/PatientDashboardPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><RegisterPage/></PublicRoute>}/>
      <Route path='/admin' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}>
          <Route path='dashboard' element={<AdminDashboardPage/>} />
          <Route path='doctors' element={<AdminDoctorPage/>} />
          <Route path='patients' element={<AdminPatientPage/>} />
          <Route path='medicines' element={<MedcinePage/>} />
          <Route path='inventory' element={<InventoryPage/>} />
          <Route path='sales' element={<SalesPage/>} />
      </Route>
        <Route path='/patient' element={<ProtectedRoute><PatientDashboard/></ProtectedRoute>}>
            <Route path='dashboard' element={<PatientDashboardPage/>} />
            <Route path='profile' element={<PatientProfilePage/>}/>
            <Route path='appointments' element={<PatientAppointmentPage/>} />
            <Route path='pharmacy' element={<Random/>} />
           
        </Route>
        <Route path='/doctor' element={<ProtectedRoute><DoctorDashboard/></ProtectedRoute>}>
            <Route path='dashboard' element={<DoctorDashboardPage/>}/>
            <Route path='profile' element={<DoctorProfilePage/>}/>
            <Route path='appointments' element={<DoctorAppointmentPage/>} />
            <Route path='appointments/:id' element={<DoctorAppointmentDetailsPage/>} />
            <Route path='pharmacy' element={<Random/>} />
           
        </Route>
        <Route path='*' element={<FallBack/>} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes