import React from 'react'

import { IconAdjustments, IconBellRinging, IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react'
import { ActionIcon, Button } from "@mantine/core";
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeJwt } from '../../Slice/JwtSlice';
import { removeUser } from '../../Slice/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  const jwt = useSelector((state:any)=>state.jwt);
  const handleLogout = ()=>{
    console.log("Logging out...");
    dispatch(removeJwt());
    dispatch(removeUser());

  }
  return (
    <div className='bg-light shadow-lg w-full h-16 flex justify-between px-5 items-center'>
         <ActionIcon variant="transparent" size="lg" aria-label='Settings'>
            <IconLayoutSidebarLeftCollapseFilled style={{width:'90%', height:'90%'}} stroke={1.5} />
        </ActionIcon>
        <div className='flex items-center gap-5'>
         {jwt?<Button color='red' onClick={handleLogout}>Logout</Button>:  <Link to="/login"><Button>Login</Button></Link>}
        {jwt &&<><ActionIcon variant="transparent" size="md" aria-label='Settings'>
            <IconBellRinging style={{width:'90%', height:'90%'}} stroke={2} />
        </ActionIcon>
        <ProfileMenu /></>}
        </div>
        
    </div>
  )
}

export default Header