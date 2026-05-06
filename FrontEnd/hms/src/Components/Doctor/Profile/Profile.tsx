import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { IconEdit } from '@tabler/icons-react'
import { DateInput } from '@mantine/dates';
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import {doctorDepartments, doctorSpecializations, gender} from '../../../Data/DropDownData'
import { useDisclosure } from '@mantine/hooks'
import { spawn } from 'child_process'
import { getdoctor, updatedoctor } from '../../../Service/DoctorProfileService'
import { formatDate } from '../../Utility/Date'
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil'


const Profile = () => {
    const user = useSelector((state:any)=>state.user);
    const [opened, {open, close}] = useDisclosure(false);
    const doctor: any = {
      name: "John Doe",
      email: "john.doe@example.com",
      dob: "1990-05-15",
      gender: "Male",
      phone: "91 9876543210",
      address: "123, Main Street, Mumbai, India",
      licenseNo: "MED-IND-458792",
      specialization: "Cardiologist",
      department: "Cardiology",
      totalExp: "10"
    };
 const [editMode, setEditMode] = useState(false);
 const [phone, setPhone] = useState(doctor.phone);
 const [profile, setProfile] = useState<any>({});
useEffect(() => {
  getdoctor(user.profileId)
    .then((data) => {
      setProfile({...data});
    })
    .catch((error) => {
      console.error("Error fetching doctor profile:", error);
    });
}, []);
    const form = useForm({
  
    initialValues: {
      dob: "",
      phone: "",
      address: "",
      licenseNo: "",
      specialization: "",
      department: "",
      totalExp: ""

    },

    validate: {
      dob: (value: any) => !value ? 'Date of Birth is required' : undefined,
      phone: (value: any) => !value ? 'Phone number is required' : undefined,
      address: (value: any) => !value ? 'Address is required' : undefined,
      licenseNo: (value: any) => !value ? 'License number is required' : undefined
    },
  });
  const handleEdit = () =>{
    form.setValues({...profile, dob: profile.dob ? new Date(profile.dob) : undefined});
    setEditMode(true);
  }
  const handleSubmit = (e: any) => {
    let values = form.getValues();
    form.validate();
    console.log("FORM VALUES:", values);
    if(!form.isValid()){
      return;
      
    };
    updatedoctor({...profile, ...values}).then((data)=>{
      successNotification("Doctor profile updated successfully");
      
      setProfile({...profile, ...data});
      setEditMode(false);
    }).catch((error)=>{
      errorNotification(error.response.data.errorMassage || "Failed to fetch doctor profile");
      console.error("Error updating Doctor profile:", error);
    });
   
  }
  return (
    <div className='p-10'>
        <div className='flex justify-between items-center mb-5'>
            <div className='flex gap-5 items-center'>
              <div className='flex flex-col items-center gap-3'>
                 <Avatar className='border-4 border-dashed border-gray-500' variant='filled' src="/Doctor.png" size={150} alt="it's me" />
                 {editMode && <Button size="sm" onClick={open} variant='filled'>Upload</Button>}
              </div>
               
                <div className='flex flex-col gap-2'>
                    <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
                    <div className="text-xl text-neutral-700">{user.email}</div>
                </div>
            </div>
            {!editMode?<Button size="lg" onClick={handleEdit} variant='filled' leftSection={<IconEdit />}>
               Edit
            </Button>:
            <Button size="lg" onClick={handleSubmit} variant='filled'>
               Submit
            </Button>}
        </div>
        <Divider my="xl" />
        <div>
            <div className='text-2xl font-medium text-neutral-900'>Personal Information</div>
             <Table striped  withRowBorders>
        <Table.Tbody>

  
    
             <Table.Tr>
            <Table.Td fw={600}>Date of Birth</Table.Td>
            {editMode ? <Table.Td><DateInput {...form.getInputProps("dob")} placeholder='Date of Birth' /></Table.Td>:
            <Table.Td>{formatDate(profile.dob)??'-'}</Table.Td>}
          </Table.Tr>
          
    
          <Table.Tr>
          <Table.Td fw={600}>Phone</Table.Td>

          {editMode ? (
            <Table.Td>
              <PhoneInput
                country={"in"}
                value={form.values.phone}
                onChange={(value) => form.setFieldValue("phone", value)}
                enableSearch={true}
                inputStyle={{ width: "100%" }}
              />
            </Table.Td>
          ) : (
            <Table.Td>{profile.phone ?? "-"}</Table.Td>
)}

          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>Address</Table.Td>
            {editMode ? <Table.Td><TextInput {...form.getInputProps("address")} placeholder='Enter Address'/></Table.Td>:
            <Table.Td>{profile.address??'-'}</Table.Td>}
          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>License No</Table.Td>
            {editMode ? <Table.Td><NumberInput {...form.getInputProps("licenseNo")} maxLength={12} placeholder='Enter License No'/></Table.Td>:
            <Table.Td>{profile.licenseNo??'-'}</Table.Td>}
          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>Specialization</Table.Td>
            {editMode ? <Table.Td><Select  {...form.getInputProps("specialization")} placeholder='Select Specialization' data={doctorSpecializations} /></Table.Td>:
            <Table.Td>{profile.specialization??'-'}</Table.Td>}
          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>Department</Table.Td>
            {editMode ? <Table.Td><Select  {...form.getInputProps("department")} placeholder='Select Department' data={doctorDepartments} /></Table.Td>:
            <Table.Td>{profile.department??'-'}</Table.Td>}
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Gender</Table.Td>
            {editMode ? <Table.Td><Select  {...form.getInputProps("gender")} placeholder='Select Gender' data={gender} /></Table.Td>:
            <Table.Td>{profile.gender??'-'}</Table.Td>}
          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>Total Experience</Table.Td>
            {editMode ? <Table.Td><NumberInput {...form.getInputProps("totalExp")} max={50} placeholder='Enter Experience Years'/></Table.Td>:
            <Table.Td>{profile.totalExp??'-'}</Table.Td>}
          </Table.Tr>
    
        </Table.Tbody>
        </Table>
      
        </div>
           <Modal centered opened={opened} onClose={close} title={<span className='text-xl font-medium'>Upload Profile Picture</span>}>
        
      </Modal>
    </div>
  )
}

export default Profile