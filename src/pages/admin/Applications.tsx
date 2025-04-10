
import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import ApplicationTable from "../../components/ApplicationTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Filter } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

// Sample applications data
const initialApplications = [
  {
    id: "app-123456",
    petName: "Max",
    petId: "pet-001",
    applicantName: "John Doe",
    applicantId: "user-001",
    date: new Date("2025-03-15"),
    type: "adoption" as const,
    status: "pending" as const,
    approvals: {
      admin: false,
      hospital: false,
      shelter: true,
    }
  },
  {
    id: "app-234567",
    petName: "Bella",
    petId: "pet-002",
    applicantName: "Jane Smith",
    applicantId: "user-002",
    date: new Date("2025-03-14"),
    type: "fostering" as const,
    status: "processing" as const,
    fosterDays: 30,
    approvals: {
      admin: false,
      hospital: true,
      shelter: true,
    }
  },
  {
    id: "app-345678",
    petName: "Charlie",
    petId: "pet-003",
    applicantName: "Mike Johnson",
    applicantId: "user-003",
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
    applicantName: "Sarah Williams",
    applicantId: "user-004",
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

const AdminApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = (id: string) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          const newApprovals = { ...app.approvals, admin: true };
          const allApproved = 
            newApprovals.admin && 
            newApprovals.hospital && 
            newApprovals.shelter;
          
          return {
            ...app,
            approvals: newApprovals,
            status: allApproved ? "approved" : "processing"
          };
        }
        return app;
      })
    );
    
    toast({
      title: "Application approved",
      description: "You have approved this application. If all other parties approve, it will be finalized.",
    });
  };

  const handleReject = (id: string) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          return { 
            ...app, 
            status: "rejected",
            approvals: { ...app.approvals, admin: false }
          };
        }
        return app;
      })
    );
    
    toast({
      title: "Application rejected",
      description: "You have rejected this application. The applicant will be notified.",
    });
  };

  return (
    <PageLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Applications Management</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search by pet or applicant..." 
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
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="adoption">Adoption</SelectItem>
                <SelectItem value="fostering">Fostering</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Pet Adoption & Fostering Applications</h2>
          <ApplicationTable 
            applications={filteredApplications} 
            userRole="admin"
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminApplications;
