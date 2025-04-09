
import { Home, Heart, FileText, Calendar, Clock, Stethoscope, Info, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavigationBar = () => {
  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-teal-500 font-medium">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
            </svg>
            <span className="text-lg font-bold">Tale of Tails</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" icon={<Home className="w-5 h-5" />} label="Home" />
          <NavLink to="/adopt" icon={<Heart className="w-5 h-5" />} label="Adopt" />
          <NavLink to="/applications" icon={<FileText className="w-5 h-5" />} label="My Applications" />
          <NavLink to="/appointments" icon={<Calendar className="w-5 h-5" />} label="Appointments" />
          <NavLink to="/schedule" icon={<Clock className="w-5 h-5" />} label="Schedule" />
          <NavLink to="/pet-care" icon={<Stethoscope className="w-5 h-5" />} label="Pet Care" />
          <NavLink to="/about" icon={<Info className="w-5 h-5" />} label="About Us" />
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/profile" className="flex items-center text-sm font-medium hover:text-teal-600">
            <User className="w-4 h-4 mr-1" />
            Adopter
          </Link>
          <Link to="/logout" className="text-sm font-medium hover:text-teal-600">
            Logout
          </Link>
        </div>
      </div>
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

export default NavigationBar;
