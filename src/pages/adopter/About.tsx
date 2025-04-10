
import { Button } from "../../components/ui/button";
import { withPageLayout } from "../../utils/layoutHelper";

const AboutPage = () => {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">About Tale of Tails</h1>
        <p className="text-lg text-gray-700">
          Tale of Tails is dedicated to connecting loving homes with pets in need. 
          Our mission is to simplify the pet adoption process and ensure every animal finds 
          their forever home.
        </p>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
            alt="People with pets" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Find Loving Homes</h3>
            <p className="text-gray-600">
              We believe every pet deserves a loving, permanent home. Our platform connects animals 
              with caring families ready to provide forever homes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Support Shelters</h3>
            <p className="text-gray-600">
              We partner with animal shelters to increase adoption rates and provide resources 
              to help them care for animals awaiting adoption.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Educate Pet Owners</h3>
            <p className="text-gray-600">
              We provide resources and information to help new pet owners provide the best care 
              for their animal companions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="bg-white p-4 rounded-lg border shadow-sm text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={`https://randomuser.me/api/portraits/${id % 2 === 0 ? 'women' : 'men'}/${id + 10}.jpg`} 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Team Member {id}</h3>
              <p className="text-sm text-gray-500">Position</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-teal-50 p-8 rounded-lg">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Get Involved</h2>
          <p className="text-lg max-w-xl mx-auto">
            Want to help more animals find their forever homes? Learn how you can contribute 
            to our mission.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button>Volunteer</Button>
            <Button variant="outline">Donate</Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Office Location</h3>
            <p className="text-gray-600 mb-2">123 Pet Street</p>
            <p className="text-gray-600 mb-2">Animal City, AC 12345</p>
            <p className="text-gray-600 mb-2">Email: contact@taleoftails.com</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Business Hours</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-600">Monday - Friday:</p>
              <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Saturday:</p>
              <p className="text-gray-600">10:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday:</p>
              <p className="text-gray-600">Closed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Wrap our component with the PageLayout
export default function AdopterAbout() {
  return withPageLayout(<AboutPage />, 'adopter', 'John Doe');
}
