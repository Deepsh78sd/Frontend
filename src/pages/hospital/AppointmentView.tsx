
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HospitalLayout from "../../components/layouts/HospitalLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Edit, Trash, Check, X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import StatusBadge from "../../components/StatusBadge";

const HospitalAppointmentView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch appointment by ID
    const fetchAppointment = async () => {
      try {
        // In a real app, this would be an API call
        const mockAppointment = {
          id,
          petID: "pet-123",
          petName: "Max", // This would come from joining with pet data
          hospitalID: "hospital-456",
          hospitalName: "Pet Care Hospital", // This would come from joining with hospital data
          appointmentDate: new Date("2025-04-20T14:30:00"),
          status: "scheduled"
        };
        
        setTimeout(() => {
          setAppointment(mockAppointment);
          setLoading(false);
        }, 500);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch appointment details",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, toast]);

  const handleComplete = async () => {
    try {
      toast({
        title: "Appointment Completed",
        description: "The appointment has been marked as completed",
      });
      // Update local state
      setAppointment((prev: any) => ({ ...prev, status: "completed" }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status",
        variant: "destructive"
      });
    }
  };

  const handleCancel = async () => {
    try {
      toast({
        title: "Appointment Cancelled",
        description: "The appointment has been cancelled",
      });
      // Update local state
      setAppointment((prev: any) => ({ ...prev, status: "canceled" }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    try {
      toast({
        title: "Appointment Deleted",
        description: "The appointment has been deleted",
      });
      // In a real app, redirect after deletion
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete appointment",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <HospitalLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading appointment details...</p>
        </div>
      </HospitalLayout>
    );
  }

  if (!appointment) {
    return (
      <HospitalLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-lg mb-4">Appointment not found</p>
          <Button asChild>
            <Link to="/hospital/appointments">Back to Appointments</Link>
          </Button>
        </div>
      </HospitalLayout>
    );
  }

  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/hospital/appointments">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Appointments
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Appointment Details</h1>
          </div>
          
          <div className="flex space-x-2">
            {appointment.status === "scheduled" && (
              <>
                <Button 
                  className="bg-green-500 hover:bg-green-600"
                  onClick={handleComplete}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Complete
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
            <Button asChild className="bg-teal-500 hover:bg-teal-600">
              <Link to={`/hospital/appointments/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Appointment for {appointment.petName}
              </h2>
              <StatusBadge status={appointment.status as any} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Pet Name</p>
                <p>{appointment.petName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Hospital</p>
                <p>{appointment.hospitalName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Date & Time</p>
                <p>
                  {appointment.appointmentDate.toLocaleDateString()} at{" "}
                  {appointment.appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Status</p>
                <StatusBadge status={appointment.status as any} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </HospitalLayout>
  );
};

export default HospitalAppointmentView;
