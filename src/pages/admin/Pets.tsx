
import AdminLayout from "../../components/layouts/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Search, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

// Pet type enum mapping
const petTypes = ["Dog", "Cat", "Bird", "Other"];

// Availability status enum mapping
const availabilityStatuses = ["Available", "Adopted", "Fostered", "Not Available"];

// Mock data for pets
const pets = [
  { id: 1, name: "Max", species: petTypes[0], breed: "Golden Retriever", age: "2 years", shelter: "Happy Paws Shelter", availabilityStatus: 0 },
  { id: 2, name: "Bella", species: petTypes[1], breed: "Siamese", age: "1 year", shelter: "Furry Friends Rescue", availabilityStatus: 1 },
  { id: 3, name: "Charlie", species: petTypes[0], breed: "Beagle", age: "3 years", shelter: "Second Chance Animal Shelter", availabilityStatus: 0 },
  { id: 4, name: "Luna", species: petTypes[1], breed: "Persian", age: "4 years", shelter: "Happy Paws Shelter", availabilityStatus: 2 },
  { id: 5, name: "Cooper", species: petTypes[0], breed: "Labrador Retriever", age: "1 year", shelter: "Forever Home Society", availabilityStatus: 0 },
  { id: 6, name: "Lucy", species: petTypes[1], breed: "Maine Coon", age: "2 years", shelter: "Loving Care Animal Rescue", availabilityStatus: 0 },
  { id: 7, name: "Bailey", species: petTypes[0], breed: "German Shepherd", age: "5 years", shelter: "Safe Haven Pet Sanctuary", availabilityStatus: 1 },
  { id: 8, name: "Oliver", species: petTypes[1], breed: "Ragdoll", age: "3 years", shelter: "New Beginnings Animal Shelter", availabilityStatus: 0 },
];

const AdminPets = () => {
  return (
    <AdminLayout>
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
            />
          </div>
          
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="0">Available</SelectItem>
                <SelectItem value="1">Adopted</SelectItem>
                <SelectItem value="2">Fostered</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="0">Dog</SelectItem>
                <SelectItem value="1">Cat</SelectItem>
                <SelectItem value="2">Bird</SelectItem>
                <SelectItem value="3">Other</SelectItem>
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
                      <StatusBadge status={availabilityStatuses[pet.availabilityStatus].toLowerCase() as any} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/pets/${pet.id}`}>View</Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/pets/${pet.id}/edit`}>Edit</Link>
                      </Button>
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
