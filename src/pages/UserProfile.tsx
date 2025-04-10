
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";

// Mock user data (in a real app, this would come from your auth context/api)
const mockUser = {
  id: "1",
  fullName: "John Doe",
  email: "adopter@example.com",
  phoneNumber: "(123) 456-7890",
  role: "adopter",
  address: "123 Main St, Animal City, AC 12345",
  dateOfBirth: "1990-01-01",
  photoUrl: "https://randomuser.me/api/portraits/men/1.jpg"
};

const UserProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    fullName: mockUser.fullName,
    email: mockUser.email,
    phoneNumber: mockUser.phoneNumber,
    address: mockUser.address,
    dateOfBirth: mockUser.dateOfBirth,
    photoUrl: mockUser.photoUrl
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
      });
    }, 1000);
  };

  const userRole = mockUser.role as 'admin' | 'shelter' | 'hospital' | 'adopter';

  return (
    <PageLayout userRole={userRole} userName={mockUser.fullName}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>
              View and update your personal information
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input 
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={userData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photoUrl">Profile Photo URL</Label>
                    <Input 
                      id="photoUrl"
                      name="photoUrl"
                      value={userData.photoUrl}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    {userData.photoUrl && (
                      <img 
                        src={userData.photoUrl} 
                        alt={userData.fullName} 
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold">{userData.fullName}</h3>
                      <p className="text-muted-foreground capitalize">{mockUser.role}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{userData.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{userData.phoneNumber}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>{userData.address}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p>{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Update your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
