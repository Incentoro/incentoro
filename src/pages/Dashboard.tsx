import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome, User</h1>
        </div>
        
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Total Cashback Balance</h2>
          <p className="text-4xl font-bold text-primary">$0.00</p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No earnings data yet
          </div>
        </Card>

        <Card className="p-6 bg-primary text-white">
          <h2 className="text-xl font-semibold mb-2">Upgrade to Premium Plan</h2>
          <p className="mb-4">
            Get 20% cashback on all purchases and exclusive benefits!
          </p>
          <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Upgrade Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;