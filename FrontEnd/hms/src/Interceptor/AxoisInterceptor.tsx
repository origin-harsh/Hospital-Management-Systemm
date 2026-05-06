import axios, { InternalAxiosRequestConfig } from 'axios';

const AxoisInstance = axios.create({
    baseURL: 'http://localhost:9000',
    
})
AxoisInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if(token && config.headers){
        config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers.set("X-Secret-Key", "SECRET");
    // console.log("Interceptor",config);
    return config;
})
export default AxoisInstance;