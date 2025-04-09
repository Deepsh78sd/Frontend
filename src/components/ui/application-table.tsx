
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";

interface Application {
  id: number;
  petName: string;
  applicantName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface ApplicationTableProps {
  applications: Application[];
  canManage?: boolean;
}

const ApplicationTable = ({ applications, canManage = true }: ApplicationTableProps) => {
  const { toast } = useToast();
  const [localApplications, setLocalApplications] = useState<Application[]>(applications);

  const handleApprove = (id: number) => {
    setLocalApplications(apps => 
      apps.map(app => app.id === id ? { ...app, status: "approved" as const } : app)
    );
    toast({
      title: "Application Approved",
      description: "The application has been approved successfully.",
    });
  };

  const handleReject = (id: number) => {
    setLocalApplications(apps => 
      apps.map(app => app.id === id ? { ...app, status: "rejected" as const } : app)
    );
    toast({
      title: "Application Rejected",
      description: "The application has been rejected.",
    });
  };

  const handleViewDetails = (id: number) => {
    toast({
      title: "Application Details",
      description: `Viewing details for application ID: ${id}`,
    });
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Pet Name</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.petName}</TableCell>
                <TableCell>{app.applicantName}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {canManage && app.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                          onClick={() => handleApprove(app.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                          onClick={() => handleReject(app.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(app.id)}
                    >
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ApplicationTable;
