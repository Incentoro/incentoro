import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Earnings from "./pages/Earnings";
import Settings from "./pages/Settings";
import Withdrawal from "./pages/Withdrawal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const location = useLocation();
  
  // Only apply dark mode to dashboard and related pages
  const isDashboardRoute = ['/dashboard', '/marketplace', '/earnings', '/settings', '/withdrawal'].includes(location.pathname);

  useEffect(() => {
    if (darkMode && isDashboardRoute) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode, isDashboardRoute]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-white transition-colors duration-200">
            <AppContent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;