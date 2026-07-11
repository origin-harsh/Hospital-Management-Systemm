import React, { use, useEffect, useState } from 'react'
import { ActionIcon, Button, Fieldset, Group, MultiSelect, NumberInput, Select, SelectProps, Textarea, TextInput } from '@mantine/core';
import { allDosageFrequencies, medicineTypes, symptoms, tests } from '../../../Data/DropDownData';
import { IconCheck, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { completedAppointment, createAppointmentReport, getPrescriptionByPatientId, getRecordByPatientId, isReportExist } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { set } from 'react-hook-form';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { data, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Utility/Date';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { getAllMedicines } from '../../../Service/MedicineService';

type Medicine = {
  name: string;
  medicineId?: string|number|undefined;
  dosage: string;
  frequency: string;
  duration: number;
  route: string;
  type: string;
  instructions: string;
  prescriptionId?: number;
}

const ApReport = ({appointment}: any) => {
  const [loading, setLoading] = React.useState(false);
  const [appointments,setAppointments] = useState<any[]>(appointment);
  const [data,setdata] = useState<any[]>([]);
  const [allowAdd, setAllowAdd] = useState<Boolean>(false);
  const [edit, setEdit] = useState<Boolean>(false);
  const [medicine, setMedicine] = useState<any>([]);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});
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
          // route: (value: any) => (value?.trim() !== '' ? null : 'Route is required'),
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
          medicines: values.prescription.medicines.map((med: Medicine) => ({
              ...med,
              medicineId: med.medicineId === "OTHER" ? undefined : med.medicineId
          })),
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
     const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }:any) => (
    
          <Group flex="1" gap="xs">
          <div className='flex gap-5 items-center'>
    
            {option.label}
            {option?.manufacturer && <span style={{marginLeft: 'auto', fontSize: '0.8rem', color: 'gray'}} >{option.manufacturer} - {option?.dosage }</span>}
          </div>  
            {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
          </Group>
       
    
        );

        const handleChangeMed = (value:any,index:number)=>{
          // console.log("Medicine Changed at index:", index);
          // console.log("Selected Medicine ID:", value);
            console.log("Selected Medicine ID:", value);
            if(value && value !== "OTHER"){
              const med = medicineMap[value];
              console.table("Selected Medicine:", med);
                form.setFieldValue(`prescription.medicines.${index}.medicineId`, value);
                form.setFieldValue(`prescription.medicines.${index}.name`, med.name);
                form.setFieldValue(`prescription.medicines.${index}.dosage`, med?.dosage);
                form.setFieldValue(`prescription.medicines.${index}.type`, med?.type);
                form.setFieldValue(`prescription.medicines.${index}.instructions`, med?.instructions);
              }
              else{
                console.log("Medicine not found in medicineMap for ID:", value);
                form.setFieldValue(`prescription.medicines.${index}.medicineId`, "OTHER");
                form.setFieldValue(`prescription.medicines.${index}.name`, "");
                form.setFieldValue(`prescription.medicines.${index}.dosage`, "");
                form.setFieldValue(`prescription.medicines.${index}.type`, "");
              }
            
        }

        useEffect(()=>{
          //fatch medicine data
         getAllMedicines()
                .then((res)=>{
                setMedicine(res);  
                console.table("All Medicine Data:", res);
                setMedicineMap(res.reduce((acc:any, item: any) => {
                  acc[item.id] = item;
                  return acc;
                }, {}));
                  console.log("All Medicine Data:", res);
                })
                .catch((err)=>{ console.error("Failed to Fetch All Medicine Data", err)});
              },[]);

    // useEffect(() => {
    //     const firstMedicineId = form.values.prescription.medicines[0]?.medicineId;
    //     console.log("Medicines:", firstMedicineId ? medicineMap[firstMedicineId] : undefined);
    //   }, [form.values.prescription.medicines]);

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
            form.values.prescription.medicines.map((med: Medicine, index: number) => 
          
          (<Fieldset key={index} legend={ <div className='flex items-center gap-5'>
              <h1 className='text-lg font-medium' >Medicine {index + 1}</h1>
              <ActionIcon onClick={() => removeMedicine(index)} variant="filled" color="red" size="md" className='mb-2'>
                <IconTrash  size={18} />
               </ActionIcon>
            </div>} className='grid grid-cols-2 col-span-2  gap-4'>
            <Select  searchable renderOption={renderSelectOption}
             {...form.getInputProps(`prescription.medicines.${index}.medicineId`)} label="Medicine" placeholder="Select medicine"
             onChange={(value) => {
              handleChangeMed(value, index);
            }}
             data={[...medicine.filter((x :any) => !form.values.prescription.medicines.some((item1, idx) => Number(item1.medicineId) === x.id && idx !== index)).map((item: any) => ({...item,value: ""+item.id, label: item.name})),{lable:"Other" , value: "OTHER"}]} withAsterisk />
             
              
            {med.medicineId === "OTHER" && <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)}  label="Medicine" placeholder="Enter medicine" withAsterisk/>}
            <TextInput disabled={med.medicineId !== "OTHER"} {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk />
            <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label="Frequency" placeholder="Select frequency" data={allDosageFrequencies} />
            <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label="Duration (days)" placeholder="Enter duration" withAsterisk />
            {/* <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route" placeholder="Select route" data={["Oral", "Intravenous", "Topical", "Inhalation"]} /> */}
            <Select disabled={med.medicineId !== "OTHER"} {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select type" data={medicineTypes} />
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