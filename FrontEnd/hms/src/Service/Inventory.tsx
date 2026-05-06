import AxoisInstance from "../Interceptor/AxoisInterceptor"

const addStock = async(data:any)=>{
    return AxoisInstance.post('/pharmacy/inventory/add', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getStock = async(id:any)=>{
    return AxoisInstance.get('/pharmacy/inventory/get/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const updateStock = async(data:any)=>{
    return AxoisInstance.put('/pharmacy/inventory/update', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getAllStocks = async()=>{
    return AxoisInstance.get('/pharmacy/inventory/getAll')
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}


export {addStock, getStock, updateStock, getAllStocks};