
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import StatusBadge from "./StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Eye, Check, X } from "lucide-react";
import { useToast } from "./ui/use-toast";

// Define the types for application
type ApplicationType = "adoption" | "fostering";
type ApplicationStatus = "pending" | "processing" | "approved" | "rejected";

// Create interfaces for each application type to enforce proper typing
interface BaseApplication {
  id: string;
  petName: string;
  petId: string;
  applicantName: string;
  applicantId: string;
  date: Date;
  approvals: {
    admin: boolean;
    hospital: boolean;
    shelter: boolean;
  };
}

interface AdoptionApplication extends BaseApplication {
  type: "adoption";
  status: ApplicationStatus;
  fosterDays?: never;
}

interface FosteringApplication extends BaseApplication {
  type: "fostering";
  status: ApplicationStatus;
  fosterDays: number;
}

type Application = AdoptionApplication | FosteringApplication;

interface ApplicationTableProps {
  applications: Application[];
  userRole: 'admin' | 'shelter' | 'hospital' | 'adopter';
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ApplicationTable = ({ applications, userRole, onApprove, onReject }: ApplicationTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [localApplications, setLocalApplications] = useState<Application[]>(applications);

  const canApprove = (app: Application) => {
    if (app.status !== "pending" && app.status !== "processing") return false;
    
    if (userRole === 'admin') return !app.approvals.admin;
    if (userRole === 'hospital') return !app.approvals.hospital;
    if (userRole === 'shelter') return !app.approvals.shelter;
    
    return false;
  };

  const handleView = (id: string) => {
    navigate(`/${userRole}/applications/${id}`);
  };

  const handleApprove = (id: string) => {
    if (onApprove) {
      onApprove(id);
      return;
    }

    setLocalApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          const newApprovals = { ...app.approvals };
          
          if (userRole === 'admin') newApprovals.admin = true;
          if (userRole === 'hospital') newApprovals.hospital = true;
          if (userRole === 'shelter') newApprovals.shelter = true;
          
          // Check if all approvals are complete
          const allApproved = 
            newApprovals.admin && 
            newApprovals.hospital && 
            newApprovals.shelter;
          
          return {
            ...app,
            approvals: newApprovals,
            status: allApproved ? "approved" as const : "processing" as const
          } as Application;
        }
        return app;
      })
    );
    
    toast({
      title: "Application approved",
      description: "You have approved this application.",
    });
  };

  const handleReject = (id: string) => {
    if (onReject) {
      onReject(id);
      return;
    }

    setLocalApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          const newApprovals = { ...app.approvals };
          
          if (userRole === 'admin') newApprovals.admin = false;
          if (userRole === 'hospital') newApprovals.hospital = false;
          if (userRole === 'shelter') newApprovals.shelter = false;
          
          return { 
            ...app, 
            status: "rejected" as const,
            approvals: newApprovals
          } as Application;
        }
        return app;
      })
    );
    
    toast({
      title: "Application rejected",
      description: "You have rejected this application.",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Pet</TableHead>
            <TableHead>{userRole === 'adopter' ? 'Applied On' : 'Applicant'}</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            {userRole !== 'adopter' && (
              <>
                <TableHead className="text-center">Approvals</TableHead>
              </>
            )}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localApplications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>#{app.id.substring(0, 8)}</TableCell>
              <TableCell>{app.petName}</TableCell>
              <TableCell>
                {userRole === 'adopter' 
                  ? app.date.toLocaleDateString() 
                  : app.applicantName
                }
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  app.type === 'adoption' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {app.type}
                  {app.type === 'fostering' && app.fosterDays && ` (${app.fosterDays} days)`}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={app.status} />
              </TableCell>
              {userRole !== 'adopter' && (
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <span className={`inline-block w-2 h-2 rounded-full ${app.approvals.admin ? 'bg-green-500' : 'bg-gray-300'}`} 
                      title={`Admin: ${app.approvals.admin ? 'Approved' : 'Pending'}`}
                    />
                    <span className={`inline-block w-2 h-2 rounded-full ${app.approvals.hospital ? 'bg-green-500' : 'bg-gray-300'}`} 
                      title={`Hospital: ${app.approvals.hospital ? 'Approved' : 'Pending'}`}
                    />
                    <span className={`inline-block w-2 h-2 rounded-full ${app.approvals.shelter ? 'bg-green-500' : 'bg-gray-300'}`} 
                      title={`Shelter: ${app.approvals.shelter ? 'Approved' : 'Pending'}`}
                    />
                  </div>
                </TableCell>
              )}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleView(app.id)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  
                  {userRole !== 'adopter' && canApprove(app) && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => handleApprove(app.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleReject(app.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
