
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

interface ApplicationApprovalProps {
  applicationId: string;
  status: string;
  approvals: {
    admin: boolean;
    hospital: boolean;
    shelter: boolean;
  };
  userRole: 'admin' | 'shelter' | 'hospital';
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  disabled?: boolean;
}

const ApplicationApproval = ({
  applicationId,
  status,
  approvals,
  userRole,
  onApprove,
  onReject,
  disabled = false
}: ApplicationApprovalProps) => {
  const { toast } = useToast();
  const [action, setAction] = useState<string>("");
  
  const canActAsAdmin = userRole === 'admin' && 
                         approvals.hospital && 
                         approvals.shelter && 
                         !approvals.admin;
                         
  const canActAsHospital = userRole === 'hospital' && !approvals.hospital;
  
  const canActAsShelter = userRole === 'shelter' && 
                          approvals.hospital && 
                          !approvals.shelter;
  
  const canAct = canActAsAdmin || canActAsHospital || canActAsShelter;
  
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';
  const isPending = status === 'pending' || status === 'processing';
  
  const handleAction = () => {
    if (action === "approve") {
      onApprove(applicationId);
      toast({
        title: "Application approved",
        description: `You have approved application #${applicationId}`,
      });
    } else if (action === "reject") {
      onReject(applicationId);
      toast({
        title: "Application rejected",
        description: `You have rejected application #${applicationId}`,
        variant: "destructive"
      });
    }
    
    setAction("");
  };
  
  if (isApproved) {
    return (
      <div className="flex items-center text-green-600">
        <CheckCircle className="w-4 h-4 mr-1" />
        <span className="text-sm">Approved</span>
      </div>
    );
  }
  
  if (isRejected) {
    return (
      <div className="flex items-center text-red-600">
        <XCircle className="w-4 h-4 mr-1" />
        <span className="text-sm">Rejected</span>
      </div>
    );
  }
  
  if (!canAct || disabled) {
    return (
      <div className="text-sm text-gray-500">
        {isPending ? "Awaiting approvals..." : "Status unchanged"}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Select
        value={action}
        onValueChange={setAction}
        disabled={disabled}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="approve">Approve</SelectItem>
          <SelectItem value="reject">Reject</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        size="sm"
        variant="outline"
        onClick={handleAction}
        disabled={!action || disabled}
      >
        Submit
      </Button>
    </div>
  );
};

export default ApplicationApproval;
