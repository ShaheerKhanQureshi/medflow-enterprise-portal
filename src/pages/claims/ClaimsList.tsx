
import React from "react";
import { Link } from "react-router-dom";
import { FilePlus, Search, Filter, MoreHorizontal, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for claims
const claims = [
  {
    id: "CLM-2025-001",
    patientName: "Emma Wilson",
    doctorName: "Dr. Sarah Johnson",
    appointmentDate: "2025-04-10",
    amount: 250.00,
    status: "approved",
    submissionDate: "2025-04-12",
  },
  {
    id: "CLM-2025-002",
    patientName: "John Miller",
    doctorName: "Dr. Michael Brown",
    appointmentDate: "2025-04-05",
    amount: 175.50,
    status: "pending",
    submissionDate: "2025-04-07",
  },
  {
    id: "CLM-2025-003",
    patientName: "Lucy Parker",
    doctorName: "Dr. John Smith",
    appointmentDate: "2025-03-28",
    amount: 320.75,
    status: "rejected",
    submissionDate: "2025-03-30",
  },
  {
    id: "CLM-2025-004",
    patientName: "David Turner",
    doctorName: "Dr. Elizabeth Davis",
    appointmentDate: "2025-04-02",
    amount: 150.00,
    status: "approved",
    submissionDate: "2025-04-03",
  },
  {
    id: "CLM-2025-005",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Robert Wilson",
    appointmentDate: "2025-03-25",
    amount: 225.25,
    status: "pending",
    submissionDate: "2025-03-26",
  },
];

const ClaimsList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<string | null>(null);

  const filteredClaims = React.useMemo(() => {
    return claims.filter(claim => {
      const matchesSearch = 
        claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === null || claim.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Claims</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link to="/claims/submit">
              <FilePlus className="mr-2 h-4 w-4" />
              Submit Claim
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
          <CardDescription>
            View and manage insurance claims for medical services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                className="pl-8 w-full max-w-xs"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    {filterStatus && (
                      <Badge variant="secondary" className="ml-2 px-1 py-0 h-5">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                    <span className={filterStatus === null ? "font-medium" : ""}>All</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                    <span className={filterStatus === "approved" ? "font-medium" : ""}>Approved</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    <span className={filterStatus === "pending" ? "font-medium" : ""}>Pending</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
                    <span className={filterStatus === "rejected" ? "font-medium" : ""}>Rejected</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Claim ID</th>
                    <th className="px-4 py-3 text-left font-medium">Patient</th>
                    <th className="px-4 py-3 text-left font-medium">Doctor</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-sm">{claim.id}</td>
                      <td className="px-4 py-3">{claim.patientName}</td>
                      <td className="px-4 py-3">{claim.doctorName}</td>
                      <td className="px-4 py-3">{new Date(claim.appointmentDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">${claim.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        {getStatusBadge(claim.status)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/claims/${claim.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            {claim.status === "pending" && (
                              <>
                                <DropdownMenuItem>Approve Claim</DropdownMenuItem>
                                <DropdownMenuItem>Reject Claim</DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredClaims.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-gray-500 mb-2">No claims found</div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClaims.length}</span> of{" "}
                <span className="font-medium">{claims.length}</span> claims
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimsList;
