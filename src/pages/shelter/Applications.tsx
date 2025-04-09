
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
import { Search, Filter, Eye, Check, X } from "lucide-react";
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
  { id: 1, petName: "Max", applicantName: "John Doe", petType: "Dog", applicationType: "Adoption", date: "2023-09-15", status: "pending" },
  { id: 2, petName: "Bella", applicantName: "Jane Smith", petType: "Cat", applicationType: "Foster", date: "2023-09-14", status: "approved" },
  { id: 3, petName: "Charlie", applicantName: "Mike Johnson", petType: "Dog", applicationType: "Adoption", date: "2023-09-13", status: "rejected" },
  { id: 4, petName: "Luna", applicantName: "Sarah Williams", petType: "Cat", applicationType: "Adoption", date: "2023-09-12", status: "pending" },
  { id: 5, petName: "Cooper", applicantName: "David Brown", petType: "Dog", applicationType: "Foster", date: "2023-09-11", status: "approved" },
  { id: 6, petName: "Daisy", applicantName: "Emma Wilson", petType: "Dog", applicationType: "Adoption", date: "2023-09-10", status: "pending" },
  { id: 7, petName: "Rocky", applicantName: "Daniel Thomas", petType: "Dog", applicationType: "Foster", date: "2023-09-09", status: "rejected" },
  { id: 8, petName: "Lola", applicantName: "Sophia Anderson", petType: "Cat", applicationType: "Adoption", date: "2023-09-08", status: "pending" },
];

const ShelterApplications = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and search
  const filteredApplications = applications
    .filter(application => filter === "all" || application.status === filter)
    .filter(application => 
      application.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      application.applicantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleApprove = (id: number) => {
    toast({
      title: "Application Approved",
      description: "The application has been approved successfully.",
    });
  };
  
  const handleReject = (id: number) => {
    toast({
      title: "Application Rejected",
      description: "The application has been rejected.",
    });
  };

  return (
    <ShelterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Application Management</h1>
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
          
          <div className="flex gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Adoption & Foster Applications</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Application Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.applicantName}</TableCell>
                    <TableCell>{application.petName}</TableCell>
                    <TableCell>{application.petType}</TableCell>
                    <TableCell>{application.applicationType}</TableCell>
                    <TableCell>{application.date}</TableCell>
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
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>
                              {application.applicationType} Application: {application.petName}
                            </DialogTitle>
                            <DialogDescription>
                              Review application details below
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Applicant:</span>
                              <span className="col-span-3">{application.applicantName}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Pet:</span>
                              <span className="col-span-3">{application.petName} ({application.petType})</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Type:</span>
                              <span className="col-span-3">{application.applicationType}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Date:</span>
                              <span className="col-span-3">{application.date}</span>
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
                            <div className="grid grid-cols-1 gap-2">
                              <span className="font-medium">Application Details:</span>
                              <p className="text-sm text-gray-600">
                                The applicant has requested to {application.applicationType.toLowerCase()} {application.petName}. 
                                They have indicated they have prior experience with pets and have a suitable home environment.
                              </p>
                            </div>
                          </div>
                          {application.status === 'pending' && (
                            <DialogFooter>
                              <Button 
                                onClick={() => handleReject(application.id)} 
                                variant="outline" 
                                className="bg-red-50 text-red-700 hover:bg-red-100"
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                              <Button 
                                onClick={() => handleApprove(application.id)} 
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                            </DialogFooter>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {application.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(application.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleReject(application.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </>
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
    </ShelterLayout>
  );
};

export default ShelterApplications;
