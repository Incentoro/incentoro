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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Get user's subscription plan type
  const { data: userPlan } = useQuery({
    queryKey: ['user-subscription-plan'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { planType: 'free' };

      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan_type')
        .eq('user_id', user.id)
        .single();
      
      if (error || !data) return { planType: 'free' };
      return { planType: data.plan_type };
    }
  });

  const isPremiumUser = userPlan?.planType === 'premium';

  // Fetch all marketplace tools
  const { data: tools, isLoading } = useQuery({
    queryKey: ['marketplace-tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_tools')
        .select('*');
      
      if (error) throw error;

      // Filter out the tools mentioned in the request
      return data.filter(tool => 
        !['ChatGPT Plus', 'MidJourney', 'Copy.ai'].includes(tool.name) &&
        // Handle duplicate MurfAI (keep only one if duplicates exist)
        !(tool.name === 'MurfAI' && data.filter(t => t.name === 'MurfAI').length > 1 && 
          data.filter(t => t.name === 'MurfAI').indexOf(tool) > 0)
      );
    }
  });

  // Filter tools based on search query
  const filteredTools = tools?.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCashbackPercentage = (basePercentage: number) => {
    // Premium users get double the cashback percentage
    return isPremiumUser ? Math.min(basePercentage * 2, 20) : basePercentage;
  };

  const handleBuyNow = async (tool: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }

      // Record click in the click_logs table
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

      // Get user's email from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
      }

      const userEmail = profileData?.email || user.email;

      // Send email notification using the edge function
      if (userEmail) {
        try {
          const response = await fetch(
            "https://usegbnurqtbbvbmsvohs.supabase.co/functions/v1/send-cashback-notification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabase.auth.getSession().then(res => res.data.session?.access_token)}`,
              },
              body: JSON.stringify({
                email: userEmail,
                toolName: tool.name
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Email notification error:", errorData);
          }
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
        }
      }

      // Open the affiliate link in a new tab
      window.open(tool.base_url, '_blank');
      
      // Adjust cashback percentage based on user's plan
      const adjustedCashbackPercentage = getCashbackPercentage(tool.cashback_percentage);
      
      toast({
        title: "Cashback tracking activated",
        description: `You'll earn ${adjustedCashbackPercentage}% cashback on your purchase. We've sent you a confirmation email.`,
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

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Earn More with Premium</h2>
          <p className="text-gray-700 mb-4">
            Free users earn 5-7.5% cashback. 
            <span className="font-semibold text-blue-700"> Premium users earn 15-20% cashback!</span>
          </p>
          {!isPremiumUser && (
            <Button 
              onClick={() => navigate('/settings')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Upgrade to Premium
            </Button>
          )}
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
                    <Avatar className="h-20 w-20 border border-gray-100">
                      <AvatarImage 
                        src={tool.image_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80'} 
                        alt={tool.name} 
                        className="object-contain"
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-800 text-xl">
                        {tool.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                    <Badge>{tool.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3 h-18 min-h-[4.5rem]">
                    {tool.description || `${tool.name} is a powerful AI tool that can help boost productivity and streamline your workflows.`}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Cashback</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-green-600">
                          {getCashbackPercentage(tool.cashback_percentage)}%
                        </p>
                        {isPremiumUser && (
                          <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700">
                            Premium Bonus
                          </Badge>
                        )}
                      </div>
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
