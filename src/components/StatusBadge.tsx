
import { cn } from "../lib/utils";

type StatusType = "pending" | "approved" | "rejected" | "scheduled" | "completed" | "available" | "adopted" | "fostered" | "canceled" | "processing";

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-emerald-100 text-emerald-800";
      case "adopted":
        return "bg-purple-100 text-purple-800";
      case "fostered":
        return "bg-orange-100 text-orange-800";
      case "canceled":
        return "bg-gray-100 text-gray-500";
      case "processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getStatusStyles())}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
