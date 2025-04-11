
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
import PhotoUpload from "../../../components/PhotoUpload";

const petTypes = ["Dog", "Cat", "Bird", "Other"];
const fosterPeriods = [
  { value: "7", label: "1 week (7 days)" },
  { value: "14", label: "2 weeks (14 days)" },
  { value: "30", label: "1 month (30 days)" },
  { value: "60", label: "2 months (60 days)" },
  { value: "90", label: "3 months (90 days)" },
  { value: "custom", label: "Custom period" },
];

const AddPetFostering = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customPeriod, setCustomPeriod] = useState(false);
  
  const [petData, setPetData] = useState({
    name: "",
    petType: "",
    breed: "",
    age: "",
    description: "",
    imageUrl: "",
    fosterPeriod: "",
    customFosterDays: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "fosterPeriod") {
      setCustomPeriod(value === "custom");
    }
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (photoUrl: string) => {
    setPetData((prev) => ({ ...prev, imageUrl: photoUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pet submitted for fostering",
        description: "Your pet has been successfully submitted for fostering",
      });
      setIsSubmitting(false);
      navigate("/adopter/mypets");
    }, 1500);
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add Pet for Fostering</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
            <CardDescription>
              Please provide all the necessary details about your pet for fostering. Include how long you need the pet to be fostered.
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
                
                <div className="space-y-2">
                  <Label htmlFor="fosterPeriod">Foster Period</Label>
                  <Select 
                    value={petData.fosterPeriod} 
                    onValueChange={(value) => handleSelectChange("fosterPeriod", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select foster period" />
                    </SelectTrigger>
                    <SelectContent>
                      {fosterPeriods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {customPeriod && (
                  <div className="space-y-2">
                    <Label htmlFor="customFosterDays">Custom Number of Days</Label>
                    <Input
                      id="customFosterDays"
                      name="customFosterDays"
                      type="number"
                      min="1"
                      max="365"
                      placeholder="Enter number of days"
                      value={petData.customFosterDays}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                
                <div className="space-y-2 md:col-span-2">
                  <PhotoUpload 
                    initialPhoto={petData.imageUrl}
                    onPhotoChange={handlePhotoChange}
                    label="Pet Photo"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your pet and why you need fostering"
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
                {isSubmitting ? "Submitting..." : "Submit for Fostering"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AddPetFostering;
