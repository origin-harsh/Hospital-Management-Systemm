const data = [
  { date: 'Jul 2025', appointments: 180 },
  { date: 'Aug 2025', appointments: 220 },
  { date: 'Sep 2025', appointments: 195 },
  { date: 'Oct 2025', appointments: 260 },
  { date: 'Nov 2025', appointments: 235 },
  { date: 'Dec 2025', appointments: 290 },
];

// Monthly Patient Data
const patientData = [
  { date: 'Jul 2025', patients: 280 },
  { date: 'Aug 2025', patients: 321 },
  { date: 'Sep 2025', patients: 312 },
  { date: 'Oct 2025', patients: 405 },
  { date: 'Nov 2025', patients: 367 },
  { date: 'Dec 2025', patients: 456 },
];

// Monthly Doctor Data
const doctorData = [
  { date: 'Jul 2025', doctors: 95 },
  { date: 'Aug 2025', doctors: 108 },
  { date: 'Sep 2025', doctors: 123 },
  { date: 'Oct 2025', doctors: 142 },
  { date: 'Nov 2025', doctors: 137 },
  { date: 'Dec 2025', doctors: 156 },
];

// Disease Distribution
const diseaseData = [
  {
    name: 'Dengue',
    value: 400,
    color: 'indigo.6',
  },
  {
    name: 'Malaria',
    value: 300,
    color: 'yellow.6',
  },
  {
    name: 'Tuberculosis',
    value: 100,
    color: 'teal.6',
  },
  {
    name: 'Covid-19',
    value: 180,
    color: 'red.6',
  },
  {
    name: 'Other',
    value: 220,
    color: 'gray.6',
  },
];

// Patients
const patients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 9876543210',
    age: 35,
    gender: 'Male',
    location: 'New York',
    bloodGroup: 'A+',
    disease: 'Dengue',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 9876543211',
    age: 28,
    gender: 'Female',
    location: 'Los Angeles',
    bloodGroup: 'B+',
    disease: 'Malaria',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 9876543212',
    age: 42,
    gender: 'Male',
    location: 'Chicago',
    bloodGroup: 'O+',
    disease: 'Diabetes',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 9876543213',
    age: 30,
    gender: 'Female',
    location: 'Houston',
    bloodGroup: 'AB+',
    disease: 'Covid-19',
  },
];

// Medicines
const medicines = [
  {
    id: 1,
    name: 'Paracetamol',
    dosage: '500mg',
    stock: 100,
    manufacturer: 'Pharma Inc.',
  },
  {
    id: 2,
    name: 'Ibuprofen',
    dosage: '200mg',
    stock: 50,
    manufacturer: 'HealthCorp',
  },
  {
    id: 3,
    name: 'Amoxicillin',
    dosage: '250mg',
    stock: 75,
    manufacturer: 'MediLife',
  },
  {
    id: 4,
    name: 'Azithromycin',
    dosage: '500mg',
    stock: 120,
    manufacturer: 'HealWell',
  },
  {
    id: 5,
    name: 'Vitamin C',
    dosage: '1000mg',
    stock: 200,
    manufacturer: 'NutriCare',
  },
];

// Doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    email: 'john@example.com',
    phone: '+1 9876500001',
    location: 'New York',
    department: 'Cardiology',
    experience: '12 Years',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    email: 'jane@example.com',
    phone: '+1 9876500002',
    location: 'Los Angeles',
    department: 'Neurology',
    experience: '9 Years',
  },
  {
    id: 3,
    name: 'Dr. Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 9876500003',
    location: 'Chicago',
    department: 'Pediatrics',
    experience: '7 Years',
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    email: 'emily@example.com',
    phone: '+1 9876500004',
    location: 'Houston',
    department: 'Orthopedics',
    experience: '10 Years',
  },
];

// Appointments
const appointments = [
  {
    id: 1,
    time: '09:00 AM',
    patient: 'John Doe',
    reason: 'General Checkup',
    doctor: 'Dr. John Doe',
    status: 'Completed',
  },
  {
    id: 2,
    time: '10:00 AM',
    patient: 'Jane Smith',
    reason: 'Dental Cleaning',
    doctor: 'Dr. Jane Smith',
    status: 'Pending',
  },
  {
    id: 3,
    time: '11:00 AM',
    patient: 'Mike Johnson',
    reason: 'Eye Examination',
    doctor: 'Dr. Mike Johnson',
    status: 'Completed',
  },
  {
    id: 4,
    time: '01:00 PM',
    patient: 'Emily Davis',
    reason: 'Physical Therapy',
    doctor: 'Dr. Emily Davis',
    status: 'Cancelled',
  },
  {
    id: 5,
    time: '02:00 PM',
    patient: 'Chris Wilson',
    reason: 'Vaccination',
    doctor: 'Dr. John Doe',
    status: 'Pending',
  },
];

export {
  data,
  patientData,
  doctorData,
  diseaseData,
  patients,
  medicines,
  doctors,
  appointments,
};