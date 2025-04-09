
import HospitalLayout from "@/components/layouts/HospitalLayout";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// Mock data for appointments
const appointments = [
  { id: 1, petName: "Max", petOwner: "John Doe", date: "2023-09-15", time: "10:00 AM", reason: "Health check for adoption", status: "scheduled" },
  { id: 2, petName: "Bella", petOwner: "Jane Smith", date: "2023-09-16", time: "11:30 AM", reason: "Vaccination check", status: "scheduled" },
  { id: 3, petName: "Charlie", petOwner: "Mike Johnson", date: "2023-09-17", time: "2:00 PM", reason: "Pre-adoption examination", status: "completed" },
  { id: 4, petName: "Luna", petOwner: "Sarah Williams", date: "2023-09-17", time: "3:30 PM", reason: "Health verification", status: "canceled" },
  { id: 5, petName: "Cooper", petOwner: "David Brown", date: "2023-09-18", time: "9:15 AM", reason: "Health check for adoption", status: "scheduled" },
  { id: 6, petName: "Lucy", petOwner: "Emma Davis", date: "2023-09-19", time: "2:30 PM", reason: "Pre-adoption examination", status: "scheduled" },
  { id: 7, petName: "Bailey", petOwner: "Alex Wilson", date: "2023-09-20", time: "10:45 AM", reason: "Vaccination check", status: "scheduled" },
  { id: 8, petName: "Oliver", petOwner: "Olivia Lee", date: "2023-09-21", time: "4:00 PM", reason: "Health verification", status: "scheduled" },
];

const HospitalAppointments = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and search
  const filteredAppointments = appointments
    .filter(appointment => filter === "all" || appointment.status === filter)
    .filter(appointment => 
      appointment.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      appointment.petOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleAddAppointment = () => {
    toast({
      title: "Appointment Created",
      description: "New appointment has been successfully scheduled.",
    });
  };
  
  const handleComplete = (id: number) => {
    toast({
      title: "Appointment Completed",
      description: "The appointment has been marked as completed.",
    });
  };
  
  const handleCancel = (id: number) => {
    toast({
      title: "Appointment Canceled",
      description: "The appointment has been canceled.",
    });
  };

  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new pet health verification appointment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="petName" className="text-right font-medium">
                    Pet Name
                  </label>
                  <Input id="petName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="petOwner" className="text-right font-medium">
                    Pet Owner
                  </label>
                  <Input id="petOwner" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="date" className="text-right font-medium">
                    Date
                  </label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="time" className="text-right font-medium">
                    Time
                  </label>
                  <Input id="time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="reason" className="text-right font-medium">
                    Reason
                  </label>
                  <Select>
                    <SelectTrigger id="reason" className="col-span-3">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="check">Health check for adoption</SelectItem>
                      <SelectItem value="exam">Pre-adoption examination</SelectItem>
                      <SelectItem value="vaccination">Vaccination check</SelectItem>
                      <SelectItem value="verification">Health verification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddAppointment} className="bg-blue-500 hover:bg-blue-600">
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
          
          <div className="flex gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              View Calendar
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.petName}</TableCell>
                    <TableCell>{appointment.petOwner}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      {appointment.status === 'scheduled' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleComplete(appointment.id)}
                          >
                            Complete
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-600 hover:text-gray-700"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredAppointments.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No appointments found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </HospitalLayout>
  );
};

export default HospitalAppointments;
