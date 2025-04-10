
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
  label?: string;
  accept?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

const FileUploader = ({
  onFileSelect,
  label = "Upload File",
  accept = "image/*",
  buttonVariant = "outline",
  className = "",
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect?.(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      
      toast({
        title: "File Uploaded",
        description: `Successfully selected: ${file.name}`,
      });
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
      
      {!preview ? (
        <Button type="button" variant={buttonVariant} onClick={handleClick}>
          <Upload className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-40 rounded-md object-contain border"
          />
          <Button 
            size="sm" 
            variant="destructive" 
            onClick={handleRemove}
            className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleClick}
            className="mt-2"
          >
            Change File
          </Button>
        </div>
      )}
      
      {selectedFile && !preview && (
        <div className="flex items-center justify-between border rounded-md p-2">
          <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
