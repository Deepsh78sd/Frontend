
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Search, Plus, Edit, Trash, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

// Mock data for pet care information
const petCareData = [
  {
    id: 1,
    category: "Feeding",
    title: "Dog Feeding Guidelines",
    content: "Adult dogs should be fed twice a day. Puppies under five months should be fed three to four times a day. Fresh water should always be available. Follow package recommendations for portion sizes based on weight.",
    createdBy: "Dr. Johnson",
    date: "2023-08-10",
  },
  {
    id: 2,
    category: "Training",
    title: "Basic Puppy Training",
    content: "Start training your puppy as soon as you bring them home. Basic commands like sit, stay, and come should be taught first. Use positive reinforcement with treats and praise. Keep training sessions short, around 5-10 minutes.",
    createdBy: "Trainer Mike",
    date: "2023-08-15",
  },
  {
    id: 3,
    category: "Health",
    title: "Vaccination Schedule",
    content: "Puppies need vaccinations at 6, 8, 12, and 16 weeks. Core vaccines include distemper, parvovirus, hepatitis, and rabies. Adult dogs need booster shots annually or every three years depending on the vaccine.",
    createdBy: "Dr. Smith",
    date: "2023-08-20",
  },
  {
    id: 4,
    category: "Feeding",
    title: "Cat Feeding Guidelines",
    content: "Most adult cats should be fed twice a day. Kittens under six months should be fed three to four times a day. Provide measured meals rather than leaving food out all day to prevent obesity.",
    createdBy: "Dr. Johnson",
    date: "2023-08-12",
  },
  {
    id: 5,
    category: "Grooming",
    title: "Cat Grooming Tips",
    content: "Brush long-haired cats daily and short-haired cats weekly. Cats groom themselves, but regular brushing prevents hairballs and keeps their coat healthy. Trim nails every two weeks.",
    createdBy: "Groomer Sarah",
    date: "2023-08-25",
  },
];

interface PetCareInfoProps {
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

const PetCareInfo = ({ canAdd = true, canEdit = true, canDelete = true }: PetCareInfoProps) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [infoArticles, setInfoArticles] = useState(petCareData);

  // Filter and search
  const filteredArticles = infoArticles
    .filter(article => filter === "all" || article.category.toLowerCase() === filter)
    .filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDeleteInfo = (id: number) => {
    setInfoArticles(prev => prev.filter(article => article.id !== id));
    toast({
      title: "Information Deleted",
      description: "The pet care information has been removed.",
    });
  };

  const handleAddInfo = () => {
    toast({
      title: "Information Added",
      description: "New pet care information has been added.",
    });
  };

  const handleEditInfo = (id: number) => {
    toast({
      title: "Edit Information",
      description: `Editing pet care information with ID: ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search pet care information..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="feeding">Feeding</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="grooming">Grooming</SelectItem>
            </SelectContent>
          </Select>
          
          {canAdd && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-teal-500 hover:bg-teal-600">
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add Pet Care Information</DialogTitle>
                  <DialogDescription>
                    Create a new article about pet care.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right font-medium">
                      Title
                    </label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="category" className="text-right font-medium">
                      Category
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feeding">Feeding</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="grooming">Grooming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="content" className="text-right font-medium">
                      Content
                    </label>
                    <Textarea id="content" className="col-span-3" rows={6} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddInfo} className="bg-teal-500 hover:bg-teal-600">
                    Add Information
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Pet Care Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        Category: {article.category}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {canEdit && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditInfo(article.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteInfo(article.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{article.content}</p>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 flex justify-between">
                  <span>By: {article.createdBy}</span>
                  <span>Date: {article.date}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No information found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? "Try a different search term." : "No pet care information available."}
              </p>
              {canAdd && (
                <div className="mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Information
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Same content as the add dialog above */}
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCareInfo;
