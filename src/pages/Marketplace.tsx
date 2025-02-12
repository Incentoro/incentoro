
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Marketplace = () => {
  const navigate = useNavigate();

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

  const handleBuyNow = async (toolId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/signin');
      return;
    }

    // Record click tracking
    await supabase.from('click_tracking').insert({
      user_id: user.id,
      affiliate_link_id: toolId,
    });

    // Get the affiliate link
    const { data: affiliateLink } = await supabase
      .from('affiliate_links')
      .select('unique_code')
      .eq('product_id', toolId)
      .eq('user_id', user.id)
      .single();

    if (affiliateLink?.unique_code) {
      window.open(`https://get.murf.ai/${affiliateLink.unique_code}`, '_blank');
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
        ) : tools && tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="p-6">
                {tool.image_url && (
                  <div className="mb-4 h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                    <img 
                      src={tool.image_url} 
                      alt={tool.name} 
                      className="h-20 object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{tool.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Cashback</p>
                    <p className="font-semibold">{tool.cashback_percentage}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">${tool.price}</p>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => handleBuyNow(tool.id)}
                >
                  Buy Now & Get Cashback
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-500">
            No tools available in the marketplace yet. Check back soon!
          </Card>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
