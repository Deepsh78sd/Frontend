
import { withPageLayout } from "../../utils/layoutHelper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Heart, Shield, Clock, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Tale of Tails</h1>
        <p className="text-xl text-muted-foreground">
          Connecting loving homes with pets in need since 2023.
        </p>
      </div>

      <div className="prose max-w-3xl mx-auto">
        <p>
          Tale of Tails is dedicated to finding loving, permanent homes for abandoned and surrendered 
          pets in our community. We believe that every pet deserves a caring home where they can thrive 
          and be loved.
        </p>
        <p>
          Our organization was founded in 2023 by a group of passionate animal lovers who saw the need 
          for a better way to connect pets with potential adopters. Since then, we've helped thousands 
          of pets find their forever homes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <Heart className="h-8 w-8 text-teal-500 mb-2" />
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Creating happy endings for pets in need</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            Finding the perfect match between pets and loving adopters, ensuring a lifetime of happiness for both.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-teal-500 mb-2" />
            <CardTitle>Pet Safety</CardTitle>
            <CardDescription>Ensuring all pets receive quality care</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            All our pets receive comprehensive veterinary care, proper nutrition, and socialization before adoption.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <Clock className="h-8 w-8 text-teal-500 mb-2" />
            <CardTitle>Ongoing Support</CardTitle>
            <CardDescription>We're here for the long haul</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            Our relationship doesn't end at adoption. We provide ongoing support and resources for all adopters.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <Award className="h-8 w-8 text-teal-500 mb-2" />
            <CardTitle>Community Focus</CardTitle>
            <CardDescription>Building a community of pet lovers</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            We believe in the power of community and work closely with local shelters, rescues, and volunteers.
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Jane Smith" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-lg">Jane Smith</h3>
            <p className="text-muted-foreground">Founder & Director</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="John Davis" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-lg">John Davis</h3>
            <p className="text-muted-foreground">Lead Veterinarian</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Sarah Johnson" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-lg">Sarah Johnson</h3>
            <p className="text-muted-foreground">Adoption Coordinator</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <p className="max-w-2xl mx-auto">
          Have questions or want to get involved? We'd love to hear from you!
        </p>
        <div className="mt-4">
          <p>Email: contact@taleoftails.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Pet Street, Animal City</p>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  return withPageLayout(<AboutPage />, 'adopter', 'John Doe');
}
