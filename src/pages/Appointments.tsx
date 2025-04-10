import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import StatusBadge from "../components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Calendar, Eye, Pencil, Trash, PlusCircle } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <CardTitle>Appointment with {appointment.doctor}</CardTitle>
                <CardDescription>
                  {appointment.date} at {appointment.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reason: {appointment.reason}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <StatusBadge status={appointment.status} />
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          <Button asChild>
            <Link to="/schedule">
              <PlusCircle className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Appointments;
