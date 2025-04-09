
import AdopterLayout from "@/components/layouts/AdopterLayout";
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
import { Search, Eye, Pencil, Trash, File, Heart, FolderPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// Mock data for applications
const applications = [
  { id: "1", pet: "Max", shelter: "Happy Paws Shelter", dateApplied: "2023-09-15", status: "pending" as const },
  { id: "2", pet: "Bella", shelter: "FurEver Home", dateApplied: "2023-09-10", status: "approved" as const },
  { id: "3", pet: "Charlie", shelter: "Second Chance Rescue", dateApplied: "2023-08-25", status: "rejected" as const },
  { id: "4", pet: "Luna", shelter: "Happy Paws Shelter", dateApplied: "2023-09-05", status: "pending" as const },
  { id: "5", pet: "Cooper", shelter: "Pet Haven", dateApplied: "2023-09-01", status: "approved" as const },
];

const AdopterApplications = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and search
  const filteredApplications = applications
    .filter(application => filter === "all" || application.status === filter)
    .filter(application => 
      application.pet.toLowerCase().includes(searchQuery.toLowerCase()) || 
      application.shelter.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleDelete = (id: string) => {
    toast({
      title: "Application Withdrawn",
      description: "Your application has been withdrawn successfully.",
    });
  };

  return (
    <AdopterLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My Applications</h1>
          <div className="flex gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Heart className="mr-2 h-4 w-4" />
              Adopt Pet
            </Button>
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" />
              Foster Pet
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search applications..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All applications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Application History</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Pet</TableHead>
                  <TableHead className="hidden md:table-cell">Shelter</TableHead>
                  <TableHead className="hidden md:table-cell">Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>#{application.id}</TableCell>
                    <TableCell>{application.pet}</TableCell>
                    <TableCell className="hidden md:table-cell">{application.shelter}</TableCell>
                    <TableCell className="hidden md:table-cell">{application.dateApplied}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
                    </TableCell>
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
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>
                              View details for your application for {application.pet}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Application ID:</span>
                              <span className="col-span-3">#{application.id}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Pet:</span>
                              <span className="col-span-3">{application.pet}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Shelter:</span>
                              <span className="col-span-3">{application.shelter}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Date Applied:</span>
                              <span className="col-span-3">{application.dateApplied}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Status:</span>
                              <span className="col-span-3">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                  application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                  application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {application.status}
                                </span>
                              </span>
                            </div>
                            {application.status === 'approved' && (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">Next Steps:</span>
                                <span className="col-span-3 text-green-700">
                                  The shelter will contact you within 2 business days to schedule a pickup/delivery date.
                                </span>
                              </div>
                            )}
                            {application.status === 'rejected' && (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right font-medium">Reason:</span>
                                <span className="col-span-3 text-gray-700">
                                  Unfortunately, we found another home that was a better match for this pet's specific needs.
                                </span>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {application.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(application.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </>
                      )}
                      {application.status === 'approved' && (
                        <Button variant="ghost" size="sm">
                          <File className="h-4 w-4" />
                          <span className="sr-only">Documents</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No applications found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </AdopterLayout>
  );
};

export default AdopterApplications;
