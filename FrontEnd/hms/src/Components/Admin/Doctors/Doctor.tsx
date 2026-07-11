import React, { useEffect, useState } from 'react'
import { getAllDoctors } from '../../../Service/DoctorProfileService';
import DoctorCard from './DoctorCard';
import { Divider } from '@mantine/core';

const Doctor = () => {
     const [doctors, setDoctors] = useState<any[]>([]);

        useEffect(()=>{
            getAllDoctors().then((data:any)=>{
                console.log("Fetched Doctors:", data);
                setDoctors(data);
            }).catch((error:any)=>{
                console.error("Error fetching doctors:", error);
            });
        },[]);
  return (
    <div >
           <div className="text-3xl font-semibold text-primary-500">Doctors</div>
           <Divider/>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>{
            doctors.map((doctor: any) => (
                <DoctorCard key={doctor.id} {...doctor}/>
            ))
            }
           
           </div>
    </div>
 
  )
}

export default Doctor