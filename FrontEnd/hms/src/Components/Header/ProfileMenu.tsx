import { Menu, Button, Text,Avatar } from '@mantine/core';
import { useSelection } from '@mantine/hooks';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { removeUser } from '../../Slice/userSlice';
import { removeJwt } from '../../Slice/JwtSlice';
import { Link } from 'react-router-dom';
const ProfileMenu = ()=> {
  const user = useSelector((state:any)=>state.user);
   const handleLogout = ()=>{
      console.log("Logging out...");
      dispatch(removeJwt());
      dispatch(removeUser());
  
    }
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
       <div className='flex items-center gap-3 cursor-pointer'>
        <span className='font-medium text-lg text-neutral-900'>{user.name}</span>
            {user.role == 'PATIENT' && <Avatar variant='filled' src="/patient.png" size={45} alt="it's me" />}
            {user.role == 'DOCTOR' && <Avatar variant='filled' src="/Doctor.png" size={45} alt="it's me" />}
            {user.role == 'ADMIN' && <Avatar variant='filled' src="/Admin.png" size={45} alt="it's me" />}
       </div>
      </Menu.Target>

      <Menu.Dropdown>

        
        <Menu.Item> {user?<Button size='xs' color='red' onClick={handleLogout}>Logout</Button>:  <Link to="/login"><Button>Login</Button></Link>}</Menu.Item>
      
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
