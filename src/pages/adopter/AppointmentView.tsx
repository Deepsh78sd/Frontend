
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import StatusBadge from "../../components/StatusBadge";

const AdopterAppointmentView = () => {
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
          status: "scheduled",
          petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading appointment details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!appointment) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-lg mb-4">Appointment not found</p>
          <Button asChild>
            <Link to="/adopter/appointments">Back to Appointments</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/adopter/appointments">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Appointments
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Appointment Details</h1>
          </div>
          
          {appointment.status === "scheduled" && (
            <Button 
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={handleCancel}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel Appointment
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={appointment.petImage || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={appointment.petName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
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

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Hospital Location</h3>
                  <p className="text-gray-600">123 Hospital Street, Medical District</p>
                  <p className="text-gray-600">City, State 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterAppointmentView;
