
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, FileText, Calendar, User, LogOut, Menu, X, BookOpen, PlusCircle, Dog } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

interface TopNavBarProps {
  userRole: 'admin' | 'shelter' | 'hospital' | 'adopter';
  userName?: string;
}

const TopNavBar = ({ userRole, userName = "User" }: TopNavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  // Define navigation items for each role
  const navItems: NavItem[] = [
    // Admin navigation
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home className="w-5 h-5" />, roles: ['admin'] },
    { name: "Applications", path: "/admin/applications", icon: <FileText className="w-5 h-5" />, roles: ['admin'] },
    { name: "Users", path: "/admin/users", icon: <User className="w-5 h-5" />, roles: ['admin'] },
    { name: "Pets", path: "/admin/pets", icon: <Dog className="w-5 h-5" />, roles: ['admin'] },
    { name: "Pet Care", path: "/admin/petcare", icon: <BookOpen className="w-5 h-5" />, roles: ['admin'] },
    
    // Shelter navigation
    { name: "Dashboard", path: "/shelter/dashboard", icon: <Home className="w-5 h-5" />, roles: ['shelter'] },
    { name: "Applications", path: "/shelter/applications", icon: <FileText className="w-5 h-5" />, roles: ['shelter'] },
    { name: "Pets", path: "/shelter/pets", icon: <Dog className="w-5 h-5" />, roles: ['shelter'] },
    { name: "Pet Care", path: "/shelter/petcare", icon: <BookOpen className="w-5 h-5" />, roles: ['shelter'] },
    
    // Hospital navigation
    { name: "Dashboard", path: "/hospital/dashboard", icon: <Home className="w-5 h-5" />, roles: ['hospital'] },
    { name: "Applications", path: "/hospital/applications", icon: <FileText className="w-5 h-5" />, roles: ['hospital'] },
    { name: "Appointments", path: "/hospital/appointments", icon: <Calendar className="w-5 h-5" />, roles: ['hospital'] },
    { name: "Pet Care", path: "/hospital/petcare", icon: <BookOpen className="w-5 h-5" />, roles: ['hospital'] },
    
    // Adopter navigation
    { name: "Home", path: "/adopter/home", icon: <Home className="w-5 h-5" />, roles: ['adopter'] },
    { name: "Adopt", path: "/adopter/pets", icon: <Heart className="w-5 h-5" />, roles: ['adopter'] },
    { name: "My Pets", path: "/adopter/mypets", icon: <Dog className="w-5 h-5" />, roles: ['adopter'] },
    { name: "Applications", path: "/adopter/applications", icon: <FileText className="w-5 h-5" />, roles: ['adopter'] },
    { name: "Appointments", path: "/adopter/appointments", icon: <Calendar className="w-5 h-5" />, roles: ['adopter'] },
    { name: "Pet Care", path: "/adopter/petcare", icon: <BookOpen className="w-5 h-5" />, roles: ['adopter'] }
  ];

  // Filter navigation items by user role
  const roleNavItems = navItems.filter(item => item.roles.includes(userRole));

  // Role badge background color
  const getRoleBadgeColor = () => {
    switch (userRole) {
      case "admin": return "bg-teal-100 text-teal-800";
      case "shelter": return "bg-indigo-100 text-indigo-800";
      case "hospital": return "bg-blue-100 text-blue-800";
      case "adopter": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link to={`/${userRole}/dashboard`} className="flex items-center text-teal-500 font-medium">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
            </svg>
            <span className="text-lg font-bold">Tale of Tails</span>
            <span className={cn("ml-2 px-2 py-1 text-xs font-medium rounded-md", getRoleBadgeColor())}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {roleNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center text-sm font-medium",
                location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                  ? "text-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              )}
            >
              <span className="mr-1">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {roleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-teal-50 text-teal-600"
                    : "hover:bg-gray-100"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <Link
                to="/profile"
                className="flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profile Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;
