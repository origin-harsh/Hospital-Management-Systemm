import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { IconEdit } from '@tabler/icons-react'
import { DateInput } from '@mantine/dates';
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import {bloodGroups, bloodGroup, gender} from '../../../Data/DropDownData'
import { useDisclosure } from '@mantine/hooks'
import { spawn } from 'child_process'
import { get } from 'http'
import { getPatient, updatePatient } from '../../../Service/PatientProfileService'
import { formatDate } from '../../Utility/Date'
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil'
import { arrayToCSV } from '../../Utility/OtherUtility'


const Profile = () => {
    const user = useSelector((state:any)=>state.user);
    const [opened, {open, close}] = useDisclosure(false);
    const patient: any = {
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-05-15",
    phone: "+91 9876543210",
    address: "123, Main Street, Mumbai, India",
    aadharNo: "1234-5678-9012",
    bloodGroup: "O+",
    allergies: "Peanuts",
    chronicDisease: "Diabetes",
    profilePicture: "https://randomuser.me/api/portraits/men/76.jpg",
  };
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState(patient.phone);
  const [profile, setProfile] = useState<any>({});
useEffect(() => {
  getPatient(user.profileId)
    .then((data) => {
      setProfile({...data, allergies: data.allergies ? (JSON.parse(data.allergies)) : null, chronicDisease: data.chronicDisease ? (JSON.parse(data.chronicDisease)) : null});
    })
    .catch((error) => {
      console.error("Error fetching patient profile:", error);
    });
}, []);
    const form = useForm({
  
    initialValues: {
      dob: "",
      phone: "",
      address: "",
      aadharNo: "",
      bloodGroup: "",
      allergies: [],
      chronicDisease: []

    },

    validate: {
      dob: (value: any) => !value ? 'Date of Birth is required' : undefined,
      phone: (value: any) => !value ? 'Phone number is required' : undefined,
      address: (value: any) => !value ? 'Address is required' : undefined,
      aadharNo: (value: any) => !value ? 'Aadhar number is required' : undefined
    },
  });
  const handleEdit = () =>{
    form.setValues({...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDisease: profile.chronicDisease ?? [], allergies: profile.allergies ?? []});
    setEditMode(true);
  }
  const handleSubmit = (e: any) => {
    let values = form.getValues();
    form.validate();
    console.log("FORM VALUES:", values);
    if(!form.isValid()){
      return;
      
    };
    updatePatient({...profile, ...values,allergies: values.allergies? JSON.stringify(values.allergies) : null,chronicDisease: values.chronicDisease? JSON.stringify(values.chronicDisease) : null}).then((data)=>{
      successNotification("Patient profile updated successfully");
      
      setProfile({
          ...data,
          allergies: data.allergies ? JSON.parse(data.allergies) : [],
          chronicDisease: data.chronicDisease ? JSON.parse(data.chronicDisease) : []
        });
      setEditMode(false);
    }).catch((error)=>{
      errorNotification(error.response.data.errorMassage || "Failed to fetch patient profile");
      console.error("Error updating patient profile:", error);
    });
   
  }
  return (
    <div className='p-10'>
        <div className='flex justify-between items-center mb-5'>
            <div className='flex gap-5 items-center'>
              <div className='flex flex-col items-center gap-3'>
                 <Avatar className='border-4 border-dashed border-gray-500' variant='filled' src="/patient.png" size={150} alt="it's me" />
                 {editMode && <Button size="sm" onClick={open} variant='filled'>Upload</Button>}
              </div>
               
                <div className='flex flex-col gap-2'>
                    <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
                    <div className="text-xl text-neutral-700">{user.email}</div>
                </div>
            </div>
            {!editMode?<Button size="lg" type='button' onClick={handleEdit} variant='filled' leftSection={<IconEdit />}>
               Edit
            </Button>:
            <Button size="lg" type="submit" onClick={handleSubmit} variant='filled'>
               Submit
            </Button>}
        </div>
        <Divider my="xl" />
        <div>
            <div className='text-2xl font-medium text-neutral-900'>Personal Information</div>
        <Table striped  withRowBorders={false} stripedColor='primary.1' verticalSpacing="md">
        <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
    
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
            <Table.Td fw={600}>Aadhar No</Table.Td>
            {editMode ? <Table.Td><NumberInput {...form.getInputProps("aadharNo")} maxLength={12} clampBehavior='strict' placeholder='Enter Aadhar No'/></Table.Td>:
            <Table.Td>{profile.aadharNo??'-'}</Table.Td>}
          </Table.Tr>
           <Table.Tr>
            <Table.Td fw={600}>Gender</Table.Td>
            {editMode ? <Table.Td><Select  {...form.getInputProps("gender")} placeholder='Select Gender' data={gender} /></Table.Td>:
            <Table.Td>{profile.gender??'-'}</Table.Td>}
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Blood Group</Table.Td>
            {editMode ? <Table.Td><Select {...form.getInputProps("bloodGroup")} placeholder='Select Blood Group' data={bloodGroups} /></Table.Td>:
            <Table.Td>{bloodGroup[profile.bloodGroup] ?? 'Unknown'}</Table.Td>}
          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>Allergies</Table.Td>
            {editMode ? <Table.Td><TagsInput {...form.getInputProps("allergies")} placeholder="Enter allergies separated by commas" /></Table.Td>:
            <Table.Td>{arrayToCSV(profile.allergies) ?? '-'}</Table.Td>}
          </Table.Tr>
    
          <Table.Tr>
            <Table.Td fw={600}>Chronic Diseases</Table.Td>
            {editMode ? <Table.Td><TagsInput {...form.getInputProps("chronicDisease")} placeholder="Enter chronic diseases separated by commas" /></Table.Td>:
            <Table.Td>{arrayToCSV(profile.chronicDisease) ?? '-'}</Table.Td>}
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