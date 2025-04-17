
import React from "react";
import { ChevronDown, Download, BarChart3, LineChart, PieChart, Users, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend,
} from "recharts";

// Mock data for reports
const appointmentData = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 75 },
  { month: 'Mar', count: 85 },
  { month: 'Apr', count: 95 },
  { month: 'May', count: 80 },
  { month: 'Jun', count: 90 },
];

const revenueData = [
  { month: 'Jan', amount: 15000 },
  { month: 'Feb', amount: 17500 },
  { month: 'Mar', amount: 20000 },
  { month: 'Apr', amount: 25000 },
  { month: 'May', amount: 22500 },
  { month: 'Jun', amount: 27500 },
];

const departmentData = [
  { name: 'Cardiology', value: 35 },
  { name: 'Neurology', value: 25 },
  { name: 'Pediatrics', value: 20 },
  { name: 'Dermatology', value: 15 },
  { name: 'Orthopedics', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ReportsHub = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="month">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="mr-2 h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="patients">
            <Users className="mr-2 h-4 w-4" />
            Patients
          </TabsTrigger>
          <TabsTrigger value="claims">
            <FileText className="mr-2 h-4 w-4" />
            Claims
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+14% from previous month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$128,450</div>
                <p className="text-xs text-muted-foreground">+5.2% from previous month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">356</div>
                <p className="text-xs text-muted-foreground">+7.8% from previous month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Appointments</CardTitle>
                <CardDescription>Number of appointments per month</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue generated per month</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Line type="monotone" dataKey="amount" stroke="#10b981" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Appointments by Department</CardTitle>
                <CardDescription>Distribution of appointments across departments</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Report History</CardTitle>
                <CardDescription>List of recently generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, title: "Monthly Financial Summary", date: "2025-04-01", type: "PDF" },
                    { id: 2, title: "Doctors Performance Report", date: "2025-03-15", type: "Excel" },
                    { id: 3, title: "Patient Demographics Analysis", date: "2025-03-01", type: "PDF" },
                    { id: 4, title: "Insurance Claims Report", date: "2025-02-15", type: "CSV" },
                  ].map(report => (
                    <div key={report.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Generated on {new Date(report.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        {report.type}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Reports</CardTitle>
              <CardDescription>Detailed analysis of appointment data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Select the metrics and parameters for your appointment reports.</p>
              
              <div className="space-y-4">
                {/* Report filters would go here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button>Generate Appointment Volume Report</Button>
                  <Button>Generate Cancellation Analysis</Button>
                  <Button>Generate Wait Time Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Reports</CardTitle>
              <CardDescription>Analyze patient demographics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Generate reports about your patient population and their care.</p>
              
              <div className="space-y-4">
                {/* Report options would go here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button>Generate Patient Demographics Report</Button>
                  <Button>Generate Treatment Outcomes Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims Reports</CardTitle>
              <CardDescription>Financial and insurance claims analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Track claim status, payments, and reimbursements.</p>
              
              <div className="space-y-4">
                {/* Report options would go here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button>Generate Claims Status Report</Button>
                  <Button>Generate Reimbursement Analysis</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsHub;
