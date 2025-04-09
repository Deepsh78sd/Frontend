
import PageLayout from "@/components/PageLayout";
import { Dog, Cat, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Tale of Tails</h1>
          <p className="text-lg text-gray-600">
            We are dedicated to connecting loving homes with animals in need. 
            Our mission is to reduce pet homelessness and ensure every pet finds a caring forever family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
          <StatCard 
            icon={<Dog className="h-10 w-10 text-teal-500" />}
            title="500+"
            description="Dogs Rescued"
          />
          <StatCard 
            icon={<Cat className="h-10 w-10 text-teal-500" />}
            title="300+"
            description="Cats Adopted"
          />
          <StatCard 
            icon={<Heart className="h-10 w-10 text-teal-500" />}
            title="50+"
            description="Partner Shelters"
          />
          <StatCard 
            icon={<Users className="h-10 w-10 text-teal-500" />}
            title="100+"
            description="Dedicated Volunteers"
          />
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Our Mission</h2>
          <p className="mb-4">Tale of Tails is committed to:</p>
          
          <div className="space-y-4">
            {missions.map((mission, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-600 font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <p>{mission}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="mb-4">
              Our team consists of dedicated animal lovers, veterinarians, animal behaviorists, and
              volunteers who work tirelessly to ensure the welfare of animals in our care.
            </p>
            <p>
              From rescue to rehabilitation to rehoming, our experts are involved at every step to make
              sure each animal finds the perfect match for their forever home.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
            <p className="mb-4">
              We work with a network of animal shelters, rescue groups, veterinary clinics, and pet care
              professionals throughout the country.
            </p>
            <p>
              Through these partnerships, we're able to provide comprehensive care and support for
              animals in need and the families who adopt them.
            </p>
          </div>
        </div>

        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg">
            There are many ways you can help our cause. Whether through adoption, fostering,
            volunteering, or donating, every contribution makes a difference in the lives of animals in need.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatCard = ({ icon, title, description }: StatCardProps) => {
  return (
    <div className="p-6 bg-white border rounded-lg flex flex-col items-center text-center">
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const missions = [
  "Finding loving homes for abandoned and homeless pets through fostering and adoption",
  "Educating the public about responsible pet ownership and care",
  "Collaborating with shelters, rescue groups, and veterinary clinics",
  "Promoting spay/neuter initiatives to reduce pet overpopulation"
];

export default About;
