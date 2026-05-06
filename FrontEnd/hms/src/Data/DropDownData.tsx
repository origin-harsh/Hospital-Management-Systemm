const bloodGroups = [
  { label: "A+", value: "A_POSITIVE" },
  { label: "A-", value: "A_NEGATIVE" },
  { label: "B+", value: "B_POSITIVE" },
  { label: "B-", value: "B_NEGATIVE" },
  { label: "AB+", value: "AB_POSITIVE" },
  { label: "AB-", value: "AB_NEGATIVE" },
  { label: "O+", value: "O_POSITIVE" },
  { label: "O-", value: "O_NEGATIVE" },
];
const bloodGroup: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};
const gender = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];
const symptoms: string[] = [
  "Fever",
  "High fever (102°F)",
  "Low-grade fever",
  "Chills",
  "Night sweats",
  "Fatigue",
  "Severe fatigue",
  "Weakness",
  "Body aches",
  "Muscle pain",
  "Joint pain",
  "Headache",
  "Migraine",
  "Dizziness",
  "Loss of appetite",
  "Unintentional weight loss",
  "Dehydration",

  "Dry cough",
  "Productive cough",
  "Persistent cough",
  "Shortness of breath",
  "Difficulty breathing",
  "Chest tightness",
  "Chest pain",
  "Wheezing",
  "Sore throat",
  "Runny nose",
  "Nasal congestion",
  "Sneezing",

  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Loose stools",
  "Constipation",
  "Abdominal pain",
  "Stomach cramps",
  "Bloating",
  "Indigestion",
  "Acid reflux",

  "Palpitations",
  "Irregular heartbeat",
  "Swelling in legs",
  "Edema",
  "Cold extremities",

  "Blurred vision",
  "Double vision",
  "Loss of balance",
  "Numbness",
  "Tingling sensation",
  "Seizures",
  "Confusion",

  "Frequent urination",
  "Burning urination",
  "Blood in urine",
  "Excessive thirst",

  "Skin rash",
  "Itching",
  "Redness",
  "Swelling",
  "Bruising easily",

  "Loss of taste",
  "Loss of smell",
  "Hoarseness",
  "Difficulty swallowing",
  "Back pain",
  "Neck pain"
];
const tests: string[] = [
  "Complete Blood Count (CBC)",
  "Blood Sugar (Fasting)",
  "Blood Sugar (Postprandial)",
  "HbA1c",
  "Lipid Profile",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Thyroid Function Test (TFT)",
  "Serum Electrolytes",

  "Urine Routine Examination",
  "Urine Culture",
  "Stool Examination",

  "X-Ray Chest",
  "X-Ray Abdomen",
  "CT Scan",
  "MRI Scan",
  "Ultrasound (USG Abdomen)",
  "Ultrasound Pelvis",
  "Mammography",

  "Electrocardiogram (ECG)",
  "Echocardiography (ECHO)",
  "Treadmill Test (TMT)",

  "COVID-19 RT-PCR",
  "Dengue Test",
  "Malaria Test",
  "Typhoid Test",
  "Hepatitis Panel",
  "HIV Test",

  "C-Reactive Protein (CRP)",
  "Erythrocyte Sedimentation Rate (ESR)",
  "Procalcitonin",

  "Vitamin D Test",
  "Vitamin B12 Test",

  "Blood Culture",
  "Sputum Test",
  "Allergy Test",

  "Biopsy",
  "Pap Smear",
  "Endoscopy",
  "Colonoscopy"
];
const allDosageFrequencies = [
  "0-0-0",
  "0-0-1",
  "0-1-0",
  "0-1-1",
  "1-0-0",
  "1-0-1",
  "1-1-0",
  "1-1-1"
];
const appointmentReason: string[] = ["General Checkup", "Follow-up Visit", "Prescription Refill", "Lab Test Results", "Specialist Consultation", "Vaccination", "Health Concern", "Physical Examination", "Mental Health Support", "Chronic Condition Management", "Surgical Consultation", "Emergency Visit", "Second Opinion", "Pre-Operative Assessment", "Post-Operative Follow-up"];
const doctorSpecializations: string[] = ["General Physician", "Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Gynecologist", "Psychiatrist", "Ophthalmologist", "ENT Specialist", "Dentist", "Urologist", "Gastroenterologist", "Endocrinologist", "Pulmonologist", "Oncologist", "Radiologist", "Anesthesiologist", "Nephrologist", "Rheumatologist"];
const doctorDepartments: string[] = ["General Medicine","Cardiology","Dermatology","Neurology","Orthopedics","Pediatrics","Gynecology","Psychiatry","Ophthalmology","ENT","Dentistry","Urology","Gastroenterology","Endocrinology","Pulmonology","Oncology","Radiology","Anesthesiology","Nephrology","Rheumatology","Emergency Medicine","Pathology","Physiotherapy"];
export { bloodGroups, doctorSpecializations, doctorDepartments, bloodGroup, appointmentReason ,gender, symptoms, tests, allDosageFrequencies};