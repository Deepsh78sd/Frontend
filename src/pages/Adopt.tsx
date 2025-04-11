
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import StatusBadge from "../components/StatusBadge";
import { Search, Filter, PawPrint } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

// Mock data for pets
const mockPets = [
  {
    id: "pet-1",
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    status: "available",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fA%3D%3D&w=500&q=60"
  },
  {
    id: "pet-2",
    name: "Luna",
    type: "Cat",
    breed: "Maine Coon",
    age: "3 years",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1615796153287-53ca0735931a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpbmUlMjBjb29ufGVufDB8fDB8fA%3D%3D&w=500&q=60"
  },
  {
    id: "pet-3",
    name: "Buddy",
    type: "Dog",
    breed: "Labrador",
    age: "1 year",
    status: "available",
    imageUrl: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8TGFicmFkb3J8ZW58MHx8MHx8&w=500&q=60"
  },
  {
    id: "pet-4",
    name: "Charlie",
    type: "Bird",
    breed: "Parrot",
    age: "5 years",
    status: "adopted",
    imageUrl: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8UGFycm90fGVufDB8fDB8fA%3D%3D&w=500&q=60"
  }
];

const Adopt = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would filter the pets based on the search query
  };

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
    console.log("Filtering by:", filterValue);
    // In a real app, this would filter the pets based on the status
  };

  const handleAdoptClick = (petId: string) => {
    navigate(`/adopter/adopt/${petId}`);
  };

  // Filter pets based on the search query and status
  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || pet.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Adopt a Pet</h1>
          <div className="flex gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Search className="mr-2 h-4 w-4" />
              Find a Pet
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
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
          <Select onValueChange={handleFilterChange} defaultValue={filter}>
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
          <Button type="submit">Search</Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => (
            <Card key={pet.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={pet.imageUrl} 
                  alt={pet.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>{pet.name}</span>
                  <StatusBadge status={pet.status as "available" | "pending" | "adopted"} />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 pb-2">
                <p className="text-sm text-gray-500">
                  {pet.breed} • {pet.age}
                </p>
                <p className="text-sm">{pet.type}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAdoptClick(pet.id)}
                  disabled={pet.status !== "available"}
                >
                  <PawPrint className="mr-2 h-4 w-4" />
                  {pet.status === "available" ? "Apply to Adopt" : 
                   pet.status === "pending" ? "Application Pending" : "Already Adopted"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Adopt;
