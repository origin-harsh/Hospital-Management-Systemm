import React, { useEffect, useState } from 'react'
import { getAllPatients } from '../../../Service/PatientProfileService';
import { Card, Image, Text, Badge, Button, Group, Avatar, em } from '@mantine/core';
import {bloodGroup as bg} from '../../../Data/DropDownData';

const PatientCard = ({ name, email, phone, id, address, dob, gender, bloodGroup}:any) => {
   
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


    <Badge color="green" variant="light" mt={5}>
      {gender || "N/A"}
    </Badge>
  </div>

  {/* Patient Details */}
  <div className="mt-6 space-y-3">

    <div className="flex justify-between border-b pb-2">
      <Text fw={600}>📞 Phone</Text>
      <Text>{phone || "N/A"}</Text>
    </div>

    <div className="flex justify-between border-b pb-2">
      <Text fw={600}>📧 Email</Text>
      <Text>{email || "N/A"}</Text>
    </div>

    <div className="flex justify-between border-b pb-2">
      <Text fw={600}>🩸 Blood Group</Text>
      <Text>{bloodGroup != null ? bg[bloodGroup] : "N/A"}</Text>
    </div>

    <div className="flex justify-between border-b pb-2">
      <Text fw={600}>🎂 Age</Text>
      <Text>{dob ? `${dobtoAge(dob)} Years` : "N/A"}</Text>
    </div>

    <div className="border-b pb-2">
      <Text fw={600}>📍 Address</Text>
      <Text size="sm" c="dimmed">
        {address || "N/A"}
      </Text>
    </div>

  </div>

  {/* <Button color="blue" fullWidth mt="xl">
    View Details
  </Button> */}
</Card>
            
    
  )
}

export default PatientCard




 {/* {patients.map((patient: any) => {
            return (
                <Card key={patient.id} shadow="sm" padding="lg" withBorder>
                <Card.Section className='flex items-center justify-center mt-4'>
                    <div className='py-3 items-center justify-center flex mt-2'>
                    <Avatar variant='filled' src="/avatar.png" size='xl' alt="it's me" />
                    </div>
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{patient.name}</Text>
                    <Badge color="pink">{patient.gender}</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                    Age: {dobtoAge(patient.dob)}
                </Text>

                <Button color="blue" fullWidth mt="md">
                    View Details
                </Button>
                </Card>
            );
            })} */}
