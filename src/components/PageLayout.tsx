
import { ReactNode } from "react";
import TopNavbar from "./TopNavbar";

interface PageLayoutProps {
  children: ReactNode;
  userRole: 'admin' | 'shelter' | 'hospital' | 'adopter';
  userName?: string;
}

const PageLayout = ({ children, userRole, userName = "User" }: PageLayoutProps) => {
  // Default role-specific usernames if not provided
  const defaultUserNames: Record<string, string> = {
    admin: "Admin User",
    shelter: "Shelter Staff",
    hospital: "Hospital Staff",
    adopter: "Pet Adopter",
  };

  const displayName = userName || defaultUserNames[userRole] || "User";

  return (
    <div className="flex min-h-screen flex-col">
      <TopNavbar userRole={userRole} userName={displayName} />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
