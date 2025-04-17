
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left side - Banner */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 overflow-hidden">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded bg-white flex items-center justify-center">
            <span className="text-primary font-bold text-xl">M</span>
          </div>
          <span className="text-white font-bold text-2xl ml-2">MedFlow</span>
        </div>
        
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold text-white">Healthcare Management, Simplified</h2>
          <p className="text-blue-100 text-lg">
            Streamline your practice with our comprehensive healthcare management platform.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium text-lg">Smart Scheduling</h3>
              <p className="text-blue-100 text-sm mt-1">
                Intelligent appointment booking with automatic conflict detection.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium text-lg">Patient Records</h3>
              <p className="text-blue-100 text-sm mt-1">
                Secure and comprehensive electronic health records.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium text-lg">Billing & Claims</h3>
              <p className="text-blue-100 text-sm mt-1">
                Streamlined insurance claims and billing management.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium text-lg">Analytics</h3>
              <p className="text-blue-100 text-sm mt-1">
                Data-driven insights to optimize your practice.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-blue-100 text-sm">
          © 2025 MedFlow. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
