import React, { use, useEffect, useState } from 'react'
import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { allDosageFrequencies, symptoms, tests } from '../../../Data/DropDownData';
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { completedAppointment, createAppointmentReport, getPrescriptionByPatientId, getRecordByPatientId, isReportExist } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { set } from 'react-hook-form';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { data, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Utility/Date';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { addMedicine, getAllMedicines, updateMedicine } from '../../../Service/MedicineService';
import { capatilizedFristLetter } from '../../Utility/OtherUtility';

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

const Medicine = () => {
  const [loading, setLoading] = React.useState(false);
  const [appointments,setAppointments] = useState<any[]>([]);
  const [data,setdata] = useState<any[]>([]);
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
      id: null,
      name: '',
      dosage: '',
      category: '',
      type: '',
      manufacturer: '',
      unitprice: 0,

    },
    validate: {
        name: (value:any) => (value ? null : 'Medicine name is required'),
        dosage: (value:any) => (value ? null : 'Dosage is required'),
        category: (value:any) => (value ? null : 'Category is required'),
        type: (value:any) => (value ? null : 'Type is required'),
        manufacturer: (value:any) => (value ? null : 'Manufacturer is required'),
        unitprice: (value:any) => (value ? null : 'Unit price is required'),
    },
  });
  
    useEffect(()=>{
        
      fetchData();

      },[]);

      const fetchData = () =>{
         getAllMedicines()
        .then((res)=>{
          console.log("All Medicine Data:", res);
          setdata(res);
        })
        .catch((err)=>{ console.error("Failed to Fetch All Medicine Data", err)});
      }
    
  const handleSubmit = (values: any) => {

    console.log("Form Values:", values);
    let update = false;
    let method;
    if(values.id){
      update = true;
      method = updateMedicine;
    }else{
      method = addMedicine;
    }
    setLoading(true);
    method(values)
    .then((_value) => {
      successNotification("Medicine " + (update ? "updated" : "added") + " successfully");
      form.reset();
      setEdit(false);
      fetchData();
    })
    .catch((error) => {
      errorNotification(error.response.data.errorMessage || "Failed to " + (update ? "update" : "add") + " medicine");
      console.error("Error " + (update ? "updating" : "adding") + " medicine:", error);
    }).finally(() => {
      setLoading(false);
    });

    
  } 
  const cancel = () => {  
    form.reset();
    setEdit(false);
  }
  
  const onEdit = (rowData: any) => {
     setEdit(true);
      form.setValues({
        ...rowData,
        name: rowData.name,
        dosage: rowData.dosage,
        category: rowData.category,
        type: rowData.type,
        manufacturer: rowData.manufacturer,
        unitprice: rowData.unitprice,
        stock: rowData.stock
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
               
                   <Button leftSection={<IconPlus />} variant='filled' onClick={()=>{setEdit(true)}} >Add Medicine</Button>
            
                    <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              
            </div>
        );
    };

     const actionBodyTemplate = (rowData: any) => {
            return <div className='flex gap-2'>
                
                    <ActionIcon onClick={()=>onEdit(rowData)}>
                        <IconEdit size={18} stroke={1.5}/>
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
                  'name',
                  'dosage',
                  'category',
                ]}
                emptyMessage="No medicines found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              >
           
                
                <Column
                  field="name"
                  header="Medicine Name"
                />
                 <Column
                  
                  field="dosage"
                  header="Dosage"
                  // body={(rowData)=>formatDate(rowData.createdAt)}
                />
                
                <Column
                  field= "type"
                  header="Type"
                  body={(rowData)=>capatilizedFristLetter(rowData.type)}
                />
                <Column
                  field="category"
                  header="Category"
                  body={(rowData)=>capatilizedFristLetter(rowData.category)}
                />
                     <Column
                  field="manufacturer"
                  header="Manufacturer"
                />
                <Column
                  field="stock"
                  header="Stock"
                />
                <Column
                  field= "unitprice"
                  header="Unit Price (₹)"
                  sortable
                />

           
                
                 {/* <Column
                  field="status"
                  header="Status"
                  sortable
                  style={{ minWidth: '12rem' }}
                  body={statusBodyTemplate}
                  filter
                /> */}
                {/* <Column
                  field="notes"
                  header="Notes"
               
                /> */}
              
        
                {/* <Column
                  headerStyle={{ width: '5rem', textAlign: 'center' }}
                  bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                  body={actionBodyTemplate}
                /> */}

                <Column
                          headerStyle={{ textAlign: 'center' }}
                          bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                          body={actionBodyTemplate}
                        />
        
              </DataTable>
   
    :<form onSubmit={form.onSubmit(handleSubmit)} className='grid gap-5'>
      <div >
          <Fieldset className='grid grid-cols-2 gap-4' legend={<span className='text-lg font-medium text-primary-700'>Medicine information</span>} radius="md">
            <TextInput {...form.getInputProps('name')} label="Medicine" placeholder="Enter medicine name" withAsterisk/>
            <TextInput {...form.getInputProps('dosage')} label="Dosage" placeholder="Enter dosage 50mg, 100mg etc." />
            <Select {...form.getInputProps('category')} label="Category" placeholder="Select category" data={["ANALGESIC","ANTIBIOTIC","ANTIVIRAL","ANTIFUNGAL","ANTIPYRETIC","ANTACID","ANTISEPTIC","VITAMIN","SUPPLEMENT","HORMONE","VACCINE"]} withAsterisk />
            <Select {...form.getInputProps('type')} label="Type" placeholder="Select type" data={["TABLET", "CAPSULE", "SYRUP", "INJECTION", "OINTMENT", "DROPS", "INHALER"]} withAsterisk />
            <TextInput {...form.getInputProps('manufacturer')} label="Manufacturer" placeholder="Enter manufacturer name" withAsterisk />
            <NumberInput min={0} clampBehavior='strict' {...form.getInputProps('unitprice')} label="Unit Price" placeholder="Enter unit price" withAsterisk />
          </Fieldset>
      </div>
          <div className='flex items-center justify-center gap-5'>
            <Button loading={loading} type='submit' className='w-full' variant='filled' >{form.values.id ? "Update" : "Add"} Medicine</Button>
            <Button  variant='filled' onClick={cancel} color='red'>Cancel</Button>
          </div>
    

    </form>}
    </div> 
  )
}

export default Medicine;  

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