
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Activity,
  FileCheck,
  ArrowUp,
  ArrowDown,
  Clock,
  DollarSign
} from "lucide-react";

// Mock data
const appointmentData = [
  { name: 'Mon', appointments: 14 },
  { name: 'Tue', appointments: 25 },
  { name: 'Wed', appointments: 22 },
  { name: 'Thu', appointments: 30 },
  { name: 'Fri', appointments: 28 },
  { name: 'Sat', appointments: 18 },
  { name: 'Sun', appointments: 8 },
];

const patientData = [
  { name: 'Jan', patients: 65, target: 50 },
  { name: 'Feb', patients: 59, target: 50 },
  { name: 'Mar', patients: 80, target: 60 },
  { name: 'Apr', patients: 81, target: 60 },
  { name: 'May', patients: 56, target: 70 },
  { name: 'Jun', patients: 55, target: 70 },
  { name: 'Jul', patients: 40, target: 80 },
  { name: 'Aug', patients: 70, target: 80 },
  { name: 'Sep', patients: 90, target: 90 },
  { name: 'Oct', patients: 110, target: 90 },
  { name: 'Nov', patients: 120, target: 100 },
  { name: 'Dec', patients: 130, target: 100 },
];

const claimsData = [
  { name: 'Processing', value: 20 },
  { name: 'Approved', value: 65 },
  { name: 'Rejected', value: 15 },
];

const earningsData = [
  { name: 'Mon', earnings: 2400 },
  { name: 'Tue', earnings: 1398 },
  { name: 'Wed', earnings: 9800 },
  { name: 'Thu', earnings: 3908 },
  { name: 'Fri', earnings: 4800 },
  { name: 'Sat', earnings: 3800 },
  { name: 'Sun', earnings: 1200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const recentAppointments = [
  { id: 1, patient: "Emily Wilson", doctor: "Dr. Sarah Johnson", date: "Today, 9:30 AM", status: "confirmed" },
  { id: 2, patient: "Daniel Lee", doctor: "Dr. Michael Brown", date: "Today, 11:00 AM", status: "pending" },
  { id: 3, patient: "Sophia Martinez", doctor: "Dr. John Smith", date: "Today, 2:15 PM", status: "confirmed" },
  { id: 4, patient: "Olivia Taylor", doctor: "Dr. Elizabeth Davis", date: "Tomorrow, 10:45 AM", status: "confirmed" },
  { id: 5, patient: "Ethan Clark", doctor: "Dr. Robert Wilson", date: "Tomorrow, 3:30 PM", status: "pending" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated:</span>
          <span className="text-sm font-medium">April 17, 2025, 8:30 AM</span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">547</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,842</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Claims Approved
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <div className="flex items-center pt-1 text-xs text-red-600">
              <ArrowDown className="mr-1 h-3 w-3" />
              <span>4% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>15% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Weekly Patient Growth</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={patientData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    name="Patients"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    name="Target"
                    stroke="#6b7280" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Claims Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={claimsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {claimsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Appointments</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Weekly Earnings</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={earningsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Patient</th>
                    <th className="pb-2 text-left font-medium">Doctor</th>
                    <th className="pb-2 text-left font-medium">Date & Time</th>
                    <th className="pb-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b last:border-0">
                      <td className="py-3">{appointment.patient}</td>
                      <td className="py-3">{appointment.doctor}</td>
                      <td className="py-3">{appointment.date}</td>
                      <td className="py-3">
                        <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                          {appointment.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
