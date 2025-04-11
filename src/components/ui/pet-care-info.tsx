
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Plus } from "lucide-react";
import { useToast } from "../ui/use-toast";
import ActionButtons from "../ActionButtons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import FileUploader from "../FileUploader";

interface PetCareInfoProps {
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

// Sample pet care info
const petCareInfoMockData = [
  {
    id: "1",
    title: "Basic Dog Care",
    category: "Dogs",
    summary: "Essential tips for keeping your dog healthy and happy.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "2",
    title: "Cat Nutrition Guide",
    category: "Cats",
    summary: "Complete guide to cat nutrition and feeding schedules.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80",
    createdAt: new Date("2025-03-05"),
  },
  {
    id: "3",
    title: "Bird Health Essentials",
    category: "Birds",
    summary: "How to maintain the health of your pet birds.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    imageUrl: "https://images.unsplash.com/photo-1522720833375-9c27ffb02a5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    createdAt: new Date("2025-03-10"),
  },
];

const PetCareInfo = ({ canAdd = true, canEdit = true, canDelete = true }: PetCareInfoProps) => {
  const { toast } = useToast();
  const [petCareInfo, setPetCareInfo] = useState(petCareInfoMockData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    imageFile: null as File | null,
  });

  const handleViewDetails = (id: string) => {
    const item = petCareInfo.find(info => info.id === id);
    setCurrentItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    const item = petCareInfo.find(info => info.id === id);
    setCurrentItem(item);
    setNewItem({
      title: item?.title || "",
      category: item?.category || "",
      summary: item?.summary || "",
      content: item?.content || "",
      imageFile: null,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPetCareInfo(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Pet care information deleted",
      description: "The pet care information has been removed",
    });
  };

  const handleAddNew = () => {
    if (!newItem.title || !newItem.category || !newItem.summary || !newItem.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newId = (petCareInfo.length + 1).toString();
    const imageUrl = newItem.imageFile 
      ? URL.createObjectURL(newItem.imageFile)
      : "https://placehold.co/600x400?text=No+Image";

    setPetCareInfo(prev => [
      ...prev,
      {
        id: newId,
        title: newItem.title,
        category: newItem.category,
        summary: newItem.summary,
        content: newItem.content,
        imageUrl,
        createdAt: new Date(),
      },
    ]);

    setNewItem({
      title: "",
      category: "",
      summary: "",
      content: "",
      imageFile: null,
    });

    setIsAddDialogOpen(false);

    toast({
      title: "Pet care information added",
      description: "New pet care information has been added successfully",
    });
  };

  const handleUpdateItem = () => {
    if (!currentItem || !newItem.title || !newItem.category || !newItem.summary || !newItem.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = newItem.imageFile 
      ? URL.createObjectURL(newItem.imageFile)
      : currentItem.imageUrl;

    setPetCareInfo(prev => prev.map(item => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          title: newItem.title,
          category: newItem.category,
          summary: newItem.summary,
          content: newItem.content,
          imageUrl,
        };
      }
      return item;
    }));

    setIsEditDialogOpen(false);
    setCurrentItem(null);

    toast({
      title: "Pet care information updated",
      description: "The pet care information has been updated successfully",
    });
  };

  const handleFileSelect = (file: File | null) => {
    setNewItem(prev => ({...prev, imageFile: file}));
  };

  return (
    <div className="space-y-6">
      {canAdd && (
        <div className="flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Tip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Pet Care Tip</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new pet care tip.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value) => setNewItem({...newItem, category: value})}
                  >
                    <SelectTrigger id="category" className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dogs">Dogs</SelectItem>
                      <SelectItem value="Cats">Cats</SelectItem>
                      <SelectItem value="Birds">Birds</SelectItem>
                      <SelectItem value="Small Pets">Small Pets</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="summary" className="text-right">
                    Summary
                  </Label>
                  <Input
                    id="summary"
                    value={newItem.summary}
                    onChange={(e) => setNewItem({...newItem, summary: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right pt-2">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newItem.content}
                    onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                    className="col-span-3 h-32"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">
                    Image
                  </Label>
                  <div className="col-span-3">
                    <FileUploader onFileSelect={handleFileSelect} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddNew}>
                  Add Tip
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petCareInfo.map((info) => (
          <Card key={info.id} className="overflow-hidden flex flex-col">
            {info.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={info.imageUrl}
                  alt={info.title}
                  className="w-full h-full object-cover transform transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{info.title}</CardTitle>
              <CardDescription>Category: {info.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-3">{info.summary}</p>
              <p className="text-xs text-gray-500 mt-2">
                Published on: {info.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewDetails(info.id)}
              >
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {(canEdit || canDelete) && (
                <ActionButtons
                  hideView={true}
                  onEdit={canEdit ? () => handleEdit(info.id) : undefined}
                  onDelete={canDelete ? () => handleDelete(info.id) : undefined}
                  hideEdit={!canEdit}
                  hideDelete={!canDelete}
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentItem && (
            <>
              <DialogHeader>
                <DialogTitle>{currentItem.title}</DialogTitle>
                <DialogDescription>
                  Category: {currentItem.category} | Published: {currentItem.createdAt.toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {currentItem.imageUrl && (
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={currentItem.imageUrl}
                      alt={currentItem.title}
                      className="w-full h-auto max-h-72 object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold">Summary:</h4>
                  <p className="text-sm">{currentItem.summary}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Content:</h4>
                  <p className="text-sm whitespace-pre-line">{currentItem.content}</p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Pet Care Tip</DialogTitle>
            <DialogDescription>
              Make changes to the pet care tip below.
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select 
                  value={newItem.category} 
                  onValueChange={(value) => setNewItem({...newItem, category: value})}
                >
                  <SelectTrigger id="edit-category" className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dogs">Dogs</SelectItem>
                    <SelectItem value="Cats">Cats</SelectItem>
                    <SelectItem value="Birds">Birds</SelectItem>
                    <SelectItem value="Small Pets">Small Pets</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-summary" className="text-right">
                  Summary
                </Label>
                <Input
                  id="edit-summary"
                  value={newItem.summary}
                  onChange={(e) => setNewItem({...newItem, summary: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={newItem.content}
                  onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                  className="col-span-3 h-32"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Image
                </Label>
                <div className="col-span-3">
                  <FileUploader 
                    onFileSelect={handleFileSelect} 
                    initialPreview={currentItem.imageUrl}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateItem}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetCareInfo;
