
import PageLayout from "@/components/PageLayout";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, File, Trash } from "lucide-react";

const Applications = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Applications</h1>
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

        <div className="flex justify-start">
          <Select defaultValue="all">
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

        <div className="border rounded-md">
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
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>#{application.id}</TableCell>
                  <TableCell>{application.pet}</TableCell>
                  <TableCell className="hidden md:table-cell">{application.shelter}</TableCell>
                  <TableCell className="hidden md:table-cell">{application.dateApplied}</TableCell>
                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      {application.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </>
                      )}
                      {application.status === "approved" && (
                        <Button variant="ghost" size="sm">
                          <File className="h-4 w-4" />
                          <span className="sr-only">Documents</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

import { Heart, FolderPlus } from "lucide-react";

const applications = [
  {
    id: "1",
    pet: "Max",
    shelter: "Happy Paws Shelter",
    dateApplied: "2023-09-15",
    status: "pending" as const,
  },
  {
    id: "2",
    pet: "Bella",
    shelter: "FurEver Home",
    dateApplied: "2023-09-10",
    status: "approved" as const,
  },
  {
    id: "3",
    pet: "Charlie",
    shelter: "Second Chance Rescue",
    dateApplied: "2023-08-25",
    status: "rejected" as const,
  },
];

export default Applications;
