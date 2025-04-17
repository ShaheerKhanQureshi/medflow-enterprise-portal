
import React from "react";
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Award, 
  MessageSquare, 
  Star, 
  FileText, 
  Clock, 
  Edit, 
  Check 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DoctorProfile = () => {
  // In a real app, this data would come from the backend database
  const doctor = {
    id: "1",
    name: "Dr. Ahmed Khan",
    specialization: "Cardiologist",
    verified: true,
    registrationId: "PMDC-12345-K",
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
        organization: "Shifa International Hospital",
        period: "2018 - Present"
      },
      {
        title: "Consultant Cardiologist",
        organization: "South City Hospital",
        period: "2014 - 2018"
      },
      {
        title: "Associate Cardiologist",
        organization: "Aga Khan University Hospital",
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

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Doctor Profile</h1>
        <p className="text-gray-500">Manage and view your professional profile</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 md:mb-0 md:mr-6">
            <User size={64} />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-lg text-gray-600">{doctor.specialization}</p>
                <div className="flex items-center mt-2">
                  {doctor.verified && (
                    <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200 flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {doctor.registrationId}
                  </Badge>
                </div>
              </div>
              <Button className="mt-4 md:mt-0" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>{doctor.address}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-500" />
                <a href={`https://${doctor.website}`} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {doctor.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Patients</p>
                <h3 className="text-2xl font-bold">{doctor.stats.patients.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <User size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Experience</p>
                <h3 className="text-2xl font-bold">{doctor.stats.experience} yrs</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Clock size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <h3 className="text-2xl font-bold">{doctor.stats.rating}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Star size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Reviews</p>
                <h3 className="text-2xl font-bold">{doctor.stats.reviews}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <MessageSquare size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Specializations & Languages */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {doctor.specializations.map((spec, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <Badge key={index} variant="secondary">
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Tabbed content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Biography</h3>
                      <p className="text-gray-700">{doctor.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Experience</h3>
                      <div className="space-y-4">
                        {doctor.experience.map((exp, index) => (
                          <div key={index} className="relative pl-6 border-l-2 border-gray-200 pb-4">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                            <h4 className="font-medium">{exp.title}</h4>
                            <p className="text-gray-600">{exp.organization}</p>
                            <p className="text-sm text-gray-500">{exp.period}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Education</h3>
                      <div className="space-y-4">
                        {doctor.education.map((edu, index) => (
                          <div key={index} className="relative pl-6 border-l-2 border-gray-200 pb-4">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-500">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="qualifications">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Professional Qualifications</h3>
                    <div className="space-y-4">
                      {doctor.education.map((edu, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <div className="flex items-start">
                              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                                <Award size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium">{edu.degree}</h4>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-sm text-gray-500">{edu.year}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">Schedule Information</h3>
                    <p className="text-gray-500 mt-2">Doctor's availability schedule would appear here.</p>
                    <Button className="mt-4">
                      View Full Schedule
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">Patient Reviews</h3>
                    <p className="text-gray-500 mt-2">Patient reviews and feedback would appear here.</p>
                    <Button className="mt-4">
                      View All Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
