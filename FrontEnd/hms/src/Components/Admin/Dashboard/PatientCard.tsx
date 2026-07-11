import React, { useEffect, useState } from 'react'
import { AreaChart } from '@mantine/charts';
import { appointments, data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { Badge, ScrollArea, ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';
import { getAllMedicines } from '../../../Service/MedicineService';
import { getAllDoctors } from '../../../Service/DoctorProfileService';
import { getAllPatients } from '../../../Service/PatientProfileService';
import { bloodGroup } from '../../../Data/DropDownData';



const PatientCard = () => {

    const [patients, setPatients] = useState<any[]>([])

    useEffect(() => {
        getAllPatients()
            .then((patients) => {
                console.log('Fetched patients:', patients)
                setPatients(patients)}) 
            .catch((error) => console.error('Error fetching patients:', error));
    }, [])
        

  



    const card = (patient:any) => {
        return (
                
        <div className='p-3 rounded-xl border mb-3 shadow-md justify-between bg-orange-100 border-l-4 flex border-orange-500'>
           
         
               <div>
                    <div className='font-medium'>{patient.name}</div>
                    <div className='text-sm text-gray-600'>{patient.email}</div>

               </div>
               <div>
                    <div className='text-sm text-gray-600'>{patient.phone}</div>
                    <div className='text-sm text-gray-600'>Blood Group: {bloodGroup[patient.bloodGroup]}</div>

               </div>


         
            
        </div>
        )
    }
    
  return (
    <div className="p-3 border rounded-xl shadow-xl flex flex-col gap-3 bg-orange-100">
        <div className="text-lg font-bold">Patients</div>
        <div>
            <ScrollArea.Autosize mah={300} maw={600} mx="auto">
               {patients.map((patient) => (
                card(patient)
               ))}
            </ScrollArea.Autosize>

        </div>
       
    </div>
  )
}

export default PatientCard

  