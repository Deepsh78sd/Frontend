
import ShelterLayout from "@/components/layouts/ShelterLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Filter, Eye, CalendarRange } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Mock data for pet history records
const historyRecords = [
  { id: 1, petName: "Max", petType: "Dog", event: "Added to shelter", date: "2023-08-01", details: "Found as stray" },
  { id: 2, petName: "Max", petType: "Dog", event: "Medical checkup", date: "2023-08-03", details: "All vaccinations updated" },
  { id: 3, petName: "Max", petType: "Dog", event: "Adoption application received", date: "2023-08-15", details: "From John Doe" },
  { id: 4, petName: "Max", petType: "Dog", event: "Adoption approved", date: "2023-08-20", details: "Adopted by John Doe" },
  { id: 5, petName: "Bella", petType: "Cat", event: "Added to shelter", date: "2023-07-10", details: "Owner surrender" },
  { id: 6, petName: "Bella", petType: "Cat", event: "Medical checkup", date: "2023-07-12", details: "General health assessment" },
  { id: 7, petName: "Bella", petType: "Cat", event: "Foster application received", date: "2023-07-25", details: "From Jane Smith" },
  { id: 8, petName: "Bella", petType: "Cat", event: "Foster approved", date: "2023-07-30", details: "Fostered by Jane Smith" },
  { id: 9, petName: "Charlie", petType: "Dog", event: "Added to shelter", date: "2023-09-05", details: "Owner surrender" },
  { id: 10, petName: "Charlie", petType: "Dog", event: "Medical checkup", date: "2023-09-07", details: "All vaccinations updated" },
  { id: 11, petName: "Luna", petType: "Cat", event: "Added to shelter", date: "2023-08-22", details: "Found as stray" },
  { id: 12, petName: "Luna", petType: "Cat", event: "Medical checkup", date: "2023-08-24", details: "Treated for minor injuries" },
];

const ShelterHistory = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and search
  const filteredHistory = historyRecords
    .filter(record => filter === "all" || record.event.toLowerCase().includes(filter))
    .filter(record => 
      record.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      record.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.details.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <ShelterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet History</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarRange size={16} className="mr-1" />
            Date Range
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search history..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="added">Added to shelter</SelectItem>
                <SelectItem value="medical">Medical checkup</SelectItem>
                <SelectItem value="application">Application received</SelectItem>
                <SelectItem value="adopted">Adoption</SelectItem>
                <SelectItem value="foster">Foster</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Pet History Records</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.petName}</TableCell>
                    <TableCell>{record.petType}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        record.event.includes('Added') ? 'bg-blue-100 text-blue-800' : 
                        record.event.includes('Medical') ? 'bg-purple-100 text-purple-800' : 
                        record.event.includes('application') ? 'bg-yellow-100 text-yellow-800' : 
                        record.event.includes('approved') ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {record.event}
                      </span>
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.details}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>History Record Details</DialogTitle>
                            <DialogDescription>
                              Full details about this pet history event
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Pet Name:</span>
                              <span className="col-span-3">{record.petName}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Type:</span>
                              <span className="col-span-3">{record.petType}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Event:</span>
                              <span className="col-span-3">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                  record.event.includes('Added') ? 'bg-blue-100 text-blue-800' : 
                                  record.event.includes('Medical') ? 'bg-purple-100 text-purple-800' : 
                                  record.event.includes('application') ? 'bg-yellow-100 text-yellow-800' : 
                                  record.event.includes('approved') ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {record.event}
                                </span>
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Date:</span>
                              <span className="col-span-3">{record.date}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Details:</span>
                              <span className="col-span-3">{record.details}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Staff Member:</span>
                              <span className="col-span-3">Sarah Johnson</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Notes:</span>
                              <span className="col-span-3">
                                Additional information may be available in the pet's medical records.
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredHistory.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No history records found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </ShelterLayout>
  );
};

export default ShelterHistory;
