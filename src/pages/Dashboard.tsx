import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

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
          <h1 className="text-2xl font-bold">Welcome, User</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-10 w-10"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        
        <Card className="mb-8 p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Total Cashback Balance</h2>
          <p className="text-4xl font-bold text-primary">$0.00</p>
        </Card>

        <Card className="mb-8 p-6 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Marketplace</h2>
          <p className="text-gray-500">No products available yet</p>
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