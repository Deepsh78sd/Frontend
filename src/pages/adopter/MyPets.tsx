
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { PlusCircle, Calendar, Edit, Trash, Eye } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { useToast } from "../../components/ui/use-toast";

// Define types
type PetType = "Dog" | "Cat" | "Bird" | "Other";
type PetStatus = "available" | "pending" | "adopted" | "fostered";

interface Pet {
  id: string;
  name: string;
  petType: PetType;
  breed: string;
  age: string;
  status: PetStatus;
  imageUrl: string;
  description: string;
  createdAt: Date;
  fosterDays?: number;
}

// Sample data for my pets
const myPetsMockData: Pet[] = [
  {
    id: "pet-1",
    name: "Max",
    petType: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    status: "available",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "Friendly and energetic golden retriever looking for a loving home.",
    createdAt: new Date("2025-03-15"),
  },
  {
    id: "pet-2",
    name: "Bella",
    petType: "Cat",
    breed: "Siamese",
    age: "1 year",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "Playful Siamese cat that loves to cuddle.",
    createdAt: new Date("2025-03-20"),
  },
  {
    id: "pet-3",
    name: "Charlie",
    petType: "Dog",
    breed: "Beagle",
    age: "3 years",
    status: "fostered",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "Friendly beagle that needs a temporary home.",
    createdAt: new Date("2025-03-10"),
    fosterDays: 30,
  },
  {
    id: "pet-4",
    name: "Luna",
    petType: "Cat",
    breed: "Persian",
    age: "4 years",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description: "Beautiful Persian cat looking for a family.",
    createdAt: new Date("2025-03-05"),
  },
];

const MyPets = () => {
  const { toast } = useToast();
  const [myPets, setMyPets] = useState<Pet[]>(myPetsMockData);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter pets based on active tab
  const filteredPets = activeTab === "all" 
    ? myPets 
    : myPets.filter(pet => {
        if (activeTab === "fostering") return pet.status === "fostered";
        if (activeTab === "adoption") return pet.status === "available" || pet.status === "pending";
        return false;
      });

  const handleDeletePet = (petId: string) => {
    setMyPets(prev => prev.filter(pet => pet.id !== petId));
    toast({
      title: "Pet removed",
      description: "The pet has been removed from your list",
    });
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Pets</h1>
          <div className="flex gap-2">
            <Button asChild className="bg-teal-500 hover:bg-teal-600">
              <Link to="/adopter/mypets/add-adoption">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Pet for Adoption
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/adopter/mypets/add-fostering">
                <Calendar className="mr-2 h-4 w-4" />
                Add Pet for Fostering
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Pets</TabsTrigger>
            <TabsTrigger value="adoption">For Adoption</TabsTrigger>
            <TabsTrigger value="fostering">For Fostering</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredPets.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-md border">
                <p className="text-gray-500">No pets found in this category</p>
                <Button 
                  variant="link" 
                  asChild
                  className="mt-2"
                >
                  <Link to={activeTab === "fostering" ? "/adopter/mypets/add-fostering" : "/adopter/mypets/add-adoption"}>
                    Add a pet now
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <Card key={pet.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={pet.imageUrl} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{pet.name}</CardTitle>
                          <CardDescription>{pet.breed} • {pet.age}</CardDescription>
                        </div>
                        <StatusBadge status={pet.status} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{pet.description}</p>
                      {pet.fosterDays && (
                        <p className="text-sm mt-2 text-teal-600">Foster period: {pet.fosterDays} days</p>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/adopter/mypets/${pet.id}`}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/adopter/mypets/${pet.id}/edit`}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeletePet(pet.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MyPets;
