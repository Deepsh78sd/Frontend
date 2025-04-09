
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Users, Building2, HeartPulse, Clipboard, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Applications", path: "/admin/applications", icon: <Clipboard className="w-5 h-5" /> },
    { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Shelters", path: "/admin/shelters", icon: <Building2 className="w-5 h-5" /> },
    { name: "Hospitals", path: "/admin/hospitals", icon: <HeartPulse className="w-5 h-5" /> },
    { name: "Pets", path: "/admin/pets", icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center text-teal-500 font-medium">
              <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
              </svg>
              <span className="text-lg font-bold">Tale of Tails</span>
              <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-md">Admin</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium hover:text-teal-600 flex items-center">
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 bg-white border-r h-[calc(100vh-64px)] sticky top-16">
          <div className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.path
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
