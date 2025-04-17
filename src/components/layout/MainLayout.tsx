
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
