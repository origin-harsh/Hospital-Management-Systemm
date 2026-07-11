import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="p-4 rounded-xl border shadow-md bg-violet-100 border-l-4 border-violet-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      {/* Welcome Section */}
      <div className="flex flex-col text-center md:text-left">
        <div className="text-gray-600 text-sm md:text-base">
          Welcome Back
        </div>

        <div className="text-2xl md:text-4xl font-bold text-blue-500 break-words">
          Mr. {user?.name}!
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center md:justify-end">
        <div className="p-4 rounded-xl border shadow-md bg-orange-100 border-l-4 border-orange-500 min-w-[130px] text-center">
          <div className="font-medium text-gray-700">Doctors</div>
          <div className="text-2xl font-bold text-orange-600">100+</div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;