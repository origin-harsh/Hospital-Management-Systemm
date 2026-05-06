
import AxoisInstance from "../Interceptor/AxoisInterceptor"


const registerUser = async(user:any)=>{
    return AxoisInstance.post('/users/register',user)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const loginUser = async(user:any)=>{
    return AxoisInstance.post('/users/login',user)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

export {registerUser, loginUser} 