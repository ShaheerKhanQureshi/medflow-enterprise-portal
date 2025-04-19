
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Edit, Calendar, User, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock doctor data
const doctorData = {
  id: "doctor-001",
  name: "Dr. Ahmed Khan",
  specialization: "Cardiologist",
  verified: true,
  pmdc: "PMDC-12345-K",
  email: "dr.ahmed.khan@medpractice.pk",
  phone: "+92 321 1234567",
  address: "Medical Plaza, Suite 203, Clifton, Karachi",
  website: "www.doctorahmed.pk",
  stats: {
    patients: 4825,
    experience: 15,
    rating: 4.8,
    reviews: 352
  },
  specializations: [
    "Interventional Cardiology",
    "Cardiac Imaging",
    "Heart Failure",
    "Preventive Cardiology"
  ],
  languages: ["English", "Urdu", "Punjabi"],
  bio: "Experienced cardiologist with over 15 years of practice specializing in interventional cardiology and cardiac imaging. Graduated from Aga Khan University Hospital with additional training from Royal College of Physicians, London.",
  experience: [
    {
      title: "Senior Consultant Cardiologist",
      institution: "Shifa International Hospital",
      period: "2018 - Present"
    },
    {
      title: "Consultant Cardiologist",
      institution: "South City Hospital",
      period: "2014 - 2018"
    },
    {
      title: "Associate Cardiologist",
      institution: "Aga Khan University Hospital",
      period: "2011 - 2014"
    }
  ],
  education: [
    {
      degree: "MBBS",
      institution: "Aga Khan University Hospital",
      year: "2005"
    },
    {
      degree: "FCPS (Cardiology)",
      institution: "College of Physicians and Surgeons Pakistan",
      year: "2011"
    },
    {
      degree: "Fellowship in Interventional Cardiology",
      institution: "Royal College of Physicians",
      year: "2013"
    }
  ]
};

