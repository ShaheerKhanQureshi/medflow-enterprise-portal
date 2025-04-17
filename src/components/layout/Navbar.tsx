
import React from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  MessageSquare, 
  Menu, 
  Search, 
  User,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-8">
              <div className="relative rounded-md shadow-sm max-w-xs hidden sm:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="h-9 block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-2 ml-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="hidden md:flex md:flex-col md:items-start">
                    <span className="text-sm font-medium">Dr. John Doe</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/auth/login" className="w-full">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
