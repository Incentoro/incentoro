import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = ['/signin', '/signup', '/dashboard'].includes(location.pathname);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Incentoro
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthPage && (
              <>
                <Link to="/" className="text-text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Pricing
                </button>
              </>
            )}
            <Link to="/signin">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-primary text-white hover:opacity-90">
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