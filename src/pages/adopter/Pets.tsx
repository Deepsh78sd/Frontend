
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StatusBadge, { StatusType } from "@/components/StatusBadge";

// Sample data for pets available for adoption
const petsData = [
  {
    id: "1",
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    shelter: "Happy Paws Shelter",
    status: "available" as StatusType,
    description: "Max is a friendly and energetic dog who loves to play fetch and go for walks.",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
  },
  {
    id: "2",
    name: "Bella",
    type: "Cat",
    breed: "Maine Coon",
    age: "3 years",
    gender: "Female",
    shelter: "Furry Friends Rescue",
    status: "available" as StatusType,
    description: "Bella is a calm and affectionate cat who enjoys being petted and sitting on laps.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80",
  },
  {
    id: "3",
    name: "Charlie",
    type: "Dog",
    breed: "Beagle",
    age: "1 year",
    gender: "Male",
    shelter: "Second Chance Animal Shelter",
    status: "available" as StatusType,
    description: "Charlie is a playful and curious puppy who gets along well with children and other pets.",
    imageUrl: "https://images.unsplash.com/photo-1584125228375-e31c8d9a6ddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  },
  {
    id: "4",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "4 years",
    gender: "Female",
    shelter: "Happy Paws Shelter",
    status: "available" as StatusType,
    description: "Luna is a vocal and intelligent cat who loves to interact with people.",
    imageUrl: "https://images.unsplash.com/photo-1517593622133-cc5a71b67046?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80",
  },
  {
    id: "5",
    name: "Cooper",
    type: "Dog",
    breed: "Labrador",
    age: "5 years",
    gender: "Male",
    shelter: "Forever Home Society",
    status: "available" as StatusType,
    description: "Cooper is a gentle and well-trained dog who loves swimming and fetching balls.",
    imageUrl: "https://images.unsplash.com/photo-1595634067320-3ddfa0fa2435?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    id: "6",
    name: "Oliver",
    type: "Bird",
    breed: "Cockatiel",
    age: "2 years",
    gender: "Male",
    shelter: "Exotic Pets Rescue",
    status: "available" as StatusType,
    description: "Oliver is a friendly and talkative bird who loves to whistle tunes.",
    imageUrl: "https://images.unsplash.com/photo-1548079345-f225bcdd4eef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const AdopterPets = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusType | "all">("all");

  // Type-safe handler for the status select
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as StatusType | "all");
  };

  // Type-safe handler for the type select
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  const filteredPets = petsData.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || pet.type === typeFilter;
    const matchesStatus = statusFilter === "all" || pet.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewDetails = (id: string) => {
    navigate(`/adopter/pets/${id}`);
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Adopt a Pet</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search pets..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select defaultValue={typeFilter} onValueChange={handleTypeFilterChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Dog">Dogs</SelectItem>
              <SelectItem value="Cat">Cats</SelectItem>
              <SelectItem value="Bird">Birds</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="adopted">Adopted</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => (
            <Card key={pet.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={pet.imageUrl} 
                  alt={pet.name} 
                  className="w-full h-full object-cover transform transition-transform hover:scale-105"
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
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{pet.type}</Badge>
                  <Badge variant="outline">{pet.gender}</Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {pet.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Shelter: {pet.shelter}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewDetails(pet.id)}
                >
                  View Details
                </Button>
                <Button 
                  className="w-full ml-2 bg-green-500 hover:bg-green-600"
                  onClick={() => navigate(`/adopter/applications/new?petId=${pet.id}`)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Adopt
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterPets;
