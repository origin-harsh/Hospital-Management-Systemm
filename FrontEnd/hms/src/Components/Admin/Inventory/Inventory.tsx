import React, { use, useEffect, useState } from 'react'
import { ActionIcon, Badge, Button, CheckIcon, Fieldset, Group, MultiSelect, NumberInput, Select, SelectProps, Textarea, TextInput } from '@mantine/core';
import { allDosageFrequencies, symptoms, tests } from '../../../Data/DropDownData';
import { IconCheck, IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { completedAppointment, createAppointmentReport, getPrescriptionByPatientId, getRecordByPatientId, isReportExist } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { set } from 'react-hook-form';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { data, useNavigate } from 'react-router-dom';
import { formatDate } from '../../Utility/Date';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { addMedicine, getAllMedicines, getMedicine, updateMedicine } from '../../../Service/MedicineService';
import { capatilizedFristLetter } from '../../Utility/OtherUtility';
import { DateInput } from '@mantine/dates';
import { addStock, getAllStocks, updateStock } from '../../../Service/Inventory';
import { Tag } from 'primereact/tag';
import { spawn } from 'child_process';


const Inventory = () => {
  const [loading, setLoading] = React.useState(false);
  const [data,setdata] = useState<any[]>([]);
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
      id: null,
      medicineId: "",
      batchNo: "",
      quantity: 0,
      expiryDate: "",

    },
    validate: {
        medicineId: (value:string) => (!value ? 'Medicine is required' : null),
        batchNo: (value:string) => (!value ? 'Batch number is required' : null),
        quantity: (value:number) => (value <= 0 ? 'Quantity must be greater than zero' : null),
        expiryDate: (value:string) => (!value ? 'Expiry date is required' : null),

    },
  });
  
    useEffect(()=>{
        getAllMedicines()
        .then((res)=>{
        setMedicine(res);  
        setMedicineMap(res.reduce((acc:any, item: any) => {
          acc[item.id] = item;
          return acc;
        }, {}));
          console.log("All Medicine Data:", res);
        })
        .catch((err)=>{ console.error("Failed to Fetch All Medicine Data", err)});
        
      fetchData();

      },[]);

      const fetchData = () =>{
         getAllStocks()
        .then((res)=>{
          setdata(res); 
          console.log("All Stock Data:", res);
        })
        .catch((err)=>{ console.error("Failed to Fetch All Stock Data", err)});
      }
    
  const handleSubmit = (values: any) => {

    console.log("Form Values:", values);
    let update = false;
    let method;
    if(values.id){
      update = true;
      method = updateStock;
    }else{
      method = addStock;
    }
    setLoading(true);
    method(values)
    .then((_value) => {
      successNotification("Stock " + (update ? "updated" : "added") + " successfully");
      form.reset();
      setEdit(false);
      fetchData();
    })
    .catch((error) => {
      errorNotification(error.response.data.errorMessage || "Failed to " + (update ? "update" : "add") + " stock");
      console.error("Error " + (update ? "updating" : "adding") + " stock:", error);
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
          medicineId: ""+rowData.medicineId,
          batchNo: rowData.batchNo,
          quantity: rowData.quantity,
          expiryDate: new Date(rowData.expiryDate), 
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
    //  const statusBodyTemplate = (rowData: any) => {
    //     return <Tag value={rowData.stockStatus} severity={getSeverity(rowData.stockStatus)} />;
    // };
      const statusBodyTemplate = (rowData: any) => {
      const isExpired = new Date(rowData.expiryDate) < new Date();
        return <Badge color={isExpired ? 'red' : 'green'} >{isExpired ? 'Expired' : 'Active'}</Badge>;
    };
  const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 items-center justify-between">
               
                   <Button leftSection={<IconPlus />} variant='filled' onClick={()=>{setEdit(true)}} >Add Stock</Button>
            
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
    // const getMedicineName = (medicineId: number) => {
    //   const med = medicine.find((item: any) => item.id === medicineId);
    //   return med ? med.name : "Unknown";
    // };

    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }:any) => (

      <Group flex="1" gap="xs">
      <div className='flex gap-5 items-center'>

        {option.label}
        {option?.manufacturer && <span style={{marginLeft: 'auto', fontSize: '0.8rem', color: 'gray'}} >{option.manufacturer}</span>}
      </div>  
        {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
      </Group>
   

    );
    

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
                    header="Medicine"
                    body={(rowData) => <span> {""+medicineMap[rowData.medicineId]?.name} <span className='text-xs text-gray-700 border-2 border-dotted'>{""+medicineMap[rowData.medicineId]?.manufacturer}</span> </span>}
                  />
                                  
                 <Column
                  
                  field="batchNo"
                  header="Batch No"
                 
                />
                
                <Column
                  field= "expiryDate"
                  header="Expiry Date"
                />
                  <Column
                  field="initialQuantity"
                  header="Initial Quantity"
                />
                <Column
                  field="quantity"
                  header="Quantity"
                />
                 <Column
                          field="status"
                          header="Status"
                          sortable
                          style={{ minWidth: '12rem' }}
                          body={statusBodyTemplate}
                          filter
                  />
                {/* <Column
                  field= "unitprice"
                  header="Unit Price (₹)"
                  sortable
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
             <Select  searchable renderOption={renderSelectOption} {...form.getInputProps('medicineId')} label="Medicine" placeholder="Select medicine" data={medicine.map((item: any) => ({...item,value: ""+item.id, label: item.name}))} withAsterisk />
            <TextInput {...form.getInputProps('batchNo')} label="Batch No" placeholder="Enter batch number" />
            <NumberInput min={0} clampBehavior='strict' {...form.getInputProps('quantity')} label="Quantity" placeholder="Enter quantity" withAsterisk />
            <DateInput {...form.getInputProps('expiryDate')} label="Expiry Date" placeholder="Select expiry date" withAsterisk />
          </Fieldset>
      </div>
          <div className='flex items-center justify-center gap-5'>
            <Button loading={loading} type='submit' className='w-full' variant='filled' >{form.values.id ? "Update" : "Add"} Stock</Button>
            <Button  variant='filled' onClick={cancel} color='red'>Cancel</Button>
          </div>
    

    </form>}
    </div> 
  )
}

export default Inventory;  

//    private Long id;
//     private Long medicineId;
//     private String batchNo;
//     private Integer quantity;
//     private LocalDate expiryDate;
//     private LocalDate addedDate;
//     private Integer initialQuantity;
//     private StockStatus stockStatus;