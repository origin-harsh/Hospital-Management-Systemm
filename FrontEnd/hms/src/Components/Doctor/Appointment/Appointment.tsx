
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox';
import { ActionIcon, Divider, LoadingOverlay, Modal, SegmentedControl, Select, Textarea, TextInput } from '@mantine/core';
import { IconCheck, IconEdit, IconEye, IconLayoutGrid, IconPlus, IconSearch, IconTable, IconTrash } from '@tabler/icons-react';
import { Button,Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getDoctorsDropdown } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReason } from '../../../Data/DropDownData';
import { useSelector } from 'react-redux';
import { cancelAppointment, getAppointmentsByDoctorId, getAppointmentsByPatientId, scheduleAppointment } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { set } from 'react-hook-form';
import { get } from 'http';
import { error } from 'console';
import { formatDate, formatDateTime } from '../../Utility/Date';
import { modals } from '@mantine/modals';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from 'react-router-dom';
import ApCard from './ApCard';



interface Representative {
  name: string;
  image: string;
}

interface Country {
    name: string;
    code: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  patientName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  'country.name': {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  balance: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};

   
const Appointment=() => {
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();
    const [filters, setFilters] = useState<DataTableFilterMeta>({global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  patientName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
   reason: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
   notes: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  status: { value: null, matchMode: FilterMatchMode.IN },
});
    const [loading, setLoading] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<any>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [opened, { open, close }] = useDisclosure(false);
    const user = useSelector((state:any)=>state.user);
    const [Doctors, setDoctors] = useState<any>([]);
    const [editMode, setEditMode] = useState(false);
    const [tab, setTab] = useState<string>('Today');
    const [view, setView] = useState("table");
  

   
    const getSeverity = (status: string) => {
        switch (status) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';

            default:
                return null;
        }
    };

        useEffect(() => {



       fetchData();


        getDoctorsDropdown()
          .then((data) => {
            console.log("Doctors Dropdown Data:", data);
            setDoctors(data.map((doctor:any)=>({ label: doctor.name, value: ""+doctor.id })));
          })
          .catch((err) => {
            console.error(err);
          });

      }, []);


      const fetchData =()=>{
        getAppointmentsByDoctorId(user.profileId)
        .then((data) => {
          console.log("Appointments Data:", data);
        setAppointments(data);

        })
        .catch((err) => {
          console.error(err);
        });
      }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters: any = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 items-center justify-between">
               
                <Button leftSection={<IconPlus />} variant='filled' onClick={open}>Schedule Appointment</Button>
            
