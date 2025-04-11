
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import PhotoUpload from "../../components/PhotoUpload";

const residentTypes = [
  "House with yard",
  "House without yard",
  "Apartment",
  "Condo",
  "Other"
];

const PetAdoptionApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock pet data (in a real app, this would come from an API call)
  const mockPet = {
    id: id || "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fA%3D%3D&w=500&q=60"
  };
  
  const [formData, setFormData] = useState({
    residenceType: "",
    hasPets: "no",
    existingPets: "",
    hasChildren: "no",
    childrenAges: "",
    workHours: "",
    hoursAlone: "",
    reason: "",
    photoUrl: "",
    additionalInfo: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoChange = (photoUrl: string) => {
    setFormData(prev => ({ ...prev, photoUrl }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => {
      // Reset related fields when changing radio buttons
      if (name === "hasPets" && value === "no") {
        return { ...prev, [name]: value, existingPets: "" };
      }
      if (name === "hasChildren" && value === "no") {
        return { ...prev, [name]: value, childrenAges: "" };
      }
      return { ...prev, [name]: value };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: `Your application to adopt ${mockPet.name} has been submitted successfully!`,
      });
      setIsSubmitting(false);
      navigate("/adopter/applications");
    }, 1500);
  };
  
  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Adoption Application</h1>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back to Pets
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{mockPet.name}</CardTitle>
              <CardDescription>{mockPet.breed} • {mockPet.age}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square overflow-hidden rounded-md">
                <img 
                  src={mockPet.photoUrl} 
                  alt={mockPet.name} 
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Application</CardTitle>
              <CardDescription>
                Please provide information about your living situation and why you would be a good fit for {mockPet.name}.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="residenceType">Type of Residence</Label>
                  <Select 
                    value={formData.residenceType} 
                    onValueChange={(value) => handleSelectChange("residenceType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your residence type" />
                    </SelectTrigger>
                    <SelectContent>
                      {residentTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Do you have other pets?</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="hasPetsYes" 
                        name="hasPets" 
                        value="yes" 
                        checked={formData.hasPets === "yes"}
                        onChange={() => handleRadioChange("hasPets", "yes")}
                        className="mr-2"
                      />
                      <Label htmlFor="hasPetsYes">Yes</Label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="hasPetsNo" 
                        name="hasPets" 
                        value="no" 
                        checked={formData.hasPets === "no"}
                        onChange={() => handleRadioChange("hasPets", "no")}
                        className="mr-2"
                      />
                      <Label htmlFor="hasPetsNo">No</Label>
                    </div>
                  </div>
                </div>
                
                {formData.hasPets === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="existingPets">Please describe your existing pets</Label>
                    <Textarea
                      id="existingPets"
                      name="existingPets"
                      placeholder="Type, breed, age, temperament, etc."
                      value={formData.existingPets}
                      onChange={handleChange}
                      rows={2}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Do you have children?</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="hasChildrenYes" 
                        name="hasChildren" 
                        value="yes" 
                        checked={formData.hasChildren === "yes"}
                        onChange={() => handleRadioChange("hasChildren", "yes")}
                        className="mr-2"
                      />
                      <Label htmlFor="hasChildrenYes">Yes</Label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="hasChildrenNo" 
                        name="hasChildren" 
                        value="no" 
                        checked={formData.hasChildren === "no"}
                        onChange={() => handleRadioChange("hasChildren", "no")}
                        className="mr-2"
                      />
                      <Label htmlFor="hasChildrenNo">No</Label>
                    </div>
                  </div>
                </div>
                
                {formData.hasChildren === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="childrenAges">Ages of children</Label>
                    <Input
                      id="childrenAges"
                      name="childrenAges"
                      placeholder="E.g., 5, 7, 12"
                      value={formData.childrenAges}
                      onChange={handleChange}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="workHours">What are your typical work hours?</Label>
                  <Input
                    id="workHours"
                    name="workHours"
                    placeholder="E.g., 9am-5pm Monday-Friday"
                    value={formData.workHours}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hoursAlone">How many hours will the pet be alone each day?</Label>
                  <Input
                    id="hoursAlone"
                    name="hoursAlone"
                    placeholder="E.g., 6-8 hours"
                    value={formData.hoursAlone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Why do you want to adopt this pet?</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    placeholder="Tell us why you're interested in adopting this pet"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <PhotoUpload
                    initialPhoto={formData.photoUrl}
                    onPhotoChange={handlePhotoChange}
                    label="Upload a photo of your living space (optional)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Any other information you'd like to share"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <div className="w-full flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-teal-500 hover:bg-teal-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PetAdoptionApplication;
