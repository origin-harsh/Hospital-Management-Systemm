import React, { useEffect, useState } from 'react'
import { getAllPatients } from '../../../Service/PatientProfileService';
import { Card, Image, Text, Badge, Button, Group, Avatar, em } from '@mantine/core';
import {bloodGroup as bg} from '../../../Data/DropDownData';
import { IconClock, IconEmergencyBed, IconNotebook, IconProgress, IconUser } from '@tabler/icons-react';
import { formatDateTime } from '../../Utility/Date';
import { Tag } from 'primereact/tag';

const ApCard = ({id, doctorName, doctorId, appointmentTime, reason, status, notes}:any) => {
   
    const getSeverity = (status: string) => {
        switch (status) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';

            default:
                return null;
        }
    };


  return (
    
   
  <div className='p-4 rounded-xl border shadow-md bg-primary-50 border-primary-500 flex flex-col gap-2 cursor-pointer hover:shadow-lg hover:shadow-primary-500 transition-shadow duration-300 space-y-2'>
  
  <div className="flex text-sm items-center border-b gap-2">
      <IconUser size={24} className='text-primary-500 rounded-full bg-primary-500 text-white'/>
        <div>
              {`Dr. ${doctorName}`}
        
        </div>
    </div>
     <div className="flex text-sm items-center border-b gap-2">
     <IconNotebook size={24} className='text-primary-500 rounded-full bg-primary-500 text-white'/>
        <div>
              {`Note: ${notes}`}
        </div>
    </div>
     <div className="flex text-sm items-center border-b gap-2">
      <IconEmergencyBed size={24} className='text-primary-500 rounded-full bg-primary-500 text-white'/>
        <div>
              {`Reason: ${reason}`}
        </div>
    </div>
     <div className="flex text-sm items-center border-b gap-2">
      <IconClock size={24} className='text-primary-500 rounded-full bg-primary-500 text-white'/>
        <div>
              {`Date: ${formatDateTime(appointmentTime)}`}
        </div>
    </div>
    <div className="flex text-sm items-center border-b gap-2">
      <IconProgress size={24} className='text-primary-500 rounded-full bg-primary-500 text-white'/>
       <Tag value={status} severity={getSeverity(status)} />

    </div>
</div>
 

            
    
  )
}

export default ApCard




 