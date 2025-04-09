
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

// Mock data for hospitals
const hospitals = [
  { id: 1, name: "Central Pet Hospital", location: "New York, NY", appointmentsCount: 32, status: "active" },
  { id: 2, name: "Westside Veterinary Clinic", location: "Los Angeles, CA", appointmentsCount: 27, status: "active" },
  { id: 3, name: "Paws & Claws Animal Hospital", location: "Chicago, IL", appointmentsCount: 18, status: "active" },
  { id: 4, name: "Healthy Pets Medical Center", location: "Houston, TX", appointmentsCount: 24, status: "inactive" },
  { id: 5, name: "Pet Care Specialists", location: "Phoenix, AZ", appointmentsCount: 21, status: "active" },
  { id: 6, name: "Animal Wellness Clinic", location: "Philadelphia, PA", appointmentsCount: 15, status: "active" },
  { id: 7, name: "City Veterinary Hospital", location: "San Antonio, TX", appointmentsCount: 19, status: "inactive" },
  { id: 8, name: "Pawsitive Health Center", location: "San Diego, CA", appointmentsCount: 22, status: "active" },
];

const AdminHospitals = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hospital Management</h1>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Hospital
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search hospitals..." 
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
          <h2 className="text-lg font-semibold mb-4">Hospital List</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospitals.map((hospital) => (
                  <TableRow key={hospital.id}>
                    <TableCell className="font-medium">{hospital.name}</TableCell>
                    <TableCell>{hospital.location}</TableCell>
                    <TableCell>{hospital.appointmentsCount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        hospital.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {hospital.status}
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

export default AdminHospitals;
