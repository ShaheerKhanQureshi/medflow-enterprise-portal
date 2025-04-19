
// Types for corporate management

export interface InsurancePlan {
  id: string;
  name: string;
  coverage: {
    medical: number; // Percentage covered
    dental: number;
    vision: number;
    prescription: number;
  };
  premium: {
    monthly: number;
    employeeContribution: number; // Percentage paid by employee
    employerContribution: number; // Percentage paid by employer
  };
  deductible: number;
  outOfPocketMax: number;
  description: string;
}

export interface Employee {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  dateHired: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurancePlanId: string;
  dependents: {
    name: string;
    relationship: string;
    dateOfBirth: string;
  }[];
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contactPerson: {
    name: string;
    phone: string;
    email: string;
    position: string;
  };
  website: string;
  employeeCount: number;
  registeredDate: string;
  insurancePlans: string[]; // Array of plan IDs offered by the company
  billingInfo: {
    paymentMethod: string;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    accountStatus: "Active" | "Pending" | "Inactive";
  };
  subscription: {
    plan: string;
    startDate: string;
    nextBillingDate: string;
    amount: number;
  };
}
