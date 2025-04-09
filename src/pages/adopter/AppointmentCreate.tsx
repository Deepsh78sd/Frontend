
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { useToast } from "../../hooks/use-toast";

// Mock data for dropdown options
const petOptions = [
  { id: "pet-123", name: "Max" },
  { id: "pet-456", name: "Bella" },
  { id: "pet-789", name: "Charlie" }
];

const hospitalOptions = [
  { id: "hospital-456", name: "Pet Care Hospital" },
  { id: "hospital-789", name: "Animal Medical Center" },
  { id: "hospital-012", name: "Paws & Claws Veterinary Clinic" }
];

const AdopterAppointmentCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialPetId, setInitialPetId] = useState<string>("");

  // Check if a pet ID was passed in the URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const petId = params.get('petId');
    if (petId) {
      setInitialPetId(petId);
    }
  }, [location.search]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // Mock API call to create appointment
      console.log("New appointment data:", formData);
      
      setTimeout(() => {
        toast({
          title: "Appointment Scheduled",
          description: "Your appointment has been successfully scheduled",
        });
        setIsSubmitting(false);
        navigate("/adopter/appointments");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Schedule New Appointment</h1>
        
        <div className="bg-white p-6 rounded-lg border">
          <AppointmentForm 
            initialData={initialPetId ? { petID: initialPetId, hospitalID: "", appointmentDate: "", status: "scheduled" } : undefined}
            petOptions={petOptions}
            hospitalOptions={hospitalOptions} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            mode="create"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterAppointmentCreate;
