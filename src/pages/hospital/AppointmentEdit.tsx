
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HospitalLayout from "../../components/layouts/HospitalLayout";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { useToast } from "../../hooks/use-toast";

// Mock data for dropdown options
const petOptions = [
  { id: "pet-123", name: "Max" },
  { id: "pet-456", name: "Bella" },
  { id: "pet-789", name: "Charlie" }
];

const hospitalOptions = [
  { id: "hospital-456", name: "Pet Care Hospital" }
];

const HospitalAppointmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock API call to fetch appointment by ID
    const fetchAppointment = async () => {
      try {
        // In a real app, this would be an API call
        const mockAppointment = {
          id,
          petID: "pet-123",
          hospitalID: "hospital-456",
          appointmentDate: "2025-04-20T14:30:00",
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

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // Mock API call to update appointment
      console.log("Updated appointment data:", formData);
      
      setTimeout(() => {
        toast({
          title: "Appointment Updated",
          description: "Appointment has been successfully updated",
        });
        setIsSubmitting(false);
        navigate(`/hospital/appointments/${id}`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive"
      });
      setIsSubmitting(false);
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

  return (
    <HospitalLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Edit Appointment</h1>
        
        <div className="bg-white p-6 rounded-lg border">
          <AppointmentForm 
            initialData={appointment}
            petOptions={petOptions}
            hospitalOptions={hospitalOptions} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            mode="edit"
          />
        </div>
      </div>
    </HospitalLayout>
  );
};

export default HospitalAppointmentEdit;
