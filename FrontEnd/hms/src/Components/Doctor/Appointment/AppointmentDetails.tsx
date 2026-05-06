import { Anchor, Breadcrumbs, Text, Title } from '@mantine/core';
import { get } from 'http';
import React, { useEffect, useState } from 'react'
import { data, Link, useParams } from 'react-router';
import { getApointmentDetails } from '../../../Service/AppointmentService';
import { Card, Group, Badge, Divider,Tabs } from "@mantine/core";
import { IconUser, IconPhone, IconMail, IconCalendar, IconPhoto, IconMessageCircle, IconSettings, IconHistory, IconMessageReport, IconReport, IconVaccine } from "@tabler/icons-react";
import { formatDateTime } from '../../Utility/Date';
import ApReport from './ApReport';
import Prescription from './Prescription';

const AppointmentDetails = () => {
    const { id } = useParams();
    const [appointment, setAppointment] = useState<any>({});
    useEffect(() => {
        getApointmentDetails(id)
        .then((data) => {
            setAppointment(data);
            console.log("Fetched appointment details:", data);
        })
        .catch((error) => {
            console.error("Error fetching appointment details:", error);
        });
    },[id]);

  return (
    <div>
        <Breadcrumbs>
         <Link className='text-primary-600 hover:underline' to="/doctor/dashboard">Dashboard</Link>
         <Link className='text-primary-600 hover:underline' to="/doctor/appointments">Appointment</Link>
         <Text > Details</Text>

        </Breadcrumbs>
    
    <Card shadow="lg" radius="xl" padding="lg" mt="sm" withBorder>
      
   
      <Group justify="space-between" mb="sm">
         <Group gap="xs">
        <IconUser size={16} />
        <Title order={2}>{appointment.patientName}</Title>
        </Group>


        <Badge
          size="lg"
          color={
            appointment.status === "CANCELLED"
              ? "red"
              : appointment.status === "COMPLETED"
              ? "green"
              : "blue"
          }
          variant="light"
        >
          {appointment.status}
        </Badge>
      </Group>

      <Divider mb="md" />

     <div className='grid grid-cols-2 gap-5'>
        <Group gap="xs">
        <IconMail size={16} />
        <Text size="sm" c="dimmed">{appointment.patientEmail}</Text>
       </Group>
       <Group gap="xs">
        <IconPhone size={16} />
        <Text size="sm">{appointment.patientPhone}</Text>
      </Group>

     </div> 

      <Divider my="sm" />

    <div className='grid grid-cols-2 gap-5 mb-2'>
      <Text size="sm">
        <b>Reason:</b> {appointment.reason}
      </Text>
   
      <Group gap="xs">
        <IconCalendar size={16} />
        <Text size="sm">
          {formatDateTime(appointment.appointmentDate).toLocaleString()}
        </Text>
      </Group>
      </div>

      <Divider my="sm" />
   <Text size="sm" mt="xs">
        <b>Notes:</b> {appointment.notes}
      </Text>
    </Card>
    <Tabs variant='pills' defaultValue="medical" my="md">
      <Tabs.List>
        <Tabs.Tab value="medical"  leftSection={<IconHistory size={18} />}>
          Medical History
        </Tabs.Tab>
        <Tabs.Tab value="prescription" leftSection={<IconVaccine size={18} />}>
          Prescription
        </Tabs.Tab>
        <Tabs.Tab value="report" leftSection={<IconReport size={18} />}>
          Report
        </Tabs.Tab>
      </Tabs.List>
     <Divider my="md" />
      <Tabs.Panel value="medical">
       Hii
      </Tabs.Panel>

      <Tabs.Panel value="prescription">
        {appointment?.patientId && (
          <Prescription appointment={appointment} />
        )}
      </Tabs.Panel>

      <Tabs.Panel value="report">
       {appointment?.patientId && (
          <ApReport appointment={appointment} />
        )}
        
      </Tabs.Panel>
    </Tabs>
    </div>
  )
}

export default AppointmentDetails