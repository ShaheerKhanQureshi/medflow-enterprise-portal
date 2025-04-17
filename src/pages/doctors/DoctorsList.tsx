
import React from "react";
import { Plus, Search, Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const doctors = [
    { 
      id: "1", 
      name: "Dr. Ahmed Khan", 
      specialization: "Cardiology", 
      email: "dr.ahmed.khan@medpractice.pk", 
      phone: "+92 321 1234567", 
      status: "active" 
    },
    { 
      id: "2", 
      name: "Dr. Sarah Ahmed", 
      specialization: "Neurology", 
      email: "dr.sarah@medpractice.pk", 
      phone: "+92 333 9876543", 
      status: "away" 
    },
    { 
      id: "3", 
      name: "Dr. Ali Hassan", 
      specialization: "Orthopedics", 
      email: "dr.ali@medpractice.pk", 
      phone: "+92 300 1122334", 
      status: "inactive" 
    },
    { 
      id: "4", 
      name: "Dr. Fatima Zahra", 
      specialization: "Pediatrics", 
      email: "dr.fatima@medpractice.pk", 
      phone: "+92 311 4455667", 
      status: "active" 
    },
    { 
      id: "5", 
      name: "Dr. Usman Malik", 
      specialization: "Dermatology", 
      email: "dr.usman@medpractice.pk", 
      phone: "+92 344 7788990", 
      status: "active" 
    },
  ];

  const viewDoctorProfile = (id: string) => {
    navigate(`/doctors/${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "away":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Away</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
        <Button asChild>
          <Link to="/doctors/add">
            <Plus className="mr-2 h-4 w-4" /> Add Doctor
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Doctors</CardTitle>
          <CardDescription>
            Manage your doctors and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search doctors..." className="pl-8" />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-16 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow 
                    key={doctor.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => viewDoctorProfile(doctor.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 mr-2 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        {doctor.name}
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell className="hidden md:table-cell">{doctor.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{doctor.phone}</TableCell>
                    <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <span className="sr-only">Open menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            viewDoctorProfile(doctor.id);
                          }}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorsList;
