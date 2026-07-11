import React, { use, useEffect, useState } from 'react'
import { ActionIcon, Badge, Button, Card, CheckIcon, Divider, Fieldset, Group, LoadingOverlay, Modal, MultiSelect, NumberInput, Select, SelectProps, Textarea, TextInput, Title } from '@mantine/core';
import { Text } from "@mantine/core";
import { allDosageFrequencies, frqMap, symptoms, tests } from '../../../Data/DropDownData';
import { IconCheck, IconEdit, IconEye, IconNotes, IconPill, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { completedAppointment, createAppointmentReport, getAllPrescription, getMedicineByPrescriptionId, getPrescriptionByPatientId, getRecordByPatientId, isReportExist } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { set } from 'react-hook-form';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { data, useNavigate } from 'react-router-dom';
import { formatDate, formatDateTime } from '../../Utility/Date';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { addMedicine, getAllMedicines, getMedicine, updateMedicine } from '../../../Service/MedicineService';
import { capatilizedFristLetter } from '../../Utility/OtherUtility';
import { DateInput } from '@mantine/dates';
import { addStock, getAllStocks, updateStock } from '../../../Service/Inventory';
import { Tag } from 'primereact/tag';
import { spawn } from 'child_process';
import { addSale, getAllSales, getSaleItems } from '../../../Service/SaleService';

import { FileTextIcon, GaugeIcon, HouseIcon, MagnifyingGlassIcon, TrashIcon } from '@phosphor-icons/react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useDisclosure } from '@mantine/hooks';
import { spotlight, Spotlight, SpotlightActionData } from '@mantine/spotlight';


 interface SaleItem{
    medicineId: string;
    quantity: number;
 }


const Sales = () => {
  const [loading, setLoading] = React.useState(false);
  const [data,setdata] = useState<any[]>([]);
  const [edit, setEdit] = useState<Boolean>(false);
  const [medicine, setMedicine] = useState<any>([]);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const [opened, {open, close }] = useDisclosure(false);
  const [saleItems, setSaleItems] = useState<any[]>([]);
  const [actions, setActions] = useState<SpotlightActionData[]>([]);
   const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
      const [filters, setFilters] = useState<DataTableFilterMeta>({global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      doctorName: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },});


  const form = useForm({
    initialValues: {
      buyerName: '',
      buyerContact: '',
      saleItems: [] as SaleItem[],


    },
    validate: {
        buyerName: (value:string) => (!value ? 'Buyer name is required' : null),
        buyerContact: (value:string) => (!value ? 'Buyer contact is required' : null),
      
        saleItems:{
            medicineId: (value:string) => (!value ? 'Medicine is required' : null),
            quantity: (value:number) => (value <= 0 ? 'Quantity must be greater than zero' : null),
        }
        


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
        //prescription


        getAllPrescription()
        .then((res)=>{
          console.log("P------>",res)
          setActions(res.map((item:any)=>({
            id: String(item.id),
            label: item.patientName,
            description: `Prescrition by Dr. ${item.doctorName} on ${formatDate(item.prescriptionDate)}`,
             onClick: () => handleImport(item),
          })));
        }).catch((err)=>{console.log("Error in Prescription Of sale", err)});
        


      fetchData();
      // addMore();

      },[]);

      
  

      const handleImport = (item:any)=>{
          
            setLoading(true);
            getMedicineByPrescriptionId(item.id)
            .then((res)=>{
               form.setValues({
                buyerName: item.patientName,
                saleItems: res.map((x:any)=>({medicineId: String(x.medicineId) ,quantity: countFrq(x.frequency, x.duration)}))
               })
              setSaleItems(res)
              console.log("Medicine of Import",res);

            }).catch((err)=> console.log("Error Ocuure in HandleImport",err))
            .finally(()=>{
              setLoading(false);
            })
}

const countFrq = (frq:any,duration:any)=>{
   return frqMap[frq] * duration;

}


       //   const actions: SpotlightActionData[] = [
          //   {
          //     id: 'home',
          //     label: 'Home',
          //     description: 'Get to home page',
          //     onClick: () => console.log('Home'),
          //     leftSection: <HouseIcon size={24} />,
          //   }
          // ];

      const fetchData = () =>{
         getAllSales()
        .then((res)=>{
          setdata(res); 
          console.log("All Sale Data:", res);
        })
        .catch((err)=>{ console.error("Failed to Fetch All Sale Data", err)});
      }
    const handleDetails = (rowData: any) => {
        open();
        // setLoading(true);
        getSaleItems(rowData.id)
        .then((res)=>{
        setSaleItems(res);
        console.log("Sale Items Data:", res);
        })
        .catch((err)=>{ console.error("Failed to Fetch Sale Items Data", err)})
        .finally(()=>{
          setLoading(false);
        });

    }
  const handleSubmit = (values: any) => {

    console.log("Form Values:", values);
    let update = false;
    let flag = false;
    values.saleItems.forEach((item:any,index:number)=>{
      if(item.quantity > medicineMap[item.medicineId]?.stock || 0) {
        flag = true;
        form.setFieldError(`saleItems.${index}.quantity`, "Quantity Not Present");
        
      }
    })
    if(flag){
      errorNotification("Quantity Not Present")
      return;
    }
    const saleItems = values.saleItems.map((x: any)=>({unitprice: medicineMap[x.medicineId]?.unitprice, ...x}));
    const totalAmount = saleItems.reduce((acc: number, item: any) => acc + (item.unitprice * item.quantity), 0);
    // console.log("abhi wala",values.saleItems.map((x: any)=>({unitprice: medicineMap[x.medicineId]?.unitprice, ...x})));
    setLoading(true);
    addSale({...values,saleItems, totalAmount})
    .then((_value) => {
      successNotification("Medicine sold successfully");
      form.reset();
      setEdit(false);
      fetchData();
    })
    .catch((error) => {
      errorNotification(error.response.data.errorMessage || "Failed to  sold medicine");
      console.error("Error selling medicine:", error);
    }).finally(() => {
      setLoading(false);
    });

    
  } 
  const cancel = () => {  
    form.reset();
    setEdit(false);
  }

         
            
  // const onEdit = (rowData: any) => {
  //    setEdit(true);
  //     form.setValues({
  //       ...rowData,
  //         medicineId: ""+rowData.medicineId,
  //         batchNo: rowData.batchNo,
  //         quantity: rowData.quantity,
  //         expiryDate: new Date(rowData.expiryDate), 
  //     });
  // }
    

  
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
               
                   <Button variant='filled' onClick={()=>{setEdit(true)}} >Sell Medicine</Button>
            
                    <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              
            </div>
        );
    };
   

    const addMore=()=>{ 
        form.insertListItem('saleItems', { medicineId: '', quantity: 0 });
    
    }

    const handleSpotlight = () => {
      spotlight.open();
    }

     const actionBodyTemplate = (rowData: any) => {
            return <div className='flex gap-2'>
                
                    <ActionIcon onClick={()=>handleDetails(rowData)}>
                        <IconEye size={18} stroke={1.5}/>
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
        {option?.manufacturer && <span style={{marginLeft: 'auto', fontSize: '0.8rem', color: 'gray'}} >{option.manufacturer} - {option?.dosage }</span>}
      </div>  
        {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
      </Group>
   

    );
    

  return (
    <div>
      {!edit ? <DataTable
                stripedRows
                removableSort
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
                    header="Buyer Name"
                    body={(rowData) => rowData.buyerName}
                  />
                                  
                 <Column
                  
                  field="buyerContact"
                  header="Buyer Contact"
                 
                />
                
                <Column
                  field= "saleDate"
                  header="Sale Date"
                  sortable
                   body={(rowData)=>formatDateTime(rowData.saleDate)}
                />
                <Column
                  field="totalAmount"
                  header="Total Amount"
                  sortable
                  body={(rowData) => `₹ ${rowData.totalAmount}`}
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
   
    :<div>
      <div className='mb-5 flex flex-wrap gap-2 items-center justify-between'>
          <h3 className='text-xl text-primary-500 font-medium'>Sell Medicine</h3>
          <Button variant='filled' leftSection={<IconPlus />} onClick={handleSpotlight}>Import Prescription</Button>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)} className='grid gap-5'>
      <LoadingOverlay visible={loading} />
       <Fieldset className='grid gap-5' legend={<span className='text-lg font-medium text-primary-700'>Buyer information</span>} radius="md">
       <div className='grid grid-cols-2 gap-5'>
            <TextInput  {...form.getInputProps('buyerName')} label="Buyer Name" placeholder="Enter buyer name" withAsterisk />
            <NumberInput maxLength={10}  {...form.getInputProps('buyerContact')} label="Buyer Contact" placeholder="Enter buyer contact" withAsterisk />
       </div>
       </Fieldset>
    
          <Fieldset className='grid gap-5' legend={<span className='text-lg font-medium text-primary-700'>Billing information</span>} radius="md">
            <div className='grid grid-cols-5 gap-4'>
                {
                    form.values.saleItems.map((item, index) => (
                           <React.Fragment key={index}>
                                <div className='col-span-2'>
                                    <Select  searchable renderOption={renderSelectOption} {...form.getInputProps(`saleItems.${index}.medicineId`)} label="Medicine" placeholder="Select medicine" data={medicine.filter((x :any) => !form.values.saleItems.some((item1, idx) => item1.medicineId === x.id && idx !== index)).map((item: any) => ({...item,value: ""+item.id, label: item.name}))} withAsterisk />
                                </div>
                                <div className='col-span-2'>
                                    <NumberInput rightSectionWidth={80} min={0} max={medicineMap[item.medicineId]?.stock || 0} clampBehavior='strict' rightSection={<div className='text-xs text-white flex gap-1 bg-red-400 p-1 rounded-sm'>Stock: {medicineMap[item.medicineId]?.stock}</div>} {...form.getInputProps(`saleItems.${index}.quantity`)} label="Quantity" placeholder="Enter quantity" withAsterisk />
                                </div>
                                <div className='flex items-end justify-center gap-2'>
                                    {(item.quantity && item.medicineId) ? <div>Total: {item.quantity} X {medicineMap[item.medicineId]?.unitprice} = {item.quantity * medicineMap[item.medicineId]?.unitprice}</div>: <div></div>}
                                     <ActionIcon size="lg" color="red" onClick={() => form.removeListItem('saleItems', index)}>
                                            <TrashIcon size={20} />
                                    </ActionIcon>
                                </div>
                            </React.Fragment>
                    ))
                }
             
            </div>  
            <div className='flex items-center justify-center'>
                <Button onClick={addMore}  variant='outline' leftSection={<IconPlus size={16}/>}>Add More</Button>
            </div>
            </Fieldset>
       
  
          <div className='flex items-center justify-center gap-5'>
            <Button loading={loading} type='submit' className='w-full' variant='filled' >Sell Medicine</Button>
            <Button  variant='filled' onClick={cancel} color='red'>Cancel</Button>
          </div>
    

    </form></div>}
     <Modal opened={opened} size="auto" onClose={close} title="Sold Medicine" centered>
            <div className="grid gap-4 grid-cols-2">
                {saleItems.map((sale: any) => (
                <Card key={sale.id}  shadow="md" radius="xl" padding="sm" withBorder>
      
                
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <IconPill size={18} />
                      <Title fw={600} size="lg">{medicineMap[sale.medicineId]?.name} - {medicineMap[sale.medicineId]?.dosage} (<span className="text-gray-500">{medicineMap[sale.medicineId]?.manufacturer}</span>) </Title>
                    </Group>

                    <Badge color="blue" variant="light">
                       {sale.batchNo}
                    </Badge>
                  </Group>

                  <Divider my="sm" />

                  {/* Dosage & Frequency */}
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">
                      <b>Unit Price:</b>₹ {sale.unitPrice}
                    </Text>
                     <Text size="sm">
                      <b>Quantity:</b> {sale.quantity} 
                    </Text>

                    <Text size="sm">
                      <b>Total:</b> {sale.quantity * sale.unitPrice}
                    </Text>
                  </Group>

                </Card>
                ))}
            </div>
            {
              saleItems.length === 0 && (
                <Text size="sm" c="dimmed" className='text-center'>No sale items found.</Text>
              )
            }
          </Modal>

          <Spotlight
            actions={actions}
            nothingFound="Nothing found..."
            highlightQuery
            searchProps={{
              leftSection: <MagnifyingGlassIcon size={20} />,
              placeholder: 'Search...',
        }}
      />
    </div> 
  )
}

export default Sales;  

