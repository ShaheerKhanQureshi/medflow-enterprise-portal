
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileMedical,
  FileText,
  MessageSquare,
  Pill,
  User,
  Clock,
  AlertTriangle,
  CreditCard
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the patient dashboard
const upcomingAppointments = [
  {
    id: "1",
    doctor: "Dr. Ahmed Khan",
    specialty: "Cardiology",
    date: "2023-05-15",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: "2",
    doctor: "Dr. Sara Malik",
    specialty: "Dermatology",
    date: "2023-05-20",
    time: "2:30 PM",
    status: "Pending"
  }
];

const recentPrescriptions = [
  {
    id: "1",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    doctor: "Dr. Ahmed Khan",
    date: "2023-04-28"
  },
  {
    id: "2",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    doctor: "Dr. Ahmed Khan",
    date: "2023-04-28"
  },
  {
    id: "3",
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed for pain",
    doctor: "Dr. Sara Malik",
    date: "2023-04-15"
  }
];

const recentClaims = [
  {
    id: "1",
    date: "2023-04-28",
    service: "Cardiology Consultation",
    amount: 3500,
    status: "Approved"
  },
  {
    id: "2",
    date: "2023-03-15",
    service: "Blood Tests",
    amount: 2200,
    status: "Pending"
  },
  {
    id: "3",
    date: "2023-02-10",
    service: "X-Ray",
    amount: 4500,
    status: "Rejected"
  }
];

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Status badge component for different statuses
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "outline" | "secondary" | "destructive" = "default";
    
    switch (status.toLowerCase()) {
      case "approved":
      case "confirmed":
        variant = "default";
        break;
      case "pending":
        variant = "secondary";
        break;
      case "rejected":
        variant = "destructive";
        break;
      default:
        variant = "outline";
    }
    
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Fatima Ahmed
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => navigate("/appointments/calendar")}>
            <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
          </Button>
          <Button onClick={() => navigate("/messaging")}>
            <MessageSquare className="mr-2 h-4 w-4" /> Messages
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <div className="text-xs text-muted-foreground">Next: May 15, 2023</div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground gap-2">
              <Clock className="h-4 w-4" />
              <span>10:00 AM with Dr. Ahmed Khan</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">Last updated: April 28, 2023</div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground gap-2">
              <Pill className="h-4 w-4" />
              <span>Amoxicillin, Lisinopril, Ibuprofen</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">1 pending approval</div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>1 claim was rejected</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="prescriptions">
            <Pill className="h-4 w-4 mr-2" />
            Prescriptions
          </TabsTrigger>
          <TabsTrigger value="claims">
            <FileText className="h-4 w-4 mr-2" />
            Claims
          </TabsTrigger>
          <TabsTrigger value="records">
            <FileMedical className="h-4 w-4 mr-2" />
            Medical Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View and manage your scheduled appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <StatusBadge status={appointment.status} />
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No upcoming appointments</p>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => navigate("/appointments/calendar")}>
                  <Calendar className="mr-2 h-4 w-4" /> Schedule New Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Current Prescriptions</CardTitle>
              <CardDescription>View your active medications and prescriptions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Prescribed By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.frequency}</TableCell>
                      <TableCell>{prescription.doctor}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  Request Refill
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>View the status of your recent insurance claims.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount (Rs)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>{claim.service}</TableCell>
                      <TableCell>{claim.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={claim.status} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => navigate("/claims/submit")}>
                  <FileText className="mr-2 h-4 w-4" /> Submit New Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Access your medical history and records.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>Last updated: March 10, 2023</p>
                      <Button variant="link" className="p-0 h-auto">View All Lab Results</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Imaging Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>Last updated: February 15, 2023</p>
                      <Button variant="link" className="p-0 h-auto">View All Imaging Reports</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Medical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>Complete medical history and conditions</p>
                      <Button variant="link" className="p-0 h-auto">View Medical History</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Vaccination Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>Last vaccination: January 5, 2023</p>
                      <Button variant="link" className="p-0 h-auto">View Vaccination History</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  Download Full Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
