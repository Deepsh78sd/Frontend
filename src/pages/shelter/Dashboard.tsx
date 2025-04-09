
import ShelterLayout from "@/components/layouts/ShelterLayout";
import StatCard from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Home, Clock, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for applications
type Application = {
  id: number;
  petName: string;
  applicantName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

// Mock data for charts
const petActivityData = [
  { name: 'Jan', adoptions: 4, additions: 6 },
  { name: 'Feb', adoptions: 3, additions: 2 },
  { name: 'Mar', adoptions: 5, additions: 4 },
  { name: 'Apr', adoptions: 7, additions: 3 },
  { name: 'May', adoptions: 2, additions: 5 },
  { name: 'Jun', adoptions: 6, additions: 4 },
];

// Mock data for applications specific to this shelter
const shelterApplications: Application[] = [
  { id: 1, petName: "Max", applicantName: "John Doe", date: "2023-09-15", status: "pending" },
  { id: 2, petName: "Bella", applicantName: "Jane Smith", date: "2023-09-14", status: "approved" },
  { id: 3, petName: "Charlie", applicantName: "Mike Johnson", date: "2023-09-13", status: "rejected" },
];

const ApplicationTable = ({ applications }: { applications: Application[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>#{application.id}</TableCell>
              <TableCell>{application.petName}</TableCell>
              <TableCell>{application.applicantName}</TableCell>
              <TableCell>{application.date}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">View</Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ShelterDashboard = () => {
  return (
    <ShelterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shelter Dashboard</h1>
          <Button variant="outline">Export Data</Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Active Pets" 
            value="32" 
            icon={<Home className="h-6 w-6" />} 
            note="12 dogs, 14 cats, 6 others"
          />
          <StatCard 
            title="Pending Applications" 
            value="8" 
            icon={<Clock className="h-6 w-6" />} 
            note="3 new this week"
          />
          <StatCard 
            title="Adopted this Month" 
            value="15" 
            icon={<Heart className="h-6 w-6" />} 
            note="+30% from last month"
          />
          <StatCard 
            title="Upcoming Appointments" 
            value="5" 
            icon={<Calendar className="h-6 w-6" />} 
            note="Next: Tomorrow at 2:00 PM"
          />
        </div>

        {/* Pet Activity Chart */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Pet Activity</h2>
          <p className="text-sm text-gray-500 mb-4">Monthly adoptions and new additions</p>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={petActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="adoptions" 
                  name="Adoptions" 
                  stroke="#14b8a6" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="additions" 
                  name="New Additions" 
                  stroke="#6366f1" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <Button variant="link">View All</Button>
          </div>
          <ApplicationTable applications={shelterApplications} />
        </div>
      </div>
    </ShelterLayout>
  );
};

export default ShelterDashboard;
