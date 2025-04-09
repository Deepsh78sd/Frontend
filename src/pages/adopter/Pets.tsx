
import { useState } from "react";
import AdopterLayout from "@/components/layouts/AdopterLayout";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Heart, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Mock data for pets
const allPets = [
  {
    id: 1,
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    status: "available",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: "1 year",
    gender: "Female",
    status: "available",
    image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Buddy",
    species: "Dog",
    breed: "Labrador",
    age: "3 years",
    gender: "Male",
    status: "available",
    image: "https://images.unsplash.com/photo-1579557102725-f864cab7aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFicmFkb3IlMjByZXRyaWV2ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Milo",
    species: "Cat",
    breed: "Persian",
    age: "2 years",
    gender: "Male",
    status: "available",
    image: "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc2lhbiUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: "4 years",
    gender: "Male",
    status: "available",
    image: "https://images.unsplash.com/photo-1589941013196-bc91be2e31b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2VybWFuJTIwc2hlcGhlcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    name: "Cleo",
    species: "Cat",
    breed: "Maine Coon",
    age: "1 year",
    gender: "Female",
    status: "available",
    image: "https://images.unsplash.com/photo-1615796153287-53ca0735931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpbmUlMjBjb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 7,
    name: "Bella",
    species: "Dog",
    breed: "Beagle",
    age: "5 years",
    gender: "Female",
    status: "available",
    image: "https://images.unsplash.com/photo-1544715660-c0891b2f7ba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 8,
    name: "Whiskers",
    species: "Cat",
    breed: "Ragdoll",
    age: "3 years",
    gender: "Male",
    status: "available",
    image: "https://images.unsplash.com/photo-1592308115958-3112e8bec286?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFnZG9sbCUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const AdopterPets = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Apply filters
  const filteredPets = allPets
    .filter(pet => speciesFilter === "all" || pet.species.toLowerCase() === speciesFilter)
    .filter(pet => {
      if (ageFilter === "all") return true;
      const ageNum = parseInt(pet.age.split(' ')[0]);
      
      if (ageFilter === "puppy" && pet.species === "Dog") return ageNum <= 1;
      if (ageFilter === "kitten" && pet.species === "Cat") return ageNum <= 1;
      if (ageFilter === "young") return ageNum >= 1 && ageNum <= 3;
      if (ageFilter === "adult") return ageNum > 3;
      
      return true;
    })
    .filter(pet => 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      toast({
        title: "Removed from favorites",
        description: "The pet has been removed from your favorites.",
      });
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Added to favorites",
        description: "The pet has been added to your favorites.",
      });
    }
  };

  return (
    <AdopterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Adopt a Pet</h1>
          {favorites.length > 0 && (
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4 fill-teal-500 text-teal-500" />
              Favorites ({favorites.length})
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search pets by name or breed..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="puppy">Puppy/Kitten</SelectItem>
                <SelectItem value="young">Young</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        <div>
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="object-cover w-full h-full"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1"
                      onClick={() => toggleFavorite(pet.id)}
                    >
                      <Heart className={`h-5 w-5 ${favorites.includes(pet.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </Button>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl">{pet.name}</CardTitle>
                    <CardDescription>
                      {pet.breed} · {pet.age} · {pet.gender}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2">
                    <Button asChild className="w-full bg-teal-500 hover:bg-teal-600">
                      <Link to={`/adopter/pets/${pet.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white border rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No pets found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <div className="mt-6">
                <Button onClick={() => {
                  setSearchQuery("");
                  setSpeciesFilter("all");
                  setAgeFilter("all");
                }}>
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdopterLayout>
  );
};

export default AdopterPets;
