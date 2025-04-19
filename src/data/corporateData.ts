
import { Company, Employee, InsurancePlan } from "../models/corporate";

// Mock insurance plans
export const insurancePlans: InsurancePlan[] = [
  {
    id: "plan-001",
    name: "Premium Health Plus",
    coverage: {
      medical: 90,
      dental: 80,
      vision: 70,
      prescription: 85
    },
    premium: {
      monthly: 450,
      employeeContribution: 20,
      employerContribution: 80
    },
    deductible: 500,
    outOfPocketMax: 3000,
    description: "Comprehensive coverage with low deductible and excellent benefits"
  },
  {
    id: "plan-002",
    name: "Standard Care",
    coverage: {
      medical: 80,
      dental: 70,
      vision: 60,
      prescription: 75
    },
    premium: {
      monthly: 350,
      employeeContribution: 30,
      employerContribution: 70
    },
    deductible: 1000,
    outOfPocketMax: 4000,
    description: "Balanced coverage at an affordable price"
  },
  {
    id: "plan-003",
    name: "Basic Essentials",
    coverage: {
      medical: 70,
      dental: 50,
      vision: 50,
      prescription: 60
    },
    premium: {
      monthly: 250,
      employeeContribution: 40,
      employerContribution: 60
    },
    deductible: 1500,
    outOfPocketMax: 6000,
    description: "Essential coverage for basic healthcare needs"
  },
  {
    id: "plan-004",
    name: "Family Shield",
    coverage: {
      medical: 85,
      dental: 75,
      vision: 65,
      prescription: 80
    },
    premium: {
      monthly: 550,
      employeeContribution: 25,
      employerContribution: 75
    },
    deductible: 750,
    outOfPocketMax: 3500,
    description: "Family-oriented coverage with additional benefits for dependents"
  }
];

// Mock companies data
export const companies: Company[] = [
  {
    id: "company-001",
    name: "TechNova Solutions",
    industry: "Information Technology",
    address: {
      street: "123 Tech Park",
      city: "San Francisco",
      state: "CA",
      zip: "94105"
    },
    contactPerson: {
      name: "Alex Rodriguez",
      phone: "415-555-0123",
      email: "alex@technova.com",
      position: "HR Director"
    },
    website: "www.technova.com",
    employeeCount: 120,
    registeredDate: "2020-03-15",
    insurancePlans: ["plan-001", "plan-002", "plan-004"],
    billingInfo: {
      paymentMethod: "Credit Card",
      billingAddress: {
        street: "123 Tech Park",
        city: "San Francisco",
        state: "CA",
        zip: "94105"
      },
      accountStatus: "Active"
    },
    subscription: {
      plan: "Enterprise",
      startDate: "2020-03-15",
      nextBillingDate: "2023-03-15",
      amount: 25000
    }
  },
  {
    id: "company-002",
    name: "Global Health Partners",
    industry: "Healthcare",
    address: {
      street: "456 Medical Plaza",
      city: "Boston",
      state: "MA",
      zip: "02110"
    },
    contactPerson: {
      name: "Sarah Johnson",
      phone: "617-555-0189",
      email: "sjohnson@ghpartners.com",
      position: "Benefits Manager"
    },
    website: "www.ghpartners.com",
    employeeCount: 75,
    registeredDate: "2019-07-22",
    insurancePlans: ["plan-001", "plan-003"],
    billingInfo: {
      paymentMethod: "ACH Transfer",
      billingAddress: {
        street: "456 Medical Plaza",
        city: "Boston",
        state: "MA",
        zip: "02110"
      },
      accountStatus: "Active"
    },
    subscription: {
      plan: "Professional",
      startDate: "2019-07-22",
      nextBillingDate: "2023-07-22",
      amount: 18000
    }
  },
  {
    id: "company-003",
    name: "GreenEarth Sustainability",
    industry: "Environmental Services",
    address: {
      street: "789 Eco Avenue",
      city: "Portland",
      state: "OR",
      zip: "97204"
    },
    contactPerson: {
      name: "Michael Chen",
      phone: "503-555-0456",
      email: "mchen@greenearth.org",
      position: "Operations Manager"
    },
    website: "www.greenearth.org",
    employeeCount: 45,
    registeredDate: "2021-01-10",
    insurancePlans: ["plan-002", "plan-003"],
    billingInfo: {
      paymentMethod: "Bank Transfer",
      billingAddress: {
        street: "789 Eco Avenue",
        city: "Portland",
        state: "OR",
        zip: "97204"
      },
      accountStatus: "Active"
    },
    subscription: {
      plan: "Standard",
      startDate: "2021-01-10",
      nextBillingDate: "2023-01-10",
      amount: 12000
    }
  },
  {
    id: "demo",
    name: "Demo Corporation",
    industry: "Software Development",
    address: {
      street: "100 Demo Street",
      city: "Demo City",
      state: "DC",
      zip: "10001"
    },
    contactPerson: {
      name: "Demo User",
      phone: "555-DEMO-123",
      email: "demo@democorp.com",
      position: "HR Administrator"
    },
    website: "www.democorp.com",
    employeeCount: 50,
    registeredDate: "2022-05-01",
    insurancePlans: ["plan-001", "plan-002", "plan-003", "plan-004"],
    billingInfo: {
      paymentMethod: "Credit Card",
      billingAddress: {
        street: "100 Demo Street",
        city: "Demo City",
        state: "DC",
        zip: "10001"
      },
      accountStatus: "Active"
    },
    subscription: {
      plan: "Enterprise",
      startDate: "2022-05-01",
      nextBillingDate: "2023-05-01",
      amount: 15000
    }
  }
];

