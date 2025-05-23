import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";

// Custom cookie period configuration for specific tools - keep in sync with Marketplace
const CUSTOM_COOKIE_PERIODS: Record<string, number> = {
  "Koala AI": 60,
  "Scalenut": 60,
  "Pouncer AI": 90,
  "ArtSpace.ai": 45,
  "Moosend": 90,
  "Frase": 60,
  "Text Cortex": 60,
  "ADCreative.ai": 30,
  "Mangools": 30,
  "Lemlist": 30,
  "MurfAI": 90
};

// Default cookie period (days) if not specified in the config
const DEFAULT_COOKIE_PERIOD = 30;

const Earnings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Fetch cashback history including PartnerStack transactions
  const { data: cashbackHistory, isLoading } = useQuery({
    queryKey: ['cashback_history_detailed'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signin');
        throw new Error('Not authenticated');
      }

      // Fetch both regular transactions and PartnerStack purchases
      const [transactionsResponse, purchasesResponse] = await Promise.all([
        supabase
          .from('transactions')
          .select(`
            id,
            amount,
            created_at,
            status,
            description,
            cookie_period_days,
            cookie_period_end,
            source_transaction_id,
            marketplace_tools:source_transaction_id(name)
          `)
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
      const partnerStackEntries = purchasesResponse.data.map(purchase => {
        // Safely access the name property
        let toolName = 'Unknown Tool';
        if (purchase.marketplace_tools && 
            typeof purchase.marketplace_tools === 'object' && 
            'name' in purchase.marketplace_tools && 
            purchase.marketplace_tools.name) {
          toolName = purchase.marketplace_tools.name as string;
        }
        
        // Get cookie period for this tool
        const cookiePeriodDays = CUSTOM_COOKIE_PERIODS[toolName] || DEFAULT_COOKIE_PERIOD;
        
        return {
          id: purchase.id,
          amount: purchase.cashback_amount,
          created_at: purchase.created_at,
          status: purchase.external_status === 'confirmed' ? 'completed' : 'pending',
          tool_name: toolName,
          description: `Cashback from ${toolName}`,
          cookie_period_days: cookiePeriodDays,
          cookie_period_end: new Date(new Date(purchase.created_at).getTime() + cookiePeriodDays * 24 * 60 * 60 * 1000).toISOString()
        };
      });

      // Add tool name to transactions where available with proper null checks
      const formattedTransactions = transactionsResponse.data.map(transaction => {
        // Safely access the name property with complete null safety
        let toolName = 'Unknown Tool';
        
        try {
          // Only proceed if marketplace_tools exists and is an object
          if (transaction.marketplace_tools && 
              typeof transaction.marketplace_tools === 'object') {
            
            // Type assertion after validation
            const marketplaceTool = transaction.marketplace_tools as { name?: string | null };
            
            // Check if name exists and is not null
            if (marketplaceTool.name) {
              toolName = marketplaceTool.name;
            }
          }
        } catch (e) {
          console.error('Error accessing marketplace_tools:', e);
        }
        
        // Use stored cookie period or calculate based on the tool name
        const cookiePeriodDays = transaction.cookie_period_days || CUSTOM_COOKIE_PERIODS[toolName] || DEFAULT_COOKIE_PERIOD;
        
        return {
          ...transaction,
          tool_name: toolName,
          cookie_period_days: cookiePeriodDays
        };
      });

      return [...formattedTransactions, ...partnerStackEntries].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    retry: false,
    meta: {
      onError: (error) => {
        console.error('Error fetching cashback history:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load earnings history",
        });
      }
    }
  });

  const filteredHistory = cashbackHistory?.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  // Calculate totals
  const totals = cashbackHistory?.reduce(
    (acc, item) => {
      const amount = Number(item.amount);
      if (item.status === 'completed') {
        acc.completed += amount;
      } else if (item.status === 'pending') {
        acc.pending += amount;
      }
      acc.total += amount;
      return acc;
    },
    { total: 0, pending: 0, completed: 0 }
  ) || { total: 0, pending: 0, completed: 0 };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate expected confirmation date based on created date and cookie period
  const getExpectedConfirmationDate = (item: any) => {
    const createdDate = new Date(item.created_at);
    const cookiePeriod = item.cookie_period_days || 
                        CUSTOM_COOKIE_PERIODS[item.tool_name] || 
                        DEFAULT_COOKIE_PERIOD;
    
    if (item.status === 'completed') {
      return 'Already confirmed';
    }
    
    // If cookie_period_end exists, use that
    if (item.cookie_period_end) {
      return formatDate(item.cookie_period_end);
    }
    
    // Otherwise calculate based on created_at and cookie period days
    const confirmationDate = new Date(createdDate.getTime() + cookiePeriod * 24 * 60 * 60 * 1000);
    return formatDate(confirmationDate);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 px-4 md:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Earnings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-white dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Cashback</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totals.total.toFixed(2)}</p>
          </Card>
          <Card className="p-4 bg-white dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">${totals.pending.toFixed(2)}</p>
          </Card>
          <Card className="p-4 bg-white dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Withdrawable</p>
            <p className="text-2xl font-bold text-green-500">${totals.completed.toFixed(2)}</p>
          </Card>
        </div>

        <Card className="bg-white dark:bg-gray-800 p-4 md:p-6 mb-8">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cashback History</h2>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'pending' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button 
                variant={filter === 'completed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading earnings data...</div>
          ) : filteredHistory && filteredHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cookie Period</TableHead>
                    <TableHead>Expected Confirmation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.tool_name}</TableCell>
                      <TableCell>{formatDate(entry.created_at)}</TableCell>
                      <TableCell>${Number(entry.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          entry.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {entry.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </TableCell>
                      <TableCell>{entry.cookie_period_days || CUSTOM_COOKIE_PERIODS[entry.tool_name] || DEFAULT_COOKIE_PERIOD} days</TableCell>
                      <TableCell>{getExpectedConfirmationDate(entry)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No cashback history found.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Earnings;
