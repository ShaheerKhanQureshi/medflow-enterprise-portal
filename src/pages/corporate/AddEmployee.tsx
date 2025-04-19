
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { companies, insurancePlans } from "@/data/corporateData";

// Schema for employee form validation
const employeeFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { 
    message: "Valid date is required" 
  }),
  position: z.string().min(2, { message: "Position is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  companyId: z.string().min(1, { message: "Company selection is required" }),
  insurancePlanId: z.string().min(1, { message: "Insurance plan selection is required" }),
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

const AddEmployee = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCompany, setSelectedCompany] = useState("");

  // Get available insurance plans for the selected company
  const availableInsurancePlans = selectedCompany 
    ? insurancePlans.filter(plan => {
        const company = companies.find(c => c.id === selectedCompany);
        return company?.insurancePlans.includes(plan.id);
      })
    : [];

  // Setup form
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      position: "",
      department: "",
      companyId: "",
      insurancePlanId: "",
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

  const onSubmit = (values: EmployeeFormValues) => {
    // In a real app, this would make an API call
    console.log("Form submitted:", values);
    
    toast({
      title: "Employee Added",
      description: "The employee has been added successfully.",
    });
    
    // Navigate to employees list
    navigate("/corporate/employees");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/corporate/employees">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add Employee</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Employee Information</CardTitle>
          <CardDescription>Add a new employee to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name*</FormLabel>
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
                        <FormLabel>Last Name*</FormLabel>
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
                        <FormLabel>Email*</FormLabel>
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
                        <FormLabel>Phone*</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth*</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Employment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company*</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedCompany(value);
                              // Clear insurance plan when company changes
                              form.setValue("insurancePlanId", "");
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a company" />
                            </SelectTrigger>
                            <SelectContent>
                              {companies.map(company => (
                                <SelectItem key={company.id} value={company.id}>
                                  {company.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="insurancePlanId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Plan*</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!selectedCompany || availableInsurancePlans.length === 0}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={
                                !selectedCompany 
                                  ? "Select a company first" 
                                  : availableInsurancePlans.length === 0
                                  ? "No plans available" 
                                  : "Select an insurance plan"
                              } />
                            </SelectTrigger>
                            <SelectContent>
                              {availableInsurancePlans.map(plan => (
                                <SelectItem key={plan.id} value={plan.id}>
                                  {plan.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                        {selectedCompany && availableInsurancePlans.length === 0 && (
                          <FormDescription>
                            The selected company doesn't have any insurance plans available
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position*</FormLabel>
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
                        <FormLabel>Department*</FormLabel>
                        <FormControl>
                          <Input placeholder="Department" {...field} />
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
                        <FormLabel>Street*</FormLabel>
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
                        <FormLabel>City*</FormLabel>
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
                        <FormLabel>State*</FormLabel>
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
                        <FormLabel>ZIP Code*</FormLabel>
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
                        <FormLabel>Name*</FormLabel>
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
                        <FormLabel>Relationship*</FormLabel>
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
                        <FormLabel>Phone*</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate("/corporate/employees")}>
                  Cancel
                </Button>
                <Button type="submit">
                  <User className="mr-2 h-4 w-4" /> Add Employee
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployee;
