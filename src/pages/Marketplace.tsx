import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Marketplace</h1>
        </div>
        
        <div className="relative mb-8">
          <Input 
            type="search" 
            placeholder="Search tools..." 
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <Card className="p-6 text-center text-gray-500 bg-white">
          No tools available in the marketplace yet. Check back soon!
        </Card>
      </div>
    </div>
  );
};

export default Marketplace;