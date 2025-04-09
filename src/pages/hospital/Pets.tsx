
import HospitalLayout from "@/components/layouts/HospitalLayout";
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
import { Search, Filter, CheckCircle, XCircle, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// Mock data for pets
const pets = [
  { id: 1, name: "Max", species: "Dog", breed: "Golden Retriever", age: "2 years", shelter: "Happy Paws Shelter", status: "pending" },
  { id: 2, name: "Bella", species: "Cat", breed: "Siamese", age: "1 year", shelter: "Furry Friends Rescue", status: "verified" },
  { id: 3, name: "Charlie", species: "Dog", breed: "Beagle", age: "3 years", shelter: "Second Chance Animal Shelter", status: "pending" },
  { id: 4, name: "Luna", species: "Cat", breed: "Persian", age: "4 years", shelter: "Happy Paws Shelter", status: "rejected" },
  { id: 5, name: "Cooper", species: "Dog", breed: "Labrador Retriever", age: "1 year", shelter: "Forever Home Society", status: "pending" },
  { id: 6, name: "Lucy", species: "Cat", breed: "Maine Coon", age: "2 years", shelter: "Loving Care Animal Rescue", status: "verified" },
  { id: 7, name: "Bailey", species: "Dog", breed: "German Shepherd", age: "5 years", shelter: "Safe Haven Pet Sanctuary", status: "pending" },
  { id: 8, name: "Oliver", species: "Cat", breed: "Ragdoll", age: "3 years", shelter: "New Beginnings Animal Shelter", status: "verified" },
];

const HospitalPets = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and search
  const filteredPets = pets
    .filter(pet => filter === "all" || pet.status === filter)
    .filter(pet => 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.shelter.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleVerify = (id: number) => {
    toast({
      title: "Pet Verified",
      description: "The pet has been verified successfully.",
    });
  };
  
  const handleReject = (id: number) => {
    toast({
      title: "Pet Rejected",
      description: "The pet verification has been rejected.",
    });
  };

  return (
    <HospitalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Verification</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search pets..." 
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
                <SelectItem value="verified">Verified</SelectItem>
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
          <h2 className="text-lg font-semibold mb-4">Pet List for Verification</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Species</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Shelter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell className="font-medium">{pet.name}</TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>{pet.breed}</TableCell>
                    <TableCell>{pet.age}</TableCell>
                    <TableCell>{pet.shelter}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        pet.status === 'verified' ? 'bg-green-100 text-green-800' : 
                        pet.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pet.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Pet Details: {pet.name}</DialogTitle>
                            <DialogDescription>
                              Review pet information before verification
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Name:</span>
                              <span className="col-span-3">{pet.name}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Species:</span>
                              <span className="col-span-3">{pet.species}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Breed:</span>
                              <span className="col-span-3">{pet.breed}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Age:</span>
                              <span className="col-span-3">{pet.age}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Shelter:</span>
                              <span className="col-span-3">{pet.shelter}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="text-right font-medium">Comments:</span>
                              <Textarea 
                                className="col-span-3" 
                                placeholder="Add verification comments..." 
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            {pet.status === 'pending' && (
                              <>
                                <Button 
                                  onClick={() => handleReject(pet.id)} 
                                  variant="outline" 
                                  className="bg-red-50 text-red-700 hover:bg-red-100 mr-2"
                                >
                                  <XCircle className="h-4 w-4 mr-1" /> Reject
                                </Button>
                                <Button 
                                  onClick={() => handleVerify(pet.id)} 
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" /> Verify
                                </Button>
                              </>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      {pet.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleVerify(pet.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Verify</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleReject(pet.id)}
                          >
                            <XCircle className="h-4 w-4" />
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
          
          {filteredPets.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No pets found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </HospitalLayout>
  );
};

export default HospitalPets;
