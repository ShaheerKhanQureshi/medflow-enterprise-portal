
import React from "react";
import { FileText, Download, Filter, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for reports
const mockReports = [
  {
    id: "RPT-2023-001",
    title: "Monthly Patient Statistics",
    description: "Overview of patient demographics and visit frequency",
    category: "Administrative",
    createdBy: "Dr. John Smith",
    createdAt: "2025-04-01",
    status: "Ready",
    fileSize: "1.2 MB",
    fileType: "PDF"
  },
  {
    id: "RPT-2023-002",
    title: "Quarterly Financial Summary",
    description: "Financial performance for Q1 2025",
    category: "Financial",
    createdBy: "Finance Department",
    createdAt: "2025-03-31",
    status: "Ready",
    fileSize: "3.5 MB",
    fileType: "Excel"
  },
  {
    id: "RPT-2023-003",
    title: "Staff Performance Evaluation",
    description: "Annual staff performance metrics",
    category: "HR",
    createdBy: "HR Department",
    createdAt: "2025-03-15",
    status: "Ready",
    fileSize: "2.8 MB",
    fileType: "PDF"
  },
  {
    id: "RPT-2023-004",
    title: "Medication Usage Analysis",
    description: "Analysis of most prescribed medications",
    category: "Clinical",
    createdBy: "Dr. Emily Chen",
    createdAt: "2025-03-10",
    status: "Ready",
    fileSize: "4.2 MB",
    fileType: "PDF"
  },
  {
    id: "RPT-2023-005",
    title: "Patient Satisfaction Survey Results",
    description: "Q1 2025 patient satisfaction survey analysis",
    category: "Administrative",
    createdBy: "Quality Department",
    createdAt: "2025-03-05",
    status: "Ready",
    fileSize: "1.8 MB",
    fileType: "PDF"
  }
];

// Mock data for patient reports
const patientReports = [
  {
    id: "PAT-RPT-001",
    patientName: "Sarah Johnson",
    title: "Blood Work Results",
    doctor: "Dr. Michael Chen",
    createdAt: "2025-04-03",
    status: "Ready",
    fileSize: "1.5 MB",
    fileType: "PDF"
  },
  {
    id: "PAT-RPT-002",
    patientName: "Robert Williams",
    title: "MRI Scan Report",
    doctor: "Dr. Emily Wong",
    createdAt: "2025-03-25",
    status: "Ready",
    fileSize: "8.2 MB",
    fileType: "DICOM"
  },
  {
    id: "PAT-RPT-003",
    patientName: "Jennifer Smith",
    title: "Annual Physical Summary",
    doctor: "Dr. John Doe",
    createdAt: "2025-03-20",
    status: "Ready",
    fileSize: "2.1 MB",
    fileType: "PDF"
  }
];

const ReportsHub = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const handleDownload = (reportId: string, reportTitle: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${reportTitle}...`,
    });
    
    // Simulate a download process
    setTimeout(() => {
      const blob = new Blob(["Sample report content"], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download complete",
        description: `${reportTitle} has been downloaded successfully.`,
      });
    }, 2000);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating report",
      description: "Your report is being generated. This may take a few moments.",
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report generated",
        description: "Your new report is ready to download.",
      });
    }, 3000);
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || report.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports Hub</h2>
        <p className="text-muted-foreground">
          Access, download, and generate medical and administrative reports
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="patient">Patient Reports</TabsTrigger>
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative">
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Administrative">Administrative</SelectItem>
                <SelectItem value="Clinical">Clinical</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <p className="text-muted-foreground">No reports found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <Card key={report.id} className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="mt-1">{report.description}</CardDescription>
                      </div>
                      <Badge>{report.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>ID:</span>
                        <span>{report.id}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Created by:</span>
                        <span>{report.createdBy}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Date:</span>
                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>File info:</span>
                        <span>{report.fileSize} • {report.fileType}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handleDownload(report.id, report.title)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="patient" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {patientReports.map((report) => (
              <Card key={report.id} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription className="mt-1">Patient: {report.patientName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>ID:</span>
                      <span>{report.id}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Doctor:</span>
                      <span>{report.doctor}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Date:</span>
                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>File info:</span>
                      <span>{report.fileSize} • {report.fileType}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleDownload(report.id, report.title)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Create a custom report based on your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient-summary">Patient Summary</SelectItem>
                      <SelectItem value="financial">Financial Report</SelectItem>
                      <SelectItem value="staff">Staff Report</SelectItem>
                      <SelectItem value="medication">Medication Usage</SelectItem>
                      <SelectItem value="appointment">Appointment Statistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-format">Output Format</Label>
                  <Select>
                    <SelectTrigger id="report-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-from">Date Range (From)</Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="date-from" 
                      type="date" 
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-to">Date Range (To)</Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="date-to" 
                      type="date" 
                      className="w-full" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="report-description">Additional Notes</Label>
                  <Input 
                    id="report-description" 
                    placeholder="Provide any additional information..." 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsHub;
