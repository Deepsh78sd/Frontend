
import AdminLayout from "@/components/layouts/AdminLayout";
import StatCard from "@/components/ui/stat-card";
import ApplicationTable from "@/components/ui/application-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Heart, Building2, HeartPulse, ClipboardList } from "lucide-react";

// Mock data for charts
const adoptionData = [
  { name: 'Jan', adoptions: 25, fosters: 15 },
  { name: 'Feb', adoptions: 32, fosters: 18 },
  { name: 'Mar', adoptions: 28, fosters: 20 },
  { name: 'Apr', adoptions: 35, fosters: 22 },
  { name: 'May', adoptions: 30, fosters: 18 },
  { name: 'Jun', adoptions: 34, fosters: 25 },
];

// Mock data for applications
const recentApplications = [
  { id: 1, petName: "Max", applicantName: "John Doe", date: "2023-09-15", status: "pending" },
  { id: 2, petName: "Bella", applicantName: "Jane Smith", date: "2023-09-14", status: "approved" },
  { id: 3, petName: "Charlie", applicantName: "Mike Johnson", date: "2023-09-13", status: "rejected" },
  { id: 4, petName: "Luna", applicantName: "Sarah Williams", date: "2023-09-12", status: "pending" },
] as const;

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline">View Reports</Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Adoptions" 
            value="245" 
            icon={<Heart className="h-6 w-6" />} 
            note="+12% from last month"
          />
          <StatCard 
            title="Active Users" 
            value="1,234" 
            icon={<Users className="h-6 w-6" />} 
            note="+5% from last month"
          />
          <StatCard 
            title="Shelters" 
            value="35" 
            icon={<Building2 className="h-6 w-6" />} 
            note="+2 this month"
          />
          <StatCard 
            title="Pending Applications" 
            value="28" 
            icon={<ClipboardList className="h-6 w-6" />} 
            note="5 need urgent review"
          />
        </div>

        {/* Adoption & Fostering Statistics */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Adoption & Fostering Statistics</h2>
          <p className="text-sm text-gray-500 mb-4">Monthly adoption and fostering trends</p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adoptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="adoptions" name="Adoptions" fill="#14b8a6" />
                <Bar dataKey="fosters" name="Fosters" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Management */}
        <div className="bg-white p-6 rounded-lg border">
          <Tabs defaultValue="applications">
            <TabsList>
              <TabsTrigger value="applications">Recent Applications</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="pets">Recent Pets</TabsTrigger>
            </TabsList>
            <TabsContent value="applications">
              <ApplicationTable applications={recentApplications} />
            </TabsContent>
            <TabsContent value="users">
              <p className="py-4 text-muted-foreground">User management content will go here.</p>
            </TabsContent>
            <TabsContent value="pets">
              <p className="py-4 text-muted-foreground">Recent pets content will go here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
