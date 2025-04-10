
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ArrowRight } from "lucide-react";
import { withPageLayout } from "../../utils/layoutHelper";

const PetCarePage = () => {
  const petCareTips = [
    {
      id: 1,
      title: "Basic Dog Training",
      description: "Learn the basics of dog training to build a strong bond with your furry friend.",
      category: "Dog",
    },
    {
      id: 2,
      title: "Healthy Cat Diet",
      description: "Discover the best diet for your cat to keep them healthy and happy.",
      category: "Cat",
    },
    {
      id: 3,
      title: "Bird Cage Setup",
      description: "Set up the perfect cage for your bird to ensure their comfort and well-being.",
      category: "Bird",
    },
    {
      id: 4,
      title: "First Aid for Pets",
      description: "Essential first aid tips that every pet owner should know.",
      category: "General",
    },
    {
      id: 5,
      title: "Grooming Techniques",
      description: "Proper grooming techniques for different types of pets.",
      category: "General",
    },
  ];

  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for pet care tip ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pet Care Information</h1>
        <Button>Add New Tip</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petCareTips.map((tip) => (
          <Card key={tip.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{tip.title}</CardTitle>
              <CardDescription>{tip.category} Care</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{tip.description}</p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleViewDetails(tip.id)}
              >
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Wrap our component with the PageLayout
export default function ShelterPetCare() {
  return withPageLayout(<PetCarePage />, 'shelter', 'Shelter Staff');
}
