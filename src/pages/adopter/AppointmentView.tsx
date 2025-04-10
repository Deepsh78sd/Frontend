
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Calendar, ArrowLeft, Pencil, XCircle } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
import StatusBadge from "../../components/StatusBadge";

const AppointmentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);

  // Mock appointment data
  const appointment = {
    id: 1,
    petName: "Max",
    date: new Date("2025-04-15"),
    time: "10:00 AM",
    hospital: "Pet Care Hospital",
    status: "scheduled" as const,
    petId: "pet-123",
    notes: "Bring Max in for his annual checkup and vaccinations."
  };

  const handleCancel = () => {
    toast({
      title: "Appointment Canceled",
      description: "Your appointment has been canceled successfully.",
    });
    navigate("/adopter/appointments");
  };

  const handleEdit = () => {
    navigate(`/adopter/appointments/${id}/edit`);
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="max-w-3xl mx-auto">
        {isLoaded && (
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Appointment Details</CardTitle>
                <StatusBadge status={appointment.status} />
              </div>
              <CardDescription>
                View and manage your appointment details.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Pet Information</h2>
                <Separator />
                <div className="ml-4">
                  <p>
                    <strong>Pet Name:</strong> {appointment.petName}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Appointment Details</h2>
                <Separator />
                <div className="ml-4">
                  <p>
                    <strong>Date:</strong> {appointment.date.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {appointment.hospital}
                  </p>
                  <p>
                    <strong>Notes:</strong> {appointment.notes}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="ghost" asChild>
                <Button variant="ghost" asChild>
                  <Link to="/adopter/appointments">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Appointments
                  </Link>
                </Button>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={handleCancel}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
        {isError && (
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
              <CardDescription>Failed to load appointment details.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please try again later.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/adopter/appointments")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Appointments
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default AppointmentView;
