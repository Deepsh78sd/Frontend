import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "@/components/ui/badge"

const HospitalDashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patient: "Max",
      date: "2023-11-15",
      time: "10:00 AM",
      reason: "Annual check-up",
      status: "scheduled",
    },
    {
      id: "2",
      patient: "Bella",
      date: "2023-11-20",
      time: "02:30 PM",
      reason: "Vaccination",
      status: "completed",
    },
    {
      id: "3",
      patient: "Charlie",
      date: "2023-11-22",
      time: "11:15 AM",
      reason: "Dental cleaning",
      status: "cancelled",
    },
  ]);

  return (
    <PageLayout userRole="hospital" userName="Hospital Staff">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
          <p className="text-gray-500">
            Overview of hospital activities and appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointments Today</CardTitle>
              <CardDescription>
                View and manage today's appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-gray-500">Total appointments scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>Review new adoption applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-gray-500">New applications to process</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pet Care Articles</CardTitle>
              <CardDescription>
                Latest articles on pet health and care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-gray-500">Total articles available</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{appointment.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button className="mt-4">
            <Calendar className="mr-2 h-4 w-4" />
            View All Appointments
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default HospitalDashboard;
