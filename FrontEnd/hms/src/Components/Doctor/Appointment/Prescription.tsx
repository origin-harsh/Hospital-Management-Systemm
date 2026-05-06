import { ActionIcon, Button, TextInput, Modal } from '@mantine/core';
import { IconEye, IconMedicineSyrup, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import Header from '../../Header/Header';
import { getPrescriptionByPatientId } from '../../../Service/AppointmentService';
import { formatDate } from '../../Utility/Date';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import MedicineCard from './MedicineCard';

const Prescription = ({appointment}:any) => {

    const [data,setdata] = useState<any[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [medicines, setMedicines] = useState<any[]>([]);
    const navigate = useNavigate();
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [filters, setFilters] = useState<DataTableFilterMeta>({global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doctorName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },});


  useEffect(() => {
 
    
    getPrescriptionByPatientId(appointment.patientId)
      .then((res) => {
        console.log("Prescription Data:", res);
        setdata(res);
      })
      .catch((err) => {
        console.error(err);
      });
  
   }, []);


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
            <div className="flex flex-wrap gap-2 items-center justify-end">
               
            
                    <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              
            </div>
        );
    };

    const handleMedicine =(medicines:any[])=>{
        open();
        setMedicines(medicines);
    }

     const actionBodyTemplate = (rowData: any) => {
            return <div className='flex gap-2'>
                
                    <ActionIcon onClick={()=>navigate("/doctor/appointments/" + rowData.appointmentId)}>
                        <IconEye size={18} stroke={1.5}/>
                    </ActionIcon>
                     <ActionIcon color='teal' onClick={()=>handleMedicine(rowData.medicines)} >
                        <IconMedicineSyrup size={18} stroke={1.5}/>
                    </ActionIcon>
            </div>
        }
    const header=renderHeader();

    
  return (
    <div>
        <DataTable
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
                  
                  field="prescriptionDate"
                  header="Prescription Date"
                  sortable
                  body={(rowData)=>formatDate(rowData.prescriptionDate)}
                />
                
                
                <Column
                  field="medicines"
                  header="Medicines"
                  body={(rowData)=>rowData.medicines?.length??0}
                />
                
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
                  style={{ minWidth: '14rem' }}
                />
              
        
                <Column
                  headerStyle={{ width: '5rem', textAlign: 'center' }}
                  bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                  body={actionBodyTemplate}
                />
        
              </DataTable>
      <Modal opened={opened} size="auto" onClose={close} title="Medicine" centered>
        <div className="grid gap-4 grid-cols-2">
            {medicines.map((med: any) => (
            <MedicineCard key={med.id} medicine={med} />
            ))}
        </div>
      </Modal>
    </div>
  )
}

export default Prescription;