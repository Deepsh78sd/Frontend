
import { useState } from "react";
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
import { Search, Filter, Plus, Pencil, Trash, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { withPageLayout } from "../../utils/layoutHelper";
import { useToast } from "../../components/ui/use-toast";

// Mock data for users
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "adopter", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "shelter", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "hospital", status: "inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "adopter", status: "active" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "admin", status: "active" },
  { id: 6, name: "Emma Davis", email: "emma@example.com", role: "adopter", status: "inactive" },
  { id: 7, name: "Alex Wilson", email: "alex@example.com", role: "shelter", status: "active" },
  { id: 8, name: "Olivia Lee", email: "olivia@example.com", role: "hospital", status: "active" },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "Opening user creation form"
    });
  };

  const handleViewUser = (userId: number) => {
    toast({
      title: "View User",
      description: `Viewing details for user ID: ${userId}`
    });
  };

  const handleEditUser = (userId: number) => {
    toast({
      title: "Edit User",
      description: `Editing user ID: ${userId}`
    });
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "User Deleted",
        description: `User ID ${userId} has been deleted`,
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user => {
    // Filter by search query
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by role
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddUser}>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
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
              {filteredUsers.map((user) => (
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
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewUser(user.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id)}
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
  );
};

// Wrap our component with the PageLayout
export default function AdminUsers() {
  return withPageLayout(<AdminUsersPage />, 'admin', 'Admin User');
}
