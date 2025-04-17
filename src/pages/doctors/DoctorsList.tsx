
import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  UserPlus,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    email: "sarah.johnson@medflow.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    patients: 153,
    experience: "8 years",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialization: "Neurology",
    email: "michael.brown@medflow.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    patients: 127,
    experience: "12 years",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Dr. John Smith",
    specialization: "Dermatology",
    email: "john.smith@medflow.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    patients: 98,
    experience: "5 years",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Dr. Elizabeth Davis",
    specialization: "Pediatrics",
    email: "elizabeth.davis@medflow.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    patients: 201,
    experience: "15 years",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Dr. Robert Wilson",
    specialization: "Orthopedics",
    email: "robert.wilson@medflow.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    patients: 175,
    experience: "10 years",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Dr. Jennifer Martinez",
    specialization: "Ophthalmology",
    email: "jennifer.martinez@medflow.com",
    phone: "+1 (555) 678-9012",
    status: "inactive",
    patients: 112,
    experience: "7 years",
    rating: 4.6,
  },
  {
    id: 7,
    name: "Dr. William Taylor",
    specialization: "Psychiatry",
    email: "william.taylor@medflow.com",
    phone: "+1 (555) 789-0123",
    status: "active",
    patients: 143,
    experience: "9 years",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Dr. Patricia Anderson",
    specialization: "Endocrinology",
    email: "patricia.anderson@medflow.com",
    phone: "+1 (555) 890-1234",
    status: "active",
    patients: 132,
    experience: "11 years",
    rating: 4.7,
  },
];

const DoctorsList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);
  const { toast } = useToast();

  const filteredDoctors = React.useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === null || doctor.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const handleStatusToggle = (doctorId: number, newStatus: string) => {
    toast({
      title: `Doctor status updated`,
      description: `Doctor status has been changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
        <Button asChild>
          <Link to="/doctors/add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Doctor
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Doctors</CardTitle>
          <CardDescription>
            Manage your registered doctors, view profiles, edit details or deactivate accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
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
                    <th className="px-4 py-3 text-left font-medium">Specialization</th>
                    <th className="px-4 py-3 text-left font-medium">Contact</th>
                    <th className="px-4 py-3 text-left font-medium">Experience</th>
                    <th className="px-4 py-3 text-left font-medium">Patients</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {doctor.name.split(' ')[1][0]}
                          </div>
                          <div>
                            <div className="font-medium">{doctor.name}</div>
                            <div className="text-sm text-muted-foreground">{doctor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {doctor.specialization}
                        </span>
                      </td>
                      <td className="px-4 py-3">{doctor.phone}</td>
                      <td className="px-4 py-3">{doctor.experience}</td>
                      <td className="px-4 py-3">{doctor.patients}</td>
                      <td className="px-4 py-3">
                        {doctor.status === "active" ? (
                          <div className="flex items-center gap-1.5 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <XCircle className="h-4 w-4" />
                            <span>Inactive</span>
                          </div>
                        )}
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
                            <DropdownMenuItem>
                              <Link to={`/doctors/${doctor.id}`} className="flex w-full items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/doctors/edit/${doctor.id}`} className="flex w-full items-center">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusToggle(doctor.id, doctor.status === "active" ? "inactive" : "active")}>
                              {doctor.status === "active" ? (
                                <>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDoctors.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-gray-500 mb-2">No doctors found</div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
                <span className="font-medium">8</span> doctors
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

export default DoctorsList;
