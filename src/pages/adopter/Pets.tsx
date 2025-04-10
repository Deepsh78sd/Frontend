
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { Search, Filter, Heart, Eye, Upload } from "lucide-react";
import StatusBadge, { StatusType } from "../../components/StatusBadge";
import { withPageLayout } from "../../utils/layoutHelper";
import { useToast } from "../../components/ui/use-toast";

const AdopterPetsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | StatusType>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock pet data
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      status: "available" as StatusType,
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Max is a friendly and energetic Golden Retriever looking for an active family."
    },
    {
      id: 2,
      name: "Bella",
      type: "Cat",
      breed: "Maine Coon",
      age: "3 years",
      status: "pending" as StatusType,
      image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Bella is a gentle Maine Coon who loves to cuddle and play with toys."
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Beagle",
      age: "1 year",
      status: "available" as StatusType,
      image: "https://images.unsplash.com/photo-1585584114963-503344a119b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Charlie is a playful Beagle puppy who needs a home with a yard to run around in."
    },
    {
      id: 4,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "4 years",
      status: "adopted" as StatusType,
      image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Luna is a talkative Siamese cat who enjoys sitting on laps and being the center of attention."
    },
  ]);

  const handleSearch = () => {
    toast({
      title: "Searching for pets",
      description: `Search query: ${searchQuery}`
    });
  };

  const handleViewPet = (id: number) => {
    navigate(`/adopter/pets/${id}`);
  };

  const handleAdoptPet = (id: number) => {
    toast({
      title: "Adoption Request Submitted",
      description: "Your request has been submitted successfully!"
    });
  };

  const handlePhotoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Photo Uploaded",
        description: `Successfully uploaded: ${file.name}`
      });
      // In a real app, you would process the file here
    }
  };

  const filteredPets = pets.filter(pet => {
    // Filter by search query
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = filter === "all" || pet.status === filter;
    
    return matchesSearch && matchesStatus;
  });

  // Type-safe handler for Select component
  const handleFilterChange = (value: string) => {
    setFilter(value as "all" | StatusType);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Adopt a Pet</h1>
        <div className="flex gap-2">
          <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Find a Pet
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" onClick={handlePhotoUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Pet Photo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for pets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="adopted">Adopted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{pet.name}</span>
                <StatusBadge status={pet.status} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span>{pet.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Breed:</span>
                <span>{pet.breed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Age:</span>
                <span>{pet.age}</span>
              </div>
              <p className="text-sm line-clamp-2 mt-2">{pet.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleViewPet(pet.id)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
              {pet.status === "available" && (
                <Button 
                  className="flex-1 bg-teal-500 hover:bg-teal-600"
                  onClick={() => handleAdoptPet(pet.id)}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Adopt
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Wrap our component with the PageLayout
export default function AdopterPets() {
  return withPageLayout(<AdopterPetsPage />, 'adopter', 'John Doe');
}
