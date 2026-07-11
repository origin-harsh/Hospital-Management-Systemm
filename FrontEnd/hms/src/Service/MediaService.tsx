import AxoisInstance from "../Interceptor/AxoisInterceptor"


const uploadMedia= async(media:any)=>{
    const formData = new FormData();
    formData.append('file', media);
    
    return AxoisInstance.post('/media/upload', formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const getMedia= async(id:any)=>{
    return AxoisInstance.get('/media/get/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error}); 
}

export {uploadMedia, getMedia}