
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Shield,
  Search,
  Plus,
  Edit,
  Trash,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insurancePlans } from "@/data/corporateData";
import { InsurancePlan } from "@/models/corporate";

const InsurancePlansList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredPlans = insurancePlans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePlan = () => {
    // In a real app, this would make an API call
    toast({
      title: "Plan Deleted",
      description: "The insurance plan has been deleted successfully.",
    });
    
    setPlanToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insurance Plans</h1>
          <p className="text-gray-500">Manage healthcare insurance plans for your companies</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Insurance Plans</CardTitle>
          <CardDescription>View and manage all insurance plans in the system</CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search plans..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <Shield className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-4 text-lg font-medium">No Plans Found</h3>
                <p className="text-gray-500 mt-2">
                  No insurance plans match your search criteria.
                </p>
              </div>
            ) : (
              filteredPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <CardDescription className="mt-1">{plan.description}</CardDescription>
                      </div>
                      <Badge className="bg-primary">${plan.premium.monthly}/mo</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Coverage</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span>Medical</span>
                            <span className="font-medium">{plan.coverage.medical}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Dental</span>
                            <span className="font-medium">{plan.coverage.dental}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Vision</span>
                            <span className="font-medium">{plan.coverage.vision}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Prescription</span>
                            <span className="font-medium">{plan.coverage.prescription}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Plan Details</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span>Deductible</span>
                            <span className="font-medium">${plan.deductible}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Out-of-Pocket Max</span>
                            <span className="font-medium">${plan.outOfPocketMax}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Employee Contribution</span>
                            <span className="font-medium">{plan.premium.employeeContribution}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Employer Contribution</span>
                            <span className="font-medium">{plan.premium.employerContribution}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-gray-50 py-3">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600" 
                      onClick={() => setPlanToDelete(plan.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!planToDelete} onOpenChange={() => setPlanToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this insurance plan? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setPlanToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePlan}>
              Yes, Delete Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsurancePlansList;
