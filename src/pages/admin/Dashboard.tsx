import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 150,
    activeShelters: 25,
    pendingApplications: 12,
  });

  return (
    <PageLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl">{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">Active Shelters</h2>
            <p className="text-2xl">{dashboardData.activeShelters}</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">Pending Applications</h2>
            <p className="text-2xl">{dashboardData.pendingApplications}</p>
          </div>
        </div>
        <div>
          <Button>Generate Report</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
