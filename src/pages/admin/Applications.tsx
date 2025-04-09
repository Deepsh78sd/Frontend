
import AdminLayout from "@/components/layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Define the type for applications
type Application = {
  id: number;
  petName: string;
  applicantName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

// Mock data for applications
const applications: Application[] = [
  { id: 1, petName: "Max", applicantName: "John Doe", date: "2023-09-15", status: "pending" },
  { id: 2, petName: "Bella", applicantName: "Jane Smith", date: "2023-09-14", status: "approved" },
  { id: 3, petName: "Charlie", applicantName: "Mike Johnson", date: "2023-09-13", status: "rejected" },
  { id: 4, petName: "Luna", applicantName: "Sarah Williams", date: "2023-09-12", status: "pending" },
  { id: 5, petName: "Cooper", applicantName: "Alex Brown", date: "2023-09-11", status: "approved" },
  { id: 6, petName: "Daisy", applicantName: "Emma Wilson", date: "2023-09-10", status: "pending" },
  { id: 7, petName: "Rocky", applicantName: "David Miller", date: "2023-09-09", status: "rejected" },
  { id: 8, petName: "Lola", applicantName: "Olivia Davis", date: "2023-09-08", status: "pending" },
  { id: 9, petName: "Teddy", applicantName: "Daniel Thomas", date: "2023-09-07", status: "approved" },
  { id: 10, petName: "Roxy", applicantName: "Sophia Anderson", date: "2023-09-06", status: "pending" },
];

const ApplicationTable = ({ applications }: { applications: Application[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>#{application.id}</TableCell>
              <TableCell>{application.petName}</TableCell>
              <TableCell>{application.applicantName}</TableCell>
              <TableCell>{application.date}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status}
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
  );
};

const AdminApplications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter applications based on search query and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Application Management</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search applications..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Adoption Applications</h2>
          <ApplicationTable applications={filteredApplications} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;
