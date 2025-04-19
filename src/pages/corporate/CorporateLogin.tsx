
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

const CorporateLogin = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [companyId, setCompanyId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId || !password) {
      toast({
        title: "Validation Error",
        description: "Company ID and password are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Demo login - in a real app, this would check credentials from a backend
      if (companyId === "demo" && password === "demo123") {
        toast({
          title: "Success",
          description: "You have successfully logged in as a corporate user.",
        });
        navigate("/corporate/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid corporate credentials. Try demo/demo123.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-center gap-2 text-center">
        <Shield className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Corporate Portal</h1>
        <p className="text-gray-500">Enter your corporate credentials to access your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyId">Company ID</Label>
          <Input 
            id="companyId" 
            placeholder="Enter your company ID" 
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/auth/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">Remember me</Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login to Corporate Portal"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p>For demo access, use: <strong>demo / demo123</strong></p>
        <p className="mt-2">
          Regular user? <Link to="/auth/login" className="text-primary hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default CorporateLogin;
