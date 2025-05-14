
import { Search, ArrowLeft, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all marketplace tools
  const { data: tools, isLoading } = useQuery({
    queryKey: ['marketplace-tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_tools')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  // Filter tools based on search query
  const filteredTools = tools?.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = async (tool: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }

      // Record click in the new click_logs table
      const { error: clickLogError } = await supabase
        .from('click_logs')
        .insert({
          user_id: user.id,
          tool_name: tool.name,
          tool_id: tool.id,
          affiliate_link: tool.base_url
        });

      if (clickLogError) {
        console.error('Error logging click:', clickLogError);
      }

      // Open the affiliate link in a new tab
      window.open(tool.base_url, '_blank');
      
      toast({
        title: "Cashback tracking activated",
        description: `You'll earn ${tool.cashback_percentage}% cashback on your purchase.`,
      });
    } catch (error: any) {
      console.error('Error in handleBuyNow:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </Card>
            ))}
          </div>
        ) : filteredTools && filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="mb-4 h-24 flex items-center justify-center bg-gray-50 rounded-lg">
                    <img 
                      src={tool.image_url || '/placeholder.svg'} 
                      alt={tool.name} 
                      className="h-16 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                    <Badge>{tool.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3 h-18">{tool.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Cashback</p>
                      <p className="font-semibold text-green-600">{tool.cashback_percentage}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold">${tool.price}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full flex items-center gap-2"
                    onClick={() => handleBuyNow(tool)}
                  >
                    <span>Buy & Earn Cashback</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-500">
            No tools match your search. Try adjusting your search terms.
          </Card>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
