
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import StatusBadge from "../../components/StatusBadge";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

// Mock data for pet types and availability status
const petTypes = ["Dog", "Cat", "Bird", "Other"];
const availabilityStatuses = ["Available", "Adopted", "Fostered", "Not Available"];

const AdminPetView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async () => {
    // Mock API call to delete pet
    try {
      toast({
        title: "Pet Deleted",
        description: "Pet has been successfully deleted",
      });
      // In a real app, navigate after successful deletion
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pet",
        variant: "destructive"
      });
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

  if (!pet) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-lg mb-4">Pet not found</p>
          <Button asChild>
            <Link to="/admin/pets">Back to Pets</Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/admin/pets">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pets
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Pet Details</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button asChild className="bg-teal-500 hover:bg-teal-600">
              <Link to={`/admin/pets/${id}/edit`}>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={pet.photoUrl || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={pet.name}
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
                  <h2 className="text-2xl font-bold">{pet.name}</h2>
                  <StatusBadge status={availabilityStatuses[pet.availabilityStatus].toLowerCase() as any} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Breed</p>
                    <p>{pet.breed}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Age</p>
                    <p>{pet.age}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Type</p>
                    <p>{petTypes[pet.petType]}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{pet.address || "No address provided"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPetView;
