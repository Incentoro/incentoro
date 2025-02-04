import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Globe } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);
  const isDashboardPage = location.pathname.startsWith('/dashboard') || 
                         location.pathname === '/marketplace' || 
                         location.pathname === '/settings' ||
                         location.pathname === '/withdrawal' ||
                         location.pathname === '/earnings';

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error.message);
          return;
        }

        setSession(session);
        
        if (session && ['/signin', '/signup', '/'].includes(location.pathname)) {
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error("Error initializing auth:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      setSession(session);
      
      if (event === 'SIGNED_IN') {
        if (['/signin', '/signup', '/'].includes(location.pathname)) {
          navigate('/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/');
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token has been refreshed');
      } else if (event === 'USER_UPDATED') {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing out",
          description: error.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (isDashboardPage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Incentoro</span>
            </Link>
            {session && (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Incentoro</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthPage && (
              <>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
                <button 
                  onClick={() => {
                    const element = document.getElementById('how-it-works');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('pricing');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Pricing
                </button>
              </>
            )}
            {!session ? (
              <>
                <Link to="/signin">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary text-white hover:bg-primary-light">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;