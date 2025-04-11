
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import ActionButtons from "@/components/ActionButtons";
import { useToast } from "@/components/ui/use-toast";

// Pet type enum mapping
const petTypes = ["Dog", "Cat", "Bird", "Other"];

// Availability status enum mapping
const availabilityStatuses = ["available", "adopted", "fostered", "pending"];

// Mock data for pets
const petsData = [
  { id: 1, name: "Max", species: petTypes[0], breed: "Golden Retriever", age: "2 years", shelter: "Happy Paws Shelter", availabilityStatus: availabilityStatuses[0] },
  { id: 2, name: "Bella", species: petTypes[1], breed: "Siamese", age: "1 year", shelter: "Furry Friends Rescue", availabilityStatus: availabilityStatuses[1] },
  { id: 3, name: "Charlie", species: petTypes[0], breed: "Beagle", age: "3 years", shelter: "Second Chance Animal Shelter", availabilityStatus: availabilityStatuses[0] },
  { id: 4, name: "Luna", species: petTypes[1], breed: "Persian", age: "4 years", shelter: "Happy Paws Shelter", availabilityStatus: availabilityStatuses[2] },
  { id: 5, name: "Cooper", species: petTypes[0], breed: "Labrador Retriever", age: "1 year", shelter: "Forever Home Society", availabilityStatus: availabilityStatuses[0] },
  { id: 6, name: "Lucy", species: petTypes[1], breed: "Maine Coon", age: "2 years", shelter: "Loving Care Animal Rescue", availabilityStatus: availabilityStatuses[0] },
  { id: 7, name: "Bailey", species: petTypes[0], breed: "German Shepherd", age: "5 years", shelter: "Safe Haven Pet Sanctuary", availabilityStatus: availabilityStatuses[1] },
  { id: 8, name: "Oliver", species: petTypes[1], breed: "Ragdoll", age: "3 years", shelter: "New Beginnings Animal Shelter", availabilityStatus: availabilityStatuses[0] },
];

const AdminPets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pets, setPets] = useState(petsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter pets based on search query and filters
  const filteredPets = pets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.shelter.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecies = speciesFilter === "all" || pet.species === speciesFilter;
    const matchesStatus = statusFilter === "all" || pet.availabilityStatus === statusFilter;
    
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  const handleView = (id: number) => {
    navigate(`/admin/pets/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/pets/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    setPets(pets.filter(pet => pet.id !== id));
    toast({
      title: "Pet deleted",
      description: "The pet has been removed from the database.",
    });
  };

  return (
    <PageLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Management</h1>
          <Button className="bg-teal-500 hover:bg-teal-600" asChild>
            <Link to="/admin/pets/create">
              <Plus className="mr-2 h-4 w-4" />
              Add New Pet
            </Link>
          </Button>
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
          
          <div className="flex gap-3">
            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="adopted">Adopted</SelectItem>
                <SelectItem value="fostered">Fostered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="Dog">Dog</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Bird">Bird</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Pet List</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead className="hidden md:table-cell">Breed</TableHead>
                  <TableHead className="hidden md:table-cell">Age</TableHead>
                  <TableHead className="hidden md:table-cell">Shelter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No pets found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPets.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell className="font-medium">{pet.name}</TableCell>
                      <TableCell>{pet.species}</TableCell>
                      <TableCell className="hidden md:table-cell">{pet.breed}</TableCell>
                      <TableCell className="hidden md:table-cell">{pet.age}</TableCell>
                      <TableCell className="hidden md:table-cell">{pet.shelter}</TableCell>
                      <TableCell>
                        <StatusBadge status={pet.availabilityStatus as any} />
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionButtons
                          onView={() => handleView(pet.id)}
                          onEdit={() => handleEdit(pet.id)}
                          onDelete={() => handleDelete(pet.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPets;
