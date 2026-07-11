import React, { useEffect, useState } from 'react'
import { getAllPatients } from '../../../Service/PatientProfileService';
import { Card, Image, Text, Badge, Button, Group, Avatar, em } from '@mantine/core';
import {bloodGroup as bg} from '../../../Data/DropDownData';

const DoctorCard = ({ name, email, licenseNo, id, address, department, gender, specialization, totalExp}:any) => {
   
const dobtoAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

  return (

   
        <Card shadow="md" radius="lg" padding="xl" withBorder className='hover:bg-primary-100 transition-shadow duration-300 p-6 rounded-lg bg-white'>
            {/* Avatar */}
           <div className="flex justify-between items-center border-b pb-4">
               <div>    <Avatar
                 name={name}
                 color="initials"
                 size={60}
                 radius="50%"
               />
           
               <Text fw={700} size="lg" mt="sm">
                 {name}
               </Text>
               </div>
           
           
               <Badge color="blue" variant="light" mt={5}>
                 {specialization || "N/A"}
               </Badge>
             </div>
           

            {/* Information */}
            <div className="mt-6 space-y-3">
                {/* <div className="flex justify-between border-b pb-2">
                <Text fw={600}>License No.</Text>
                <Text>{licenseNo || "N/A"}</Text>
                </div> */}

                <div className="flex justify-between border-b pb-2">
                <Text fw={600}>Email</Text>
                <Text>{email || "N/A"}</Text>
                </div>

                <div className="flex justify-between border-b pb-2">
                <Text fw={600}>Department</Text>
                <Text>{department || "N/A"}</Text>
                </div>

                {/* <div className="flex justify-between border-b pb-2">
                <Text fw={600}>Gender</Text>
                <Text>{gender || "N/A"}</Text>
                </div> */}

                <div className="flex justify-between border-b pb-2">
                <Text fw={600}>Experience</Text>
                <Text>{totalExp ? `${totalExp} Years` : "N/A"}</Text>
                </div>

                <div className="border-b flex justify-between pb-2">
                <Text fw={600}>Address</Text>
                <Text size="sm" c="dimmed">
                    {address || "N/A"}
                </Text>
                </div>
            </div>

            {/* <Button fullWidth mt="xl">
                View Details
            </Button> */}
            </Card>

  
                
  )
}

export default DoctorCard





// address
// : 
// null
// department
// : 
// null
// dob
// : 
// null
// email
// : 
// "harshhh@gmail.com"
// gender
// : 
// null
// id
// : 
// 1
// licenseNo
// : 
// null
// name
// : 
// "Harshit"
// phone
// : 
// null
// specialization
// : 
// null
// totalExp

