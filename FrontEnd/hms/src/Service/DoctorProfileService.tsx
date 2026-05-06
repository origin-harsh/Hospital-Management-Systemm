import AxoisInstance from "../Interceptor/AxoisInterceptor"


const getdoctor= async(id:any)=>{
    return AxoisInstance.get('/profile/doctor/get/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const updatedoctor= async(doctor:any)=>{    
    return AxoisInstance.put('/profile/doctor/update', doctor)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error}); 
}
const getDoctorsDropdown = async()=>{
    return AxoisInstance.get('/profile/doctor/dropdown')
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

export {getdoctor, updatedoctor, getDoctorsDropdown}
