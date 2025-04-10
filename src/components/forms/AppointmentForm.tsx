
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../../hooks/use-toast";

interface AppointmentFormProps {
  initialData?: {
    id?: string;
    hospitalID: string;
    petID: string;
    appointmentDate: string;
    status: string;
  };
  petOptions: { id: string; name: string }[];
  hospitalOptions: { id: string; name: string }[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const AppointmentForm = ({ 
  initialData, 
  petOptions, 
  hospitalOptions, 
  onSubmit, 
  isSubmitting, 
  mode 
}: AppointmentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    hospitalID: initialData?.hospitalID || "",
    petID: initialData?.petID || "",
    appointmentDate: initialData?.appointmentDate ? new Date(initialData.appointmentDate).toISOString().substring(0, 16) : "",
    status: initialData?.status || "scheduled",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.hospitalID || !formData.petID || !formData.appointmentDate) {
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
          <label htmlFor="petID" className="text-sm font-medium">
            Pet <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.petID}
            onValueChange={(value) => handleSelectChange("petID", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pet" />
            </SelectTrigger>
            <SelectContent>
              {petOptions.map(pet => (
                <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="hospitalID" className="text-sm font-medium">
            Hospital <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.hospitalID}
            onValueChange={(value) => handleSelectChange("hospitalID", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select hospital" />
            </SelectTrigger>
            <SelectContent>
              {hospitalOptions.map(hospital => (
                <SelectItem key={hospital.id} value={hospital.id}>{hospital.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="appointmentDate" className="text-sm font-medium">
            Appointment Date & Time <span className="text-red-500">*</span>
          </label>
          <Input
            id="appointmentDate"
            name="appointmentDate"
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-teal-500 hover:bg-teal-600">
          {isSubmitting ? "Saving..." : mode === "create" ? "Schedule Appointment" : "Update Appointment"}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
