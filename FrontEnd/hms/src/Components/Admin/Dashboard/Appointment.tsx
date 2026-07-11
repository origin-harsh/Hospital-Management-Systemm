import React from 'react'
import { AreaChart } from '@mantine/charts';
import { appointments, data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { Badge, ScrollArea, ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';



const Appointment = () => {

  



    const card = (app:any) => {
        return (
                
        <div className='p-3 rounded-xl border mb-3 shadow-md justify-between bg-violet-100 border-l-4 flex border-violet-500'>
           
         
               <div>
                    <div className='font-medium'>{app.patient}</div>
                    <div className='text-sm text-gray-600'>{app.doctor}</div>

               </div>
               <div>
                    <div className='text-sm text-gray-600'>{app.time}</div>
                    <div className='text-sm text-gray-600'>{app.reason}</div>
                    <Badge color={app.status === 'Completed' ? 'green' : app.status === 'Pending' ? 'yellow' : 'red'} variant="filled">
                        {app.status}
                    </Badge>
               </div>


         
            
        </div>
        )
    }
    
  return (
    <div className="p-3 border rounded-xl shadow-xl flex flex-col gap-3 bg-violet-100">
        <div className="text-lg font-bold">Today's Appointments</div>
        <div>
            <ScrollArea.Autosize mah={300} maw={600} mx="auto">
               {appointments.map((app) => (
                card(app)
               ))}
            </ScrollArea.Autosize>

        </div>
       
    </div>
  )
}

export default Appointment

  