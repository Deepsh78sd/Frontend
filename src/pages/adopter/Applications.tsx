
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Eye, X } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { useToast } from "../../components/ui/use-toast";

type ApplicationStatus = "pending" | "processing" | "approved" | "rejected";

interface Application {
  id: string;
  petName: string;
  petId: string;
  date: Date;
  type: "adoption" | "fostering";
  status: ApplicationStatus;
  approvals: {
    admin: boolean;
    hospital: boolean;
    shelter: boolean;
  };
  fosterDays?: number;
}

const AdopterApplications = () => {
  const { toast } = useToast();
  
  // Sample data for applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app-123456",
      petName: "Max",
      petId: "pet-001",
      date: new Date("2025-03-15"),
      type: "adoption",
      status: "pending",
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
      date: new Date("2025-03-10"),
      type: "fostering",
      status: "processing",
      fosterDays: 30,
      approvals: {
        admin: true,
        hospital: true,
        shelter: false,
      }
    },
    {
      id: "app-345678",
      petName: "Charlie",
      petId: "pet-003",
      date: new Date("2025-02-28"),
      type: "adoption",
      status: "approved",
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
      date: new Date("2025-02-15"),
      type: "fostering",
      status: "rejected",
      fosterDays: 14,
      approvals: {
        admin: false,
        hospital: false,
        shelter: false,
      }
    },
  ]);
  
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredApplications = statusFilter === "all" 
    ? applications 
    : applications.filter(app => app.status === statusFilter);

  const handleCancelApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast({
      title: "Application cancelled",
      description: "Your application has been cancelled successfully.",
    });
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <div className="flex gap-2">
            <Button asChild className="bg-teal-500 hover:bg-teal-600">
              <Link to="/adopter/pets">
                Browse Available Pets
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approvals</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>#{application.id.substring(0, 8)}</TableCell>
                  <TableCell>{application.petName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      application.type === 'adoption' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {application.type}
                      {application.type === 'fostering' && application.fosterDays && ` (${application.fosterDays} days)`}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{application.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${application.approvals.admin ? 'bg-green-500' : 'bg-gray-300'}`} 
                        title={`Admin: ${application.approvals.admin ? 'Approved' : 'Pending'}`}
                      />
                      <span className={`inline-block w-2 h-2 rounded-full ${application.approvals.hospital ? 'bg-green-500' : 'bg-gray-300'}`} 
                        title={`Hospital: ${application.approvals.hospital ? 'Approved' : 'Pending'}`}
                      />
                      <span className={`inline-block w-2 h-2 rounded-full ${application.approvals.shelter ? 'bg-green-500' : 'bg-gray-300'}`} 
                        title={`Shelter: ${application.approvals.shelter ? 'Approved' : 'Pending'}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/adopter/applications/${application.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      {(application.status === "pending" || application.status === "processing") && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleCancelApplication(application.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">No applications found</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/adopter/pets">Browse available pets</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterApplications;
