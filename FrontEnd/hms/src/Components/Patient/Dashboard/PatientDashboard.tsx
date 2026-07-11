import React from 'react'
import DoctorCard from '../../Admin/Dashboard/DoctorCard'
import Medicine from '../../Admin/Dashboard/Medicine'
import MyAppointment from './MyAppointment';
import Welcome from '../../Patient/Dashboard/Welcome';
import DesiesChart from '../../Admin/Dashboard/DesiesChart';
import ApRecord from './ApRecord';


const PatientDashboard = () => {
   
  return (
    <div className="flex flex-col gap-5">
       
        <div className='grid grid-cols-3 gap-5'>
          <Welcome  />
            <MyAppointment  />
         <ApRecord />
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <DesiesChart />
          <DoctorCard />

       
          </div>
    </div>
  )
}

export default PatientDashboard 