import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  details: string;
}

export const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Doctor Appointment",
      date: new Date(2024, 6, 15),
      startTime: "10:00",
      endTime: "11:00",
      details: "Annual check-up with Dr. Smith"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    details: ""
  });

  const handleAddEvent = () => {
    if (!selectedDate || !eventForm.title) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventForm.title,
      date: selectedDate,
      startTime: eventForm.startTime,
      endTime: eventForm.endTime,
      details: eventForm.details
    };

    setEvents([...events, newEvent]);
    setEventForm({ title: "", startTime: "", endTime: "", details: "" });
    setIsDialogOpen(false);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Event Calendar
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Add events to remind the senior about upcoming activities
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: (date) => getEventsForDate(date).length > 0
              }}
              modifiersClassNames={{
                hasEvent: "bg-primary/10 text-primary font-medium"
              }}
            />
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!selectedDate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={eventForm.startTime}
                        onChange={(e) => setEventForm({...eventForm, startTime: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={eventForm.endTime}
                        onChange={(e) => setEventForm({...eventForm, endTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="details">Details</Label>
                    <Textarea
                      id="details"
                      value={eventForm.details}
                      onChange={(e) => setEventForm({...eventForm, details: e.target.value})}
                      placeholder="Enter event details and reminders"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">
              {selectedDate ? `Events for ${format(selectedDate, "MMM d, yyyy")}` : "Select a date"}
            </h3>
            
            <div className="space-y-3">
              {selectedDateEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events for this day</p>
              ) : (
                selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-background border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        {(event.startTime || event.endTime) && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {event.startTime} {event.endTime && `- ${event.endTime}`}
                          </div>
                        )}
                        {event.details && (
                          <p className="text-sm text-muted-foreground mt-2">{event.details}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Reminder
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};