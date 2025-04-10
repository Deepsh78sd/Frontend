import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../components/ui/use-toast";

const Schedule = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${date?.toLocaleDateString()} at ${time} with reason: ${reason}`,
    });
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Schedule an Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="reason">Reason for Appointment</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the reason for the appointment"
              required
            />
          </div>
          <Button type="submit">Schedule Appointment</Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Schedule;
