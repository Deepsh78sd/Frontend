
import { useState } from "react";
import { useToast } from "../../components/ui/use-toast";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Plus, Pencil, Trash, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Sample pet care info
const petCareInfoMockData = [
  {
    id: "1",
    title: "Basic Dog Care",
    category: "Dogs",
    summary: "Essential tips for keeping your dog healthy and happy.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "2",
    title: "Cat Nutrition Guide",
    category: "Cats",
    summary: "Complete guide to cat nutrition and feeding schedules.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2025-03-05"),
  },
  {
    id: "3",
    title: "Bird Health Essentials",
    category: "Birds",
    summary: "How to maintain the health of your pet birds.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2025-03-10"),
  },
];

const AdminPetCare = () => {
  const { toast } = useToast();
  const [petCareInfo, setPetCareInfo] = useState(petCareInfoMockData);

  const handleDelete = (id: string) => {
    setPetCareInfo(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Pet care information deleted",
      description: "The pet care information has been removed",
    });
  };

  return (
    <PageLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pet Care Information</h1>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Add New Pet Care Info
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {petCareInfo.map((info) => (
            <Card key={info.id}>
              <CardHeader>
                <CardTitle>{info.title}</CardTitle>
                <CardDescription>Category: {info.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">{info.summary}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Published on: {info.createdAt.toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/admin/petcare/${info.id}`}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/petcare/${info.id}/edit`}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(info.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPetCare;
