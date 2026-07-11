import React, { useEffect, useState } from 'react'
import { AreaChart } from '@mantine/charts';
import { appointments, data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { Badge, ScrollArea, ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';
import { getAllMedicines } from '../../../Service/MedicineService';
import { getAllDoctors } from '../../../Service/DoctorProfileService';



const DoctorCard = () => {

    const [doc, setDoc] = useState<any[]>([])

    useEffect(() => {
        getAllDoctors()
            .then((doctors) => {
                console.log('Fetched doctors:', doctors)
                setDoc(doctors)}) 
            .catch((error) => console.error('Error fetching doctors:', error));
    }, [])
        

  



    const card = (doctor:any) => {
        return (
                
        <div className='p-3 rounded-xl border mb-3 shadow-md justify-between bg-violet-100 border-l-4 flex border-violet-500'>
           
         
               <div>
                    <div className='font-medium'>{doctor.name}</div>
                    <div className='text-sm text-gray-600'>{doctor.specialization}</div>

               </div>
               <div>
                    <div className='text-sm text-gray-600'>{doctor.email}</div>
                    <div className='text-sm text-gray-600'>Experience: {doctor.experience} years</div>

               </div>


         
            
        </div>
        )
    }
    
  return (
    <div className="p-3 border rounded-xl shadow-xl flex flex-col gap-3 bg-violet-100">
        <div className="text-lg font-bold">Doctors</div>
        <div >
            <ScrollArea.Autosize mah={300} maw={600} mx="auto">
               {doc.map((doctor) => (
                card(doctor)
               ))}
            </ScrollArea.Autosize>

        </div>
       
    </div>
  )
}

export default DoctorCard

  