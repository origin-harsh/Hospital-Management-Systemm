import React from 'react';
import { IconCalendarClock, IconFaceMask, IconHeartHandshake, IconLayoutDashboardFilled, IconStethoscope, IconUser, IconVaccine } from '@tabler/icons-react';
import { Avatar, Text} from '@mantine/core';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const links = [
    {name: 'Profile', url: '/patient/profile', icon: <IconUser stroke={1.5}/>},
    {name: 'Appointments', url: '/patient/appointments', icon: <IconCalendarClock  stroke={1.5}/>},
    {name:"Pharmacy", url:'/patient/pharmacy', icon:<IconVaccine  stroke={1.5}/>}
   ]

const Sidebart = () => {
  const user = useSelector((state:any)=>state.user);
 

  return ( 
     <div className='flex'>
      <div className='w-64'>

      </div>
    <div className='w-64 fixed bg-dark hidden-scroll flex flex-col items-center gap-10 h-screen overflow-y-auto'>
        <div className='fixed z-[500] bg-dark text-primary-400 flex gap-1 items-center py-3'>
            <IconHeartHandshake size={40} stroke={2.5}/>
            <span className='font-heading font-semibold text-3xl'>HospAIx</span>
        </div>
       
        <div className='flex flex-col gap-5 mt-20'>
        <div  className='flex flex-col gap-1 items-center'>
            <div className='p-1 bg-white rounded-full shadow-xl'>
               <Avatar variant='filled' src="/patient.png" size='xl' alt="it's me" />
            </div>
            <span className='font-medium text-light'>{user.name}</span>
         <Text c="dimmed" size='xs'>{user.role}</Text>
        </div>
       
        <div className="flex flex-col gap-1">
            {links.map((link) => {
              return (
                <NavLink
                  to={link.url}
                  key={link.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full font-medium text-light px-5 py-4 rounded-lg
                     ${isActive ? "bg-primary-400 text-dark" : "hover:bg-gray-100 hover:text-dark"}`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
        </div>

    </div>
    </div>
    </div>
  )
}

export default Sidebart