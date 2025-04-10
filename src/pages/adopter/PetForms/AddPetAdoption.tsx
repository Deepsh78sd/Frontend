
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { useToast } from "../../../components/ui/use-toast";

const petTypes = ["Dog", "Cat", "Bird", "Other"];

const AddPetAdoption = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [petData, setPetData] = useState({
    name: "",
    petType: "",
    breed: "",
    age: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pet submitted for adoption",
        description: "Your pet has been successfully submitted for adoption",
      });
      setIsSubmitting(false);
      navigate("/adopter/mypets");
    }, 1500);
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add Pet for Adoption</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
            <CardDescription>
              Please provide all the necessary details about your pet. This will help us find the best home for them.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter pet name"
                    value={petData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="petType">Pet Type</Label>
                  <Select 
                    value={petData.petType} 
                    onValueChange={(value) => handleSelectChange("petType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      {petTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    name="breed"
                    placeholder="Enter breed"
                    value={petData.breed}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    placeholder="Enter age (e.g., '2 years')"
                    value={petData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="imageUrl">Pet Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Enter image URL"
                    value={petData.imageUrl}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your pet (personality, habits, etc.)"
                    value={petData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/adopter/mypets")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-teal-500 hover:bg-teal-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit for Adoption"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AddPetAdoption;
