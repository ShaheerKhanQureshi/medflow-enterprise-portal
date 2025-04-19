
import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Building, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema for company form validation
const companyFormSchema = z.object({
  name: z.string().min(2, { message: "Company name is required" }),
  industry: z.string().min(2, { message: "Industry is required" }),
  website: z.string().url({ message: "Valid website URL is required" }),
  employeeCount: z.number().int().positive({ message: "Must be a positive number" }),
  address: z.object({
    street: z.string().min(2, { message: "Street is required" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State is required" }),
    zip: z.string().min(5, { message: "Valid ZIP code is required" }),
  }),
  contactPerson: z.object({
    name: z.string().min(2, { message: "Contact name is required" }),
    position: z.string().min(2, { message: "Position is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
  }),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

const AddCompany = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Setup form
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      industry: "",
      website: "https://",
      employeeCount: 1,
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      contactPerson: {
        name: "",
        position: "",
        email: "",
        phone: "",
      },
    },
  });

  const onSubmit = (values: CompanyFormValues) => {
    // In a real app, this would make an API call
    console.log("Form submitted:", values);
    
    toast({
      title: "Company Created",
      description: "The company has been added successfully.",
    });
    
    // Navigate to companies list
    navigate("/corporate/companies");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/corporate/companies">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add Company</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Add a new company to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name*</FormLabel>
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
                        <FormLabel>Industry*</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g. Healthcare, Technology" {...field} />
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
                        <FormLabel>Website*</FormLabel>
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
                        <FormLabel>Number of Employees*</FormLabel>
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
                  <h3 className="text-lg font-medium mb-4">Company Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address*</FormLabel>
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
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactPerson.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person*</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
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
                          <FormLabel>Position*</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. HR Manager" {...field} />
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
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@example.com" {...field} />
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
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate("/corporate/companies")}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Building className="mr-2 h-4 w-4" /> Create Company
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCompany;
