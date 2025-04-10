
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

// Mock login credentials
const mockUsers = {
  admin: { email: "admin@example.com", password: "admin123" },
  shelter: { email: "shelter@example.com", password: "shelter123" },
  hospital: { email: "hospital@example.com", password: "hospital123" },
  adopter: { email: "adopter@example.com", password: "adopter123" }
};

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      
      // Check credentials against mock users
      if (email === mockUsers.admin.email && password === mockUsers.admin.password) {
        loginSuccess("admin");
      } else if (email === mockUsers.shelter.email && password === mockUsers.shelter.password) {
        loginSuccess("shelter");
      } else if (email === mockUsers.hospital.email && password === mockUsers.hospital.password) {
        loginSuccess("hospital");
      } else if (email === mockUsers.adopter.email && password === mockUsers.adopter.password) {
        loginSuccess("adopter");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const loginSuccess = (role: string) => {
    toast({
      title: "Login successful",
      description: `Logged in as ${role}`,
    });
    
    // Redirect based on role
    switch(role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "shelter":
        navigate("/shelter/dashboard");
        break;
      case "hospital":
        navigate("/hospital/dashboard");
        break;
      case "adopter":
        navigate("/adopter/home");
        break;
      default:
        navigate("/");
    }
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
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-teal-500 hover:text-teal-600"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-teal-500 hover:bg-teal-600"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-500 hover:text-teal-600 font-medium">
              Sign up
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

        {/* Mock credentials information */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Login Credentials</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
            <p><strong>Shelter:</strong> shelter@example.com / shelter123</p>
            <p><strong>Hospital:</strong> hospital@example.com / hospital123</p>
            <p><strong>Adopter:</strong> adopter@example.com / adopter123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
