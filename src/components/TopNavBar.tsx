// This component is deprecated as we're using the navigation directly in PageLayout.tsx
// Keeping this file but not using it to avoid import errors

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, FileText, Calendar, User, LogOut, Menu, X, Dog } from "lucide-react";
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

interface TopNavBarProps {
  userRole: 'admin' | 'shelter' | 'hospital' | 'adopter';
  userName?: string;
}

const TopNavBar = ({ userRole, userName = "User" }: TopNavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Render a deprecation warning
  console.warn("TopNavBar is deprecated in favor of integrated navigation in PageLayout");
  
  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <span className="text-red-500">This component is deprecated. Use PageLayout instead.</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
