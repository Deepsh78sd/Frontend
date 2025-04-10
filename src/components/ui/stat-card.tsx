
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  note?: string;
  className?: string;
}

const StatCard = ({ title, value, icon, note, className }: StatCardProps) => {
  return (
    <div className={cn("bg-white p-6 rounded-lg border", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          {note && <p className="text-sm text-gray-500 mt-1">{note}</p>}
        </div>
        <div className="text-teal-500">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
