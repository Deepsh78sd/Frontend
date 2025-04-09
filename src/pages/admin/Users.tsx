
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

// Mock data for users
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "adopter", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "shelter", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "hospital", status: "inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "adopter", status: "active" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "admin", status: "active" },
  { id: 6, name: "Emma Davis", email: "emma@example.com", role: "adopter", status: "inactive" },
  { id: 7, name: "Alex Wilson", email: "alex@example.com", role: "shelter", status: "active" },
  { id: 8, name: "Olivia Lee", email: "olivia@example.com", role: "hospital", status: "active" },
];

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search users..." 
              className="pl-8" 
            />
          </div>
          
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="adopter">Adopter</SelectItem>
                <SelectItem value="shelter">Shelter</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">User List</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        user.role === 'admin' ? 'bg-teal-100 text-teal-800' :
                        user.role === 'shelter' ? 'bg-indigo-100 text-indigo-800' :
                        user.role === 'hospital' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Delete</Button>
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

export default AdminUsers;
