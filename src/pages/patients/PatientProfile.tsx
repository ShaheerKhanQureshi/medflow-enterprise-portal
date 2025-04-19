import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Printer, MessageSquare, FileText, Edit, Save, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Mock patient data store - this would be replaced with API calls in a real app
let patientsData = [
  {
    id: "patient-001",
    name: "Ayesha Malik",
    age: 48,
    gender: "Female",
    phone: "+92 321 1234567",
    email: "ayesha.malik@example.com",
    lastVisit: "2023-10-15",
    primaryCondition: "Hypertension",
    medications: [
      { name: "Cetirizine 10mg", instructions: "Once daily" },
      { name: "Montelukast 10mg", instructions: "Once daily at bedtime" },
      { name: "Fluticasone Nasal Spray", instructions: "2 sprays each nostril daily" },
    ],
    allergies: [
      { allergen: "Penicillin", severity: "Severe" },
      { allergen: "Dust", severity: "Moderate" },
      { allergen: "Pollen", severity: "Moderate" },
    ],
    lastVisitDetails: "Follow-up appointment for allergies. Patient reports improvement with prescribed medications.",
    timeline: [
      {
        date: "October 15, 2023",
        time: "10:30 AM",
        type: "Follow-up Appointment",
        description: "Allergy follow-up with Dr. Khan"
      },
      {
        date: "September 3, 2023",
        time: "9:00 AM",
        type: "Initial Consultation",
        description: "Diagnosed with seasonal allergies"
      },
      {
        date: "September 3, 2023",
        time: "9:45 AM",
        type: "Prescription",
        description: "Antihistamine prescribed"
      },
      {
        date: "July 12, 2023",
        time: "2:15 PM",
        type: "Annual Physical",
        description: "All vitals normal"
      },
      {
        date: "July 12, 2023",
        time: "3:00 PM",
        type: "Blood Work",
        description: "Samples collected for routine testing"
      },
    ],
    latestDiagnosis: {
      date: "2023-10-15",
      description: "Patient presented with symptoms of seasonal allergies. Prescribed antihistamine medication."
    }
  },
  {
    id: "1",
    name: "Emma Wilson",
    age: 35,
    gender: "Female",
    phone: "(555) 123-4567",
    email: "emma.wilson@example.com",
    lastVisit: "2025-04-10",
    primaryCondition: "Asthma",
    medications: [
      { name: "Albuterol Inhaler", instructions: "As needed" },
      { name: "Fluticasone Inhaler", instructions: "Twice daily" }
    ],
    allergies: [
      { allergen: "Aspirin", severity: "Moderate" },
      { allergen: "Shellfish", severity: "Severe" }
    ],
    lastVisitDetails: "Patient presented with shortness of breath. Inhaler technique reviewed.",
    timeline: [
      {
        date: "April 10, 2025",
        time: "11:15 AM",
        type: "Follow-up Appointment",
        description: "Asthma management review"
      },
      {
        date: "February 15, 2025",
        time: "10:00 AM",
        type: "Initial Consultation",
        description: "Asthma diagnosis confirmed"
      }
    ],
    latestDiagnosis: {
      date: "2025-04-10",
      description: "Mild asthma exacerbation triggered by seasonal allergies. Advised to continue current medications."
    }
  }
];

// Zod schema for patient form validation
const patientFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().int().min(1, "Age must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  primaryCondition: z.string(),
  lastVisitDetails: z.string(),
});

// Schema for medication form
const medicationFormSchema = z.object({
  name: z.string().min(2, "Medication name is required"),
  instructions: z.string().min(2, "Instructions are required"),
});

// Schema for allergy form
const allergyFormSchema = z.object({
  allergen: z.string().min(2, "Allergen name is required"),
  severity: z.enum(["Mild", "Moderate", "Severe"]),
});

const PatientProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State for delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // States for medication and allergy management
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);
  const [editingMedicationIndex, setEditingMedicationIndex] = useState<number | null>(null);
  const [editingAllergyIndex, setEditingAllergyIndex] = useState<number | null>(null);

  // Find patient data
  const patientData = patientsData.find(patient => patient.id === id);

  // Handle if patient not found
  if (!patientData) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Patient Not Found</h3>
          <p>The patient you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate("/patients")} className="mt-4">
            Return to Patients List
          </Button>
        </div>
      </div>
    );
  }

  // Setup form for patient data
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      phone: patientData.phone,
      email: patientData.email,
      primaryCondition: patientData.primaryCondition,
      lastVisitDetails: patientData.lastVisitDetails,
    },
  });

  // Setup form for medication
  const medicationForm = useForm<z.infer<typeof medicationFormSchema>>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: "",
      instructions: "",
    },
  });

  // Setup form for allergy
  const allergyForm = useForm<z.infer<typeof allergyFormSchema>>({
    resolver: zodResolver(allergyFormSchema),
    defaultValues: {
      allergen: "",
      severity: "Moderate",
    },
  });

  // Functions for CRUD operations
  const handleSavePatient = (values: z.infer<typeof patientFormSchema>) => {
    // Update the patient data in our mock store
    patientsData = patientsData.map(patient => 
      patient.id === id ? { ...patient, ...values } : patient
    );
    
    setIsEditing(false);
    toast({
      title: "Patient Updated",
      description: "Patient information has been successfully updated.",
    });
  };

  const handleDeletePatient = () => {
    // Remove the patient from our mock store
    patientsData = patientsData.filter(patient => patient.id !== id);
    
    toast({
      title: "Patient Deleted",
      description: "Patient has been successfully removed from the system.",
    });
    
    // Navigate back to patients list
    navigate("/patients");
  };

  const handleAddMedication = (values: z.infer<typeof medicationFormSchema>) => {
    const updatedPatient = { ...patientData };
    updatedPatient.medications.push(values);
    
    patientsData = patientsData.map(patient => 
      patient.id === id ? updatedPatient : patient
    );
    
    setIsAddingMedication(false);
    medicationForm.reset();
    
    toast({
      title: "Medication Added",
      description: "New medication has been added to the patient's record.",
    });
  };

  const handleEditMedication = (index: number, values: z.infer<typeof medicationFormSchema>) => {
    const updatedPatient = { ...patientData };
    updatedPatient.medications[index] = values;
    
    patientsData = patientsData.map(patient => 
      patient.id === id ? updatedPatient : patient
    );
    
    setEditingMedicationIndex(null);
    medicationForm.reset();
    
    toast({
      title: "Medication Updated",
      description: "Medication information has been updated.",
    });
  };

  const handleDeleteMedication = (index: number) => {
    const updatedPatient = { ...patientData };
    updatedPatient.medications = updatedPatient.medications.filter((_, i) => i !== index);
    
    patientsData = patientsData.map(patient => 
      patient.id === id ? updatedPatient : patient
    );
    
    toast({
      title: "Medication Removed",
      description: "Medication has been removed from the patient's record.",
    });
  };

  const handleAddAllergy = (values: z.infer<typeof allergyFormSchema>) => {
    const updatedPatient = { ...patientData };
    updatedPatient.allergies.push(values);
    
    patientsData = patientsData.map(patient => 
      patient.id === id ? updatedPatient : patient
    );
    
    setIsAddingAllergy(false);
    allergyForm.reset();
    
    toast({
      title: "Allergy Added",
      description: "New allergy has been added to the patient's record.",
    });
  };

  const handleEditAllergy = (index: number, values: z.infer<typeof allergyFormSchema>) => {
    const updatedPatient = { ...patientData };
    updatedPatient.allergies[index] = values;
    
    patientsData = patientsData.map(patient => 
      patient.id === id ? updatedPatient : patient
    );
    
    setEditingAllergyIndex(null);
    allergyForm.reset();
    
    toast({
      title: "Allergy Updated",
      description: "Allergy information has been updated.",
    });
  };

  const handleDeleteAllergy = (index: number) => {
    const updatedPatient = { ...patientData };
    updatedPatient.allergies = updatedPatient.allergies.filter((_, i) => i !== index);
    
    patientsData = patientsData.map(patient => 
      patient.id === id ? updatedPatient : patient
    );
    
    toast({
      title: "Allergy Removed",
      description: "Allergy has been removed from the patient's record.",
    });
  };

  const handlePrintRecords = () => {
    window.print();
    toast({
      title: "Printing records",
      description: "Patient records sent to printer.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarFallback>{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {isEditing ? (
            <div className="space-y-2 w-full max-w-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSavePatient)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="primaryCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Condition</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{patientData.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="secondary">{patientData.primaryCondition}</Badge>
                <span className="text-muted-foreground">
                  {patientData.age} years • {patientData.gender}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {patientData.phone} • {patientData.email}
              </div>
              <div className="text-sm mt-1">
                Last visit: {patientData.lastVisit || "Unknown"}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={handlePrintRecords}>
                <Printer className="mr-2 h-4 w-4" />
                Print Records
              </Button>
              <Button variant="default" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Patient
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteConfirmation(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          ) : null}
        </div>
      </div>

      <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Patient</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this patient? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeletePatient}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="vital-signs">Vital Signs</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Latest Diagnosis</CardTitle>
                  <div className="text-sm text-muted-foreground">{patientData.latestDiagnosis.date}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{patientData.latestDiagnosis.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Current Medications</CardTitle>
                  <div className="text-sm text-muted-foreground">Updated {patientData.lastVisit}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => {
                  setIsAddingMedication(true);
                  medicationForm.reset();
                }}>
                  + Add
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {patientData.medications.map((med, index) => (
                    <li key={index} className="pb-3 border-b last:border-0 last:pb-0">
                      {editingMedicationIndex === index ? (
                        <Form {...medicationForm}>
                          <form onSubmit={medicationForm.handleSubmit((values) => handleEditMedication(index, values))} className="space-y-3">
                            <FormField
                              control={medicationForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Medication Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={medicationForm.control}
                              name="instructions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Instructions</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-end space-x-2 pt-2">
                              <Button variant="outline" type="button" onClick={() => setEditingMedicationIndex(null)}>
                                Cancel
                              </Button>
                              <Button type="submit">Save</Button>
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{med.name}</div>
                            <div className="text-sm text-muted-foreground">{med.instructions}</div>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => {
                              medicationForm.reset({
                                name: med.name,
                                instructions: med.instructions
                              });
                              setEditingMedicationIndex(index);
                            }}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteMedication(index)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {patientData.medications.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No medications recorded
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle>Allergies</CardTitle>
                <Button size="sm" variant="outline" onClick={() => {
                  setIsAddingAllergy(true);
                  allergyForm.reset();
                }}>
                  + Add
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {patientData.allergies.map((allergy, index) => (
                    <li key={index} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                      {editingAllergyIndex === index ? (
                        <Form {...allergyForm}>
                          <form onSubmit={allergyForm.handleSubmit((values) => handleEditAllergy(index, values))} className="space-y-3 w-full">
                            <FormField
                              control={allergyForm.control}
                              name="allergen"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Allergen</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={allergyForm.control}
                              name="severity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Severity</FormLabel>
                                  <FormControl>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      {...field}
                                    >
                                      <option value="Mild">Mild</option>
                                      <option value="Moderate">Moderate</option>
                                      <option value="Severe">Severe</option>
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-end space-x-2 pt-2">
                              <Button variant="outline" type="button" onClick={() => setEditingAllergyIndex(null)}>
                                Cancel
                              </Button>
                              <Button type="submit">Save</Button>
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <>
                          <span>{allergy.allergen}</span>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline"
                              className={allergy.severity === "Severe" ? "border-red-500 text-red-500" : allergy.severity === "Moderate" ? "border-yellow-500 text-yellow-500" : "border-green-500 text-green-500"}
                            >
                              {allergy.severity}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => {
                                allergyForm.reset({
                                  allergen: allergy.allergen,
                                  severity: allergy.severity as "Mild" | "Moderate" | "Severe"
                                });
                                setEditingAllergyIndex(index);
                              }}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteAllergy(index)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {patientData.allergies.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No allergies recorded
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Last Visit Details</CardTitle>
                  <div className="text-sm text-muted-foreground">{patientData.lastVisit}</div>
                </div>
                {!isEditing && (
                  <Button size="sm" variant="outline" onClick={() => {
                    setIsEditing(true);
                    form.setValue("lastVisitDetails", patientData.lastVisitDetails);
                  }}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <p>{patientData.lastVisitDetails}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {patientData.timeline.map((event, index) => (
                    <div key={index} className="relative pl-6 pb-6 border-l border-gray-200 last:pb-0">
                      <div className="absolute left-0 top-0 bg-primary w-2 h-2 rounded-full -translate-x-1"></div>
                      <div className="font-medium">{event.date}</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                      <div className="font-medium mt-2">{event.type}</div>
                      <div className="text-sm">{event.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="medical-history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Chronic Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Hypertension</Badge>
                    <Badge variant="outline">Seasonal Allergies</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Past Surgeries</h3>
                  <p className="text-muted-foreground">No past surgeries recorded</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Family Medical History</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Father: Hypertension</li>
                    <li>Mother: Type 2 Diabetes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vital-signs">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-sm text-muted-foreground">Blood Pressure</div>
                    <div className="text-2xl font-bold mt-1">120/80</div>
                    <div className="text-xs text-muted-foreground mt-1">Last checked: {patientData.lastVisit}</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-sm text-muted-foreground">Heart Rate</div>
                    <div className="text-2xl font-bold mt-1">72 bpm</div>
                    <div className="text-xs text-muted-foreground mt-1">Last checked: {patientData.lastVisit}</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    <div className="text-2xl font-bold mt-1">98.6 °F</div>
                    <div className="text-xs text-muted-foreground mt-1">Last checked: {patientData.lastVisit}</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-sm text-muted-foreground">Respiratory Rate</div>
                    <div className="text-2xl font-bold mt-1">16 rpm</div>
                    <div className="text-xs text-muted-foreground mt-1">Last checked: {patientData.lastVisit}</div>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Vital Signs History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium py-2">Date</th>
                            <th className="text-left font-medium py-2">Blood Pressure</th>
                            <th className="text-left font-medium py-2">Heart Rate</th>
                            <th className="text-left font-medium py-2">Temperature</th>
                            <th className="text-left font-medium py-2">Respiratory Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">2023-10-15</td>
                            <td className="py-2">120/80</td>
                            <td className="py-2">72 bpm</td>
                            <td className="py-2">98.6 °F</td>
                            <td className="py-2">16 rpm</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">2023-09-03</td>
                            <td className="py-2">118/78</td>
                            <td className="py-2">74 bpm</td>
                            <td className="py-2">98.4 °F</td>
                            <td className="py-2">15 rpm</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">2023-07-12</td>
                            <td className="py-2">122/82</td>
                            <td className="py-2">70 bpm</td>
                            <td className="py-2">98.8 °F</td>
                            <td className="py-2">16 rpm</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-4 hover:bg-muted/50 cursor-pointer flex items-start">
                  <FileText className="h-6 w-6 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Blood Test Results</div>
                    <div className="text-sm text-muted-foreground">July 12, 2023</div>
                  </div>
                </div>
                <div className="border rounded-md p-4 hover:bg-muted/50 cursor-pointer flex items-start">
                  <FileText className="h-6 w-6 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Medical Certificate</div>
                    <div className="text-sm text-muted-foreground">September 3, 2023</div>
                  </div>
                </div>
                <div className="border rounded-md p-4 hover:bg-muted/50 cursor-pointer flex items-start">
                  <FileText className="h-6 w-6 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Prescription</div>
                    <div className="text-sm text-muted-foreground">October 15, 2023</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messaging">
          <Card>
            <CardHeader>
              <CardTitle>Messaging</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium">No recent messages</h3>
                <p className="text-muted-foreground mt-2">
                  You haven't exchanged any messages with this patient yet.
                </p>
                <Button className="mt-4">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddingMedication} onOpenChange={setIsAddingMedication}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <DialogDescription>
              Add details of the new medication for this patient.
            </DialogDescription>
          </DialogHeader>
          <Form {...medicationForm}>
            <form onSubmit={medicationForm.handleSubmit(handleAddMedication)} className="space-y-4">
              <FormField
                control={medicationForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Amoxicillin 500mg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={medicationForm.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Take twice daily with food" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddingMedication(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Medication</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAddingAllergy} onOpenChange={setIsAddingAllergy}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Allergy</DialogTitle>
            <DialogDescription>
              Record a new allergy for this patient.
            </DialogDescription>
          </DialogHeader>
          <Form {...allergyForm}>
            <form onSubmit={allergyForm.handleSubmit(handleAddAllergy)} className="space-y-4">
              <FormField
                control={allergyForm.control}
                name="allergen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergen</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Penicillin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={allergyForm.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddingAllergy(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Allergy</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientProfile;
