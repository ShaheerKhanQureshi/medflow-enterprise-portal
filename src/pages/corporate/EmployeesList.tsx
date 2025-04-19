
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  Search,
  Filter,
  UserRound,
  Mail,
  Building,
  Shield,
  Eye
} from "lucide-react";
import { 
  employees, 
  companies, 
  insurancePlans, 
  getCompanyById, 
  getInsurancePlanById 
} from "@/data/corporateData";

const EmployeesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  
  // Filtered employees based on search term and company filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany ? employee.companyId === filterCompany : true;
    
    return matchesSearch && matchesCompany;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-gray-500">Manage employee information and benefits</p>
        </div>
        <Button asChild>
          <Link to="/corporate/employees/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employees Directory</CardTitle>
          <CardDescription>View all employees enrolled in corporate healthcare plans</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search employees by name, email, position..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-10">
              <Users className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-4 text-lg font-medium">No Employees Found</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm || filterCompany 
                  ? "No employees match your current search or filter criteria."
                  : "There are no employees registered in the system yet."}
              </p>
              <Button className="mt-4" asChild>
                <Link to="/corporate/employees/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Insurance Plan</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => {
                    const company = getCompanyById(employee.companyId);
                    const insurancePlan = getInsurancePlanById(employee.insurancePlanId);
                    
                    return (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserRound className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{employee.email}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span>{company?.name || "Unknown"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Badge variant="outline">{employee.department}</Badge>
                            <span className="text-sm text-gray-500">{employee.position}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Shield className="h-4 w-4 text-primary" />
                            <span>{insurancePlan?.name || "None"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(employee.dateHired).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/corporate/employees/${employee.id}`}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmployeesList;
