
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Calendar, 
  User, 
  DollarSign, 
  FileCheck, 
  Send, 
  Paperclip, 
  Clock 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Define the form schema using Zod
const claimFormSchema = z.object({
  patientId: z.string().min(1, "Patient selection is required"),
  serviceDate: z.string().min(1, "Service date is required"),
  claimType: z.string().min(1, "Claim type is required"),
  diagnosisCodes: z.string().min(1, "At least one diagnosis code is required"),
  procedureCodes: z.string().min(1, "At least one procedure code is required"),
  amountClaimed: z.string().min(1, "Amount is required"),
  notes: z.string().optional(),
  providerNotes: z.string().optional(),
});

// Mock data for dropdowns
const patients = [
  { id: "1", name: "Ali Khan" },
  { id: "2", name: "Fatima Ahmed" },
  { id: "3", name: "Muhammad Waseem" },
  { id: "4", name: "Ayesha Malik" },
];

const claimTypes = ["Primary", "Secondary", "Tertiary", "Corrected"];

const SubmitClaim = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof claimFormSchema>>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      patientId: "",
      serviceDate: new Date().toISOString().split("T")[0],
      claimType: "",
      diagnosisCodes: "",
      procedureCodes: "",
      amountClaimed: "",
      notes: "",
      providerNotes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof claimFormSchema>) => {
    console.log("Claim submitted:", values);
    toast.success("Claim submitted successfully!");
    
    // In a real implementation, we would submit to backend here
    setTimeout(() => {
      navigate("/claims");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Submit New Claim</h1>
          <p className="text-muted-foreground">
            Complete the form below to submit a new insurance claim.
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Draft
        </Badge>
      </div>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="codes-billing">Codes & Billing</TabsTrigger>
          <TabsTrigger value="attachments">Attachments & Notes</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
            <TabsContent value="basic-info">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Patient & Service Information
                  </CardTitle>
                  <CardDescription>
                    Enter the basic information about the patient and services provided.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a patient" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {patients.map(patient => (
                                <SelectItem key={patient.id} value={patient.id}>
                                  {patient.name}
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
                      name="serviceDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="claimType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Claim Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select claim type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {claimTypes.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codes-billing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Diagnosis & Billing Codes
                  </CardTitle>
                  <CardDescription>
                    Enter all applicable diagnosis and procedure codes along with billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="diagnosisCodes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diagnosis Codes (ICD-10)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="E.g., J45.901, I10" />
                          </FormControl>
                          <FormDescription>Separate multiple codes with commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="procedureCodes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Procedure Codes (CPT/HCPCS)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="E.g., 99213, 85025" />
                          </FormControl>
                          <FormDescription>Separate multiple codes with commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amountClaimed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount Claimed (Rs)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                              <Input {...field} placeholder="0.00" type="number" step="0.01" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Paperclip className="h-5 w-5 mr-2" />
                    Additional Information & Attachments
                  </CardTitle>
                  <CardDescription>
                    Upload any supporting documents and add additional notes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 hover:border-primary/50 transition-colors text-center cursor-pointer">
                      <Paperclip className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, PNG (MAX. 10MB)
                      </p>
                      <input type="file" className="hidden" />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes for Insurance</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any additional information that should be included with this claim..."
                              className="min-h-[120px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="providerNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provider Notes (Internal Only)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Notes visible only to the provider staff..."
                              className="min-h-[120px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => navigate('/claims')}>
                Cancel
              </Button>
              <Button type="submit" className="gap-1">
                <Send className="h-4 w-4" />
                Submit Claim
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default SubmitClaim;
