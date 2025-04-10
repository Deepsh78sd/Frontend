import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { BarChart, DollarSign, Users, Building, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const ShelterDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Pets",
      value: "42",
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Adoptions",
      value: "24",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+18.2%",
      changeType: "positive",
    },
    {
      title: "Applications",
      value: "36",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      change: "+8.4%",
      changeType: "positive",
    },
    {
      title: "Donations",
      value: "$4,891",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "-2.5%",
      changeType: "negative",
    },
  ];

  const recentApplications = [
    {
      id: "APP-1234",
      applicant: "John Smith",
      pet: "Max (Golden Retriever)",
      date: "2023-09-15",
      status: "Pending",
    },
    {
      id: "APP-1235",
      applicant: "Sarah Johnson",
      pet: "Bella (Siamese Cat)",
      date: "2023-09-14",
      status: "Approved",
    },
    {
      id: "APP-1236",
      applicant: "Michael Brown",
      pet: "Charlie (Labrador)",
      date: "2023-09-12",
      status: "Rejected",
    },
    {
      id: "APP-1237",
      applicant: "Emily Davis",
      pet: "Luna (Maine Coon)",
      date: "2023-09-10",
      status: "Pending",
    },
    {
      id: "APP-1238",
      applicant: "David Wilson",
      pet: "Rocky (German Shepherd)",
      date: "2023-09-08",
      status: "Approved",
    },
  ];

  return (
    <PageLayout userRole="shelter" userName="Shelter Staff">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your shelter dashboard, manage your pets and applications.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
            <Button variant="outline">
              <BarChart className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                        {stat.change}
                      </span>
                      {" from last month"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    You have received {recentApplications.length} applications this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application ID</TableHead>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Pet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.id}</TableCell>
                          <TableCell>{application.applicant}</TableCell>
                          <TableCell>{application.pet}</TableCell>
                          <TableCell>{application.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                application.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : application.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {application.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    You have 3 events scheduled for this week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Adoption Day</p>
                        <p className="text-xs text-muted-foreground">
                          Saturday, 10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Volunteer Training</p>
                        <p className="text-xs text-muted-foreground">
                          Wednesday, 6:00 PM - 8:00 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Fundraising Gala</p>
                        <p className="text-xs text-muted-foreground">
                          Friday, 7:00 PM - 10:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View detailed analytics about your shelter operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Analytics charts will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download reports about your shelter activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto p-4 justify-start items-start text-left">
                      <div>
                        <h3 className="font-medium">Monthly Adoption Report</h3>
                        <p className="text-sm text-muted-foreground">
                          Summary of all adoptions processed in the current month
                        </p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start items-start text-left">
                      <div>
                        <h3 className="font-medium">Financial Summary</h3>
                        <p className="text-sm text-muted-foreground">
                          Overview of donations, expenses, and budget allocation
                        </p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start items-start text-left">
                      <div>
                        <h3 className="font-medium">Pet Inventory</h3>
                        <p className="text-sm text-muted-foreground">
                          Current list of all pets in your shelter with details
                        </p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start items-start text-left">
                      <div>
                        <h3 className="font-medium">Volunteer Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Summary of volunteer participation and hours contributed
                        </p>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Stay updated with the latest activities and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-medium">New Application Received</p>
                    <p className="text-sm text-muted-foreground">
                      Emily Davis has applied to adopt Luna (Maine Coon)
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="font-medium">Adoption Approved</p>
                    <p className="text-sm text-muted-foreground">
                      The application for Bella (Siamese Cat) has been approved by the hospital
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="font-medium">Low Inventory Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Cat food supplies are running low. Please reorder soon.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <p className="font-medium">Event Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Adoption Day is scheduled for this Saturday. 5 volunteers confirmed.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ShelterDashboard;
