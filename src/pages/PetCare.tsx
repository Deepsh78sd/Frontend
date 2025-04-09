
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Dog, Cat } from "lucide-react";

const PetCare = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pet Care Information</h1>
        
        <div className="w-full">
          <Input
            placeholder="Search pet care information..."
            className="w-full"
          />
        </div>

        <div className="flex overflow-x-auto py-2 space-x-2">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            All
          </Button>
          <Button 
            variant={selectedCategory === "dogs" ? "default" : "outline"}
            onClick={() => setSelectedCategory("dogs")}
            className={selectedCategory === "dogs" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            <Dog className="h-4 w-4 mr-2" />
            Dogs
          </Button>
          <Button 
            variant={selectedCategory === "cats" ? "default" : "outline"}
            onClick={() => setSelectedCategory("cats")}
            className={selectedCategory === "cats" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            <Cat className="h-4 w-4 mr-2" />
            Cats
          </Button>
          <Button 
            variant={selectedCategory === "other" ? "default" : "outline"}
            onClick={() => setSelectedCategory("other")}
            className={selectedCategory === "other" ? "bg-teal-500 hover:bg-teal-600" : ""}
          >
            Other Pets
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {articles
              .filter(article => selectedCategory === "all" || article.category === selectedCategory)
              .map((article) => (
                <Card 
                  key={article.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedArticle?.id === article.id ? "border-teal-500" : ""
                  }`}
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardContent className="p-4 flex items-start">
                    <div className="bg-teal-100 p-2 rounded-full mr-3">
                      <FileText className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <span>{article.category === "dogs" ? "Dogs" : article.category === "cats" ? "Cats" : "Other"}</span>
                        <span className="mx-1">•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {selectedArticle ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
                <div className="text-sm text-muted-foreground mb-4">
                  By {selectedArticle.author} • {selectedArticle.date}
                </div>
                <p className="mb-4">{selectedArticle.content}</p>
                <p>
                  {selectedArticle.additionalInfo}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 flex items-center justify-center h-64">
                <p className="text-muted-foreground">Select an article to view its content</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  additionalInfo?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Vaccination Schedule for Puppies",
    category: "dogs",
    date: "2023-09-15",
    author: "Dr. Smith",
    content: "Detailed vaccination schedule for puppies from 6 weeks to 16 weeks, including core vaccines like distemper, parvovirus, and rabies. Follow-up boosters and timing recommendations included.",
    additionalInfo: "Vaccinations are essential to protect your puppy from potentially fatal diseases. Always consult with your veterinarian to establish the right vaccination schedule for your pet's specific needs."
  },
  {
    id: 2,
    title: "Nutrition Guidelines for Adult Cats",
    category: "cats",
    date: "2023-09-14",
    author: "Dr. Johnson",
    content: "Comprehensive guide to feline nutrition, including protein requirements, feeding schedules, and how to select quality cat food. Covers special dietary needs for different life stages.",
    additionalInfo: "Proper nutrition is fundamental to your cat's health. Consider factors like age, weight, and activity level when determining portion sizes."
  },
  {
    id: 3,
    title: "Dental Care for Dogs",
    category: "dogs",
    date: "2023-09-13",
    author: "Dr. Williams",
    content: "Everything you need to know about canine dental hygiene, from brushing techniques to dental chews and professional cleanings. Prevention tips for common dental issues.",
    additionalInfo: "Regular dental care can prevent bad breath, tooth loss, and more serious health issues."
  },
  {
    id: 4,
    title: "Signs of Common Illness in Cats",
    category: "cats",
    date: "2023-09-12",
    author: "Dr. Miller",
    content: "Learn to recognize early warning signs of illness in cats, including behavioral changes, appetite loss, and litter box habits. When to seek immediate veterinary attention.",
    additionalInfo: "Cats often hide illness, making it important to monitor them closely for subtle changes."
  },
  {
    id: 5,
    title: "Exercise Requirements for Different Dog Breeds",
    category: "dogs",
    date: "2023-09-11",
    author: "Dr. Davis",
    content: "Breakdown of exercise needs by breed size and type, from high-energy working breeds to more sedentary companions. Activity suggestions for mental and physical stimulation.",
    additionalInfo: "Regular exercise prevents obesity and behavioral problems in dogs of all breeds."
  },
];

export default PetCare;
