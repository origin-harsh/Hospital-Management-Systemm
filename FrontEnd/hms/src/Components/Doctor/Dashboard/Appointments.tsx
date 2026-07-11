import React from 'react'
import { AreaChart } from '@mantine/charts';
import { data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';




const Appointments = () => {

    
  return (
    <div className="bg-violet-100 p-3 border rounded-xl shadow-xl border-violet-500">
      <div>
         <div className="font-bold">Appointments</div>
        
      </div>
            <AreaChart
                h={100}
                data={data}
                dataKey="date"
                series={[
                    { name: "appointments", color: "violet" },
                  
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

export default Appointments

  