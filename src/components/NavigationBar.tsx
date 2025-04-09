
import { Home, Heart, FileText, Calendar, Clock, Stethoscope, Info, LogOut, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavigationBar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-teal-500 font-medium">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
            </svg>
            <span className="text-lg font-bold">Tale of Tails</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/adopter/home" icon={<Home className="w-5 h-5" />} label="Home" active={location.pathname === "/adopter/home"} />
          <NavLink to="/adopter/pets" icon={<Heart className="w-5 h-5" />} label="Adopt" active={location.pathname.startsWith("/adopter/pets")} />
          <NavLink to="/adopter/applications" icon={<FileText className="w-5 h-5" />} label="My Applications" active={location.pathname.startsWith("/adopter/applications")} />
          <NavLink to="/adopter/appointments" icon={<Calendar className="w-5 h-5" />} label="Appointments" active={location.pathname.startsWith("/adopter/appointments")} />
          <NavLink to="/adopter/about" icon={<Info className="w-5 h-5" />} label="About Us" active={location.pathname === "/adopter/about"} />
          <NavLink to="/adopter/petcare" icon={<Stethoscope className="w-5 h-5" />} label="Pet Care" active={location.pathname === "/adopter/petcare"} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/adopter/applications" className="cursor-pointer">My Applications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/adopter/appointments" className="cursor-pointer">My Appointments</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer text-red-500 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <MobileNavLink to="/adopter/home" icon={<Home className="w-5 h-5" />} label="Home" />
            <MobileNavLink to="/adopter/pets" icon={<Heart className="w-5 h-5" />} label="Adopt" />
            <MobileNavLink to="/adopter/applications" icon={<FileText className="w-5 h-5" />} label="My Applications" />
            <MobileNavLink to="/adopter/appointments" icon={<Calendar className="w-5 h-5" />} label="Appointments" />
            <MobileNavLink to="/adopter/about" icon={<Info className="w-5 h-5" />} label="About Us" />
            <MobileNavLink to="/adopter/petcare" icon={<Stethoscope className="w-5 h-5" />} label="Pet Care" />
            
            <div className="pt-2 mt-2 border-t border-gray-200">
              <MobileNavLink to="/profile" icon={<User className="w-5 h-5" />} label="Profile Settings" />
              <MobileNavLink to="/login" icon={<LogOut className="w-5 h-5" />} label="Logout" className="text-red-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavLink = ({ to, icon, label, active }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center text-sm font-medium hover:text-teal-600",
        active ? "text-teal-600" : "text-gray-700"
      )}
    >
      <span className="mr-1">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const MobileNavLink = ({ to, icon, label, className }: MobileNavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100",
        className
      )}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavigationBar;
