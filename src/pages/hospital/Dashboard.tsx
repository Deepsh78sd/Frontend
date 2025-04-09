
import HospitalLayout from "@/components/layouts/HospitalLayout";
import StatCard from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { HeartPulse, Calendar, FileText, Home, CheckCircle, XCircle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Mock data for appointments by day
const appointmentsData = [
  { day: "Mon", appointments: 8 },
  { day: "Tue", appointments: 12 },
  { day: "Wed", appointments: 5 },
  { day: "Thu", appointments: 10 },
  { day: "Fri", appointments: 15 },
  { day: "Sat", appointments: 7 },
  { day: "Sun", appointments: 2 },
];

// Mock data for upcoming appointments
const upcomingAppointments = [
  { id: 1, petName: "Max", ownerName: "John Doe", date: "2023-09-15", time: "10:00 AM", reason: "Vaccination" },
  { id: 2, petName: "Bella", ownerName: "Jane Smith", date: "2023-09-16", time: "11:30 AM", reason: "Checkup" },
  { id: 3, petName: "Charlie", ownerName: "Mike Johnson", date: "2023-09-17", time: "2:00 PM", reason: "Adoption Review" },
  { id: 4, petName: "Luna", ownerName: "Sarah Williams", date: "2023-09-17", time: "3:30 PM", reason: "Vaccination" },
];

// Mock data for pending pet verifications
const pendingVerifications = [
  { id: 1, petName: "Rocky", shelterName: "Happy Paws Shelter", requestDate: "2023-09-14", species: "Dog" },
  { id: 2, petName: "Milo", shelterName: "Furry Friends Rescue", requestDate: "2023-09-13", species: "Cat" },
  { id: 3, petName: "Coco", shelterName: "Happy Paws Shelter", requestDate: "2023-09-12", species: "Dog" },
];

const HospitalDashboard = () => {
  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hospital Dashboard</h1>
          <Button variant="outline">Export Report</Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Pets Verified" 
            value="68" 
            icon={<CheckCircle className="h-6 w-6" />} 
            note="Last 30 days"
          />
          <StatCard 
            title="Pending Verifications" 
            value="12" 
            icon={<FileText className="h-6 w-6" />} 
            note="3 urgent reviews"
          />
          <StatCard 
            title="Total Appointments" 
            value="124" 
            icon={<Calendar className="h-6 w-6" />} 
            note="This month"
          />
          <StatCard 
            title="Upcoming Appointments" 
            value="8" 
            icon={<HeartPulse className="h-6 w-6" />} 
            note="Next 48 hours"
          />
        </div>

        {/* Appointments Chart */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Weekly Appointments</h2>
          <p className="text-sm text-gray-500 mb-4">Number of appointments for the current week</p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.petName}</TableCell>
                    <TableCell>{appointment.ownerName}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pending Verifications */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pending Pet Verifications</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Shelter</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell className="font-medium">{verification.petName}</TableCell>
                    <TableCell>{verification.shelterName}</TableCell>
                    <TableCell>{verification.species}</TableCell>
                    <TableCell>{verification.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </HospitalLayout>
  );
};

export default HospitalDashboard;
