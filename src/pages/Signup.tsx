
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import PhotoUpload from "../components/PhotoUpload";

// Type for the registration form data
interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: number;
  address: string;
  dateOfBirth: string;
  photoUrl: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initial form data
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: 3, // Default to adopter (assuming 3 is Adopter in your enum)
    address: "",
    dateOfBirth: "",
    photoUrl: ""
  });

  // Form validation errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate required fields
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: parseInt(value) }));
  };

  const handlePhotoChange = (photoUrl: string) => {
    setFormData(prev => ({ ...prev, photoUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    // In a real application, this would be an API call
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
      navigate("/login");
    }, 1500);

    // The actual API call would look something like this:
    /*
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          photoUrl: formData.photoUrl || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center text-teal-500">
            <svg viewBox="0 0 24 24" className="w-8 h-8 mr-2" fill="currentColor">
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
            </svg>
            <span className="text-xl font-bold">Tale of Tails</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber"
                  placeholder="(123) 456-7890" 
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required 
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  value={formData.role.toString()}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Pet Adopter</SelectItem>
                    <SelectItem value="1">Hospital Staff</SelectItem>
                    <SelectItem value="2">Shelter Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  name="address"
                  placeholder="123 Main St, City, State, Zip" 
                  value={formData.address}
                  onChange={handleChange}
                  required 
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input 
                  id="dateOfBirth" 
                  name="dateOfBirth"
                  type="date" 
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required 
                />
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>
              
              <PhotoUpload
                initialPhoto={formData.photoUrl}
                onPhotoChange={handlePhotoChange}
                label="Profile Photo"
              />
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-teal-500 hover:bg-teal-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-500 hover:text-teal-600 font-medium">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-teal-500 hover:text-teal-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-teal-500 hover:text-teal-600">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
