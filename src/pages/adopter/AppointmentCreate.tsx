import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const AppointmentCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pet, setPet] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pet || !date || !time || !hospital || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${pet} at ${hospital} on ${format(date, "PPP")} at ${time} has been scheduled.`,
    });

    navigate("/adopter/appointments");
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Schedule an Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pet">Pet</Label>
            <Input
              type="text"
              id="pet"
              placeholder="Enter pet's name"
              value={pet}
              onChange={(e) => setPet(e.target.value)}
            />
          </div>
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
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
            />
          </div>
          <div>
            <Label htmlFor="hospital">Hospital</Label>
            <Select value={hospital} onValueChange={setHospital}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a hospital" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pet Care Hospital">Pet Care Hospital</SelectItem>
                <SelectItem value="Animal Medical Center">Animal Medical Center</SelectItem>
                <SelectItem value="Paws & Claws Veterinary Clinic">Paws & Claws Veterinary Clinic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="reason">Reason for Appointment</Label>
            <Textarea
              id="reason"
              placeholder="Describe the reason for the appointment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <Button type="submit">Schedule Appointment</Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default AppointmentCreate;
