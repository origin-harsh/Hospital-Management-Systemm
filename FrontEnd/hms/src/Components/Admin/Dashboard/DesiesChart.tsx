import React from 'react'
import { diseaseData } from '../../../Data/AdminDashboardData'
import { DonutChart } from '@mantine/charts';

const DesiesChart = () => {
  return (
    <div className='p-5 rounded-xl bg-green-100 shadow-xl flex flex-col gap-5'>
        <div className='text-lg font-bold' >Diseases Chart</div>
        <div className='flex justify-center'> <DonutChart withLabelsLine thickness={25} size={200} paddingAngle={10} labelsType="value" withLabels data={diseaseData} /></div>
    </div>
  )
}

export default DesiesChart