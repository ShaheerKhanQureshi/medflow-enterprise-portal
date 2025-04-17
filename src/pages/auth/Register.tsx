
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient"
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
      navigate("/auth/login");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe" 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@example.com" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select 
            value={formData.role} 
            onValueChange={handleRoleChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="patient">Patient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password"
            name="password" 
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password"
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••" 
            required 
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
