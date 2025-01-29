import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-[#144272]">
            Incentoro
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#144272]">
              Home
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-[#144272]">
              How It Works
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-[#144272]">
              Pricing
            </Link>
            <Link to="/signin">
              <Button variant="outline" className="ml-4">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#144272] hover:bg-[#0A2647] text-white">
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