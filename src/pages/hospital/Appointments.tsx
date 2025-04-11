
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Plus, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import StatusBadge, { StatusType } from "@/components/StatusBadge";
import ActionButtons from "@/components/ActionButtons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Define the appointment interface
interface Appointment {
  id: number;
  petName: string;
  petOwner: string;
  date: string;
  time: string;
  reason: string;
  status: StatusType;
  notes?: string;
}

// Mock data for appointments
const appointmentsData: Appointment[] = [
  { id: 1, petName: "Max", petOwner: "John Doe", date: "2025-04-15", time: "10:00 AM", reason: "Health check for adoption", status: "scheduled" as StatusType },
  { id: 2, petName: "Bella", petOwner: "Jane Smith", date: "2025-04-16", time: "11:30 AM", reason: "Vaccination check", status: "scheduled" as StatusType },
  { id: 3, petName: "Charlie", petOwner: "Mike Johnson", date: "2025-04-17", time: "2:00 PM", reason: "Pre-adoption examination", status: "completed" as StatusType },
  { id: 4, petName: "Luna", petOwner: "Sarah Williams", date: "2025-04-17", time: "3:30 PM", reason: "Health verification", status: "canceled" as StatusType },
  { id: 5, petName: "Cooper", petOwner: "David Brown", date: "2025-04-18", time: "9:15 AM", reason: "Health check for adoption", status: "scheduled" as StatusType },
  { id: 6, petName: "Lucy", petOwner: "Emma Davis", date: "2025-04-19", time: "2:30 PM", reason: "Pre-adoption examination", status: "scheduled" as StatusType },
  { id: 7, petName: "Bailey", petOwner: "Alex Wilson", date: "2025-04-20", time: "10:45 AM", reason: "Vaccination check", status: "scheduled" as StatusType },
  { id: 8, petName: "Oliver", petOwner: "Olivia Lee", date: "2025-04-21", time: "4:00 PM", reason: "Health verification", status: "scheduled" as StatusType },
];

const HospitalAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
  const [filter, setFilter] = useState<StatusType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    petName: "",
    petOwner: "",
    date: "",
    time: "",
    reason: "",
    notes: "",
  });
  
  // Type-safe handler for filter changes
  const handleFilterChange = (value: string) => {
    setFilter(value as StatusType | "all");
  };
  
  // Filter and search
  const filteredAppointments = appointments
    .filter(appointment => filter === "all" || appointment.status === filter)
    .filter(appointment => 
      appointment.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      appointment.petOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleAddAppointment = () => {
    if (!newAppointment.petName || !newAppointment.petOwner || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    
    setAppointments([
      ...appointments,
      {
        id: newId,
        petName: newAppointment.petName,
        petOwner: newAppointment.petOwner,
        date: newAppointment.date,
        time: newAppointment.time,
        reason: newAppointment.reason,
        status: "scheduled" as StatusType,
        notes: newAppointment.notes,
      }
    ]);
    
    setNewAppointment({
      petName: "",
      petOwner: "",
      date: "",
      time: "",
      reason: "",
      notes: "",
    });
    
    setIsAddDialogOpen(false);
    
    toast({
      title: "Appointment Created",
      description: "New appointment has been successfully scheduled.",
    });
  };
  
  const handleViewAppointment = (id: number) => {
    navigate(`/hospital/appointments/${id}`);
  };
  
  const handleEditAppointment = (id: number) => {
    navigate(`/hospital/appointments/${id}/edit`);
  };
  
  const handleComplete = (id: number) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id 
        ? { ...appointment, status: "completed" as StatusType } 
        : appointment
    ));
    
    toast({
      title: "Appointment Completed",
      description: "The appointment has been marked as completed.",
    });
  };
  
  const handleCancel = (id: number) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id 
        ? { ...appointment, status: "canceled" as StatusType } 
        : appointment
    ));
    
    toast({
      title: "Appointment Canceled",
      description: "The appointment has been canceled.",
    });
  };

  return (
    <PageLayout userRole="hospital" userName="Hospital Staff">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new pet health verification appointment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="petName" className="text-right">
                    Pet Name
                  </Label>
                  <Input 
                    id="petName" 
                    className="col-span-3"
                    value={newAppointment.petName}
                    onChange={(e) => setNewAppointment({...newAppointment, petName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="petOwner" className="text-right">
                    Pet Owner
                  </Label>
                  <Input 
                    id="petOwner" 
                    className="col-span-3"
                    value={newAppointment.petOwner}
                    onChange={(e) => setNewAppointment({...newAppointment, petOwner: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="col-span-3"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="col-span-3"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">
                    Reason
                  </Label>
                  <Select
                    value={newAppointment.reason}
                    onValueChange={(value) => setNewAppointment({...newAppointment, reason: value})}
                  >
                    <SelectTrigger id="reason" className="col-span-3">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Health check for adoption">Health check for adoption</SelectItem>
                      <SelectItem value="Pre-adoption examination">Pre-adoption examination</SelectItem>
                      <SelectItem value="Vaccination check">Vaccination check</SelectItem>
                      <SelectItem value="Health verification">Health verification</SelectItem>
                      <SelectItem value="General checkup">General checkup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right pt-2">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    className="col-span-3"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddAppointment}>
                  Schedule Appointment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search appointments..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select defaultValue={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">View Calendar</span>
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                  <TableHead className="hidden md:table-cell">Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.petName}</TableCell>
                      <TableCell>{appointment.petOwner}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.reason}</TableCell>
                      <TableCell>
                        <StatusBadge status={appointment.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <ActionButtons
                            onView={() => handleViewAppointment(appointment.id)}
                            onEdit={
                              appointment.status === "scheduled" 
                                ? () => handleEditAppointment(appointment.id) 
                                : undefined
                            }
                            hideEdit={appointment.status !== "scheduled"}
                            hideDelete={true}
                            customButtons={
                              appointment.status === "scheduled" ? (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-green-500 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleComplete(appointment.id)}
                                  >
                                    Complete
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleCancel(appointment.id)}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : null
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HospitalAppointments;
