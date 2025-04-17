
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  MessageSquare,
  Pill,
  User,
  Clock,
  AlertTriangle,
  CreditCard,
  File
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for the patient dashboard
const patientData = {
  name: "Sarah Johnson",
  age: 32,
  bloodType: "A+",
  nextAppointment: "May 15, 2025 - 10:30 AM",
  doctor: "Dr. Michael Chen",
  lastVisit: "April 3, 2025",
  insurancePlan: "MedCare Plus",
  insuranceNumber: "MCR-293847561",
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Daily" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Evening" }
  ],
  allergies: ["Penicillin", "Sulfa drugs"],
  recentReports: [
    { name: "Blood Work Results", date: "April 3, 2025" },
    { name: "MRI Scan Report", date: "March 15, 2025" },
    { name: "Annual Physical Summary", date: "January 22, 2025" }
  ],
  upcomingAppointments: [
    { 
      doctor: "Dr. Michael Chen", 
      specialty: "Primary Care", 
      date: "May 15, 2025", 
      time: "10:30 AM" 
    },
    { 
      doctor: "Dr. Emily Wong", 
      specialty: "Cardiology", 
      date: "June 8, 2025", 
      time: "2:00 PM" 
    }
  ],
  billingStatus: [
    { id: "INV-2023-053", amount: 125, status: "Paid", date: "April 5, 2025" },
    { id: "INV-2023-047", amount: 75, status: "Pending", date: "April 2, 2025" },
    { id: "INV-2023-039", amount: 250, status: "Overdue", date: "March 15, 2025" }
  ]
};

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownloadReport = (reportName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${reportName}...`,
    });
    
    // Simulate a download with timeout - in a real app this would call an API endpoint
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${reportName} has been downloaded.`,
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patient Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {patientData.name}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button onClick={() => navigate("/appointments/calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      </div>
      
      {/* Patient Overview Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Appointment
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{patientData.nextAppointment}</div>
            <p className="text-xs text-muted-foreground">
              with {patientData.doctor}
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-2" onClick={() => navigate("/appointments")}>
              View details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Medications
            </CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{patientData.medications.length} Active</div>
            <p className="text-xs text-muted-foreground">
              Last updated on {patientData.lastVisit}
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-2">
              View medications
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Insurance
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{patientData.insurancePlan}</div>
            <p className="text-xs text-muted-foreground">
              #{patientData.insuranceNumber}
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-2" onClick={() => navigate("/claims")}>
              View claims
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">3 Unread</div>
            <p className="text-xs text-muted-foreground">
              From your healthcare team
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-2" onClick={() => navigate("/messaging")}>
              View messages
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records & Reports */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
            <CardDescription>
              Access your recent medical reports and test results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientData.recentReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.name)}>
                    Download
                  </Button>
                </div>
              ))}
              <Button className="w-full mt-4" variant="outline" onClick={() => navigate("/reports")}>
                View All Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your scheduled appointments with healthcare providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientData.upcomingAppointments.map((appointment, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.specialty} • {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
              ))}
              <Button className="w-full mt-4" onClick={() => navigate("/appointments/calendar")}>
                Schedule New Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing & Insurance */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Overview</CardTitle>
          <CardDescription>
            Recent invoices and payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patientData.billingStatus.map((bill, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Invoice {bill.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {bill.date} • ${bill.amount}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={
                    bill.status === "Paid" ? "default" : 
                    bill.status === "Pending" ? "secondary" : "destructive"
                  }
                >
                  {bill.status}
                </Badge>
              </div>
            ))}
            <Button 
              className="w-full mt-4" 
              variant="outline" 
              onClick={() => navigate("/claims/submit")}
            >
              Submit New Claim
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts & Reminders */}
      <Card>
        <CardHeader className="bg-amber-50 dark:bg-amber-950/50">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            <CardTitle>Health Reminders</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="bg-amber-50 dark:bg-amber-950/50 p-3 rounded-md">
            <p className="font-medium">Annual Physical Examination</p>
            <p className="text-sm text-muted-foreground">
              It's time to schedule your annual physical. Your last examination was on January 22, 2025.
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-1">
              Schedule Now
            </Button>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-md">
            <p className="font-medium">Prescription Renewal</p>
            <p className="text-sm text-muted-foreground">
              Your Lisinopril prescription will expire in 2 weeks. Contact your doctor for renewal.
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-1">
              Request Renewal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
