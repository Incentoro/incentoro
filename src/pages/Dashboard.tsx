import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { data: cashbackData } = useQuery({
    queryKey: ['cashback_stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('transactions')
        .select('amount, created_at')
        .eq('user_id', user.id)
        .eq('type', 'cashback')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      // Group by month for the chart
      const monthlyData = data.reduce((acc: any[], tx) => {
        const month = new Date(tx.created_at).toLocaleString('default', { month: 'short' });
        const existing = acc.find(item => item.month === month);
        if (existing) {
          existing.amount += Number(tx.amount);
        } else {
          acc.push({ month, amount: Number(tx.amount) });
        }
        return acc;
      }, []);

      return monthlyData;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-10 w-10"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-success" />
              <h2 className="text-xl font-semibold">Total Cashback Earned</h2>
            </div>
            <p className="text-4xl font-bold text-primary">
              ${cashbackData?.reduce((sum, item) => sum + item.amount, 0)?.toFixed(2) || '0.00'}
            </p>
          </Card>

          <Card className="p-6 bg-card text-card-foreground">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-semibold">Monthly Spending</h2>
            </div>
            <p className="text-4xl font-bold text-destructive">$0.00</p>
          </Card>
        </div>

        <Card className="p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Cashback History</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashbackData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#006DAF" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;