
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Plus, FolderPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Adopt = () => {
  const [filter, setFilter] = useState("all");

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Find Your Perfect Pet</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Plus className="mr-2 h-4 w-4" />
              Register Pet
            </Button>
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" />
              Foster Pet
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Search by name or breed..." className="w-full" />
          </div>
          <Select defaultValue="all-types">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="dogs">Dogs</SelectItem>
              <SelectItem value="cats">Cats</SelectItem>
              <SelectItem value="other">Other Pets</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex overflow-x-auto py-2 space-x-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            All
          </Button>
          <Button 
            variant={filter === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("available")}
            className={filter === "available" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            Available
          </Button>
          <Button 
            variant={filter === "fostering" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("fostering")}
            className={filter === "fostering" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            Available for Fostering
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={pet.imageUrl} 
                  alt={pet.name} 
                  className="w-full h-64 object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white text-teal-500 hover:text-teal-600 hover:bg-white"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{pet.name}</h3>
                <p className="text-sm text-muted-foreground">{pet.breed}</p>
                <div className="flex mt-2">
                  <div className="flex items-center mr-4">
                    <span className="text-xs font-medium">{pet.age}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <span className="text-xs font-medium">{pet.gender}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-teal-500 hover:bg-teal-600">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

const pets = [
  {
    id: 1,
    name: "Luna",
    breed: "Siamese Cat",
    age: "2 years",
    gender: "Female",
    imageUrl: "https://source.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: 2,
    name: "Max",
    breed: "Tabby Cat",
    age: "1 year",
    gender: "Male",
    imageUrl: "https://source.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: 3,
    name: "Charlie",
    breed: "Domestic Shorthair",
    age: "3 years",
    gender: "Male",
    imageUrl: "https://source.unsplash.com/photo-1582562124811-c09040d0a901",
  },
];

export default Adopt;
