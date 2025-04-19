
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  Users, 
  FileText, 
  Calendar, 
  Shield, 
  ArrowRight, 
  UserPlus,
  ChevronRight
} from "lucide-react";
import { companies, employees, insurancePlans } from "@/data/corporateData";
import { Company } from "@/models/corporate";

const CorporateDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [corporateData, setCorporateData] = useState<Company | null>(null);

  // Simulate API loading
  useEffect(() => {
    // Demo user is always the "demo" company
    const demoCompany = companies.find(company => company.id === "demo");
    
    setTimeout(() => {
      setCorporateData(demoCompany || null);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!corporateData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold">Corporate Data Not Found</h2>
          <p className="mt-2 text-gray-500">Unable to load corporate information</p>
          <Button className="mt-4" asChild>
            <Link to="/auth/corporate-login">Back to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const companyEmployees = employees.filter(emp => emp.companyId === corporateData.id);
  const availablePlans = insurancePlans.filter(plan => 
    corporateData.insurancePlans.includes(plan.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{corporateData.name} Dashboard</h1>
          <p className="text-gray-500">Manage your company's healthcare information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/corporate/employees/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
          <Button asChild>
            <Link to="/corporate/companies/demo">
              View Company Profile
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyEmployees.length}</div>
            <p className="text-xs text-gray-500">Enrolled in healthcare plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Plans</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availablePlans.length}</div>
            <p className="text-xs text-gray-500">Available to employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(corporateData.subscription.nextBillingDate).toLocaleDateString()}</div>
            <p className="text-xs text-gray-500">{corporateData.subscription.plan} Plan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{corporateData.billingInfo.accountStatus}</div>
            <p className="text-xs text-gray-500">Subscription active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Plans</TabsTrigger>
        </TabsList>
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Employees</CardTitle>
              <CardDescription>Your most recently added employees</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Name</th>
                    <th className="py-3 px-4 text-left font-medium">Position</th>
                    <th className="py-3 px-4 text-left font-medium">Department</th>
                    <th className="py-3 px-4 text-left font-medium">Insurance Plan</th>
                    <th className="py-3 px-4 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companyEmployees.slice(0, 5).map((employee) => {
                    const insurancePlan = insurancePlans.find(plan => plan.id === employee.insurancePlanId);
                    
                    return (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="py-3 px-4">{employee.position}</td>
                        <td className="py-3 px-4">{employee.department}</td>
                        <td className="py-3 px-4">{insurancePlan?.name || "Not assigned"}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/corporate/employees/${employee.id}`}>
                              View <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t rounded-b-lg px-6 py-3">
              <Button variant="outline" asChild>
                <Link to="/corporate/employees">View all employees</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Insurance Plans</CardTitle>
              <CardDescription>Plans offered to your employees</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Plan Name</th>
                    <th className="py-3 px-4 text-left font-medium">Monthly Premium</th>
                    <th className="py-3 px-4 text-left font-medium">Medical Coverage</th>
                    <th className="py-3 px-4 text-left font-medium">Deductible</th>
                    <th className="py-3 px-4 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availablePlans.map((plan) => (
                    <tr key={plan.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{plan.name}</td>
                      <td className="py-3 px-4">${plan.premium.monthly.toFixed(2)}</td>
                      <td className="py-3 px-4">{plan.coverage.medical}%</td>
                      <td className="py-3 px-4">${plan.deductible.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t rounded-b-lg px-6 py-3">
              <Button variant="outline" asChild>
                <Link to="/corporate/insurance-plans">View all plans</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporateDashboard;
