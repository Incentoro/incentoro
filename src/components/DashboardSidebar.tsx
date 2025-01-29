import { Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, History, Settings, LogOut } from "lucide-react";

const DashboardSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" },
    { icon: History, label: "Earnings History", path: "/earnings" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

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
        <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;