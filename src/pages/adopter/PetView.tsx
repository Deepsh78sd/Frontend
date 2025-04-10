
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Heart, ArrowLeft, Calendar } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
import StatusBadge from "../../components/StatusBadge";

const PetView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);

  // Mock pet data (replace with actual data fetching)
  const pet = {
    id: "pet-1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    size: "Large",
    description: "A friendly and playful Golden Retriever looking for a loving home.",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    status: "available" as const,
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="max-w-4xl mx-auto">
        {isLoaded && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{pet.name}</CardTitle>
              <StatusBadge status={pet.status} />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex justify-center">
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="rounded-md object-cover aspect-square w-full h-64"
                  />
                </div>
                <div className="grid gap-2">
                  <CardDescription>
                    {pet.description}
                  </CardDescription>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Type</Label>
                      <p className="text-sm font-medium">{pet.type}</p>
                    </div>
                    <div>
                      <Label>Breed</Label>
                      <p className="text-sm font-medium">{pet.breed}</p>
                    </div>
                    <div>
                      <Label>Age</Label>
                      <p className="text-sm font-medium">{pet.age}</p>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <p className="text-sm font-medium">{pet.gender}</p>
                    </div>
                    <div>
                      <Label>Size</Label>
                      <p className="text-sm font-medium">{pet.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="space-x-2">
                <Button>
                  <Heart className="mr-2 h-4 w-4" />
                  Adopt Me
                </Button>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Foster Me
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
        {isLoaded && (
          <PageLayout userRole="adopter" userName="John Doe">
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold">Loading Pet Details...</h2>
              <p className="text-gray-500">Please wait, fetching pet information.</p>
            </div>
          </PageLayout>
        )}
        {isError && (
          <PageLayout userRole="adopter" userName="John Doe">
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold text-red-500">Error Loading Pet Details</h2>
              <p className="text-gray-500">Failed to load pet information. Please try again later.</p>
            </div>
          </PageLayout>
        )}
      </div>
    </PageLayout>
  );
};

export default PetView;
