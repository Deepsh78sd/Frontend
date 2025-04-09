
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
import { Search, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for shelters
const shelters = [
  { id: 1, name: "Happy Paws Shelter", location: "New York, NY", petsCount: 24, status: "active" },
  { id: 2, name: "Furry Friends Rescue", location: "Los Angeles, CA", petsCount: 18, status: "active" },
  { id: 3, name: "Second Chance Animal Shelter", location: "Chicago, IL", petsCount: 31, status: "active" },
  { id: 4, name: "Paws & Claws Adoption", location: "Houston, TX", petsCount: 15, status: "inactive" },
  { id: 5, name: "Forever Home Society", location: "Phoenix, AZ", petsCount: 22, status: "active" },
  { id: 6, name: "Loving Care Animal Rescue", location: "Philadelphia, PA", petsCount: 19, status: "active" },
  { id: 7, name: "Safe Haven Pet Sanctuary", location: "San Antonio, TX", petsCount: 12, status: "inactive" },
  { id: 8, name: "New Beginnings Animal Shelter", location: "San Diego, CA", petsCount: 27, status: "active" },
];

const AdminShelters = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shelter Management</h1>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Shelter
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search shelters..." 
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Shelter List</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Pets Count</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shelters.map((shelter) => (
                  <TableRow key={shelter.id}>
                    <TableCell className="font-medium">{shelter.name}</TableCell>
                    <TableCell>{shelter.location}</TableCell>
                    <TableCell>{shelter.petsCount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        shelter.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {shelter.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Disable</Button>
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

export default AdminShelters;
