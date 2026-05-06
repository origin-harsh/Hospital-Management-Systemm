
import AxoisInstance from "../Interceptor/AxoisInterceptor"


const getPatient = async(id: any)=>{
    return AxoisInstance.get('/profile/patient/get/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const updatePatient = async(patient:any)=>{    
    return AxoisInstance.put('/profile/patient/update', patient)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error}); 
}

export {getPatient, updatePatient}

