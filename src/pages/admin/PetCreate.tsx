
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import PetForm from "../../components/forms/PetForm";
import { useToast } from "../../hooks/use-toast";

const AdminPetCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // Mock API call to create pet
      // In a real app, this would be an API call with the formData
      console.log("New pet data:", formData);
      
      setTimeout(() => {
        toast({
          title: "Pet Created",
          description: "New pet has been successfully added",
        });
        setIsSubmitting(false);
        navigate("/admin/pets");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create pet",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Add New Pet</h1>
        
        <div className="bg-white p-6 rounded-lg border">
          <PetForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            mode="create"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPetCreate;
