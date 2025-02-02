import React, { useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, TrendingUp, Link, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

interface AffiliateLink {
  id: string;
  unique_code: string;
  product: {
    name: string;
    price: number;
    cashback_percentage: number;
  };
  clicks: number;
}

interface CashbackHistory {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  description: string;
  source_transaction_id?: string;
  cookie_period_end?: string;
}

interface CashbackDataPoint {
  month: string;
  amount: number;
}

const Dashboard = ({ darkMode, setDarkMode }: DashboardProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in to access the dashboard",
        });
        navigate("/signin");
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/signin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  // Fetch affiliate links with click counts
  const { data: affiliateLinks } = useQuery({
    queryKey: ['affiliate_links'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('affiliate_links')
        .select(`
          id,
          unique_code,
          product_id,
          marketplace_tools (
            name,
            price,
            cashback_percentage
          )
        `)
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Get click counts for each affiliate link
      const linksWithClicks = await Promise.all(
        data.map(async (link) => {
          const { count } = await supabase
            .from('click_tracking')
            .select('*', { count: 'exact' })
            .eq('affiliate_link_id', link.id);

          return {
            ...link,
            product: link.marketplace_tools,
            clicks: count || 0
          };
        })
      );

      return linksWithClicks;
    },
    retry: false,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load affiliate links",
        });
      }
    }
  });

  // Fetch cashback history including PartnerStack transactions
  const { data: cashbackHistory } = useQuery({
    queryKey: ['cashback_history'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Fetch both regular transactions and PartnerStack purchases
      const [transactionsResponse, purchasesResponse] = await Promise.all([
        supabase
          .from('transactions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('type', 'cashback')
          .order('created_at', { ascending: false }),
        
        supabase
          .from('purchases')
          .select(`
            id,
            amount,
            cashback_amount,
            status,
            created_at,
            external_status,
            marketplace_tools (name)
          `)
          .eq('user_id', session.user.id)
          .eq('affiliate_platform', 'partnerstack')
          .order('created_at', { ascending: false })
      ]);

      if (transactionsResponse.error) throw transactionsResponse.error;
      if (purchasesResponse.error) throw purchasesResponse.error;

      // Combine and format the data
      const partnerStackTransactions = purchasesResponse.data.map(purchase => ({
        id: purchase.id,
        amount: purchase.cashback_amount,
        created_at: purchase.created_at,
        status: purchase.external_status === 'confirmed' ? 'completed' : 'pending',
        description: `Cashback from ${purchase.marketplace_tools.name}`,
      }));

      return [...transactionsResponse.data, ...partnerStackTransactions].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    retry: false,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cashback history",
        });
      }
    }
  });

  // Calculate total confirmed and pending cashback
  const { totalConfirmed, totalPending } = useMemo(() => {
    if (!cashbackHistory) return { totalConfirmed: 0, totalPending: 0 };

    return cashbackHistory.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount);
        if (transaction.status === 'completed') {
          acc.totalConfirmed += amount;
        } else if (transaction.status === 'pending') {
          acc.totalPending += amount;
        }
        return acc;
      },
      { totalConfirmed: 0, totalPending: 0 }
    );
  }, [cashbackHistory]);

  // Process cashback data for the chart
  const cashbackData = useMemo(() => {
    if (!cashbackHistory) return [];

    const monthlyData = cashbackHistory.reduce((acc: { [key: string]: number }, transaction) => {
      if (transaction.status === 'completed') {
        const month = new Date(transaction.created_at).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + Number(transaction.amount);
      }
      return acc;
    }, {});

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount
    }));
  }, [cashbackHistory]);

  const copyAffiliateLink = async (code: string) => {
    const baseUrl = window.location.origin;
    const affiliateUrl = `${baseUrl}/ref/${code}`;
    
    try {
      await navigator.clipboard.writeText(affiliateUrl);
      toast({
        title: "Success",
        description: "Affiliate link copied to clipboard!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy link to clipboard",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <DashboardSidebar />
      <div className="flex-1 p-4 md:p-8 mt-0">
        <div className="flex justify-between items-center mb-6 sticky top-16 bg-white dark:bg-gray-900 z-10 py-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-8 w-8 md:h-10 md:w-10 bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-success" />
              <h2 className="text-lg md:text-xl font-semibold">Total Confirmed Cashback</h2>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-primary dark:text-primary-light">
              ${totalConfirmed.toFixed(2)}
            </p>
          </Card>

          <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg md:text-xl font-semibold">Pending Cashback</h2>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-yellow-500">
              ${totalPending.toFixed(2)}
            </p>
          </Card>

          <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="flex items-center gap-2 mb-4">
              <Link className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg md:text-xl font-semibold">Active Affiliate Links</h2>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-blue-500">
              {affiliateLinks?.length || 0}
            </p>
          </Card>
        </div>

        <Card className="p-4 md:p-6 mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link className="h-5 w-5" />
            <h2 className="text-lg md:text-xl font-semibold">Your Affiliate Links</h2>
          </div>
          <div className="space-y-4">
            {affiliateLinks?.map((link) => (
              <div key={link.id} className="p-4 border rounded-lg dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{link.product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {link.clicks} clicks • {link.product.cashback_percentage}% cashback
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyAffiliateLink(link.unique_code)}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5" />
            <h2 className="text-lg md:text-xl font-semibold">Cashback History</h2>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashbackData}>
                <CartesianGrid strokeDasharray="3 3" className="dark:opacity-20" />
                <XAxis 
                  dataKey="month" 
                  stroke={darkMode ? "#fff" : "#000"}
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <YAxis 
                  stroke={darkMode ? "#fff" : "#000"}
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : 'white',
                    border: '1px solid #374151',
                    color: darkMode ? '#fff' : '#000'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#006DAF" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {cashbackHistory?.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 border-b dark:border-gray-700">
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${Number(item.amount).toFixed(2)}</p>
                  <p className={`text-sm ${
                    item.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;