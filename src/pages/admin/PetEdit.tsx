
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import PetForm from "../../components/forms/PetForm";
import { useToast } from "../../hooks/use-toast";

const AdminPetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock API call to fetch pet by ID
    const fetchPet = async () => {
      try {
        // In a real app, this would be an API call
        const mockPet = {
          id,
          name: "Max",
          breed: "Golden Retriever",
          age: "2 years",
          petType: 0, // Dog
          availabilityStatus: 0, // Available
          address: "123 Pet Street, Pet City",
          photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        };
        
        setTimeout(() => {
          setPet(mockPet);
          setLoading(false);
        }, 500);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch pet details",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, toast]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // Mock API call to update pet
      // In a real app, this would be an API call with the formData
      console.log("Updated pet data:", formData);
      
      setTimeout(() => {
        toast({
          title: "Pet Updated",
          description: "Pet details have been successfully updated",
        });
        setIsSubmitting(false);
        navigate(`/admin/pets/${id}`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pet details",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading pet details...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Edit Pet</h1>
        
        <div className="bg-white p-6 rounded-lg border">
          <PetForm 
            initialData={pet} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            mode="edit"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPetEdit;
