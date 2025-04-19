
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Building, 
  Search, 
  Plus, 
  ChevronRight,
  Eye,
  Edit,
  Trash
} from "lucide-react";
import { companies, getEmployeesByCompanyId } from "@/data/corporateData";
import { useToast } from "@/hooks/use-toast";

const CompaniesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCompany = (companyId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Company Deletion",
      description: "This would delete the company in a real application.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-gray-500">Manage all registered companies</p>
        </div>
        <Button asChild>
          <Link to="/corporate/companies/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Companies List</CardTitle>
          <CardDescription>View and manage all corporate clients</CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search companies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No companies found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => {
                    const employeeCount = getEmployeesByCompanyId(company.id).length;
                    
                    return (
                      <TableRow key={company.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-gray-400" />
                            <span className="font-medium">{company.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>
                          <div>
                            <div>{company.contactPerson.name}</div>
                            <div className="text-sm text-gray-500">{company.contactPerson.position}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employeeCount}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            company.billingInfo.accountStatus === "Active" ? "bg-green-100 text-green-800" :
                            company.billingInfo.accountStatus === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {company.billingInfo.accountStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/corporate/companies/${company.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/corporate/companies/${company.id}?edit=true`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleDeleteCompany(company.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompaniesList;
