import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && ['/signin', '/signup', '/'].includes(location.pathname)) {
        navigate('/dashboard');
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && ['/signin', '/signup', '/'].includes(location.pathname)) {
        navigate('/dashboard');
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [location.pathname, navigate]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Incentoro" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-primary dark:text-white">Incentoro</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthPage && (
              <>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white">
                  Home
                </Link>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  Pricing
                </button>
              </>
            )}
            <Link to="/signin">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary text-white hover:bg-primary-light dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;