const DoctorProfileView = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Doctor Profile</h2>
        <p className="text-muted-foreground">Manage and view your professional profile</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback>{doctorData.name.split(' ').slice(1).map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-center">{doctorData.name}</h3>
              <p className="text-muted-foreground">{doctorData.specialization}</p>
              
              <div className="flex items-center mt-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Verified</Badge>
              </div>
              
              <div className="text-sm text-center mt-2">
                <p>PMDC: {doctorData.pmdc}</p>
                <p className="mt-1">{doctorData.email}</p>
                <p className="mt-1">{doctorData.phone}</p>
                <p className="mt-1">{doctorData.address}</p>
                <p className="mt-1">{doctorData.website}</p>
              </div>
              
              <Button className="mt-4 w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold">{doctorData.stats.patients}</div>
                  <div className="text-sm text-muted-foreground">Patients</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold">{doctorData.stats.experience} yrs</div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold">{doctorData.stats.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold">{doctorData.stats.reviews}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </Card>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <h4 className="w-full text-lg font-semibold mb-2">Specializations</h4>
                {doctorData.specializations.map((specialization, index) => (
                  <Badge key={index} variant="secondary">{specialization}</Badge>
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {doctorData.languages.map((language, index) => (
                    <Badge key={index} variant="outline">{language}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{doctorData.bio}</p>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {doctorData.experience.map((exp, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <div className="text-muted-foreground">{exp.institution}</div>
                    <div className="text-sm mt-1">{exp.period}</div>
                    {index < doctorData.experience.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {doctorData.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold">{edu.degree}</h4>
                    <div className="text-muted-foreground">{edu.institution}</div>
                    <div className="text-sm mt-1">{edu.year}</div>
                    {index < doctorData.education.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qualifications">
          <Card>
            <CardHeader>
              <CardTitle>Qualifications & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold">Professional Certifications</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <Badge className="mt-1 mr-2" variant="outline">2013</Badge>
                      <div>
                        <div className="font-medium">Interventional Cardiology Certification</div>
                        <div className="text-sm text-muted-foreground">Royal College of Physicians, London</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge className="mt-1 mr-2" variant="outline">2011</Badge>
                      <div>
                        <div className="font-medium">Advanced Cardiac Life Support (ACLS)</div>
                        <div className="text-sm text-muted-foreground">American Heart Association</div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-lg font-semibold">Professional Memberships</h4>
                  <ul className="mt-2 space-y-2">
                    <li>Pakistan Cardiac Society</li>
                    <li>American College of Cardiology (International Associate)</li>
                    <li>European Society of Cardiology</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-lg font-semibold">Publications</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <Badge className="mt-1 mr-2" variant="outline">2019</Badge>
                      <div>
                        <div className="font-medium">Coronary Artery Disease in South Asian Population</div>
                        <div className="text-sm text-muted-foreground">Journal of Pakistan Medical Association</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Badge className="mt-1 mr-2" variant="outline">2016</Badge>
                      <div>
                        <div className="font-medium">Outcomes of PCI in Diabetic Patients</div>
                        <div className="text-sm text-muted-foreground">Pakistan Journal of Cardiology</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Monday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Morning: 9:00 AM - 1:00 PM</div>
                    <div className="text-sm mt-1">Evening: 5:00 PM - 8:00 PM</div>
                    <div className="text-sm text-muted-foreground mt-1">Shifa International Hospital</div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Tuesday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Morning: 10:00 AM - 2:00 PM</div>
                    <div className="text-sm mt-1">Evening: Off</div>
                    <div className="text-sm text-muted-foreground mt-1">Medical Plaza Clinic</div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Wednesday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Morning: 9:00 AM - 1:00 PM</div>
                    <div className="text-sm mt-1">Evening: 5:00 PM - 8:00 PM</div>
                    <div className="text-sm text-muted-foreground mt-1">Shifa International Hospital</div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Thursday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Morning: 9:00 AM - 12:00 PM</div>
                    <div className="text-sm mt-1">Evening: 6:00 PM - 9:00 PM</div>
                    <div className="text-sm text-muted-foreground mt-1">Medical Plaza Clinic</div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Friday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Morning: 11:00 AM - 1:00 PM</div>
                    <div className="text-sm mt-1">Evening: 5:00 PM - 7:00 PM</div>
                    <div className="text-sm text-muted-foreground mt-1">Shifa International Hospital</div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Saturday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Morning: 10:00 AM - 2:00 PM</div>
                    <div className="text-sm mt-1">Evening: Off</div>
                    <div className="text-sm text-muted-foreground mt-1">Medical Plaza Clinic</div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold">Sunday</h4>
                  <div className="mt-2">
                    <div className="text-sm">Off</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Patient Reviews</CardTitle>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">4.8</div>
                <div className="text-yellow-500">★★★★★</div>
                <div className="text-sm text-muted-foreground ml-2">({doctorData.stats.reviews} reviews)</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarFallback>FA</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Fatima Ahmed</div>
                        <div className="text-sm text-muted-foreground">April 15, 2025</div>
                      </div>
                    </div>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>
                  <p className="mt-2">
                    Dr. Khan is an exceptional cardiologist. He took the time to explain my condition in detail and made me feel at ease throughout the process. Highly recommended!
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Muhammad Rashid</div>
                        <div className="text-sm text-muted-foreground">March 28, 2025</div>
                      </div>
                    </div>
                    <div className="text-yellow-500">★★★★☆</div>
                  </div>
                  <p className="mt-2">
                    Very knowledgeable doctor with excellent bedside manner. Explained everything well but had to wait a bit longer than expected for the appointment.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Saima Ali</div>
                        <div className="text-sm text-muted-foreground">March 12, 2025</div>
                      </div>
                    </div>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>
                  <p className="mt-2">
                    Dr. Khan's expertise in cardiology is evident. He diagnosed my issue correctly when other doctors couldn't. The treatment plan has helped me recover significantly.
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View All Reviews</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorProfileView;
