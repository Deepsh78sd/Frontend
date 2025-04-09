
import AdopterLayout from "@/components/layouts/AdopterLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, UserCheck, Clock, Award, MessageCircle } from "lucide-react";

const AdopterAbout = () => {
  return (
    <AdopterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">About Tale of Tails</h1>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Tale of Tails is a comprehensive pet adoption platform connecting animal shelters, 
            veterinary hospitals, and potential adopters to make the pet adoption journey seamless, 
            transparent, and joyful.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-6 w-6 text-pink-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To connect loving homes with pets in need, while ensuring each adoption
                is a perfect match through our verified shelter network and medical screening process.
                We believe every pet deserves a loving forever home.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-6 w-6 text-blue-500" />
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We are committed to ethical pet adoption practices, transparency in our processes,
                and providing ongoing support to both adopters and shelters. All pets on our platform
                undergo proper health checks and behavior assessments.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <UserCheck className="mr-2 h-6 w-6 text-teal-500" />
                For Adopters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>Browse pets from verified shelters</li>
                <li>Submit adoption applications online</li>
                <li>Track application status in real-time</li>
                <li>Access comprehensive pet care information</li>
                <li>Schedule meet-and-greets with potential pets</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-6 w-6 text-indigo-500" />
                For Shelters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>List available pets for adoption</li>
                <li>Manage adoption applications efficiently</li>
                <li>Track pet history and medical records</li>
                <li>Coordinate with veterinary hospitals</li>
                <li>Share success stories and increase visibility</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Award className="mr-2 h-6 w-6 text-blue-500" />
                For Hospitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>Verify pet health information</li>
                <li>Schedule and manage health check appointments</li>
                <li>Collaborate with shelters on medical issues</li>
                <li>Provide medical history to potential adopters</li>
                <li>Contribute to pet care knowledge database</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-start">
            <MessageCircle className="h-6 w-6 text-green-600 mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-green-800">Contact Us</h3>
              <p className="mt-2 text-green-700">
                Have questions about adoption or need assistance with your application?
                Our team is here to help you through every step of your pet adoption journey.
              </p>
              <div className="mt-4 text-sm text-green-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Email:</strong> support@taleoftails.com</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                  </div>
                  <div>
                    <p><strong>Hours:</strong> Monday-Friday, 9am-6pm EST</p>
                    <p><strong>Address:</strong> 123 Pet Lane, Animalia, AN 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdopterLayout>
  );
};

export default AdopterAbout;
