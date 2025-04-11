
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import ApplicationApproval from "./ApplicationApproval";
import { Badge } from "./ui/badge";

interface Application {
  id: string;
  petName: string;
  petId: string;
  applicantName: string;
  applicantId: string;
  date: Date;
  type: "adoption" | "fostering";
  status: "pending" | "processing" | "approved" | "rejected";
  fosterDays?: number;
  approvals: {
    admin: boolean;
    hospital: boolean;
    shelter: boolean;
  };
}

interface ApplicationTableProps {
  applications: Application[];
  userRole: "admin" | "shelter" | "hospital" | "adopter";
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ApplicationTable = ({
  applications,
  userRole,
  onApprove,
  onReject,
}: ApplicationTableProps) => {
  const navigate = useNavigate();
  
  const isUser = userRole === "adopter";
  const canApprove = userRole !== "adopter" && onApprove && onReject;
  
  const handleView = (id: string) => {
    const basePath = userRole !== "adopter" ? `/${userRole}` : "";
    navigate(`${basePath}/applications/${id}`);
  };
  
  const handleEdit = (id: string) => {
    navigate(`/adopter/applications/${id}/edit`);
  };
  
  const handleDelete = (id: string) => {
    // This would be implemented with actual API calls in a real application
    console.log(`Delete application ${id}`);
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet</TableHead>
            {!isUser && <TableHead>Applicant</TableHead>}
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead>Status</TableHead>
            {canApprove && <TableHead>Action</TableHead>}
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => {
            const isMyApplication = userRole === "adopter";
            const isPending = application.status === "pending";
            const canEditOrDelete = isMyApplication && isPending && 
                                   !application.approvals.admin && 
                                   !application.approvals.hospital && 
                                   !application.approvals.shelter;
            
            return (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.petName}</TableCell>
                {!isUser && <TableCell>{application.applicantName}</TableCell>}
                <TableCell className="hidden md:table-cell">
                  {application.date.toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={application.type === "adoption" ? "default" : "outline"}>
                    {application.type === "adoption" ? "Adoption" : "Fostering"}
                  </Badge>
                  {application.type === "fostering" && application.fosterDays && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({application.fosterDays} days)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={application.status} />
                </TableCell>
                {canApprove && (
                  <TableCell>
                    <ApplicationApproval
                      applicationId={application.id}
                      status={application.status}
                      approvals={application.approvals}
                      userRole={userRole as 'admin' | 'shelter' | 'hospital'}
                      onApprove={onApprove}
                      onReject={onReject}
                      disabled={application.status === "approved" || application.status === "rejected"}
                    />
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <ActionButtons
                    onView={() => handleView(application.id)}
                    onEdit={canEditOrDelete ? () => handleEdit(application.id) : undefined}
                    onDelete={canEditOrDelete ? () => handleDelete(application.id) : undefined}
                    hideEdit={!canEditOrDelete}
                    hideDelete={!canEditOrDelete}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
