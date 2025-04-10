
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Upload, Image, X } from "lucide-react";

interface PhotoUploadProps {
  initialPhoto?: string;
  onPhotoChange: (photoUrl: string) => void;
  label?: string;
}

const PhotoUpload = ({ initialPhoto = "", onPhotoChange, label = "Profile Photo" }: PhotoUploadProps) => {
  const [photoUrl, setPhotoUrl] = useState(initialPhoto);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPhotoUrl(result);
        onPhotoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPhotoUrl(result);
        onPhotoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPhotoUrl("");
    onPhotoChange("");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="photo-upload">{label}</Label>
      
      {photoUrl ? (
        <div className="relative w-full max-w-xs">
          <img 
            src={photoUrl} 
            alt="Selected" 
            className="w-full h-48 object-cover rounded-md"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2" 
            onClick={clearPhoto}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="mt-2" 
            onClick={() => document.getElementById("photo-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Change Photo
          </Button>
        </div>
      ) : (
        <Card
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-colors ${
            isDragging ? "border-primary bg-muted" : "border-muted"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your image here or click to browse
          </p>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById("photo-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Photo
          </Button>
        </Card>
      )}
      
      <Input
        id="photo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PhotoUpload;
