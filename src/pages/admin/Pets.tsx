
import AdminLayout from "@/components/layouts/AdminLayout";
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
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for pets
const pets = [
  { id: 1, name: "Max", species: "Dog", breed: "Golden Retriever", age: "2 years", shelter: "Happy Paws Shelter", status: "available" },
  { id: 2, name: "Bella", species: "Cat", breed: "Siamese", age: "1 year", shelter: "Furry Friends Rescue", status: "adopted" },
  { id: 3, name: "Charlie", species: "Dog", breed: "Beagle", age: "3 years", shelter: "Second Chance Animal Shelter", status: "available" },
  { id: 4, name: "Luna", species: "Cat", breed: "Persian", age: "4 years", shelter: "Happy Paws Shelter", status: "fostered" },
  { id: 5, name: "Cooper", species: "Dog", breed: "Labrador Retriever", age: "1 year", shelter: "Forever Home Society", status: "available" },
  { id: 6, name: "Lucy", species: "Cat", breed: "Maine Coon", age: "2 years", shelter: "Loving Care Animal Rescue", status: "available" },
  { id: 7, name: "Bailey", species: "Dog", breed: "German Shepherd", age: "5 years", shelter: "Safe Haven Pet Sanctuary", status: "adopted" },
  { id: 8, name: "Oliver", species: "Cat", breed: "Ragdoll", age: "3 years", shelter: "New Beginnings Animal Shelter", status: "available" },
];

const AdminPets = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Management</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search pets..." 
              className="pl-8" 
            />
          </div>
          
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="adopted">Adopted</SelectItem>
                <SelectItem value="fostered">Fostered</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
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
                  <TableHead>Breed</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Shelter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell className="font-medium">{pet.name}</TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>{pet.breed}</TableCell>
                    <TableCell>{pet.age}</TableCell>
                    <TableCell>{pet.shelter}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        pet.status === 'available' ? 'bg-green-100 text-green-800' : 
                        pet.status === 'adopted' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pet.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPets;
