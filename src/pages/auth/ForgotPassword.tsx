
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Validation Error",
        description: "Email address is required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "Please check your email for password reset instructions.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500">
          {isSubmitted 
            ? "Check your email for the password reset link"
            : "Enter your email to receive a password reset link"}
        </p>
      </div>

      {isSubmitted ? (
        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-6 text-center">
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900">Check your inbox</h3>
            <p className="mt-1 text-sm text-gray-500">
              We've sent a password reset link to <span className="font-medium">{email}</span>.
              The link will expire in 15 minutes.
            </p>
            
            <div className="mt-6">
              <Button variant="outline" className="mr-2" asChild>
                <Link to="/auth/login">Return to login</Link>
              </Button>
              
              <Button onClick={() => setIsSubmitted(false)}>
                Try another email
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="doctor@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending Instructions..." : "Send Reset Instructions"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
