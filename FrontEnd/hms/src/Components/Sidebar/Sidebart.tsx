import React from 'react';
import { IconCalendarClock, IconFaceMask, IconHeartHandshake, IconLayoutDashboardFilled, IconStethoscope, IconVaccine } from '@tabler/icons-react';
import { Avatar, Text} from '@mantine/core';
import { NavLink } from "react-router-dom";

const links = [
    {name: 'Dashboard', url: '/dashboard', icon: <IconLayoutDashboardFilled stroke={1.5}/>},
    {name: 'Doctors', url: '/doctors', icon: <IconStethoscope  stroke={1.5}/>},
    {name: 'Patients', url: '/patients', icon: <IconFaceMask  stroke={1.5}/>},
    {name: 'Appointments', url: '/appointments', icon: <IconCalendarClock  stroke={1.5}/>},
    {name:"Pharmacy", url:'/pharmacy', icon:<IconVaccine  stroke={1.5}/>}
   ]

const Sidebart = () => {
  return (
    <div className='w-64 bg-cyan-100 flex flex-col items-center gap-10 pt-8'>
        <div className='text-red-500 flex gap-1 items-center'>
            <IconHeartHandshake size={40} stroke={2.5}/>
            <span className='font-heading font-semibold text-3xl'>HospAIx</span>
        </div>
       
        
        <div  className='flex flex-col gap-1 items-center'>
            <div className='p-1 bg-white rounded-full shadow-xl'>
               <Avatar variant='filled' src="avatar.png" size='xl' alt="it's me" />
            </div>
            <span className='font-medium'>Harsheet</span>
         <Text c="dimmed" size='xs'>Admin</Text>
        </div>
       
        <div className="flex flex-col gap-1">
            {links.map((link) => {
              return (
                <NavLink
                  to={link.url}
                  key={link.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full font-medium text-neutral-900 px-5 py-3 rounded-lg
                     ${isActive ? "bg-primary-400" : "hover:bg-gray-100"}`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
        </div>

    </div>
  )
}

export default Sidebart