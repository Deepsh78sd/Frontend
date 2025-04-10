import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const AdopterHome = () => {
  const [pets, setPets] = useState([
    {
      id: "1",
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: 3,
      gender: "Male",
      location: "New York, NY",
    },
    {
      id: "2",
      name: "Whiskers",
      type: "Cat",
      breed: "Siamese",
      age: 2,
      gender: "Female",
      location: "Los Angeles, CA",
    },
    {
      id: "3",
      name: "Rocky",
      type: "Dog",
      breed: "German Shepherd",
      age: 4,
      gender: "Male",
      location: "Chicago, IL",
    },
  ]);

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Home, Adopter!</h1>
          <p className="text-gray-600">
            Explore available pets and start your adoption journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.id} className="border rounded-md p-4">
              <h2 className="text-xl font-semibold">{pet.name}</h2>
              <p className="text-gray-500">
                {pet.type} - {pet.breed}
              </p>
              <p>Age: {pet.age}</p>
              <p>Gender: {pet.gender}</p>
              <p>Location: {pet.location}</p>
              <Button asChild>
                <Link to={`/adopter/pets/${pet.id}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AdopterHome;
