
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import StatusBadge from "../../components/StatusBadge";
import { ArrowLeft, Heart, Calendar } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import PageLayout from "../../components/PageLayout";

// Mock data for pet types and availability status
const petTypes = ["Dog", "Cat", "Bird", "Other"];
const availabilityStatuses = ["Available", "Adopted", "Fostered", "Not Available"];

const AdopterPetView = () => {
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
          description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He is good with children and other pets."
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

  const handleAdopt = () => {
    toast({
      title: "Adoption Request Sent",
      description: "Your adoption request has been submitted. We'll contact you soon!",
    });
  };

  const handleSchedule = () => {
    // Navigate to appointment creation for this pet
    window.location.href = `/adopter/appointments/create?petId=${id}`;
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading pet details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!pet) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-lg mb-4">Pet not found</p>
          <Button asChild>
            <Link to="/adopter/pets">Back to Pets</Link>
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
              <Link to="/adopter/pets">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pets
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Pet Details</h1>
          </div>
          
          {pet.availabilityStatus === 0 && (
            <div className="flex space-x-2">
              <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleAdopt}>
                <Heart className="mr-2 h-4 w-4" />
                Adopt Me
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSchedule}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
              </Button>
            </div>
          )}
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
                  <p className="text-sm text-gray-500">About</p>
                  <p>{pet.description || "No description provided."}</p>
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
    </PageLayout>
  );
};

export default AdopterPetView;
