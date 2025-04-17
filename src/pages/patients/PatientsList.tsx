
import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Mock patient data
const patients = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 123-4567",
    age: 35,
    gender: "Female",
    lastVisit: "2025-04-10",
    status: "active"
  },
  {
    id: 2,
    name: "John Miller",
    email: "john.miller@example.com",
    phone: "(555) 234-5678",
    age: 42,
    gender: "Male",
    lastVisit: "2025-03-22",
    status: "active"
  },
  {
    id: 3,
    name: "Lucy Parker",
    email: "lucy.parker@example.com",
    phone: "(555) 345-6789",
    age: 28,
    gender: "Female",
    lastVisit: "2025-04-15",
    status: "inactive"
  },
  {
    id: 4,
    name: "David Turner",
    email: "david.turner@example.com",
    phone: "(555) 456-7890",
    age: 51,
    gender: "Male",
    lastVisit: "2025-02-05",
    status: "active"
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 567-8901",
    age: 33,
    gender: "Female",
    lastVisit: "2025-03-30",
    status: "active"
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 678-9012",
    age: 45,
    gender: "Male",
    lastVisit: "2025-04-12",
    status: "inactive"
  }
];

const PatientsList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);

  const filteredPatients = React.useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery);
      
      const matchesStatus = filterStatus === null || patient.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        <Button asChild>
          <Link to="/patients/add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Patient
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>
            Manage your patients, view profiles, and access medical records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
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
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                    <span className={filterStatus === "active" ? "font-medium" : ""}>Active</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>
                    <span className={filterStatus === "inactive" ? "font-medium" : ""}>Inactive</span>
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
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Contact</th>
                    <th className="px-4 py-3 text-left font-medium">Age</th>
                    <th className="px-4 py-3 text-left font-medium">Gender</th>
                    <th className="px-4 py-3 text-left font-medium">Last Visit</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{patient.name}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div>{patient.email}</div>
                        <div className="text-sm text-muted-foreground">{patient.phone}</div>
                      </td>
                      <td className="px-4 py-3">{patient.age}</td>
                      <td className="px-4 py-3">{patient.gender}</td>
                      <td className="px-4 py-3">{new Date(patient.lastVisit).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <Badge className={patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {patient.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/${patient.id}`}>View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/edit/${patient.id}`}>Edit Patient</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Medical History</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-gray-500 mb-2">No patients found</div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of{" "}
                <span className="font-medium">{patients.length}</span> patients
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

export default PatientsList;
