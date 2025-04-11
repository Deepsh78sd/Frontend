
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import ApplicationTable from "@/components/ApplicationTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Heart, FolderPlus } from "lucide-react";

// Sample applications data for the adopter
const initialApplications = [
  {
    id: "app-123456",
    petName: "Max",
    petId: "pet-001",
    applicantName: "John Doe", // This would be the logged-in user
    applicantId: "user-001",
    date: new Date("2025-03-15"),
    type: "adoption" as const,
    status: "pending" as const,
    approvals: {
      admin: false,
      hospital: false,
      shelter: false,
    }
  },
  {
    id: "app-234567",
    petName: "Bella",
    petId: "pet-002",
    applicantName: "John Doe",
    applicantId: "user-001",
    date: new Date("2025-03-14"),
    type: "fostering" as const,
    status: "processing" as const,
    fosterDays: 30,
    approvals: {
      admin: false,
      hospital: true,
      shelter: false,
    }
  },
  {
    id: "app-345678",
    petName: "Charlie",
    petId: "pet-003",
    applicantName: "John Doe",
    applicantId: "user-001",
    date: new Date("2025-03-13"),
    type: "adoption" as const,
    status: "approved" as const,
    approvals: {
      admin: true,
      hospital: true,
      shelter: true,
    }
  },
  {
    id: "app-456789",
    petName: "Luna",
    petId: "pet-004",
    applicantName: "John Doe",
    applicantId: "user-001",
    date: new Date("2025-03-12"),
    type: "fostering" as const,
    status: "rejected" as const,
    fosterDays: 14,
    approvals: {
      admin: false,
      hospital: false,
      shelter: false,
    }
  },
];

const AdopterApplications = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter applications based on status and search query
  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesSearch = app.petName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/adopter/pets">
                <Heart className="mr-2 h-4 w-4" />
                Adopt Pet
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/adopter/mypets/add-fostering">
                <FolderPlus className="mr-2 h-4 w-4" />
                Foster Pet
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search by pet name..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All applications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Application History</h2>
          <ApplicationTable 
            applications={filteredApplications} 
            userRole="adopter"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterApplications;
