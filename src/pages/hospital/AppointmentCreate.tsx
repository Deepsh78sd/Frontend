
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const HospitalAppointmentCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // Mock API call to create appointment
      console.log("New appointment data:", formData);
      
      setTimeout(() => {
        toast({
          title: "Appointment Created",
          description: "New appointment has been successfully scheduled",
        });
        setIsSubmitting(false);
        navigate("/hospital/appointments");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create appointment",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <HospitalLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Schedule New Appointment</h1>
        
        <div className="bg-white p-6 rounded-lg border">
          <AppointmentForm 
            petOptions={petOptions}
            hospitalOptions={hospitalOptions} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            mode="create"
          />
        </div>
      </div>
    </HospitalLayout>
  );
};

export default HospitalAppointmentCreate;
