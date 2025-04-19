
import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Printer, Download, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock data for the claim details
const claimData = {
  id: "CLM-2025-001",
  status: "pending",
  submissionDate: "2023-10-15",
  lastUpdated: "2025-04-17",
  patientName: "Fatima Ahmed",
  patientId: "patient-001",
  totalAmount: 3500,
  currency: "₨",
  insurancePlan: "EFU Health Insurance",
  provider: {
    name: "Dr. Ali Khan",
    id: "practitioner-001"
  },
  diagnosis: [
    {
      name: "Dengue fever",
      code: "A90"
    }
  ],
  services: [
    {
      name: "Consultation, established patient",
      code: "99213",
      date: "2023-10-10",
      quantity: 1,
      amount: 3500
    }
  ],
  insurance: {
    plan: "EFU Health Insurance",
    coverageId: "coverage-001",
    authRef: "auth-001"
  }
};

const ClaimDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "Report downloaded",
      description: `Claim ${id} has been downloaded successfully.`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Claim {claimData.id}</h2>
          <div className="flex items-center mt-2 gap-2">
            {getStatusBadge(claimData.status)}
            <span className="text-muted-foreground">
              Submitted on {claimData.submissionDate}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast({ title: "Claim approved" })}>
                Approve Claim
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Claim rejected" })}>
                Reject Claim
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Notification sent" })}>
                Request Additional Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Claim Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Claim Status</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(claimData.status)}
                  <span>Last updated on {claimData.lastUpdated}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Patient</h3>
                <div className="text-lg font-medium">{claimData.patientName}</div>
                <div className="text-muted-foreground">Patient ID: {claimData.patientId}</div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Total Amount</h3>
                <div className="text-2xl font-bold">{claimData.currency} {claimData.totalAmount.toLocaleString()}</div>
                <div className="text-muted-foreground">{claimData.insurancePlan}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Claim Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <span className="text-sm">1</span>
                </div>
                <div>
                  <div className="font-medium">Submitted</div>
                  <div className="text-sm text-muted-foreground">{claimData.submissionDate}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <span className="text-sm">2</span>
                </div>
                <div>
                  <div className="font-medium">Under Review</div>
                  <div className="text-sm text-muted-foreground">{claimData.lastUpdated}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                  <span className="text-sm">3</span>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Processing</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                  <span className="text-sm">4</span>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Completed</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
          <div className="text-muted-foreground">Information about the healthcare services provided</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Provider Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Provider</div>
                  <div className="font-medium">{claimData.provider.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Provider ID</div>
                  <div className="font-medium">{claimData.provider.id}</div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Diagnosis</h3>
              {claimData.diagnosis.map((diagnosis, index) => (
                <div key={index} className="mb-2">
                  <div className="text-sm text-muted-foreground">Diagnosis {index + 1}</div>
                  <div className="font-medium">
                    {diagnosis.name}
                    <span className="ml-2 font-mono text-sm text-muted-foreground">{diagnosis.code}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Services & Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-2">Service</th>
                      <th className="text-left font-medium py-2">Date</th>
                      <th className="text-left font-medium py-2">Quantity</th>
                      <th className="text-right font-medium py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimData.services.map((service, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">
                          <div>{service.name}</div>
                          <div className="text-xs font-mono text-muted-foreground">{service.code}</div>
                        </td>
                        <td className="py-2">{service.date}</td>
                        <td className="py-2">{service.quantity}</td>
                        <td className="py-2 text-right">{claimData.currency} {service.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2 font-medium" colSpan={3}>Total</td>
                      <td className="py-2 text-right font-bold">{claimData.currency} {claimData.totalAmount.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Insurance Information</h3>
              <div className="text-muted-foreground mb-3">Details about the insurance coverage for this claim</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Insurance Plan</div>
                  <div className="font-medium">{claimData.insurance.plan}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Coverage ID</div>
                  <div className="font-medium">{claimData.insurance.coverageId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pre-Authorization Reference</div>
                  <div className="font-medium">{claimData.insurance.authRef}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimDetail;
