import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock notification data
const notificationsData = [
  {
    id: 1,
    type: "lab",
    title: "New lab results available",
    description: "Faisal Ahmed's blood test results are ready for review.",
    time: "29 minutes ago",
    isNew: true,
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment rescheduled",
    description: "Zainab Khan rescheduled her appointment to tomorrow at 2:00 PM.",
    time: "about 1 hour ago",
    isNew: true,
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "Received payment of ₨ 4,500 from Ayesha Malik for consultation.",
    time: "about 3 hours ago",
    isNew: false,
  },
  {
    id: 4,
    type: "authorization",
    title: "New authorization request",
    description: "Insurance approval needed for Hamid Raza's MRI scan.",
    time: "about 5 hours ago",
    isNew: false,
  },
  {
    id: 5,
    type: "prescription",
    title: "Prescription refill request",
    description: "Saima Bibi requested a refill for her hypertension medication.",
    time: "1 day ago",
    isNew: false,
  },
  {
    id: 6,
    type: "lab",
    title: "Lab results ready",
    description: "Ahmed Khan's cholesterol test results have been uploaded.",
    time: "2 days ago",
    isNew: false,
  },
  {
    id: 7,
    type: "appointment",
    title: "New appointment request",
    description: "Nadia Asif requested an appointment for Friday, 10:00 AM.",
    time: "3 days ago",
    isNew: false,
  }
];

const NotificationsPage = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const unreadCount = notifications.filter(n => n.isNew).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
    toast({
      title: "Notifications marked as read",
      description: `${unreadCount} notifications marked as read`,
    });
  };
  
  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared",
    });
  };
  
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification dismissed",
    });
  };
  
  const filteredNotifications = activeFilter
    ? notifications.filter(n => {
        if (activeFilter === 'unread') return n.isNew;
        return n.type === activeFilter.toLowerCase();
      })
    : notifications;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground mt-1">
          You have {unreadCount} unread notifications
        </p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle>All Notifications</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveFilter(value === "all" ? null : value)}>
            <div className="flex overflow-x-auto scrollbar-none border-b">
              <TabsList className="p-0 bg-transparent border-b-0 h-auto">
                <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                  Unread
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-primary h-5 w-5 p-0 flex items-center justify-center">{unreadCount}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="appointment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="lab" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                  Lab Results
                </TabsTrigger>
                <TabsTrigger value="payment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="authorization" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4">
                  Authorizations
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center">
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground mt-1">You don't have any notifications at the moment</p>
                </div>
              ) : (
                <div>
                  {filteredNotifications.map((notification) => (
                    <div key={notification.id} className={`border-b last:border-b-0 p-4 ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {notification.isNew && <Badge className="bg-primary">New</Badge>}
                          </div>
                          <p>{notification.description}</p>
                          <p className="text-sm text-muted-foreground">{notification.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              {
                filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium">No unread notifications</h3>
                    <p className="text-muted-foreground mt-1">You don't have any unread notifications at the moment</p>
                  </div>
                ) : (
                  <div>
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className="border-b last:border-b-0 p-4 bg-blue-50 dark:bg-blue-900/10">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              <Badge className="bg-primary">New</Badge>
                            </div>
                            <p>{notification.description}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </TabsContent>
            
            
            <TabsContent value="appointment" className="m-0">
              
              <div className="m-0">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium">No appointment notifications</h3>
                    <p className="text-muted-foreground mt-1">You don't have any appointment notifications at the moment</p>
                  </div>
                ) : (
                  <div>
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className={`border-b last:border-b-0 p-4 ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              {notification.isNew && <Badge className="bg-primary">New</Badge>}
                            </div>
                            <p>{notification.description}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="lab" className="m-0">
              
              <div className="m-0">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium">No lab result notifications</h3>
                    <p className="text-muted-foreground mt-1">You don't have any lab result notifications at the moment</p>
                  </div>
                ) : (
                  <div>
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className={`border-b last:border-b-0 p-4 ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              {notification.isNew && <Badge className="bg-primary">New</Badge>}
                            </div>
                            <p>{notification.description}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            
            <TabsContent value="payment" className="m-0">
              
              <div className="m-0">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium">No payment notifications</h3>
                    <p className="text-muted-foreground mt-1">You don't have any payment notifications at the moment</p>
                  </div>
                ) : (
                  <div>
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className={`border-b last:border-b-0 p-4 ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              {notification.isNew && <Badge className="bg-primary">New</Badge>}
                            </div>
                            <p>{notification.description}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="authorization" className="m-0">
              
              <div className="m-0">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium">No authorization notifications</h3>
                    <p className="text-muted-foreground mt-1">You don't have any authorization notifications at the moment</p>
                  </div>
                ) : (
                  <div>
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className={`border-b last:border-b-0 p-4 ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              {notification.isNew && <Badge className="bg-primary">New</Badge>}
                            </div>
                            <p>{notification.description}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
