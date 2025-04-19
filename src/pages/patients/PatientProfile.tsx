
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Printer, MessageSquare, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock patient data
const patientData = {
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
};

const PatientProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
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
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintRecords}>
            <Printer className="mr-2 h-4 w-4" />
            Print Records
          </Button>
          <Button variant="default">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>
      </div>

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
              <CardHeader>
                <CardTitle>Latest Diagnosis</CardTitle>
                <div className="text-sm text-muted-foreground">{patientData.latestDiagnosis.date}</div>
              </CardHeader>
              <CardContent>
                <p>{patientData.latestDiagnosis.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <div className="text-sm text-muted-foreground">Updated {patientData.lastVisit}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {patientData.medications.map((med, index) => (
                    <li key={index}>
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-muted-foreground">{med.instructions}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {patientData.allergies.map((allergy, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{allergy.allergen}</span>
                      <Badge 
                        variant="outline"
                        className={allergy.severity === "Severe" ? "border-red-500 text-red-500" : "border-yellow-500 text-yellow-500"}
                      >
                        {allergy.severity}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Last Visit Details</CardTitle>
                <div className="text-sm text-muted-foreground">{patientData.lastVisit}</div>
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
    </div>
  );
};

export default PatientProfile;
