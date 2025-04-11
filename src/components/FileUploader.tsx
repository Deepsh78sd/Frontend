
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Upload, X } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
  accept?: string;
  initialPreview?: string;
}

const FileUploader = ({
  onFileSelect,
  label = "Upload Image",
  accept = "image/*",
  initialPreview,
}: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setPreview(null);
      setFileName(null);
      onFileSelect(null);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">{label}</Label>
      
      {!preview && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
          <Input
            id="file-upload"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-900">Click to upload</span>
              <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
              <span className="text-xs text-gray-500 mt-2">{accept.replace("*", "")}</span>
            </div>
          </label>
        </div>
      )}
      
      {preview && (
        <div className="relative border rounded-lg overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
            onClick={clearSelection}
          >
            <X className="h-4 w-4" />
          </Button>
          {fileName && (
            <div className="bg-gray-100 p-2 text-xs font-medium truncate">
              {fileName}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
