import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import StatusBadge from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Calendar, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Define the allowed status types
type AppointmentStatus = "scheduled" | "completed" | "canceled";

// Define the appointment type
interface Appointment {
  id: number;
  petName: string;
  date: Date;
  time: string;
  hospital: string;
  status: AppointmentStatus;
  petId: string;
}

// Mock data for appointments
const initialAppointments: Appointment[] = [
  {
    id: 1,
    petName: "Max",
    date: new Date("2025-04-15"),
    time: "10:00 AM",
    hospital: "Pet Care Hospital",
    status: "scheduled",
    petId: "pet-123",
  },
  {
    id: 2,
    petName: "Bella",
    date: new Date("2025-04-20"),
    time: "2:30 PM",
    hospital: "Animal Medical Center",
    status: "scheduled",
    petId: "pet-456",
  },
  {
    id: 3,
    petName: "Charlie",
    date: new Date("2025-04-05"),
    time: "11:15 AM",
    hospital: "Paws & Claws Veterinary Clinic",
    status: "completed",
    petId: "pet-789",
  },
];

const AdopterAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [filter, setFilter] = useState<"all" | AppointmentStatus>("all");

  const filteredAppointments = filter === "all"
    ? appointments
    : appointments.filter(appointment => appointment.status === filter);

  const handleCancel = (id: number) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: "canceled" as AppointmentStatus } 
          : appointment
      )
    );
    
    toast({
      title: "Appointment Canceled",
      description: "Your appointment has been canceled successfully.",
    });
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <Button className="bg-teal-500 hover:bg-teal-600" asChild>
            <Link to="/adopter/appointments/create">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Appointment
            </Link>
          </Button>
        </div>

        <div className="flex justify-end">
          <Select value={filter} onValueChange={(value) => setFilter(value as "all" | AppointmentStatus)}>
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
        </div>

        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="text-lg font-medium">Upcoming and Past Appointments</h2>
            <p className="text-sm text-gray-500">View and manage your veterinary appointments</p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="hidden md:table-cell">Hospital</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <Link 
                        to={`/adopter/pets/${appointment.petId}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {appointment.petName}
                      </Link>
                    </TableCell>
                    <TableCell>{appointment.date.toLocaleDateString()}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="hidden md:table-cell">{appointment.hospital}</TableCell>
                    <TableCell>
                      <StatusBadge status={appointment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/adopter/appointments/${appointment.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        
                        {appointment.status === "scheduled" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredAppointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No appointments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterAppointments;
