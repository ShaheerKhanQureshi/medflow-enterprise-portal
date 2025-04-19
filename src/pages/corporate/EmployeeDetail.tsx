
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  UserRound,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  Shield,
  AlertTriangle,
  Pill,
  Heart,
  Users,
  Save,
  Edit,
  Trash,
  ArrowLeft,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Employee,
  Company,
  InsurancePlan,
} from "@/models/corporate";
import {
  employees,
  getCompanyById,
  getEmployeeById,
  getInsurancePlanById,
} from "@/data/corporateData";

// Form components will be used in edit mode
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Schema for employee form validation
const employeeFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  position: z.string().min(2, { message: "Position is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  address: z.object({
    street: z.string().min(2, { message: "Street is required" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State is required" }),
    zip: z.string().min(5, { message: "Valid ZIP code is required" }),
  }),
  emergencyContact: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    relationship: z.string().min(2, { message: "Relationship is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
  }),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

const EmployeeDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [insurancePlan, setInsurancePlan] = useState<InsurancePlan | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Setup form
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    },
  });

  // Load employee data
  useEffect(() => {
    if (!id) return;
    
    const employee = getEmployeeById(id);
    if (employee) {
      setEmployeeData(employee);
      
      // Get associated company and insurance plan
      const company = getCompanyById(employee.companyId);
      setCompanyData(company || null);
      
      const plan = getInsurancePlanById(employee.insurancePlanId);
      setInsurancePlan(plan || null);
      
      // Set form values
      form.reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        address: employee.address,
        emergencyContact: employee.emergencyContact,
      });
    }
    
    setLoading(false);
  }, [id, form]);

  const onSubmit = (values: EmployeeFormValues) => {
    // In a real app, this would make an API call
    toast({
      title: "Employee Updated",
      description: "Employee information has been updated successfully.",
    });
    
    // Exit edit mode
    navigate(`/corporate/employees/${id}`);
  };

  const handleDeleteEmployee = () => {
    // In a real app, this would make an API call
    toast({
      title: "Employee Deleted",
      description: "The employee has been deleted successfully.",
    });
    
    // Navigate back to employees list
    navigate("/corporate/employees");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <UserRound className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold">Employee Not Found</h2>
          <p className="mt-2 text-gray-500">The requested employee could not be found</p>
          <Button className="mt-4" asChild>
            <Link to="/corporate/employees">Back to Employees</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/corporate/employees">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {employeeData.firstName} {employeeData.lastName}
          </h1>
          <Badge variant="outline">{employeeData.position}</Badge>
        </div>
        
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link to={`/corporate/employees/${id}?edit=true`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => navigate(`/corporate/employees/${id}`)}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Employee Information</CardTitle>
            <CardDescription>Update the employee details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Job position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Department" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="ZIP code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="emergencyContact.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emergencyContact.relationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship</FormLabel>
                          <FormControl>
                            <Input placeholder="Relationship to employee" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserRound className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Full Name</div>
                    <div className="text-gray-500">
                      {employeeData.firstName} {employeeData.lastName}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href={`mailto:${employeeData.email}`} className="text-primary hover:underline">
                      {employeeData.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href={`tel:${employeeData.phone}`} className="text-primary hover:underline">
                      {employeeData.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Date of Birth</div>
                    <div className="text-gray-500">{new Date(employeeData.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-500">
                      {employeeData.address.street}<br />
                      {employeeData.address.city}, {employeeData.address.state} {employeeData.address.zip}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Company</div>
                    <div className="text-gray-500">
                      {companyData?.name || "Not Assigned"}
                      {companyData && (
                        <Button variant="link" size="sm" asChild className="p-0 h-auto">
                          <Link to={`/corporate/companies/${companyData.id}`}>
                            View Company
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserRound className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Position</div>
                    <div className="text-gray-500">{employeeData.position}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Department</div>
                    <div className="text-gray-500">{employeeData.department}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Hire Date</div>
                    <div className="text-gray-500">{new Date(employeeData.dateHired).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserRound className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Name</div>
                    <div className="text-gray-500">{employeeData.emergencyContact.name}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Relationship</div>
                    <div className="text-gray-500">{employeeData.emergencyContact.relationship}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href={`tel:${employeeData.emergencyContact.phone}`} className="text-primary hover:underline">
                      {employeeData.emergencyContact.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="insurance">
            <TabsList>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="dependents">Dependents</TabsTrigger>
              <TabsTrigger value="medicalHistory">Medical History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insurance" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>Current insurance plan and coverage details</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Change Plan
                  </Button>
                </CardHeader>
                <CardContent>
                  {!insurancePlan ? (
                    <div className="text-center py-10">
                      <Shield className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-4 text-lg font-medium">No Insurance Plan</h3>
                      <p className="text-gray-500 mt-2">This employee doesn't have an insurance plan assigned.</p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Assign Insurance Plan
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium">{insurancePlan.name}</h3>
                        <p className="text-gray-500">{insurancePlan.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Coverage Details</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Medical</span>
                                <span className="font-medium">{insurancePlan.coverage.medical}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Dental</span>
                                <span className="font-medium">{insurancePlan.coverage.dental}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Vision</span>
                                <span className="font-medium">{insurancePlan.coverage.vision}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Prescription</span>
                                <span className="font-medium">{insurancePlan.coverage.prescription}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Plan Details</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Monthly Premium</span>
                                <span className="font-medium">${insurancePlan.premium.monthly}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Employee Contribution</span>
                                <span className="font-medium">{insurancePlan.premium.employeeContribution}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Annual Deductible</span>
                                <span className="font-medium">${insurancePlan.deductible}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Out-of-Pocket Maximum</span>
                                <span className="font-medium">${insurancePlan.outOfPocketMax}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dependents" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Dependents</CardTitle>
                    <CardDescription>Family members covered under the insurance plan</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Dependent
                  </Button>
                </CardHeader>
                <CardContent>
                  {employeeData.dependents.length === 0 ? (
                    <div className="text-center py-10">
                      <Users className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-4 text-lg font-medium">No Dependents</h3>
                      <p className="text-gray-500 mt-2">This employee doesn't have any dependents registered.</p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Dependent
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            <th className="py-3 px-4 text-left font-medium">Name</th>
                            <th className="py-3 px-4 text-left font-medium">Relationship</th>
                            <th className="py-3 px-4 text-left font-medium">Date of Birth</th>
                            <th className="py-3 px-4 text-left font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeeData.dependents.map((dependent, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-4">{dependent.name}</td>
                              <td className="py-3 px-4">{dependent.relationship}</td>
                              <td className="py-3 px-4">{new Date(dependent.dateOfBirth).toLocaleDateString()}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medicalHistory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Medical Conditions</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {employeeData.medicalHistory.conditions.length === 0 ? (
                      <div className="text-center py-6">
                        <Heart className="h-10 w-10 text-gray-400 mx-auto" />
                        <p className="mt-2 text-gray-500">No medical conditions recorded</p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {employeeData.medicalHistory.conditions.map((condition, index) => (
                          <li key={index} className="flex items-center justify-between p-2 rounded-md border">
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span>{condition}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Allergies</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {employeeData.medicalHistory.allergies.length === 0 ? (
                      <div className="text-center py-6">
                        <AlertTriangle className="h-10 w-10 text-gray-400 mx-auto" />
                        <p className="mt-2 text-gray-500">No allergies recorded</p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {employeeData.medicalHistory.allergies.map((allergy, index) => (
                          <li key={index} className="flex items-center justify-between p-2 rounded-md border">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span>{allergy}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Medications</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {employeeData.medicalHistory.medications.length === 0 ? (
                      <div className="text-center py-6">
                        <Pill className="h-10 w-10 text-gray-400 mx-auto" />
                        <p className="mt-2 text-gray-500">No medications recorded</p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {employeeData.medicalHistory.medications.map((medication, index) => (
                          <li key={index} className="flex items-center justify-between p-2 rounded-md border">
                            <div className="flex items-center gap-2">
                              <Pill className="h-4 w-4 text-blue-500" />
                              <span>{medication}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium">{employeeData.firstName} {employeeData.lastName}</span>'s record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEmployee}>
              Yes, Delete Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDetail;
