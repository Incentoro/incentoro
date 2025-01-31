import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

const Withdrawal = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Withdrawal</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0.00</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Download className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No withdrawal history available</p>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" disabled>
          Withdraw Funds
        </Button>
      </div>
    </div>
  );
};

export default Withdrawal;