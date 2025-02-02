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
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
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
    <div className="w-full md:w-64 bg-white dark:bg-gray-900 min-h-[calc(100vh-4rem)] md:min-h-screen p-4 transition-colors duration-200 border-r border-gray-200 dark:border-gray-800">
      {!isDashboardRoot && isMobile && (
        <div className="mb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>
      )}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${location.pathname === item.path 
                ? 'bg-primary text-white dark:bg-primary-light' 
                : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-gray-900 dark:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;