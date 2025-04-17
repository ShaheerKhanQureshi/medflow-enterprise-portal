
import React from "react";
import { Calendar, ChevronLeft, ChevronRight, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const AppointmentsCalendar = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Example appointment data for visualization
  const appointments = [
    { id: 1, day: 12, time: "9:00 AM", patient: "Emma Wilson", doctor: "Dr. Sarah Johnson" },
    { id: 2, day: 12, time: "11:30 AM", patient: "John Miller", doctor: "Dr. Michael Brown" },
    { id: 3, day: 15, time: "2:00 PM", patient: "Lucy Parker", doctor: "Dr. John Smith" },
    { id: 4, day: 18, time: "10:15 AM", patient: "David Turner", doctor: "Dr. Elizabeth Davis" },
    { id: 5, day: 22, time: "3:45 PM", patient: "Sarah Johnson", doctor: "Dr. Robert Wilson" },
  ];
  
  // Generate days for current month (simplified)
  const daysInMonth = 30; // This would typically be calculated based on the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Generate calendar grid (simplified version)
  const calendarGrid = [];
  for (let i = 0; i < 5; i++) { // 5 weeks
    const week = [];
    for (let j = 0; j < 7; j++) { // 7 days per week
      const dayNum = i * 7 + j + 1;
      if (dayNum <= daysInMonth) {
        week.push(dayNum);
      } else {
        week.push(null); // Empty cell
      }
    }
    calendarGrid.push(week);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Appointments Calendar</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/appointments">
              <List className="mr-2 h-4 w-4" />
              List View
            </Link>
          </Button>
          <Button asChild>
            <Link to="/appointments/add">
              <span>New Appointment</span>
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{currentMonth}</span>
              </div>
            </CardTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            View and manage appointments in calendar format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 text-center font-medium border-b">
            <div className="p-2">Sun</div>
            <div className="p-2">Mon</div>
            <div className="p-2">Tue</div>
            <div className="p-2">Wed</div>
            <div className="p-2">Thu</div>
            <div className="p-2">Fri</div>
            <div className="p-2">Sat</div>
          </div>
          <div className="divide-y">
            {calendarGrid.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-cols-7 divide-x">
                {week.map((day, dayIndex) => {
                  const dayAppointments = appointments.filter(appt => appt.day === day);
                  const isToday = day === new Date().getDate();
                  
                  return (
                    <div 
                      key={`day-${weekIndex}-${dayIndex}`} 
                      className={`min-h-[100px] p-1 ${isToday ? 'bg-primary/5' : ''}`}
                    >
                      {day && (
                        <>
                          <div className={`text-right p-1 ${isToday ? 'font-bold text-primary' : ''}`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.map(appt => (
                              <div 
                                key={appt.id}
                                className="bg-primary/10 text-primary text-xs p-1 rounded truncate cursor-pointer hover:bg-primary/20"
                                title={`${appt.time} - ${appt.patient} with ${appt.doctor}`}
                              >
                                {appt.time} - {appt.patient}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsCalendar;
