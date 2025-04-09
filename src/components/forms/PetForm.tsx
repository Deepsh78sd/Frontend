
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "../../hooks/use-toast";

interface PetFormProps {
  initialData?: {
    id?: string;
    name: string;
    breed: string;
    age: string;
    petType: number;
    availabilityStatus: number;
    address: string;
    photoUrl: string;
  };
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const PetForm = ({ initialData, onSubmit, isSubmitting, mode }: PetFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    breed: initialData?.breed || "",
    age: initialData?.age || "",
    petType: initialData?.petType || 0,
    availabilityStatus: initialData?.availabilityStatus || 0,
    address: initialData?.address || "",
    photoUrl: initialData?.photoUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.breed || !formData.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Pet Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="breed" className="text-sm font-medium">
            Breed <span className="text-red-500">*</span>
          </label>
          <Input
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter pet breed"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="age" className="text-sm font-medium">
            Age <span className="text-red-500">*</span>
          </label>
          <Input
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Pet age (e.g., 2 years)"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="petType" className="text-sm font-medium">
            Pet Type <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.petType.toString()}
            onValueChange={(value) => handleSelectChange("petType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Dog</SelectItem>
              <SelectItem value="1">Cat</SelectItem>
              <SelectItem value="2">Bird</SelectItem>
              <SelectItem value="3">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="availabilityStatus" className="text-sm font-medium">
            Availability Status <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.availabilityStatus.toString()}
            onValueChange={(value) => handleSelectChange("availabilityStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Available</SelectItem>
              <SelectItem value="1">Adopted</SelectItem>
              <SelectItem value="2">Fostered</SelectItem>
              <SelectItem value="3">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="photoUrl" className="text-sm font-medium">
            Photo URL
          </label>
          <Input
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Enter photo URL"
          />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter pet's current address"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-teal-500 hover:bg-teal-600">
          {isSubmitting ? "Saving..." : mode === "create" ? "Create Pet" : "Update Pet"}
        </Button>
      </div>
    </form>
  );
};

export default PetForm;
