
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Heart, 
  FileText, 
  Calendar, 
  LogOut, 
  User, 
  Menu, 
  X, 
  BarChart3, 
  Users, 
  Building2, 
  HeartPulse, 
  Clipboard,
  Info,
  Settings
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "./ui/use-toast";

interface TopNavbarProps {
  userRole: 'admin' | 'shelter' | 'hospital' | 'adopter';
  userName: string;
}

const TopNavbar = ({ userRole, userName }: TopNavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  // Navigation items for each user role
  const navItems: Record<string, {path: string, label: string, icon: ReactNode}[]> = {
    admin: [
      { path: "/admin/dashboard", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
      { path: "/admin/applications", label: "Applications", icon: <Clipboard className="w-5 h-5" /> },
      { path: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
      { path: "/admin/shelters", label: "Shelters", icon: <Building2 className="w-5 h-5" /> },
      { path: "/admin/hospitals", label: "Hospitals", icon: <HeartPulse className="w-5 h-5" /> },
      { path: "/admin/pets", label: "Pets", icon: <Heart className="w-5 h-5" /> },
      { path: "/admin/petcare", label: "Pet Care", icon: <FileText className="w-5 h-5" /> },
    ],
    shelter: [
      { path: "/shelter/dashboard", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
      { path: "/shelter/applications", label: "Applications", icon: <Clipboard className="w-5 h-5" /> },
      { path: "/shelter/pets", label: "Pets", icon: <Heart className="w-5 h-5" /> },
      { path: "/shelter/history", label: "History", icon: <Calendar className="w-5 h-5" /> },
      { path: "/shelter/petcare", label: "Pet Care", icon: <FileText className="w-5 h-5" /> },
    ],
    hospital: [
      { path: "/hospital/dashboard", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
      { path: "/hospital/pets", label: "Pets", icon: <Heart className="w-5 h-5" /> },
      { path: "/hospital/petcare", label: "Pet Care", icon: <FileText className="w-5 h-5" /> },
      { path: "/hospital/appointments", label: "Appointments", icon: <Calendar className="w-5 h-5" /> },
      { path: "/hospital/applications", label: "Applications", icon: <Clipboard className="w-5 h-5" /> },
    ],
    adopter: [
      { path: "/adopter/home", label: "Home", icon: <Home className="w-5 h-5" /> },
      { path: "/adopter/pets", label: "Adopt", icon: <Heart className="w-5 h-5" /> },
      { path: "/adopter/applications", label: "Applications", icon: <Clipboard className="w-5 h-5" /> },
      { path: "/adopter/appointments", label: "Appointments", icon: <Calendar className="w-5 h-5" /> },
      { path: "/adopter/mypets", label: "My Pets", icon: <Heart className="w-5 h-5" /> },
      { path: "/adopter/petcare", label: "Pet Care", icon: <FileText className="w-5 h-5" /> },
      { path: "/adopter/about", label: "About Us", icon: <Info className="w-5 h-5" /> },
    ],
  };

  // Get current role's navigation items
  const currentNavItems = navItems[userRole] || [];

  // Color schemes for different roles
  const roleColors: Record<string, {bg: string, text: string, hover: string}> = {
    admin: { bg: "bg-teal-100", text: "text-teal-800", hover: "hover:bg-teal-50" },
    shelter: { bg: "bg-indigo-100", text: "text-indigo-800", hover: "hover:bg-indigo-50" },
    hospital: { bg: "bg-blue-100", text: "text-blue-800", hover: "hover:bg-blue-50" },
    adopter: { bg: "bg-green-100", text: "text-green-800", hover: "hover:bg-green-50" },
  };

  const currentRoleColors = roleColors[userRole] || roleColors.adopter;

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo and Mobile Menu Button */}
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
            <span className={cn("ml-2 px-2 py-1 text-xs font-medium rounded-md", currentRoleColors.bg, currentRoleColors.text)}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {currentNavItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "flex items-center text-sm font-medium hover:text-teal-600",
                location.pathname === item.path ? "text-teal-600" : "text-gray-700"
              )}
            >
              <span className="mr-1">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-teal-500 text-white">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                  <User className="w-4 h-4" /> Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium",
                  location.pathname === item.path
                    ? cn("bg-teal-50 text-teal-700")
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <Link
                to="/profile"
                className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profile Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center py-2 px-3 rounded-md text-sm font-medium text-red-600 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;
