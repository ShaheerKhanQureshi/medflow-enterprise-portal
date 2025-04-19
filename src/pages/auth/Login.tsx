
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

const demoAccounts = [
  { role: "Admin", email: "admin@demo.com", password: "demo123" },
  { role: "Doctor", email: "doctor@demo.com", password: "demo123" },
  { role: "Patient", email: "patient@demo.com", password: "demo123" },
  { role: "Corporate", email: "corporate@demo.com", password: "demo123" },
];

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login and role detection
    const demoAccount = demoAccounts.find(account => account.email === email && account.password === password);
    
    setTimeout(() => {
      setIsLoading(false);
      if (demoAccount) {
        toast({
          title: "Success",
          description: `Logged in as ${demoAccount.role}`,
        });
        // Redirect based on role
        switch (demoAccount.role.toLowerCase()) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "doctor":
            navigate("/doctors/profile/1");
            break;
          case "patient":
            navigate("/patients/dashboard");
            break;
          case "corporate":
            navigate("/corporate/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please try again or use a demo account.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const setDemoAccount = (role: string) => {
    const account = demoAccounts.find(acc => acc.role === role);
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Sign In</h1>
        <p className="text-gray-400">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Link 
              to="/auth/forgot-password" 
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          <LogIn className="mr-2" />
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">Demo Accounts</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account) => (
            <Button
              key={account.role}
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              onClick={() => setDemoAccount(account.role)}
            >
              {account.role}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-400 hover:text-blue-300">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;
