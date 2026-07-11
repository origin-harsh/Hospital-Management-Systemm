import React, { useEffect, useState } from 'react'
import { AreaChart } from '@mantine/charts';
import { appointments, data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { Badge, ScrollArea, ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';
import { getAllMedicines } from '../../../Service/MedicineService';
import { useSelector } from 'react-redux';
import { getPrescriptionByPatientId, getRecordByPatientId } from '../../../Service/AppointmentService';



const ApRecord = () => {

    const [med, setMed] = useState<any[]>([])
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        getPrescriptionByPatientId(user?.profileId)
            .then((medicines) => {
                console.log('Fetched Record:', medicines)
                const latestRecord = medicines.sort((a:any, b:any) => new Date(b.prescriptionDate).getTime() - new Date(a.prescriptionDate).getTime())[0];
                setMed([latestRecord])}) 
            .catch((error) => console.error('Error fetching medicines:', error));
    }, [])
        

  



    const card = (medicine:any) => {
        return (
                
        <div className='p-3 rounded-xl border mb-3 shadow-md justify-between bg-green-100 border-l-4 flex border-green-500'>
           
         
               <div>
                    <div className='font-medium'>{medicine.name}</div>
                    <div className='text-sm text-gray-600'>{medicine.type}</div>

               </div>
               <div>
                    <div className='text-sm text-gray-600'>{medicine.dosage}</div>
                    <div className='text-sm text-gray-600'>Stock: {medicine.frequency}</div>

               </div>


         
            
        </div>
        )
    }
    
  return (
    <div className="p-3 border rounded-xl shadow-xl flex flex-col gap-3 bg-green-100">
        <div className="text-lg font-bold">Medicines</div>
        <div>
            <ScrollArea.Autosize mah={300} maw={400} mx="auto">
                {med?.map((prescription) =>
                    prescription.medicines?.map((medicine:any) => (
                    <div key={medicine.id}>
                        {card(medicine)}
                    </div>
                    ))
                )}
            </ScrollArea.Autosize>

        </div>
       
    </div>
  )
}

export default ApRecord

  