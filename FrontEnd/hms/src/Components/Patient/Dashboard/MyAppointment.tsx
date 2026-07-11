import React, { useEffect, useState } from 'react'
import { AreaChart } from '@mantine/charts';
import { Badge, ScrollArea, ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { getAppointmentsByPatientId } from '../../../Service/AppointmentService';
import { getPatient } from '../../../Service/PatientProfileService';
import { formatDateTime } from '../../Utility/Date';



const MyAppointment = () => {

  const user = useSelector((state:any) => state.user);
  console.log("User in MyAppointment:", user); // Debugging line to check the user object
  const [appointments, setAppointments] = useState<any[]>([]);


  useEffect(() => {
    getAppointmentsByPatientId(user.profileId).then((response) => {
      console.log("Fetched appointments:", response); 
      const sortedAppointments = response.sort(
        (a: any, b: any) =>
          new Date(b.appointmentDate).getTime() -
          new Date(a.appointmentDate).getTime()
      );
      setAppointments(sortedAppointments);
    }).catch((error) => {
      console.error('Error fetching appointments:', error);
    });
  }, []);



    const card = (app:any) => {
        return (
                
        <div className='p-3 rounded-xl border mb-3 shadow-md justify-between bg-violet-100 border-l-4 flex border-violet-500'>
           
         
               <div>
                    <div className='font-medium'>{app.doctorName}</div>
                    <div className='text-sm text-gray-600'>{app.notes}</div>

               </div>
               <div className='flex flex-col items-end'>
                    <div className='text-sm text-gray-600'>{formatDateTime(app.appointmentDate)}</div>
                    <div className='text-sm text-gray-600'>{app.reason}</div>
                    <Badge color={app.status === 'SCHEDULED' ? 'green' : app.status === 'COMPLETED' ? 'yellow' : 'red'} variant="filled">
                        {app.status}
                    </Badge>
               </div>


         
            
        </div>
        )
    }
    
  return (
    <div className="p-3 border rounded-xl shadow-xl flex flex-col gap-3 bg-violet-100">
        <div className="text-lg font-bold">My Appointments</div>
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

export default MyAppointment

  