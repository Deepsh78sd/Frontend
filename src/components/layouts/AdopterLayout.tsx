
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, FileText, Info, Clipboard, LogOut, User } from "lucide-react";
import { cn } from "../../lib/utils";

interface AdopterLayoutProps {
  children: ReactNode;
}

const AdopterLayout = ({ children }: AdopterLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/adopter/home", icon: <Home className="w-5 h-5" /> },
    { name: "Pets", path: "/adopter/pets", icon: <Heart className="w-5 h-5" /> },
    { name: "Applications", path: "/adopter/applications", icon: <Clipboard className="w-5 h-5" /> },
    { name: "Pet Care", path: "/adopter/petcare", icon: <FileText className="w-5 h-5" /> },
    { name: "About Us", path: "/adopter/about", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/adopter/home" className="flex items-center text-teal-500 font-medium">
              <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
              </svg>
              <span className="text-lg font-bold">Tale of Tails</span>
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md">Adopter</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-sm font-medium hover:text-teal-600 flex items-center">
              <User className="w-4 h-4 mr-1" />
              Profile
            </Link>
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
                        ? "bg-green-50 text-green-700"
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

      {/* Footer for Adopter Layout */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center text-teal-500 mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
                  <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
                </svg>
                <span className="text-lg font-bold">Tale of Tails</span>
              </div>
              <p className="text-sm text-gray-600">Connecting loving homes with pets in need since 2023.</p>
            </div>
            
            <div className="col-span-1">
              <h3 className="font-medium text-gray-900 mb-3">Adopt</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/adopter/pets" className="text-gray-600 hover:text-teal-600">Available Pets</Link></li>
                <li><Link to="/adopter/applications" className="text-gray-600 hover:text-teal-600">My Applications</Link></li>
                <li><Link to="/adopter/petcare" className="text-gray-600 hover:text-teal-600">Pet Care Guide</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="font-medium text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/adopter/about" className="text-gray-600 hover:text-teal-600">About Us</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-teal-600">FAQs</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-teal-600">Contact Support</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="font-medium text-gray-900 mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Subscribe to our newsletter for updates on available pets and adoption events.
              </p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm flex-1"
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-r-md text-sm hover:bg-teal-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2023 Tale of Tails. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdopterLayout;
