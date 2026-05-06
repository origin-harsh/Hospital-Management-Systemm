import AxoisInstance from "../Interceptor/AxoisInterceptor"

const addMedicine = async(data:any)=>{
    return AxoisInstance.post('/pharmacy/medicines/add', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getMedicine = async(id:any)=>{
    return AxoisInstance.get('/pharmacy/medicines/get/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const updateMedicine = async(data:any)=>{
    return AxoisInstance.put('/pharmacy/medicines/update', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getAllMedicines = async()=>{
    return AxoisInstance.get('/pharmacy/medicines/getAll')
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}


export {addMedicine, getMedicine, updateMedicine, getAllMedicines};