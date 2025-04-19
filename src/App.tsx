
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import DoctorsList from "./pages/doctors/DoctorsList";
import AddDoctor from "./pages/doctors/AddDoctor";
import DoctorProfile from "./pages/doctors/DoctorProfile";
import DoctorProfileView from "./pages/doctors/DoctorProfileView";
import AppointmentsList from "./pages/appointments/AppointmentsList";
import AppointmentsCalendar from "./pages/appointments/AppointmentsCalendar";
import PatientsList from "./pages/patients/PatientsList";
import AddPatient from "./pages/patients/AddPatient";
import PatientDashboard from "./pages/patients/PatientDashboard";
import PatientProfile from "./pages/patients/PatientProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MessagingHub from "./pages/messaging/MessagingHub";
import ClaimsList from "./pages/claims/ClaimsList";
import ClaimDetail from "./pages/claims/ClaimDetail";
import SubmitClaim from "./pages/claims/SubmitClaim";
import ReportsHub from "./pages/reports/ReportsHub";
import SettingsPage from "./pages/settings/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* Protected Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Doctor Routes */}
              <Route path="doctors" element={<DoctorsList />} />
              <Route path="doctors/add" element={<AddDoctor />} />
              <Route path="doctors/:id" element={<DoctorProfile />} />
              <Route path="doctors/profile/:id" element={<DoctorProfileView />} />
              
              {/* Appointment Routes */}
              <Route path="appointments" element={<AppointmentsList />} />
              <Route path="appointments/calendar" element={<AppointmentsCalendar />} />
              
              {/* Patient Routes */}
              <Route path="patients" element={<PatientsList />} />
              <Route path="patients/add" element={<AddPatient />} />
              <Route path="patients/dashboard" element={<PatientDashboard />} />
              <Route path="patients/profile/:id" element={<PatientProfile />} />
              <Route path="patients/:id" element={<PatientProfile />} /> {/* Add this route to fix 404 */}
              
              {/* Admin Routes */}
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              
              {/* Messaging Routes */}
              <Route path="messaging" element={<MessagingHub />} />
              
              {/* Claims Routes */}
              <Route path="claims" element={<ClaimsList />} />
              <Route path="claims/:id" element={<ClaimDetail />} />
              <Route path="claims/submit" element={<SubmitClaim />} />
              
              {/* Reports Routes */}
              <Route path="reports" element={<ReportsHub />} />
              
              {/* Settings Routes */}
              <Route path="settings" element={<SettingsPage />} />
              
              {/* Notifications */}
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
