
import React, { useState } from "react";
import { Search, Send, User, Info, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock data
const contacts = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Cardiologist", avatar: "", status: "online", unread: 3 },
  { id: 2, name: "Dr. Michael Brown", role: "Neurologist", avatar: "", status: "online", unread: 0 },
  { id: 3, name: "Emma Wilson", role: "Patient", avatar: "", status: "offline", unread: 0 },
  { id: 4, name: "Dr. John Smith", role: "Dermatologist", avatar: "", status: "away", unread: 1 },
  { id: 5, name: "Lucy Parker", role: "Patient", avatar: "", status: "online", unread: 0 },
  { id: 6, name: "Dr. Elizabeth Davis", role: "Pediatrician", avatar: "", status: "offline", unread: 0 },
  { id: 7, name: "David Turner", role: "Patient", avatar: "", status: "online", unread: 0 },
];

const messages = [
  { id: 1, senderId: 1, text: "Good morning! I've reviewed your recent test results.", timestamp: "09:30 AM", sent: false },
  { id: 2, senderId: 0, text: "Thank you doctor. What's your assessment?", timestamp: "09:32 AM", sent: true },
  { id: 3, senderId: 1, text: "Your cardiac function has improved significantly. The medication seems to be working well.", timestamp: "09:35 AM", sent: false },
  { id: 4, senderId: 0, text: "That's great news! Do I need to continue with the same dosage?", timestamp: "09:37 AM", sent: true },
  { id: 5, senderId: 1, text: "Yes, please continue with the current prescription for another month. We'll reassess after that.", timestamp: "09:40 AM", sent: false },
  { id: 6, senderId: 0, text: "Understood. Should I schedule another appointment for next month then?", timestamp: "09:42 AM", sent: true },
  { id: 7, senderId: 1, text: "Yes, please do. My assistant can help you find a suitable time.", timestamp: "09:45 AM", sent: false },
];

const MessagingHub = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="h-[calc(100vh-13rem)] space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Messages</h2>

      <div className="flex h-full gap-4">
        {/* Contacts sidebar */}
        <Card className="w-80 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 ${selectedContact?.id === contact.id ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${getStatusColor(contact.status)}`}
                    />
                  </div>
                  <div className="flex flex-1 justify-between">
                    <div>
                      <div className="font-medium leading-none mb-1">{contact.name}</div>
                      <p className="text-sm text-muted-foreground">{contact.role}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="bg-primary ml-auto">{contact.unread}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat area */}
        <Card className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{getInitials(selectedContact.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedContact.name}</div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(selectedContact.status)}`} />
                      <span className="text-sm text-muted-foreground capitalize">{selectedContact.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <CardContent className="flex-1 overflow-auto p-4 flex flex-col space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.sent && (
                      <Avatar className="mr-2 mt-1">
                        <AvatarFallback>{getInitials(selectedContact.name)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                    {message.sent && (
                      <Avatar className="ml-2 mt-1">
                        <AvatarFallback><User size={16} /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </CardContent>

              <div className="p-4 border-t">
                <form 
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input 
                    placeholder="Type your message..." 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a contact to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagingHub;