                    <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              
            </div>
        );
    };

 

   

  




    const dateBodyTemplate = (rowData: any) => {
        return <span>{formatDateTime(rowData.appointmentDate)}</span>;
    };
    const handleDelete = (rowData: any) => {
    modals.openConfirmModal({
    title: <span className="text-red-500 font-semibold">
        Are you sure?
        </span>,
        centered: true,
    children: (
      <Text size="sm">
        Do you really want to cancel this appointment? This process cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => {
        cancelAppointment(rowData.id).then(()=>{
            successNotification("Appointment cancelled successfully!");
            setAppointments(appointments.map((appointment:any)=> appointment.id === rowData.id ? { ...appointment, status: 'CANCELLED' } : appointment));

        }).catch((error)=>{
            errorNotification(error.response.data.errorMessage || "Failed to cancel appointment. Please try again.");
            console.error("Error cancelling appointment:", error);
        });
    },
  });
};



    const actionBodyTemplate = (rowData: Customer) => {
        return <div className='flex gap-2'>
            
                <ActionIcon onClick={()=>navigate("" + rowData.id)}>
                    <IconEye size={18} stroke={1.5}/>
                </ActionIcon>
          
            <ActionIcon color='red' onClick={()=>(handleDelete(rowData))}>
                <IconTrash size={18} stroke={1.5}/>
            </ActionIcon>
        </div>
    }

 
    const statusBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };


    const statusItemTemplate = (option: string) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

 

  

    const form = useForm({
    initialValues: {
      doctorId: '',
      patientId: user.profileId,
      appointmentDate: null,
      reason: '',
      notes: '',
    },

    validate: {
        doctorId: (value:any) => !value ? 'Doctor is required' : undefined,    
        appointmentDate: (value:any) => !value ? 'Appointment date and time is required' : undefined,
        reason: (value:any) => !value ? 'Reason for appointment is required' : undefined,
        notes: (value:any) => !value ? 'Additional notes are required' : undefined,
    },
  });

    const header = renderHeader();

    // const handleSubmit = (values: any) => {
    //     setLoading(true);
    //       const payload = {
    //     ...values,
    //     doctorId: Number(values.doctorId), 
    //     appointmentDate: new Date(values.appointmentDate) 
    // };
    //     console.log("Form Values:", payload);
    //     scheduleAppointment(payload)
    //     .then((data) => {
    //         close();
    //         form.reset();
    //         fetchData();
    //         successNotification("Appointment scheduled successfully! Your Id: " + data);
    //     })
    //     .catch((error) => {
    //         errorNotification(error.response.data.errorMessage || "Failed to schedule appointment. Please try again.");
    //         console.error("Error scheduling appointment:", error);
    //     }
    //     ).finally(() => setLoading(false));
    // }  

     const leftToolbarTemplate = () => {
        return <div></div>
    };

   const rightToolbarTemplate = () => {
        return <div className="flex items-center gap-5"> 
        <SegmentedControl
            value={view}
            color='primary'
            onChange={setView}
            data={[
              { label: <IconTable/>, value: 'table' },
              { label: <IconLayoutGrid/>, value: 'card' }
            ]}
          />

        <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /></div>
    };
    const centerToolbarTemplate = () => {
        return (
            <SegmentedControl
            value={tab}
            onChange={setTab}
            variant="filled"
            color='primary'
            data={["Today", "Upcoming", "Past"]}
            />
        );
    }

    const filteredAppointments = appointments.filter((appointment:any)=>{
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      if(tab === 'Today'){
        return appointmentDate.toDateString() === today.toDateString();
      }else if(tab === 'Upcoming'){
        return appointmentDate > today;
      }else if(tab === 'Past'){
        return appointmentDate < today;
      }
      return true;
    })

    return (
       
    <div className="card">
      <Toolbar className="mb-4" start={centerToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
      {view === "table" ? <DataTable
        stripedRows
        value={filteredAppointments}
        size="small"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedCustomers}
        onSelectionChange={(e) => {
          const customers = e.value as Customer[];
          setSelectedCustomers(customers);
        }}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          'patientName',
          'appointmentDate',
          'reason',
          'status'
        ]}
        emptyMessage="No appointments found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
   
        
        <Column
          field="patientName"
          header="Patient"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: '14rem' }}
        />
          <Column
          field="patientPhone"
          header="Patient Phone"
          sortable
          style={{ minWidth: '14rem' }}
        />
         <Column
          
          field="appointmentDate"
          header="Appointment Time"
          sortable
          body={dateBodyTemplate}
          style={{ minWidth: '14rem' }}
        />
        
        
        <Column
          
          field="reason"
          header="Reason"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: '14rem' }}
        />
        
         <Column
          field="status"
          header="Status"
          sortable
          style={{ minWidth: '12rem' }}
          body={statusBodyTemplate}
          filter
        />
        <Column
          field="notes"
          header="Notes"
          sortable
          style={{ minWidth: '14rem' }}
        />
      

        <Column
          headerStyle={{ width: '5rem', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          body={actionBodyTemplate}
        />

      </DataTable> :<div className='grid grid-cols-4 gap-5'>
        {filteredAppointments.length === 0 ? <div className='col-span-4 text-center text-gray-500'>No appointments found.</div>:

        filteredAppointments?.map((appointment:any)=>(
          <ApCard key={appointment.id} {...appointment}/>
        ))
        }
      </div>}
      {/* <Modal opened={opened} size="lg" onClose={close} title={
        <div className='text-xl font-semibold text-primary-500'>Schedule Appointment</div>} centered> 
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} /> 
        <form onSubmit={form.onSubmit(handleSubmit)} className='grid grid-col-1 gap-5'> 
            <Select {...form.getInputProps('doctorId')} withAsterisk data={Doctors} label="Doctor" placeholder='Select Doctor'/>
             <DateTimePicker minDate={new Date()} {...form.getInputProps('appointmentDate')} withAsterisk label="Appointment Date & Time" placeholder='Select Date & Time' /> 
             <Select {...form.getInputProps('reason')} withAsterisk label="Reason for Appointment" placeholder='Enter Reason for Appointment' data={appointmentReason} />
              <Textarea {...form.getInputProps('notes')} withAsterisk label="Additional Notes" placeholder='Enter Additional Notes' mt="md" style={{ width: '100%' }} />
               <Button type="submit" mt="md" variant='filled' fullWidth>Schedule</Button> </form> </Modal> */}
    </div>
 
    );
}
export default Appointment;        