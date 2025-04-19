
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserRound,
  MessageSquare,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
  CircleDot,
  FileBarChart,
  BarChart,
  UserPlus,
  FilePlus,
  Building,
  Briefcase,
  Shield
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: { title: string; href: string }[];
  roles?: string[];
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const [userRole, setUserRole] = React.useState("admin"); // In real app, this would come from auth context

  // Define common and role-specific navigation items
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: userRole === "admin" ? "/admin/dashboard" : 
            userRole === "patient" ? "/patients/dashboard" :
            userRole === "corporate" ? "/corporate/dashboard" : "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: Calendar,
      submenu: [
        { title: "All Appointments", href: "/appointments" },
        { title: "Calendar View", href: "/appointments/calendar" },
      ],
      roles: ["admin", "doctor", "patient"],
    },
    {
      title: "Doctors",
      href: "/doctors",
      icon: UserRound,
      submenu: [
        { title: "All Doctors", href: "/doctors" },
        { title: "Add Doctor", href: "/doctors/add" },
      ],
      roles: ["admin"],
    },
    {
      title: "Patients",
      href: "/patients",
      icon: Users,
      submenu: [
        { title: "All Patients", href: "/patients" },
        { title: "Add Patient", href: "/patients/add" },
      ],
      roles: ["admin", "doctor"],
    },
    {
      title: "Corporate",
      href: "/corporate/dashboard",
      icon: Building,
      submenu: [
        { title: "Dashboard", href: "/corporate/dashboard" },
        { title: "Companies", href: "/corporate/companies" },
        { title: "Employees", href: "/corporate/employees" },
        { title: "Insurance Plans", href: "/corporate/insurance-plans" },
      ],
      roles: ["admin", "corporate"],
    },
    {
      title: "Messaging",
      href: "/messaging",
      icon: MessageSquare,
      roles: ["admin", "doctor", "patient", "corporate"],
    },
    {
      title: "Claims",
      href: "/claims",
      icon: FileText,
      submenu: [
        { title: "All Claims", href: "/claims" },
        { title: "Submit Claim", href: "/claims/submit" },
      ],
      roles: ["admin", "doctor", "patient", "corporate"],
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileBarChart,
      roles: ["admin", "doctor", "corporate"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["admin", "doctor", "patient", "corporate"],
    },
  ];

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  // Filter navigation items based on user role
  const filteredNavItems = userRole === "admin" 
    ? navItems 
    : navItems.filter(item => !item.roles || item.roles.includes(userRole));

  // Add function to change user role (for demo purposes)
  const changeUserRole = (role: string) => {
    setUserRole(role);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-20",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className={cn("flex items-center py-4 px-4", isOpen ? "justify-between" : "justify-center")}>
        <Link to="/dashboard" className="flex items-center">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold text-primary">MedFlow</span>
            </div>
          ) : (
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      
      {/* Demo role switcher - this would not exist in a real app */}
      {isOpen && (
        <div className="mx-4 p-2 mb-2 bg-gray-100 rounded">
          <p className="text-xs font-medium mb-1 text-gray-500">Demo: Switch Role</p>
          <div className="flex flex-wrap gap-1">
            <button 
              onClick={() => changeUserRole('admin')} 
              className={cn(
                "text-xs px-2 py-1 rounded flex-1 transition-colors", 
                userRole === 'admin' ? "bg-primary text-white" : "bg-gray-200"
              )}
            >
              Admin
            </button>
            <button 
              onClick={() => changeUserRole('doctor')} 
              className={cn(
                "text-xs px-2 py-1 rounded flex-1 transition-colors", 
                userRole === 'doctor' ? "bg-primary text-white" : "bg-gray-200"
              )}
            >
              Doctor
            </button>
            <button 
              onClick={() => changeUserRole('patient')} 
              className={cn(
                "text-xs px-2 py-1 rounded flex-1 transition-colors", 
                userRole === 'patient' ? "bg-primary text-white" : "bg-gray-200"
              )}
            >
              Patient
            </button>
            <button 
              onClick={() => changeUserRole('corporate')} 
              className={cn(
                "text-xs px-2 py-1 rounded flex-1 transition-colors", 
                userRole === 'corporate' ? "bg-primary text-white" : "bg-gray-200"
              )}
            >
              Corporate
            </button>
          </div>
        </div>
      )}
      
      <div className="flex-1 pt-2 pb-4 overflow-y-auto scroll-hidden">
        <nav className="flex-1 px-2 space-y-1">
          {filteredNavItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm rounded-md group transition-all",
                      isActive(item.href) ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn("flex-shrink-0 h-5 w-5 mr-3", isOpen ? "" : "mx-auto")} />
                    {isOpen && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "ml-3 h-4 w-4 transition-transform",
                            openSubmenu === item.title && "transform rotate-90"
                          )}
                        />
                      </>
                    )}
                  </button>
                  {isOpen && openSubmenu === item.title && (
                    <div className="pl-10 pt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                            isActive(subItem.href)
                              ? "bg-primary/10 text-primary"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          <CircleDot className="h-2 w-2 mr-3" />
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md group transition-colors",
                    isActive(item.href) ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                    !isOpen && "justify-center"
                  )}
                >
                  <item.icon className={cn("flex-shrink-0 h-5 w-5", isOpen ? "mr-3" : "mx-auto")} />
                  {isOpen && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="px-2 py-4 border-t border-gray-200">
        <Link
          to="/auth/login"
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className={cn("h-5 w-5", isOpen ? "mr-3" : "mx-auto")} />
          {isOpen && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
