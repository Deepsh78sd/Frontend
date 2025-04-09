
import AdopterLayout from "@/components/layouts/AdopterLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";

const featuredPets = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Siamese",
    age: "1 year",
    image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Rocky",
    breed: "German Shepherd",
    age: "4 years",
    image: "https://images.unsplash.com/photo-1589941013196-bc91be2e31b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2VybWFuJTIwc2hlcGhlcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];

// Recent applications
const recentApplications = [
  {
    id: 101,
    petName: "Bella",
    date: "2023-09-10",
    status: "pending",
  },
  {
    id: 102,
    petName: "Charlie",
    date: "2023-09-05",
    status: "approved",
  },
] as const;

// Upcoming appointments
const upcomingAppointments = [
  {
    id: 201,
    petName: "Bella",
    date: "2023-09-20",
    time: "10:00 AM",
    location: "Happy Paws Shelter",
  },
];

const AdopterHome = () => {
  return (
    <AdopterLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Companion</h1>
            <p className="text-teal-100 mb-6">
              Browse through our selection of lovable pets waiting for their forever homes.
              Start your journey with a new friend today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-teal-600 hover:bg-teal-50"
              >
                <Link to="/adopter/pets">Browse Pets</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-teal-600"
              >
                <Link to="/adopter/petcare">Pet Care Tips</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Pets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Featured Pets</h2>
            <Button variant="link" asChild>
              <Link to="/adopter/pets">View All Pets</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle>{pet.name}</CardTitle>
                  <CardDescription>
                    {pet.breed} · {pet.age}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full bg-teal-500 hover:bg-teal-600">
                    <Link to={`/adopter/pets/${pet.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Status & Upcoming Visits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-500" />
                Your Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">{app.petName}</p>
                        <p className="text-sm text-gray-500">Applied: {app.date}</p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-4 text-center">You haven't submitted any applications yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/adopter/applications">View All Applications</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Visits */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-500" />
                Upcoming Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Visit with {apt.petName}</p>
                        <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                        <p className="text-sm text-gray-500">{apt.location}</p>
                      </div>
                      <Button size="sm">Reschedule</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-4 text-center">You don't have any upcoming visits scheduled.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/adopter/appointments">Manage Appointments</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Pet Care Tips Preview */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Pet Care Tips</h3>
              <p className="text-gray-600 mb-4">
                Learn how to provide the best care for your new pet with our comprehensive guides
                on feeding, training, health, and more.
              </p>
              <Button asChild variant="outline" className="border-green-500 text-green-600 hover:bg-green-100">
                <Link to="/adopter/petcare">View Pet Care Guides</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdopterLayout>
  );
};

export default AdopterHome;
