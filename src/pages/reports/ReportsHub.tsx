
import React, { useState } from "react";
import {
  FileBarChart,
  Download,
  Users,
  DollarSign,
  Calendar,
  FilePlus,
  ChevronRight,
  ClipboardList,
  BarChart,
  PieChart
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Report type definitions
type ReportType = {
  id: string;
  title: string;
  description: string;
  category: "financial" | "operational" | "clinical";
  icon: React.ElementType;
  lastGenerated?: string;
};

// Mock report data
const availableReports: ReportType[] = [
  {
    id: "financial-summary",
    title: "Financial Summary",
    description: "Overview of revenue, expenses, and profit over time",
    category: "financial",
    icon: DollarSign,
    lastGenerated: "2023-05-01"
  },
  {
    id: "claims-status",
    title: "Claims Status Report",
    description: "Status of all insurance claims by category",
    category: "financial",
    icon: ClipboardList,
    lastGenerated: "2023-04-28"
  },
  {
    id: "patient-visits",
    title: "Patient Visit Analytics",
    description: "Analysis of patient visits by doctor, department, and time",
    category: "operational",
    icon: Users,
    lastGenerated: "2023-05-02"
  },
  {
    id: "appointment-utilization",
    title: "Appointment Utilization",
    description: "Analysis of appointment scheduling and utilization",
    category: "operational",
    icon: Calendar
  },
  {
    id: "diagnosis-trends",
    title: "Diagnosis Trends",
    description: "Common diagnoses and medical trends over time",
    category: "clinical",
    icon: BarChart,
    lastGenerated: "2023-04-15"
  },
  {
    id: "patient-demographics",
    title: "Patient Demographics",
    description: "Breakdown of patient population by age, gender, location",
    category: "clinical",
    icon: PieChart
  }
];

const ReportsHub = () => {
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  
  const handleGenerateReport = () => {
    if (!selectedReportId) {
      toast.error("Please select a report to generate");
      return;
    }
    
    const selectedReport = availableReports.find(r => r.id === selectedReportId);
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${selectedReport?.title} has been generated successfully!`);
    }, 1500);
  };
  
  const filteredReports = currentTab === "all" 
    ? availableReports 
    : availableReports.filter(report => report.category === currentTab);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports Hub</h1>
          <p className="text-muted-foreground">
            Generate and analyze reports for your medical practice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableReports.length}</div>
            <div className="text-xs text-muted-foreground">
              Across {availableReports.filter(r => r.category === 'financial').length} financial, 
              {availableReports.filter(r => r.category === 'operational').length} operational, 
              and {availableReports.filter(r => r.category === 'clinical').length} clinical categories
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Financial Summary</div>
            <div className="text-xs text-muted-foreground">
              Generated 24 times in the last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">
              Next scheduled: Financial Summary (Tomorrow)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
              <TabsTrigger value="clinical">Clinical</TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.map((report) => (
                  <Card 
                    key={report.id} 
                    className={`cursor-pointer transition-all hover:border-primary ${selectedReportId === report.id ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setSelectedReportId(report.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md mr-3">
                            <report.icon className="h-5 w-5 text-primary" />
                          </div>
                          {report.title}
                        </div>
                        {report.lastGenerated && (
                          <Badge variant="outline" className="text-xs ml-2">
                            Recently Generated
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <Badge variant={
                          report.category === 'financial' ? 'default' : 
                          report.category === 'operational' ? 'secondary' : 
                          'outline'
                        }>
                          {report.category}
                        </Badge>
                        
                        <ChevronRight className={`h-5 w-5 transition-transform ${selectedReportId === report.id ? 'text-primary transform rotate-90' : 'text-muted-foreground'}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Report Options</CardTitle>
              <CardDescription>
                Configure and generate your selected report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedReportId ? (
                <>
                  <div className="space-y-2">
                    <Label>Report</Label>
                    <div className="p-2 border rounded-md bg-muted/50">
                      {availableReports.find(r => r.id === selectedReportId)?.title}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-from">Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="date-from" className="text-xs">From</Label>
                        <Input 
                          id="date-from"
                          type="date" 
                          value={dateRange.start}
                          onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="date-to" className="text-xs">To</Label>
                        <Input 
                          id="date-to"
                          type="date" 
                          value={dateRange.end}
                          onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="format">Format</Label>
                    <Select 
                      value={reportFormat} 
                      onValueChange={setReportFormat}
                    >
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      "Generating..."
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" /> 
                        Generate Report
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="py-8 text-center">
                  <FilePlus className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-4 text-muted-foreground">
                    Select a report from the left to configure and generate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsHub;
