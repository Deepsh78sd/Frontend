
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, FileText, ArrowRight } from "lucide-react";

const AdopterAbout = () => {
  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Tale of Tails</h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting loving homes with pets in need since 2023
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/adopter/pets">
                <Heart className="mr-2 h-5 w-5" />
                Adopt a Pet
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/adopter/petcare">
                <FileText className="mr-2 h-5 w-5" />
                Pet Care Resources
              </Link>
            </Button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Tale of Tails is dedicated to finding loving homes for animals in need. We believe every pet deserves a chance at a happy life with a caring family.
          </p>
          <p className="text-gray-700">
            Our platform connects shelters, veterinary hospitals, and potential adopters to streamline the adoption process, ensure proper medical care, and provide resources for pet owners.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Browse Available Pets</h3>
              <p className="text-gray-600">
                Explore our database of pets looking for homes from shelters across the region.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Apply for Adoption</h3>
              <p className="text-gray-600">
                Submit an application for the pet you'd like to adopt or foster.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Welcome Your New Friend</h3>
              <p className="text-gray-600">
                After approval, bring your new family member home and enjoy life together!
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" 
                  alt="Emily Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Emily Johnson</h3>
              <p className="text-green-600">Founder & CEO</p>
              <p className="text-gray-600 mt-2">
                Passionate about animal welfare with 10 years experience in animal rescue.
              </p>
            </div>
            <div className="text-center">
              <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Michael Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Michael Rodriguez</h3>
              <p className="text-green-600">Head Veterinarian</p>
              <p className="text-gray-600 mt-2">
                Board-certified vet with specialty in rescue animal care and rehabilitation.
              </p>
            </div>
            <div className="text-center">
              <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
                  alt="Sarah Thompson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Sarah Thompson</h3>
              <p className="text-green-600">Shelter Coordinator</p>
              <p className="text-gray-600 mt-2">
                Expert in shelter management and adoption process optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@taleoftails.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    123 Pet Avenue<br />
                    Suite 456<br />
                    Animalville, AZ 12345
                  </p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-green-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Pet?</h2>
          <p className="text-gray-700 mb-6">
            Browse our available pets and start your adoption journey today.
          </p>
          <Button asChild size="lg">
            <Link to="/adopter/pets">
              <Heart className="mr-2 h-5 w-5" />
              Find a Pet <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>
      </div>
    </PageLayout>
  );
};

export default AdopterAbout;
