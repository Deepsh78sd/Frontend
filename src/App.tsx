
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminApplications from "./pages/admin/Applications";
import AdminUsers from "./pages/admin/Users";
import AdminShelters from "./pages/admin/Shelters";
import AdminHospitals from "./pages/admin/Hospitals";
import AdminPets from "./pages/admin/Pets";

// Shelter Pages
import ShelterDashboard from "./pages/shelter/Dashboard";
import ShelterApplications from "./pages/shelter/Applications";
import ShelterPets from "./pages/shelter/Pets";
import ShelterHistory from "./pages/shelter/History";
import ShelterPetCare from "./pages/shelter/PetCare";

// Hospital Pages
import HospitalDashboard from "./pages/hospital/Dashboard";
import HospitalPets from "./pages/hospital/Pets";
import HospitalPetCare from "./pages/hospital/PetCare";
import HospitalAppointments from "./pages/hospital/Appointments";

// Adopter Pages
import AdopterHome from "./pages/adopter/Home";
import AdopterPets from "./pages/adopter/Pets";
import AdopterAbout from "./pages/adopter/About";
import AdopterPetCare from "./pages/adopter/PetCare";
import AdopterApplications from "./pages/adopter/Applications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/shelters" element={<AdminShelters />} />
          <Route path="/admin/hospitals" element={<AdminHospitals />} />
          <Route path="/admin/pets" element={<AdminPets />} />
          
          {/* Shelter Routes */}
          <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
          <Route path="/shelter/applications" element={<ShelterApplications />} />
          <Route path="/shelter/pets" element={<ShelterPets />} />
          <Route path="/shelter/history" element={<ShelterHistory />} />
          <Route path="/shelter/petcare" element={<ShelterPetCare />} />
          
          {/* Hospital Routes */}
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/pets" element={<HospitalPets />} />
          <Route path="/hospital/petcare" element={<HospitalPetCare />} />
          <Route path="/hospital/appointments" element={<HospitalAppointments />} />
          
          {/* Adopter Routes */}
          <Route path="/adopter/home" element={<AdopterHome />} />
          <Route path="/adopter/pets" element={<AdopterPets />} />
          <Route path="/adopter/about" element={<AdopterAbout />} />
          <Route path="/adopter/petcare" element={<AdopterPetCare />} />
          <Route path="/adopter/applications" element={<AdopterApplications />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
