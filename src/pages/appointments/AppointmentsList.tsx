
import React from "react";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const appointments = [
  {
    id: 1,
    patientName: "Emma Wilson",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-18",
    time: "09:00 AM",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "John Miller",
    doctorName: "Dr. Michael Brown",
    date: "2025-04-18",
    time: "10:30 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 3,
    patientName: "Lucy Parker",
    doctorName: "Dr. John Smith",
    date: "2025-04-18",
    time: "01:15 PM",
    type: "Emergency",
    status: "pending",
  },
  {
    id: 4,
    patientName: "David Turner",
    doctorName: "Dr. Elizabeth Davis",
    date: "2025-04-19",
    time: "11:45 AM",
    type: "Surgery",
    status: "confirmed",
  },
  {
    id: 5,
    patientName: "Sarah Johnson",
    doctorName: "Dr. Robert Wilson",
    date: "2025-04-19",
    time: "02:30 PM",
    type: "Consultation",
    status: "cancelled",
  },
];

const AppointmentsList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);

  const filteredAppointments = React.useMemo(() => {
    return appointments.filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === null || appointment.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button asChild>
            <Link to="/appointments/add">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
          <CardDescription>
            View and manage upcoming and past appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8 w-full max-w-xs"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    {filterStatus && (
                      <Badge variant="secondary" className="ml-2 px-1 py-0 h-5">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                    <span className={filterStatus === null ? "font-medium" : ""}>All</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("confirmed")}>
                    <span className={filterStatus === "confirmed" ? "font-medium" : ""}>Confirmed</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    <span className={filterStatus === "pending" ? "font-medium" : ""}>Pending</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("cancelled")}>
                    <span className={filterStatus === "cancelled" ? "font-medium" : ""}>Cancelled</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Patient</th>
                    <th className="px-4 py-3 text-left font-medium">Doctor</th>
                    <th className="px-4 py-3 text-left font-medium">Date & Time</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">{appointment.patientName}</td>
                      <td className="px-4 py-3">{appointment.doctorName}</td>
                      <td className="px-4 py-3">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {appointment.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="ghost">View</Button>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAppointments.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-gray-500 mb-2">No appointments found</div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of{" "}
                <span className="font-medium">{appointments.length}</span> appointments
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsList;
