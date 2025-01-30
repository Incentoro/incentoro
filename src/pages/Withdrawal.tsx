import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {
  const navigate = useNavigate();
  const { data: balance } = useQuery({
    queryKey: ['cashback_balance'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', user.id)
        .eq('type', 'cashback')
        .eq('status', 'completed');
      
      if (error) throw error;
      return data.reduce((sum, tx) => sum + Number(tx.amount), 0);
    }
  });

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Withdraw Earnings</h1>
      </div>
      
      <Card className="p-6">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-2">Available Balance</p>
          <p className="text-4xl font-bold text-primary">
            ${balance?.toFixed(2) || '0.00'}
          </p>
        </div>

        <Button className="w-full" disabled={!balance || balance <= 0}>
          <Download className="mr-2 h-4 w-4" />
          Withdraw to Bank Account
        </Button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Minimum withdrawal amount: $10.00
        </p>
      </Card>
    </div>
  );
};

export default Withdrawal;