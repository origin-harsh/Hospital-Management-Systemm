import React from 'react'
import { AreaChart } from '@mantine/charts';
import { data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';



const TopCard = () => {

    const getSum = (data:any[], key:string) => {
        return data.reduce((acc, item) => acc + item[key], 0);
    }
    


    const card = (name: string,id: string, color: string, bg: string, icon: React.ReactNode, data:any[]) => {
        return (
                
        <div className='${bg}-violet-100 rounded-xl'>
            <div className='flex justify-between items-center p-5 gap-5'>
                 <ThemeIcon size="xl" className="!shadow-xl" radius="md" color={color}>
                    {icon}
                </ThemeIcon>
                <div className='flex flex-col font-bold items-end'>
                    <div>{name}</div>
                    <div className='text-lg'>{getSum(data, id)}</div>

                </div>

            </div>
            <AreaChart
                h={100}
                data={data}
                dataKey="date"
                series={[
                    { name: id, color: color },
                  
                ]}
                curveType="bump"
                tickLine="none"
                gridAxis="none"
                withXAxis={false}
                withYAxis={false}
                withDots={false}
            />
        </div>
        )
    }
    const cards=[
        {
        name: "Appointments",
        id: "appointments",
        color: "indigo",
        bg: "indigo",
        icon: <ImageIcon size={32} weight="duotone" />,
        data: data
        },
        {
        name: "Patients",
        id: "patients",
        color: "yellow",
        bg: "yellow",
        icon: <IconUser size={32} />,
        data: patientData
        },
        {
        name: "Doctors",
        id: "doctors",
        color: "teal",
        bg: "teal",
        icon: <IconStethoscope size={32} />,
        data: doctorData
        }
    ]
  return (
    <div className="grid grid-cols-3 gap-5">
        {cards.map((cardData) => (
            
                card(cardData.name, cardData.id, cardData.color, cardData.bg, cardData.icon, cardData.data)
         
        ))}
    </div>
  )
}

export default TopCard

  