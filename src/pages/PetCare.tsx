import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowRight } from "lucide-react";

const PetCare = () => {
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
  ];

  const handleViewDetails = (id: number) => {
    alert(`Viewing details for pet care tip ${id}`);
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Care</h1>
          <Button>Explore More</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {petCareTips.map((tip) => (
            <Card key={tip.id}>
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
                <CardDescription>{tip.category} Care</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </CardContent>
              <Button onClick={() => handleViewDetails(tip.id)}>
                View Details <ArrowRight className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default PetCare;
