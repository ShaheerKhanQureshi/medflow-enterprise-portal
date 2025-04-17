
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserRound,
  Calendar,
  FileText,
  Settings,
  BarChart2,
  ClipboardList,
  FileBarChart,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PieChart
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

// Mock data for the admin dashboard
const recentClaims = [
  {
    id: "1",
    patient: "Fatima Ahmed",
    date: "2023-05-10",
    service: "Cardiology Consultation",
    amount: 3500,
    status: "Pending"
  },
  {
    id: "2",
    patient: "Ali Khan",
    date: "2023-05-09",
    service: "Lab Tests",
    amount: 2200,
    status: "Approved"
  },
  {
    id: "3",
    patient: "Muhammad Waseem",
    date: "2023-05-08",
    service: "X-Ray",
    amount: 4500,
    status: "Rejected"
  },
  {
    id: "4",
    patient: "Ayesha Malik",
    date: "2023-05-07",
    service: "General Consultation",
    amount: 1800,
    status: "Approved"
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Status badge component for different statuses
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "outline" | "secondary" | "destructive" = "default";
    
    switch (status.toLowerCase()) {
      case "approved":
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
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your medical practice efficiently.
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => navigate("/reports")}>
            <FileBarChart className="mr-2 h-4 w-4" /> View Reports
          </Button>
          <Button onClick={() => navigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,825</div>
            <div className="flex items-center pt-1 text-green-600 text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-green-600 text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>4 more than yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claims Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center pt-1 text-red-600 text-xs">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>3 pending approval</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs 385,420</div>
            <div className="flex items-center pt-1 text-green-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>8.2% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <PieChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="claims">
            <FileText className="h-4 w-4 mr-2" />
            Claims
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
                <CardDescription>Financial performance for the current week</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChart2 className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Chart Placeholder</p>
                    <p className="text-xs text-muted-foreground">(Would be implemented with recharts)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Revenue by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Chart Placeholder</p>
                    <p className="text-xs text-muted-foreground">(Would be implemented with recharts)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <UserRound className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">New patient registered</span>
                    </div>
                    <span className="text-xs text-muted-foreground">10m ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Appointment rescheduled</span>
                    </div>
                    <span className="text-xs text-muted-foreground">25m ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Claim approved</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">System notification</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Monthly Statistics</CardTitle>
                <CardDescription>Operational metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium">Patient Satisfaction</div>
                    <div className="mt-2 text-2xl font-bold">92%</div>
                    <div className="text-xs text-green-600">+2% from last month</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium">Appointment Rate</div>
                    <div className="mt-2 text-2xl font-bold">87%</div>
                    <div className="text-xs text-amber-600">-1% from last month</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium">Claim Success Rate</div>
                    <div className="mt-2 text-2xl font-bold">78%</div>
                    <div className="text-xs text-green-600">+4% from last month</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium">Staff Utilization</div>
                    <div className="mt-2 text-2xl font-bold">94%</div>
                    <div className="text-xs text-green-600">+1% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>
                Overview of recently submitted insurance claims.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
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
                      <TableCell className="font-medium">{claim.patient}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>{claim.service}</TableCell>
                      <TableCell>{claim.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={claim.status} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Process</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-4">
                <Button variant="outline">Export Claims</Button>
                <Button variant="default" onClick={() => navigate("/claims")}>
                  View All Claims
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage doctors, staff, and patients across your practice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <UserRound className="h-4 w-4 mr-2" />
                      Doctors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold">24</div>
                        <div className="text-xs text-muted-foreground">Active doctors</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate("/doctors/add")}>
                        Add Doctor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Patients
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold">4,825</div>
                        <div className="text-xs text-muted-foreground">Registered patients</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate("/patients/add")}>
                        Add Patient
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between gap-4">
                <Button className="flex-1" variant="outline" onClick={() => navigate("/doctors")}>
                  <UserRound className="mr-2 h-4 w-4" /> Manage Doctors
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => navigate("/patients")}>
                  <Users className="mr-2 h-4 w-4" /> Manage Patients
                </Button>
                <Button className="flex-1" variant="outline">
                  <Settings className="mr-2 h-4 w-4" /> Role Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                Overview of today's appointments and scheduling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-lg font-medium">Calendar View Placeholder</p>
                  <p className="text-sm text-muted-foreground">
                    The full calendar would be implemented here
                  </p>
                  <Button className="mt-4" onClick={() => navigate("/appointments/calendar")}>
                    View Calendar
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Button variant="outline" className="justify-start">
                  <ClipboardList className="mr-2 h-4 w-4" /> Today's Schedule
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" /> Export Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
