import React from 'react'
import { AreaChart } from '@mantine/charts';
import { data, doctorData, patientData } from '../../../Data/AdminDashboardData';
import { ThemeIcon } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';
import { IconStethoscope, IconUser } from '@tabler/icons-react';




const PatientChart = () => {

    
  return (
    <div className="bg-violet-100 p-3 border rounded-xl shadow-xl border-violet-500">
      <div className="flex justify-between items-center mb-5">
         <div className="font-bold">Patient Chart</div>
      </div>
            <AreaChart
                h={100}
                data={patientData}
                dataKey="date"
                series={[
                    { name: "patients", color: "violet" },
                ]}
                curveType="bump"
                tickLine="none"
                gridAxis="none"
                withXAxis={false}
                withYAxis={false}
                withDots={true}
            />
    </div>
  )
}

export default PatientChart

  