import React from 'react'
import TopCard from './TopCard'
import DesiesChart from './DesiesChart'
import App from '../../../App'
import Appointment from './Appointment'
import Medicine from './Medicine'
import Doctor from '../Doctors/Doctor'
import DoctorCard from './DoctorCard'
import PatientCard from './PatientCard'

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-5">
        <TopCard />
        <div className='grid grid-cols-3 gap-5'>
          <DesiesChart />
          <Appointment />
          <Medicine />
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <DoctorCard />

          <PatientCard />
          </div>
    </div>
  )
}

export default AdminDashboard