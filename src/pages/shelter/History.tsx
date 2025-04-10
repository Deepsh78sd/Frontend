
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { CalendarIcon, ArrowDownUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { withPageLayout } from "../../utils/layoutHelper";

const HistoryPage = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  
  const historyData = [
    { id: 1, date: "2023-09-28", action: "Pet Adopted", petName: "Max", user: "John Doe" },
    { id: 2, date: "2023-09-25", action: "Pet Added", petName: "Luna", user: "Admin" },
    { id: 3, date: "2023-09-20", action: "Pet Fostered", petName: "Charlie", user: "Jane Smith" },
    { id: 4, date: "2023-09-15", action: "Application Approved", petName: "Bella", user: "Admin" },
    { id: 5, date: "2023-09-10", action: "Application Received", petName: "Rocky", user: "System" },
    { id: 6, date: "2023-08-28", action: "Pet Returned", petName: "Daisy", user: "Mike Johnson" },
    { id: 7, date: "2023-08-15", action: "Pet Added", petName: "Cooper", user: "Admin" },
    { id: 8, date: "2023-08-05", action: "Pet Adopted", petName: "Teddy", user: "Sarah Williams" },
  ];
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  const filteredData = historyData.filter(item => {
    if (selectedMonth === "all") return true;
    return item.date.startsWith(selectedMonth);
  });
  
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Activity History</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2 items-center">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="2023-09">September 2023</SelectItem>
              <SelectItem value="2023-08">August 2023</SelectItem>
              <SelectItem value="2023-07">July 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleSortOrder}
          className="flex items-center gap-2"
        >
          <span>Date</span>
          <ArrowDownUp className="h-4 w-4" />
          <span className="sr-only">
            {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
          </span>
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Pet</TableHead>
              <TableHead className="hidden md:table-cell">User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell className="font-medium">{item.petName}</TableCell>
                <TableCell className="hidden md:table-cell">{item.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Wrap our component with the PageLayout
export default function ShelterHistory() {
  return withPageLayout(<HistoryPage />, 'shelter', 'Shelter Staff');
}
