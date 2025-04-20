
export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',

  // User endpoints
  USERS: '/users',
  USER_PROFILE: (id: string) => `/users/${id}`,
  USER_PROFILE_IMAGE: (id: string) => `/users/${id}/profile-image`,

  // Patient endpoints
  PATIENTS: '/patients',
  PATIENT_DETAILS: (id: string) => `/patients/${id}`,
  PATIENT_DOCUMENTS: (id: string) => `/patients/${id}/documents`,
  PATIENT_RECORDS: (id: string) => `/patients/${id}/records`,

  // Doctor endpoints
  DOCTORS: '/doctors',
  DOCTOR_DETAILS: (id: string) => `/doctors/${id}`,
  DOCTOR_SCHEDULE: (id: string) => `/doctors/${id}/schedule`,
  DOCTOR_PATIENTS: (id: string) => `/doctors/${id}/patients`,

  // Appointment endpoints
  APPOINTMENTS: '/appointments',
  APPOINTMENT_DETAILS: (id: string) => `/appointments/${id}`,

  // Corporate endpoints
  COMPANIES: '/companies',
  COMPANY_DETAILS: (id: string) => `/companies/${id}`,
  INSURANCE_PLANS: '/insurance-plans',

  // Claims endpoints
  CLAIMS: '/claims',
  CLAIM_DETAILS: (id: string) => `/claims/${id}`,

  // Messages endpoints
  MESSAGES: '/messages',
  MESSAGE_DETAILS: (id: string) => `/messages/${id}`,
};
