import AxoisInstance from "../Interceptor/AxoisInterceptor"

const addSale = async(data:any)=>{
    return AxoisInstance.post('/pharmacy/sales/add', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getSale = async(id:any)=>{
    return AxoisInstance.get('/pharmacy/sales/getById/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getSaleItems = async(id:any)=>{
    return AxoisInstance.get('/pharmacy/sales/getSaleItems/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const updateSale = async(data:any)=>{
    return AxoisInstance.put('/pharmacy/sales/update', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getAllSales = async()=>{
    return AxoisInstance.get('/pharmacy/sales/getAll')
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}


export {addSale, getSale, updateSale, getAllSales, getSaleItems};