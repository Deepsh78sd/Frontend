
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminApplications from "./pages/admin/Applications";
import AdminUsers from "./pages/admin/Users";
import AdminPets from "./pages/admin/Pets";
import AdminPetView from "./pages/admin/PetView";
import AdminPetEdit from "./pages/admin/PetEdit";
import AdminPetCreate from "./pages/admin/PetCreate";
import AdminPetCare from "./pages/admin/PetCare";

// Shelter Pages
import ShelterDashboard from "./pages/shelter/Dashboard";
import ShelterApplications from "./pages/shelter/Applications";
import ShelterPets from "./pages/shelter/Pets";
import ShelterHistory from "./pages/shelter/History";
import ShelterPetCare from "./pages/shelter/PetCare";
import ShelterPetView from "./pages/shelter/PetView";
import ShelterPetEdit from "./pages/shelter/PetEdit";
import ShelterPetCreate from "./pages/shelter/PetCreate";

// Hospital Pages
import HospitalDashboard from "./pages/hospital/Dashboard";
import HospitalApplications from "./pages/hospital/Applications";
import HospitalPetCare from "./pages/hospital/PetCare";
import HospitalAppointments from "./pages/hospital/Appointments";
import HospitalAppointmentView from "./pages/hospital/AppointmentView";
import HospitalAppointmentEdit from "./pages/hospital/AppointmentEdit";
import HospitalAppointmentCreate from "./pages/hospital/AppointmentCreate";

// Adopter Pages
import AdopterHome from "./pages/adopter/Home";
import AdopterPets from "./pages/adopter/Pets";
import AdopterAbout from "./pages/adopter/About";
import AdopterPetCare from "./pages/adopter/PetCare";
import AdopterApplications from "./pages/adopter/Applications";
import AdopterPetView from "./pages/adopter/PetView";
import AdopterAppointments from "./pages/adopter/Appointments";
import AdopterAppointmentView from "./pages/adopter/AppointmentView";
import AdopterAppointmentCreate from "./pages/adopter/AppointmentCreate";
import AdopterMyPets from "./pages/adopter/MyPets";
import AddPetAdoption from "./pages/adopter/PetForms/AddPetAdoption";
import AddPetFostering from "./pages/adopter/PetForms/AddPetFostering";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/pets" element={<AdminPets />} />
          <Route path="/admin/pets/create" element={<AdminPetCreate />} />
          <Route path="/admin/pets/:id" element={<AdminPetView />} />
          <Route path="/admin/pets/:id/edit" element={<AdminPetEdit />} />
          <Route path="/admin/petcare" element={<AdminPetCare />} />
          
          {/* Shelter Routes */}
          <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
          <Route path="/shelter/applications" element={<ShelterApplications />} />
          <Route path="/shelter/pets" element={<ShelterPets />} />
          <Route path="/shelter/pets/create" element={<ShelterPetCreate />} />
          <Route path="/shelter/pets/:id" element={<ShelterPetView />} />
          <Route path="/shelter/pets/:id/edit" element={<ShelterPetEdit />} />
          <Route path="/shelter/history" element={<ShelterHistory />} />
          <Route path="/shelter/petcare" element={<ShelterPetCare />} />
          
          {/* Hospital Routes */}
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/applications" element={<HospitalApplications />} />
          <Route path="/hospital/petcare" element={<HospitalPetCare />} />
          <Route path="/hospital/appointments" element={<HospitalAppointments />} />
          <Route path="/hospital/appointments/create" element={<HospitalAppointmentCreate />} />
          <Route path="/hospital/appointments/:id" element={<HospitalAppointmentView />} />
          <Route path="/hospital/appointments/:id/edit" element={<HospitalAppointmentEdit />} />
          
          {/* Adopter Routes */}
          <Route path="/adopter/home" element={<AdopterHome />} />
          <Route path="/adopter/pets" element={<AdopterPets />} />
          <Route path="/adopter/pets/:id" element={<AdopterPetView />} />
          <Route path="/adopter/about" element={<AdopterAbout />} />
          <Route path="/adopter/petcare" element={<AdopterPetCare />} />
          <Route path="/adopter/applications" element={<AdopterApplications />} />
          <Route path="/adopter/appointments" element={<AdopterAppointments />} />
          <Route path="/adopter/appointments/create" element={<AdopterAppointmentCreate />} />
          <Route path="/adopter/appointments/:id" element={<AdopterAppointmentView />} />
          <Route path="/adopter/mypets" element={<AdopterMyPets />} />
          <Route path="/adopter/mypets/add-adoption" element={<AddPetAdoption />} />
          <Route path="/adopter/mypets/add-fostering" element={<AddPetFostering />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
