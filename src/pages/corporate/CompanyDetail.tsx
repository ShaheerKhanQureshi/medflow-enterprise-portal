
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
import { DialogTrigger } from "@/components/ui/dialog";
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
  Building,
  Users,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Calendar,
  CreditCard,
  Edit,
  Trash,
  ArrowLeft,
  Plus,
  Save,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  companies, 
  employees, 
  getCompanyById, 
  getEmployeesByCompanyId,
  getInsurancePlansForCompany
} from "@/data/corporateData";
import { Company } from "@/models/corporate";

// Schema for company form validation
const companyFormSchema = z.object({
  name: z.string().min(2, { message: "Company name is required" }),
  industry: z.string().min(2, { message: "Industry is required" }),
  address: z.object({
    street: z.string().min(2, { message: "Street is required" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State is required" }),
    zip: z.string().min(5, { message: "Valid ZIP code is required" }),
  }),
  contactPerson: z.object({
    name: z.string().min(2, { message: "Contact name is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    position: z.string().min(2, { message: "Position is required" }),
  }),
  website: z.string().url({ message: "Valid website URL is required" }),
  employeeCount: z.number().int().positive({ message: "Must be a positive number" }),
});

const CompanyDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  type CompanyFormValues = z.infer<typeof companyFormSchema>;
  
  // Setup form
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      industry: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      contactPerson: {
        name: "",
        phone: "",
        email: "",
        position: "",
      },
      website: "",
      employeeCount: 0,
    },
  });

  // Load company data
  useEffect(() => {
    if (!id) return;
    
    const company = getCompanyById(id);
    if (company) {
      setCompanyData(company);
      // Set form values
      form.reset({
        name: company.name,
        industry: company.industry,
        address: company.address,
        contactPerson: company.contactPerson,
        website: company.website,
        employeeCount: company.employeeCount,
      });
    }
    
    setLoading(false);
  }, [id, form]);

  const companyEmployees = companyData ? getEmployeesByCompanyId(companyData.id) : [];
  const insurancePlans = companyData ? getInsurancePlansForCompany(companyData.id) : [];

  const onSubmit = (values: CompanyFormValues) => {
    // In a real app, this would make an API call
    toast({
      title: "Company Updated",
      description: "Company information has been updated successfully.",
    });
    
    // Exit edit mode
    navigate(`/corporate/companies/${id}`);
  };

  const handleDeleteCompany = () => {
    // In a real app, this would make an API call
    toast({
      title: "Company Deleted",
      description: "The company has been deleted successfully.",
    });
    
    // Navigate back to companies list
    navigate("/corporate/companies");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold">Company Not Found</h2>
          <p className="mt-2 text-gray-500">The requested company could not be found</p>
          <Button className="mt-4" asChild>
            <Link to="/corporate/companies">Back to Companies</Link>
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
            <Link to="/corporate/companies">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{companyData.name}</h1>
          <Badge variant="outline">{companyData.industry}</Badge>
        </div>
        
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" asChild>
                <Link to={`/corporate/companies/${id}?edit=true`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => navigate(`/corporate/companies/${id}`)}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Company Information</CardTitle>
            <CardDescription>Update the company details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter industry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee Count</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Number of employees" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Person</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactPerson.name"
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
                      name="contactPerson.position"
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
                      name="contactPerson.email"
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
                      name="contactPerson.phone"
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
                  </div>
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
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Company Name</div>
                    <div className="text-gray-500">{companyData.name}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Industry</div>
                    <div className="text-gray-500">{companyData.industry}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Employees</div>
                    <div className="text-gray-500">{companyData.employeeCount} registered</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Website</div>
                    <a 
                      href={companyData.website.startsWith('http') ? companyData.website : `https://${companyData.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {companyData.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Registered Date</div>
                    <div className="text-gray-500">{new Date(companyData.registeredDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-500">
                      {companyData.address.street}<br />
                      {companyData.address.city}, {companyData.address.state} {companyData.address.zip}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Contact Person</div>
                    <div className="text-gray-500">
                      {companyData.contactPerson.name}<br />
                      {companyData.contactPerson.position}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href={`mailto:${companyData.contactPerson.email}`} className="text-primary hover:underline">
                      {companyData.contactPerson.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href={`tel:${companyData.contactPerson.phone}`} className="text-primary hover:underline">
                      {companyData.contactPerson.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Payment Method</div>
                    <div className="text-gray-500">{companyData.billingInfo.paymentMethod}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Next Billing Date</div>
                    <div className="text-gray-500">{new Date(companyData.subscription.nextBillingDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Subscription Plan</div>
                    <div className="text-gray-500">{companyData.subscription.plan}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Annual Amount</div>
                    <div className="text-gray-500">${companyData.subscription.amount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant={
                    companyData.billingInfo.accountStatus === "Active" ? "success" : 
                    companyData.billingInfo.accountStatus === "Pending" ? "warning" : 
                    "destructive"
                  }>
                    {companyData.billingInfo.accountStatus}
                  </Badge>
                </div>
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Company Employees</CardTitle>
                    <CardDescription>Employees enrolled in insurance plans</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/corporate/employees/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Employee
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {companyEmployees.length === 0 ? (
                    <div className="text-center py-10">
                      <Users className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-4 text-lg font-medium">No Employees Found</h3>
                      <p className="text-gray-500 mt-2">This company doesn't have any registered employees yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/corporate/employees/add">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Employee
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            <th className="py-3 px-4 text-left font-medium">Name</th>
                            <th className="py-3 px-4 text-left font-medium">Position</th>
                            <th className="py-3 px-4 text-left font-medium">Department</th>
                            <th className="py-3 px-4 text-left font-medium">Email</th>
                            <th className="py-3 px-4 text-left font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companyEmployees.map((employee) => (
                            <tr key={employee.id} className="border-b">
                              <td className="py-3 px-4 font-medium">
                                {employee.firstName} {employee.lastName}
                              </td>
                              <td className="py-3 px-4">{employee.position}</td>
                              <td className="py-3 px-4">{employee.department}</td>
                              <td className="py-3 px-4">{employee.email}</td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/corporate/employees/${employee.id}`}>
                                    View Details
                                  </Link>
                                </Button>
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
            
            <TabsContent value="insurance" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Insurance Plans</CardTitle>
                    <CardDescription>Plans offered to employees</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Plan
                  </Button>
                </CardHeader>
                <CardContent>
                  {insurancePlans.length === 0 ? (
                    <div className="text-center py-10">
                      <Shield className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-4 text-lg font-medium">No Insurance Plans</h3>
                      <p className="text-gray-500 mt-2">This company doesn't offer any insurance plans yet.</p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Insurance Plan
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insurancePlans.map((plan) => (
                        <Card key={plan.id}>
                          <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Monthly Premium:</span>
                                <span className="font-medium">${plan.premium.monthly}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Medical Coverage:</span>
                                <span className="font-medium">{plan.coverage.medical}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Dental Coverage:</span>
                                <span className="font-medium">{plan.coverage.dental}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Vision Coverage:</span>
                                <span className="font-medium">{plan.coverage.vision}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Prescription Coverage:</span>
                                <span className="font-medium">{plan.coverage.prescription}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Annual Deductible:</span>
                                <span className="font-medium">${plan.deductible}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Out-of-Pocket Max:</span>
                                <span className="font-medium">${plan.outOfPocketMax}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Edit Plan</Button>
                            <Button variant="destructive">Remove</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
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
              Are you sure you want to delete <span className="font-medium">{companyData.name}</span>? This action cannot be undone and will remove all associated employee records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>
              Yes, Delete Company
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyDetail;
