import React, { useEffect, useState } from 'react'
import PatientCard from './PatientCard'
import { getAllPatients } from '../../../Service/PatientProfileService';
import { Divider } from '@mantine/core';

const Patient = () => {
     const [patients, setPatients] = useState<any[]>([]);

        useEffect(()=>{
            getAllPatients().then((data:any)=>{
                console.log("Fetched patients:", data);
                setPatients(data);
            }).catch((error:any)=>{
                console.error("Error fetching patients:", error);
            });
        },[]);
  return (
    <div>
           <div className="text-3xl font-semibold text-primary-500">Patient</div>
           <Divider/>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>{
            patients.map((patient: any) => (
                <PatientCard key={patient.id} {...patient}/>
            ))
            }
           
           </div>
    </div>
 
  )
}

export default Patient