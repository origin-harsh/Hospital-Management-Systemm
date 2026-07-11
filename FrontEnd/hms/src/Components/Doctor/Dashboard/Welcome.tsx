import React from 'react'
import { useSelector } from 'react-redux';

const Welcome = () => {
    const user = useSelector((state: any) => state.user);
  return (
    <div className='p-3 rounded-xl border mb-3 shadow-md justify-between bg-violet-100 border-l-4 flex border-violet-500'>
        <div className='flex flex-col items-center justify-between '>
            <div>Welcome Back</div>
            <div className='text-4xl font-bold text-blue-500'>Dr. {user?.name}!</div>
        </div>
    
            <div className="flex gap-5">
            <div className="p-3 rounded-xl border mb-3 shadow-md bg-orange-100 border-l-4 flex flex-col border-violet-500">
                <div className="font-medium">Appointments</div>
                <div className="font-semibold">120+</div>
            </div>
            <div className="p-3 rounded-xl border mb-3 shadow-md justify-between bg-orange-100 border-l-4 flex flex-col border-violet-500">
                <div className="font-medium">Patients</div>
                <div className="font-semibold">100+</div>
            </div>
            </div>
      
    </div>
  )
}

export default Welcome