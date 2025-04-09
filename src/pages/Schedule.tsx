
import React from 'react';
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

const Schedule = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Schedule</h1>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {date ? date.toDateString() : "Select a date"}
                  </h2>

                  {date && (
                    <div className="space-y-4">
                      {events.filter(event => 
                        new Date(event.date).toDateString() === date.toDateString()
                      ).length > 0 ? (
                        events.filter(event => 
                          new Date(event.date).toDateString() === date.toDateString()
                        ).map((event, index) => (
                          <div key={index} className="p-4 border rounded-md">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-sm text-gray-600">{event.time}</p>
                                <p className="text-sm text-gray-600">{event.location}</p>
                                <p className="mt-2">{event.description}</p>
                              </div>
                              <div>
                                <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No events scheduled for this date.</p>
                      )}

                      <Button className="w-full bg-teal-500 hover:bg-teal-600">
                        <Clock className="mr-2 h-4 w-4" />
                        Schedule Event on {date.toLocaleDateString()}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-4">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="mt-2">{event.description}</p>
                        </div>
                        <div>
                          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-4">
            <div className="space-y-4">
              {events
                .filter(event => new Date(event.date) < new Date())
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((event, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

const events = [
  {
    title: "Vaccination Appointment - Max",
    date: "2025-04-15",
    time: "10:00 AM - 11:00 AM",
    location: "Happy Paws Veterinary Clinic",
    description: "Regular vaccination and health checkup for Max."
  },
  {
    title: "Pet Adoption Day",
    date: "2025-04-20",
    time: "12:00 PM - 4:00 PM",
    location: "Central Park Pet Shelter",
    description: "Community event for pet adoptions and awareness."
  },
  {
    title: "Training Session - Bella",
    date: "2025-04-05",
    time: "3:00 PM - 4:00 PM",
    location: "Paws Training Center",
    description: "Basic obedience training session."
  },
  {
    title: "Grooming Appointment - Charlie",
    date: "2025-03-28",
    time: "2:00 PM - 3:30 PM",
    location: "Furry Friends Grooming",
    description: "Full grooming session including bath, haircut, and nail trimming."
  }
];

export default Schedule;
