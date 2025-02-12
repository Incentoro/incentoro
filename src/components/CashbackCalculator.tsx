
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DollarSign, Percent, CreditCard, Gift } from "lucide-react";

const CashbackCalculator = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");
  const [cashback, setCashback] = useState<{ free: number; premium: number }>({ free: 0, premium: 0 });

  const calculateCashback = (amount: number) => {
    const freePlanRate = 0.05;
    const premiumPlanRate = amount >= 100 ? 0.20 : 0.15;

    return {
      free: amount * freePlanRate,
      premium: amount * premiumPlanRate
    };
  };

  useEffect(() => {
    const amount = parseFloat(purchaseAmount) || 0;
    setCashback(calculateCashback(amount));
  }, [purchaseAmount]);

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimals
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setPurchaseAmount(value);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
          Calculate Your Cashback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Purchase Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="amount"
                type="text"
                value={purchaseAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="pl-10"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Plan</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedPlan === "free" ? "default" : "outline"}
                onClick={() => setSelectedPlan("free")}
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Free
              </Button>
              <Button
                variant={selectedPlan === "premium" ? "default" : "outline"}
                onClick={() => setSelectedPlan("premium")}
                className="flex items-center gap-2"
              >
                <Gift className="h-4 w-4" />
                Premium
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Free Plan (5%)</div>
              <div className="text-2xl font-bold text-primary flex items-center gap-2 animate-fade-in">
                <DollarSign className="h-6 w-6" />
                {cashback.free.toFixed(2)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Premium Plan (15-20%)</div>
              <div className="text-2xl font-bold text-primary flex items-center gap-2 animate-fade-in">
                <DollarSign className="h-6 w-6" />
                {cashback.premium.toFixed(2)}
              </div>
            </div>
          </div>

          {purchaseAmount && (
            <p className="text-sm text-gray-600 animate-fade-in">
              On a ${parseFloat(purchaseAmount).toFixed(2)} purchase, you will earn ${cashback.free.toFixed(2)} cashback with the Free plan and ${cashback.premium.toFixed(2)} cashback with the Premium plan!
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/signup" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary-light">
              Join Free & Start Earning
            </Button>
          </Link>
          <Link to="/pricing" className="w-full">
            <Button className="w-full" variant="outline">
              Upgrade to Premium
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashbackCalculator;
