import React from 'react'
import Welcome from './Welcome';
import Appointments from './Appointments';
import DesiesChart from '../../Admin/Dashboard/DesiesChart';
import PatientChart from './PatientChart';
import PatientCard from '../../Admin/Dashboard/PatientCard';
import Appointment from '../../Admin/Dashboard/Appointment';



const DoctorDashboard = () => {
  return (
     <div className="flex flex-col gap-5">
      
        <div className='grid grid-cols-2 gap-5'>
           <Welcome/>
           <Appointments/>
        </div>
       
        <div className='grid grid-cols-2 gap-5'>
           <DesiesChart/>
           <PatientChart/>
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <PatientCard/>
          <Appointment/>
          </div>
    </div>
  )
}

export default DoctorDashboard;