import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  History, 
  Settings, 
  LogOut,
  Download,
  ArrowLeft
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isDashboardRoot = location.pathname === "/dashboard";

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" },
    { icon: History, label: "Earnings History", path: "/earnings" },
    { icon: Download, label: "Withdrawal", path: "/withdrawal" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully signed out",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4 dark:bg-gray-900 dark:text-white">
      {!isDashboardRoot && (
        <Button
          variant="ghost"
          className="mb-4 w-full flex items-center gap-2 hover:bg-primary hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      )}
      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors dark:hover:bg-primary-light"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors w-full dark:hover:bg-primary-light"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;