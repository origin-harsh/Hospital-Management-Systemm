import { appointmentReason } from "../Data/DropDownData";
import AxoisInstance from "../Interceptor/AxoisInterceptor"

const scheduleAppointment = async(data:any)=>{
    return AxoisInstance.post('/appointment/schedule', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const cancelAppointment = async(id:any)=>{
    return AxoisInstance.put('/appointment/cancel/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const completedAppointment = async(id:any)=>{
    return AxoisInstance.put('/appointment/completed/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getAppointment = async(id:any)=>{
    return AxoisInstance.get('/appointment/get/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getApointmentDetails = async(id:any)=>{
    return AxoisInstance.get('/appointment/get/details/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getAppointmentsByPatientId = async(id:any)=>{
    return AxoisInstance.get('/appointment/getAllByPatient/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getAppointmentsByDoctorId = async(id:any)=>{
    return AxoisInstance.get('/appointment/getAllByDoctor/' + id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}

const createAppointmentReport = (data:any)=>{
    return AxoisInstance.post('/appointment/record/create', data)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getRecordByPatientId = (patientId:any)=>{
    return AxoisInstance.get('/appointment/record/getRecordByPatientId/' + patientId)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getPrescriptionByPatientId = (patietId:any)=>{
    return AxoisInstance.get('/appointment/record/getPrescriptionByPatientId/' + patietId)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const isReportExist = (appointmentId:any) =>{
    return AxoisInstance.get("/appointment/record/isRecordExist/" + appointmentId)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getAllPrescription = ()=>{
    return AxoisInstance.get("/appointment/record/getAllPrescription")
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
const getMedicineByPrescriptionId = async(Id:any)=>{
    return AxoisInstance.get("/appointment/record/getMedicineByPrescriptionId/" + Id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error});
}
export {scheduleAppointment, cancelAppointment, getAppointment, getApointmentDetails, getAppointmentsByPatientId, getAppointmentsByDoctorId, createAppointmentReport, getRecordByPatientId,getPrescriptionByPatientId,isReportExist,completedAppointment,getAllPrescription,getMedicineByPrescriptionId};