
import PageLayout from "@/components/PageLayout";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Eye, Pencil, Trash } from "lucide-react";

// Define proper types for appointments
type AppointmentStatus = "scheduled" | "completed" | "canceled";

interface Appointment {
  id: number;
  petName: string;
  date: string;
  time: string;
  hospital: string;
  status: AppointmentStatus;
}

const Appointments = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New Appointment
          </Button>
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
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.petName}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="hidden md:table-cell">{appointment.hospital}</TableCell>
                    <TableCell>
                      <StatusBadge status={appointment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        {appointment.status === "scheduled" && (
                          <>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="ghost" size="sm" disabled>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const appointments: Appointment[] = [
  {
    id: 1,
    petName: "Max",
    date: "April 15, 2025",
    time: "10:00 AM",
    hospital: "Paws & Claws Vet Clinic",
    status: "scheduled",
  },
  {
    id: 2,
    petName: "Bella",
    date: "April 20, 2025",
    time: "2:30 PM",
    hospital: "Pet Care Center",
    status: "scheduled",
  },
  {
    id: 3,
    petName: "Cooper",
    date: "April 5, 2025",
    time: "11:15 AM",
    hospital: "Animal Wellness Hospital",
    status: "completed",
  },
];

export default Appointments;
