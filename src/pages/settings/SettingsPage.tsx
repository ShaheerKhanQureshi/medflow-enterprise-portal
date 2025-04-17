import React from "react";
import { User, Bell, Shield, Moon, Sun, LogOut } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleSave = (section: string) => {
    toast({
      title: "Settings updated",
      description: `Your ${section} settings have been saved successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Your profile photo will be used on your profile and throughout the site.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Change Photo</Button>
                    <Button size="sm" variant="outline">Remove Photo</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="admin@medflow.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Administrator with 5+ years of healthcare management experience." />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave("profile")}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    { id: "email-appointments", label: "Appointment updates" },
                    { id: "email-messages", label: "New messages" },
                    { id: "email-claims", label: "Claim status changes" },
                    { id: "email-system", label: "System updates" }
                  ].map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={true} />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  {[
                    { id: "app-appointments", label: "Appointment updates" },
                    { id: "app-messages", label: "New messages" },
                    { id: "app-claims", label: "Claim status changes" },
                    { id: "app-doctors", label: "Doctor availability changes" }
                  ].map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={true} />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Sounds</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification-sounds" className="flex-1">Play sound for new notifications</Label>
                  <Switch id="notification-sounds" defaultChecked={true} />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave("notification")}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button className="mt-2" onClick={() => handleSave("password")}>Update Password</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-sm text-muted-foreground">Web - Chrome on Windows</div>
                        <div className="text-sm text-muted-foreground mt-1">Started 2 hours ago - 192.168.1.1</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out of all sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                
                <RadioGroup 
                  defaultValue={theme} 
                  onValueChange={value => setTheme(value as "light" | "dark" | "system")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Color Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className={`p-4 cursor-pointer ${theme === 'default' ? 'border-2 border-primary' : ''}`} onClick={() => handleSave("appearance")}>
                      <div className="h-16 w-full bg-primary rounded-md mb-2"></div>
                      <p className="text-sm font-medium">Default</p>
                    </Card>
                    <Card className="p-4 cursor-pointer" onClick={() => handleSave("appearance")}>
                      <div className="h-16 w-full bg-blue-600 rounded-md mb-2"></div>
                      <p className="text-sm font-medium">Blue</p>
                    </Card>
                    <Card className="p-4 cursor-pointer" onClick={() => handleSave("appearance")}>
                      <div className="h-16 w-full bg-green-600 rounded-md mb-2"></div>
                      <p className="text-sm font-medium">Green</p>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave("appearance")}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;

// This is a temporary solution to avoid TypeScript error for Badge in SettingsPage
// In a real world scenario, we would import it from the appropriate component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);
