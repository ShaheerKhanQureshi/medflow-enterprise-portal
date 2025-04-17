import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  MessageSquare, 
  Menu, 
  Search, 
  User,
  ChevronDown,
  Sun,
  Moon
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/hooks/use-theme";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New appointment request", time: "5 minutes ago", read: false },
    { id: 2, title: "Appointment confirmed", time: "1 hour ago", read: false },
    { id: 3, title: "Medical record updated", time: "2 hours ago", read: true },
  ]);
  
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Jane Smith", content: "About the patient in room 302...", time: "10 minutes ago", read: false },
    { id: 2, sender: "Nurse Wilson", content: "Lab results are ready", time: "30 minutes ago", read: false },
    { id: 3, sender: "Reception", content: "New patient waiting", time: "1 hour ago", read: true },
  ]);

  const unreadNotifications = notifications.filter(notif => !notif.read).length;
  const unreadMessages = messages.filter(msg => !msg.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const markAllMessagesAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
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
                  className="h-9 block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-gray-100 dark:bg-gray-800 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Toggle
              pressed={theme === "dark"}
              onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Toggle>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                    Mark all read
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No notifications</div>
                  ) : (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b last:border-b-0 ${notification.read ? '' : 'bg-primary/5'}`}
                      >
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground">{notification.time}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Link to="/notifications" className="text-sm text-primary hover:underline">
                    View all notifications
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative ml-2">
                  <MessageSquare className="h-5 w-5" />
                  {unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Messages</h3>
                  <Button variant="ghost" size="sm" onClick={markAllMessagesAsRead}>
                    Mark all read
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No messages</div>
                  ) : (
                    messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`p-4 border-b last:border-b-0 ${message.read ? '' : 'bg-primary/5'}`}
                      >
                        <div className="font-medium">{message.sender}</div>
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs text-muted-foreground mt-1">{message.time}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Link to="/messaging" className="text-sm text-primary hover:underline">
                    View all messages
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

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
