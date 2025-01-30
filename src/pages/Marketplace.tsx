import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Marketplace = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
      
      <div className="relative mb-8">
        <Input 
          type="search" 
          placeholder="Search tools..." 
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      <Card className="p-6 text-center text-gray-500">
        No tools available in the marketplace yet. Check back soon!
      </Card>
    </div>
  );
};

export default Marketplace;