
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome, Adopter User</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Applications Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>My Applications</span>
                <Clock className="h-5 w-5 text-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Active applications</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link to="/applications">View All</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Favorites Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Favorites</span>
                <Heart className="h-5 w-5 text-teal-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Saved pets</p>
              <Button variant="outline" size="sm" className="mt-4">View All</Button>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Notifications</span>
                <svg className="h-5 w-5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">New updates</p>
              <Button variant="outline" size="sm" className="mt-4">View All</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Recently Viewed Pets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Viewed Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyViewedPets.map((pet) => (
                  <div key={pet.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="bg-teal-100 p-2 rounded-full mr-3">
                        <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" />
                          <path d="M12,16.5c-2.03,0-3.8-1.11-4.75-2.75c0.7-0.87,1.77-1.75,2.75-1.75c0.39,0,0.74,0.24,1,0.5c0.26-0.26,0.61-0.5,1-0.5c0.98,0,2.05,0.88,2.75,1.75C13.8,15.39,12.03,16.5,12,16.5z" />
                          <path d="M14.5,9c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S14.5,8.17,14.5,9z" />
                          <path d="M9,9c0,0.83-0.67,1.5-1.5,1.5S6,9.83,6,9s0.67-1.5,1.5-1.5S9,8.17,9,9z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">{pet.name} - {pet.breed}</h4>
                        <p className="text-sm text-muted-foreground">Viewed {pet.viewedTime}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${application.status === "pending" ? "bg-yellow-100" : "bg-green-100"}`}>
                        <Clock className={`h-5 w-5 ${application.status === "pending" ? "text-yellow-600" : "text-green-600"}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">Application for {application.petName}</h4>
                        <div className="flex items-center">
                          <p className="text-sm mr-2">Status:</p>
                          <span 
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              application.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                              application.status === "approved" ? "bg-green-100 text-green-800" : ""
                            }`}
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{application.submittedTime}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

const recentlyViewedPets = [
  { id: 1, name: "Buddy", breed: "Golden Retriever", viewedTime: "1 day ago" },
  { id: 2, name: "Max", breed: "Labrador", viewedTime: "2 days ago" },
  { id: 3, name: "Luna", breed: "Siamese Cat", viewedTime: "3 days ago" },
];

const applications = [
  { 
    id: 1, 
    petName: "Buddy", 
    status: "pending", 
    submittedTime: "Submitted 3 days ago" 
  },
  { 
    id: 2, 
    petName: "Max", 
    status: "approved", 
    submittedTime: "Approved 1 week ago" 
  },
];

export default Index;
