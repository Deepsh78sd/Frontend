
import { useState } from "react";
import ShelterLayout from "@/components/layouts/ShelterLayout";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/components/ui/use-toast";

// Mock data for pets
const petsList = [
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
    status: "pending",
    image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Buddy",
    species: "Dog",
    breed: "Labrador",
    age: "3 years",
    gender: "Male",
    status: "adopted",
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
    status: "pending",
    image: "https://images.unsplash.com/photo-1544715660-c0891b2f7ba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 8,
    name: "Whiskers",
    species: "Cat",
    breed: "Ragdoll",
    age: "3 years",
    gender: "Male",
    status: "adopted",
    image: "https://images.unsplash.com/photo-1592308115958-3112e8bec286?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFnZG9sbCUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const ShelterPets = () => {
  const { toast } = useToast();
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [pets, setPets] = useState(petsList);

  // Filter pets based on status
  const filteredPets = filter === "all" 
    ? pets 
    : pets.filter(pet => pet.status === filter);

  const handleDeletePet = (id: number) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
    toast({
      title: "Pet Removed",
      description: "The pet has been removed from your listings.",
    });
  };

  const handleAddPet = () => {
    toast({
      title: "Add Pet",
      description: "This functionality would add a new pet to your listings.",
    });
  };

  const handleEditPet = (id: number) => {
    toast({
      title: "Edit Pet",
      description: `This functionality would edit pet with ID: ${id}`,
    });
  };

  return (
    <ShelterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manage Pets</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="mr-2 h-4 w-4" /> Add New Pet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Pet</DialogTitle>
                <DialogDescription>
                  Enter the details of the new pet for adoption.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right font-medium">
                    Name
                  </label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="species" className="text-right font-medium">
                    Species
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="breed" className="text-right font-medium">
                    Breed
                  </label>
                  <Input id="breed" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="age" className="text-right font-medium">
                    Age
                  </label>
                  <Input id="age" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="gender" className="text-right font-medium">
                    Gender
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-right font-medium">
                    Image
                  </label>
                  <Input id="image" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddPet} className="bg-teal-500 hover:bg-teal-600">Add Pet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search pets..." 
              className="pl-8" 
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pets</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="adopted">Adopted</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button 
                variant={view === "grid" ? "default" : "ghost"} 
                className={`rounded-none px-3 ${view === "grid" ? "bg-teal-500 hover:bg-teal-600" : ""}`}
                onClick={() => setView("grid")}
              >
                Grid
              </Button>
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                className={`rounded-none px-3 ${view === "list" ? "bg-teal-500 hover:bg-teal-600" : ""}`}
                onClick={() => setView("list")}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={pet.status} />
                  </div>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xl">{pet.name}</CardTitle>
                  <CardDescription>
                    {pet.breed} · {pet.age} · {pet.gender}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditPet(pet.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeletePet(pet.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>{pet.id}</TableCell>
                    <TableCell className="font-medium">{pet.name}</TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>{pet.breed}</TableCell>
                    <TableCell>{pet.age}</TableCell>
                    <TableCell>{pet.gender}</TableCell>
                    <TableCell>
                      <StatusBadge status={pet.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEditPet(pet.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeletePet(pet.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </ShelterLayout>
  );
};

export default ShelterPets;
