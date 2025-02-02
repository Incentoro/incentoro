import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, TrendingUp, TrendingDown } from "lucide-react";
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

interface DashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Dashboard = ({ darkMode, setDarkMode }: DashboardProps) => {
  const isMobile = useIsMobile();

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-success" />
              <h2 className="text-lg md:text-xl font-semibold">Total Cashback Earned</h2>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-primary dark:text-primary-light">
              ${cashbackData?.reduce((sum, item) => sum + item.amount, 0)?.toFixed(2) || '0.00'}
            </p>
          </Card>

          <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <h2 className="text-lg md:text-xl font-semibold">Monthly Spending</h2>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-destructive">$0.00</p>
          </Card>
        </div>

        <Card className="p-4 md:p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Cashback History</h2>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashbackData || []}>
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
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;