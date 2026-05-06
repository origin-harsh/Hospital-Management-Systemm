import React, { use, useEffect, useState } from 'react'
import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { allDosageFrequencies, symptoms, tests } from '../../../Data/DropDownData';
import { IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { completedAppointment, createAppointmentReport, getPrescriptionByPatientId, getRecordByPatientId, isReportExist } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { set } from 'react-hook-form';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { data, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Utility/Date';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

type Medicine = {
  name: string;
  medicineid?: number;
  dosage: string;
  frequency: string;
  duration: number;
  route: string;
  type: string;
  instructions: string;
  prescriptionid?: number;
}

const ApReport = ({appointment}: any) => {
  const [loading, setLoading] = React.useState(false);
  const [appointments,setAppointments] = useState<any[]>(appointment);
  const [data,setdata] = useState<any[]>([]);
  const [allowAdd, setAllowAdd] = useState<Boolean>(false);
  const [edit, setEdit] = useState<Boolean>(false);
  const navigate = useNavigate();
   const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
      const [filters, setFilters] = useState<DataTableFilterMeta>({global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      doctorName: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },});


  const form = useForm({
    initialValues: {
      symptoms: [],
      tests: [],
      diagnosis: '',
      referral: '',
      notes: '',
      prescription:{
        medicines: [] as Medicine[]
      }, 
    },
    validate: {
      symptoms: (value: any) => (value.length > 0 ? null : 'Please select at least one symptom'),
      diagnosis: (value: any) => (value?.trim() !== '' ? null : 'Diagnosis is required'),

      prescription: {
        medicines: {
          name: (value: any) => (value?.trim() !== '' ? null : 'Medicine name is required'),
          dosage: (value: any) => (value?.trim() !== '' ? null : 'Dosage is required'),
          frequency: (value: any) => (value?.trim() !== '' ? null : 'Frequency is required'),
          duration: (value: any) => (value > 0 ? null : 'Duration must be greater than 0'),
          route: (value: any) => (value?.trim() !== '' ? null : 'Route is required'),
          type: (value: any) => (value?.trim() !== '' ? null : 'Type is required'),
          instructions: (value: any) => (value?.trim() !== '' ? null : 'Instructions are required'),
        
          
        }
      }
    },
  });
  
    useEffect(()=>{
        
      fetchData();

      },[appointment?.patientId, appointment.id]);

      const fetchData = () =>{
        getRecordByPatientId(appointment?.patientId)
        .then((res)=>{
          console.log("Record Data:", res);
          setdata(res);
        })
        .catch((err)=>{ console.error("Failed to Fetch Record", err)});
     
        isReportExist(appointment.id)
        .then((res)=>{
            console.log("Resssssss",res)
            setAllowAdd(!res)
        })
        .catch((err)=>{
          console.error("Failed To fetch Record", err);
          setAllowAdd(true);
        });
      }
      
  const insertMedicine = () => {
    form.insertListItem('prescription.medicines', {name: '', dosage: '', frequency: '', duration: 0, route: '', type: '', instructions: ''});
  }
  const removeMedicine = (index: number) => {
    form.removeListItem('prescription.medicines', index);
  }
  const handleSubmit = (values: any) => {

    let data = {
      ...values,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      appointmentId: appointment.id,
      prescription: {
        ...values.prescription,
          doctorId: appointment.doctorId,
          patientId: appointment.patientId,
          appointmentId: appointment.id

      }
    }
    setLoading(true);
    createAppointmentReport(data)
    .then((value) => {
      successNotification("Report created successfully");
      form.reset();
      setEdit(false);
      setAllowAdd(false);
      fetchData();
      console.log("Report created successfully:", value);
    })
    .catch((error) => {
      errorNotification(error.response.data.errorMessage || "Failed to create report");
      console.error("Error creating report:", error);
    }).finally(() => {
      setLoading(false);
    });

    
  } 
    

  
       const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
         let _filters: any = { ...filters };


        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

  const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 items-center justify-between">
               
                   {allowAdd&&<Button leftSection={<IconPlus />} variant='filled' onClick={()=>{setEdit(true)}} >Add Report</Button>}
            
                    <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              
            </div>
        );
    };

     const actionBodyTemplate = (rowData: any) => {
            return <div className='flex gap-2'>
                
                    <ActionIcon onClick={()=>navigate("/doctor/appointments/" + rowData.appointmentId)}>
                        <IconEye size={18} stroke={1.5}/>
                    </ActionIcon>
            </div>
        }
    const header=renderHeader();

    

  return (
    <div>
      {!edit ? <DataTable
                stripedRows
                value={data}
                filters={filters} 
                size="small"
                header={header}
                paginator
                rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
                dataKey="id"
                // selectionMode="checkbox"
                filterDisplay="menu"
                globalFilterFields={[
                  'doctorName',
                  'appointmentDate',
                  'prescriptionDate',
                ]}
                emptyMessage="No appointments found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              >
           
                
                <Column
                  field="doctorName"
                  header="Doctor"
                />
                 <Column
                  
                  field="reportdate"
                  header="Report Date"
                  sortable
                  body={(rowData)=>formatDate(rowData.createdAt)}
                />
                
                
                <Column
                  field="diagnosis"
                  header="Diagnosis"
                />
                {/* <Column
                  field="medicines"
                  header="Medicines"
                  body={(rowData)=>rowData.medicines?.length??0}
                /> */}
                
                 {/* <Column
                  field="status"
                  header="Status"
                  sortable
                  style={{ minWidth: '12rem' }}
                  body={statusBodyTemplate}
                  filter
                /> */}
                <Column
                  field="notes"
                  header="Notes"
               
                />
              
        
                {/* <Column
                  headerStyle={{ width: '5rem', textAlign: 'center' }}
                  bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                  body={actionBodyTemplate}
                /> */}
        
              </DataTable>
   
    :<form onSubmit={form.onSubmit(handleSubmit)} className='grid gap-5'>
      <div >
          <Fieldset className='grid grid-cols-2 gap-4' legend={<span className='text-lg font-medium text-primary-700'>Personal information</span>} radius="md">
           <MultiSelect {...form.getInputProps('symptoms')} withAsterisk label="Symptoms" 
            placeholder="Select symptoms"
            data={symptoms} className='col-span-2'/>
            <MultiSelect {...form.getInputProps('tests')} label="Lab Tests" 
            placeholder="Select lab tests"
            data={tests} className='col-span-2'/>
            <TextInput {...form.getInputProps('diagnosis')} label="Diagnosis" placeholder="Enter diagnosis" withAsterisk/>
            <TextInput {...form.getInputProps('referral')} label="Referral" placeholder="Enter referral"/>
            <Textarea className='col-span-2' {...form.getInputProps('notes')} label="Notes" placeholder="Enter Notes" minRows={4} />
          </Fieldset>
      </div>
          <Fieldset className='grid gap-5' legend={<span className='text-lg font-medium text-primary-700'>Prescription</span>} radius="md">
          {
            form.values.prescription.medicines.map((_medicine: Medicine, index: number) => 
          
          (<Fieldset legend={ <div className='flex items-center gap-5'>
              <h1 className='text-lg font-medium' >Medicine {index + 1}</h1>
              <ActionIcon onClick={() => removeMedicine(index)} variant="filled" color="red" size="md" className='mb-2'>
                <IconTrash  size={18} />
               </ActionIcon>
            </div>} className='grid grid-cols-2 col-span-2  gap-4'>
           
            <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)}  label="Medicine" placeholder="Enter medicine" withAsterisk/>
            <TextInput {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk />
            <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label="Frequency" placeholder="Select frequency" data={allDosageFrequencies} />
            <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label="Duration (days)" placeholder="Enter duration" withAsterisk />
            <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route" placeholder="Select route" data={["Oral", "Intravenous", "Topical", "Inhalation"]} />
            <Select {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select type" data={["Tablet", "Capsule", "Syrop", "Injection"]} />
            <TextInput {...form.getInputProps(`prescription.medicines.${index}.instructions`)} label="Instructions" placeholder="Enter instructions" withAsterisk/>
          </Fieldset>))
          }
           <div className='flex items-center justify-center col-span-2 '>
          <Button onClick={insertMedicine} variant='outline' color='blue' className=''>Add Medicine</Button>
          </div>

          </Fieldset>
          <div className='flex items-center justify-center gap-5'>
            <Button loading={loading} type='submit' className='w-full' variant='filled' color='teal'>Submit Report</Button>
            <Button  variant='filled' color='red'>Cancel</Button>
          </div>
    

    </form>}
    </div> 
  )
}

export default ApReport  

// appointmentId
// : 
// 11
// createdAt
// : 
// "2026-04-07T15:02:33.405034"
// diagnosis
// : 
// "HEllo"
// doctorId
// : 
// 3
// doctorName
// : 
// "HARSH"
// followUpDate
// : 
// null
// id
// : 
// 15
// notes
// : 
// "kk"
// patientId
// : 
// 5
// referral
// : 
// "SRMS"