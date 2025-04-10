
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import { withPageLayout } from "../../utils/layoutHelper";
import { ArrowRight, Pencil, Trash, PlusCircle } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const HospitalPetCarePage = () => {
  const { toast } = useToast();
  const [petCareTips, setPetCareTips] = useState([
    {
      id: 1,
      title: "Preventative Care for Dogs",
      description: "Regular checkups, vaccinations, and preventative medications are essential for keeping dogs healthy.",
      category: "Dog",
    },
    {
      id: 2,
      title: "Dental Health for Cats",
      description: "Proper dental care is crucial for cats. Learn how to keep your cat's teeth clean and healthy.",
      category: "Cat",
    },
    {
      id: 3,
      title: "Nutrition Guidelines",
      description: "Proper nutrition is essential for pets of all ages. Learn about balanced diets for different life stages.",
      category: "General",
    },
    {
      id: 4,
      title: "Emergency First Aid",
      description: "Be prepared for pet emergencies with these first aid tips that could save your pet's life.",
      category: "Emergency",
    },
    {
      id: 5,
      title: "Parasite Prevention",
      description: "Learn about common parasites and how to protect your pets from fleas, ticks, and worms.",
      category: "Prevention",
    },
  ]);

  const handleViewDetails = (id: number) => {
    toast({
      title: "View Details",
      description: `Viewing care tip ID: ${id}`
    });
  };

  const handleEditTip = (id: number) => {
    toast({
      title: "Edit Care Tip",
      description: `Editing care tip ID: ${id}`
    });
  };

  const handleDeleteTip = (id: number) => {
    if (window.confirm("Are you sure you want to delete this care tip?")) {
      setPetCareTips(petCareTips.filter(tip => tip.id !== id));
      toast({
        title: "Care Tip Deleted",
        description: `Care tip ID ${id} has been deleted`,
        variant: "destructive"
      });
    }
  };

  const handleAddTip = () => {
    toast({
      title: "Add Care Tip",
      description: "Opening form to add a new pet care tip"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pet Care Information</h1>
        <Button onClick={handleAddTip}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Tip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petCareTips.map((tip) => (
          <Card key={tip.id} className="overflow-hidden flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tip.title}</CardTitle>
                  <CardDescription>{tip.category} Care</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditTip(tip.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTip(tip.id)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600">{tip.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleViewDetails(tip.id)}
              >
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Wrap our component with the PageLayout
export default function HospitalPetCare() {
  return withPageLayout(<HospitalPetCarePage />, 'hospital', 'Hospital Staff');
}