// Mock employees data
export const employees: Employee[] = [
  {
    id: "emp-001",
    companyId: "company-001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@technova.com",
    phone: "415-555-1001",
    position: "Software Engineer",
    department: "Engineering",
    dateHired: "2020-06-15",
    dateOfBirth: "1988-04-12",
    address: {
      street: "456 Pine Street",
      city: "San Francisco",
      state: "CA",
      zip: "94108"
    },
    emergencyContact: {
      name: "Mary Smith",
      relationship: "Spouse",
      phone: "415-555-1002"
    },
    insurancePlanId: "plan-001",
    dependents: [
      {
        name: "Emma Smith",
        relationship: "Child",
        dateOfBirth: "2015-07-22"
      },
      {
        name: "Noah Smith",
        relationship: "Child",
        dateOfBirth: "2018-03-10"
      }
    ],
    medicalHistory: {
      conditions: ["Asthma"],
      allergies: ["Peanuts"],
      medications: ["Albuterol"]
    }
  },
  {
    id: "emp-002",
    companyId: "company-001",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@technova.com",
    phone: "415-555-1003",
    position: "Product Manager",
    department: "Product",
    dateHired: "2020-08-01",
    dateOfBirth: "1990-11-28",
    address: {
      street: "789 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103"
    },
    emergencyContact: {
      name: "David Johnson",
      relationship: "Brother",
      phone: "415-555-1004"
    },
    insurancePlanId: "plan-004",
    dependents: [],
    medicalHistory: {
      conditions: [],
      allergies: ["Penicillin"],
      medications: []
    }
  },
  {
    id: "emp-003",
    companyId: "company-002",
    firstName: "Robert",
    lastName: "Williams",
    email: "robert.williams@ghpartners.com",
    phone: "617-555-2001",
    position: "Medical Researcher",
    department: "Research",
    dateHired: "2019-10-15",
    dateOfBirth: "1985-06-17",
    address: {
      street: "123 Beacon Street",
      city: "Boston",
      state: "MA",
      zip: "02116"
    },
    emergencyContact: {
      name: "Jennifer Williams",
      relationship: "Spouse",
      phone: "617-555-2002"
    },
    insurancePlanId: "plan-001",
    dependents: [
      {
        name: "Sophia Williams",
        relationship: "Child",
        dateOfBirth: "2017-02-14"
      }
    ],
    medicalHistory: {
      conditions: ["Hypertension"],
      allergies: [],
      medications: ["Lisinopril"]
    }
  },
  {
    id: "emp-004",
    companyId: "company-003",
    firstName: "Lisa",
    lastName: "Chen",
    email: "lisa.chen@greenearth.org",
    phone: "503-555-3001",
    position: "Environmental Specialist",
    department: "Field Operations",
    dateHired: "2021-03-01",
    dateOfBirth: "1992-09-05",
    address: {
      street: "456 Forest Avenue",
      city: "Portland",
      state: "OR",
      zip: "97209"
    },
    emergencyContact: {
      name: "Thomas Chen",
      relationship: "Father",
      phone: "503-555-3002"
    },
    insurancePlanId: "plan-002",
    dependents: [],
    medicalHistory: {
      conditions: [],
      allergies: ["Latex"],
      medications: []
    }
  },
  {
    id: "emp-005",
    companyId: "demo",
    firstName: "Demo",
    lastName: "Employee",
    email: "employee@democorp.com",
    phone: "555-DEMO-001",
    position: "Software Developer",
    department: "Engineering",
    dateHired: "2022-06-01",
    dateOfBirth: "1990-01-15",
    address: {
      street: "200 Demo Avenue",
      city: "Demo City",
      state: "DC",
      zip: "10001"
    },
    emergencyContact: {
      name: "Emergency Contact",
      relationship: "Friend",
      phone: "555-DEMO-002"
    },
    insurancePlanId: "plan-001",
    dependents: [
      {
        name: "Demo Child",
        relationship: "Child",
        dateOfBirth: "2018-05-20"
      }
    ],
    medicalHistory: {
      conditions: ["None"],
      allergies: ["None"],
      medications: ["None"]
    }
  },
  {
    id: "emp-006",
    companyId: "demo",
    firstName: "Test",
    lastName: "User",
    email: "test@democorp.com",
    phone: "555-DEMO-003",
    position: "QA Engineer",
    department: "Quality Assurance",
    dateHired: "2022-07-15",
    dateOfBirth: "1988-03-25",
    address: {
      street: "201 Demo Avenue",
      city: "Demo City",
      state: "DC",
      zip: "10001"
    },
    emergencyContact: {
      name: "Emergency Person",
      relationship: "Sibling",
      phone: "555-DEMO-004"
    },
    insurancePlanId: "plan-002",
    dependents: [],
    medicalHistory: {
      conditions: ["None"],
      allergies: ["None"],
      medications: ["None"]
    }
  }
];

// Helper functions to manage data
export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

export const getEmployeesByCompanyId = (companyId: string): Employee[] => {
  return employees.filter(employee => employee.companyId === companyId);
};

export const getInsurancePlanById = (id: string): InsurancePlan | undefined => {
  return insurancePlans.find(plan => plan.id === id);
};

export const getInsurancePlansForCompany = (companyId: string): InsurancePlan[] => {
  const company = getCompanyById(companyId);
  if (!company) return [];
  
  return company.insurancePlans
    .map(planId => insurancePlans.find(plan => plan.id === planId))
    .filter((plan): plan is InsurancePlan => plan !== undefined);
};
