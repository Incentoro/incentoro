import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  History, 
  Settings, 
  LogOut,
  Download
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="w-64 bg-gray-100 min-h-screen p-4">
      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;