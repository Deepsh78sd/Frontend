
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { PlusCircle, Search, Filter, Eye, Pencil, Trash } from "lucide-react";
import { Input } from "../../components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import StatusBadge from "../../components/StatusBadge";
import { withPageLayout } from "../../utils/layoutHelper";

const ShelterPets = () => {
  const [pets, setPets] = useState([
    { id: 1, name: "Max", type: "Dog", breed: "Golden Retriever", age: "2 years", status: "available" },
    { id: 2, name: "Bella", type: "Cat", breed: "Maine Coon", age: "3 years", status: "pending" },
    { id: 3, name: "Charlie", type: "Dog", breed: "Beagle", age: "1 year", status: "adopted" },
    { id: 4, name: "Luna", type: "Cat", breed: "Siamese", age: "4 years", status: "available" },
    { id: 5, name: "Cooper", type: "Dog", breed: "Labrador", age: "5 years", status: "available" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleView = (id: number) => {
    window.location.href = `/shelter/pets/${id}`;
  };

  const handleEdit = (id: number) => {
    window.location.href = `/shelter/pets/${id}/edit`;
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      setPets(pets.filter(pet => pet.id !== id));
    }
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || pet.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pets</h1>
        <Button asChild>
          <Link to="/shelter/pets/create">
            <PlusCircle className="mr-2 h-4 w-4" />
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
        
        <Select defaultValue={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pets</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="adopted">Adopted</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="md:flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden md:inline">More Filters</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pet List</h2>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Breed</TableHead>
                  <TableHead className="hidden md:table-cell">Age</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell className="font-medium">{pet.name}</TableCell>
                    <TableCell>{pet.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{pet.breed}</TableCell>
                    <TableCell className="hidden md:table-cell">{pet.age}</TableCell>
                    <TableCell>
                      <StatusBadge status={pet.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(pet.id)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(pet.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(pet.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap our component with the PageLayout instead of using ShelterLayout
export default function PetsPage() {
  return withPageLayout(<ShelterPets />, 'shelter', 'Shelter Staff');
}
