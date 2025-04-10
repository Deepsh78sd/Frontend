import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import PageLayout from "../components/PageLayout";
import { SearchIcon, HeartIcon, InfoIcon } from "lucide-react";

const Index = () => {
  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Furry Friend Today
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Browse our adorable pets and find the perfect match for your
            family.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link to="/adopter/pets">
                <HeartIcon className="mr-2 h-5 w-5" />
                Adopt a Pet
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Why Choose Tale of Tails?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Wide selection of pets from various shelters</li>
              <li>Easy application process</li>
              <li>Resources for pet care and training</li>
              <li>Supportive community of pet lovers</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Browse available pets</li>
              <li>Submit an adoption application</li>
              <li>Get approved by the shelter</li>
              <li>Bring your new friend home!</li>
            </ol>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community and help us find loving homes for pets in need.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/adopter/about">
                <InfoIcon className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/adopter/pets">
                <SearchIcon className="mr-2 h-5 w-5" />
                Find a Pet
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
