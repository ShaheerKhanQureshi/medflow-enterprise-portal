
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialization: z.string().min(1, "Specialization is required"),
  experience: z.string().min(1, "Years of experience is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  address: z.string().min(1, "Address is required"),
  bio: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const specializations = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology",
];

const AddDoctor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      licenseNumber: "",
      address: "",
      bio: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Doctor Added",
        description: `${data.firstName} ${data.lastName} was successfully added to the system.`,
      });
      navigate("/doctors");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/doctors")} className="-ml-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Doctors
          </Button>
          <h2 className="text-3xl font-bold tracking-tight mt-1">Add New Doctor</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Information</CardTitle>
              <CardDescription>
                Add a new doctor to the system. All required fields are marked with an asterisk (*).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
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
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="doctor@medflow.com" {...field} />
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
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select specialization" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {specializations.map((spec) => (
                                <SelectItem key={spec} value={spec}>
                                  {spec}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 8 years" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., MD12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Office Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Medical Plaza, Suite 100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Professional Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief professional biography and credentials"
                              className="min-h-[120px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" type="button" onClick={() => navigate("/doctors")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding Doctor..." : "Add Doctor"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>
                Upload a professional photo of the doctor.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="h-40 w-40 mb-6 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <Button variant="outline" size="sm">
                Upload Photo
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>
                Set the doctor's regular working hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Monday</span>
                <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tuesday</span>
                <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Wednesday</span>
                <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Thursday</span>
                <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Friday</span>
                <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Saturday</span>
                <span className="text-sm text-gray-500">Closed</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sunday</span>
                <span className="text-sm text-gray-500">Closed</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button variant="outline" size="sm">
                Customize Hours
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
