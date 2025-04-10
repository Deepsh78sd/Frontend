import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import StatusBadge from "../components/StatusBadge";
import { Search, Filter } from "lucide-react";

const Adopt = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
    console.log("Filtering by:", filterValue);
  };

  return (
    <PageLayout userRole="adopter" userName="John Doe">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Adopt a Pet</h1>
          <div className="flex gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Search className="mr-2 h-4 w-4" />
              Find a Pet
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for pets..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={handleFilterChange} defaultValue={filter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="adopted">Adopted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">Pet Name</h2>
            <p className="text-gray-600">
              <StatusBadge status="available" />
            </p>
          </div>
          <div className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">Pet Name</h2>
            <p className="text-gray-600">
              <StatusBadge status="pending" />
            </p>
          </div>
          <div className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">Pet Name</h2>
            <p className="text-gray-600">
              <StatusBadge status="adopted" />
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Adopt;
