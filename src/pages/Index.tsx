import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShoppingCart, CreditCard, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary to-blue-500">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Maximize Your Savings with Incentoro
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
              Join thousands of smart shoppers who earn cashback on every purchase. Start saving today!
            </p>
            <div className="flex justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 animate-scale-in">
                  Start Saving Now
                </Button>
              </Link>
            </div>
            {/* Added Illustration */}
            <div className="mt-12 max-w-4xl mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="Shopping Savings Illustration" 
                className="w-full h-auto rounded-lg shadow-xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <ShoppingCart className="w-12 h-12 text-primary" />
                </div>
                <CardTitle>1. Sign Up</CardTitle>
                <CardDescription>
                  Create your free account in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join Incentoro and get instant access to cashback opportunities
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <CreditCard className="w-12 h-12 text-primary" />
                </div>
                <CardTitle>2. Shop</CardTitle>
                <CardDescription>
                  Browse our marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find the best deals and earn cashback on your purchases
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-primary" />
                </div>
                <CardTitle>3. Earn</CardTitle>
                <CardDescription>
                  Get cashback automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Watch your savings grow with every purchase
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Free Plan</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>5% cashback on all purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Basic marketplace access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Standard support</span>
                  </li>
                </ul>
                <Link to="/signup" className="block mt-6">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Premium Plan</CardTitle>
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                    Popular
                  </span>
                </div>
                <CardDescription>For serious savers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>15-20% cashback on all purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Priority marketplace access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>24/7 Premium support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Exclusive deals and offers</span>
                  </li>
                </ul>
                <Link to="/signup" className="block mt-6">
                  <Button className="w-full bg-primary">Upgrade Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Added Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Incentoro?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Cashback</h3>
                  <p className="text-gray-600">Earn rewards immediately on every eligible purchase</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                  <p className="text-gray-600">Access thousands of products from top retailers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Easy Withdrawals</h3>
                  <p className="text-gray-600">Get your earnings quickly and securely</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Features Illustration" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "I've saved hundreds of dollars since joining Incentoro. The cashback really adds up!"
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">Premium Member</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "The premium plan pays for itself with the increased cashback. Highly recommended!"
                </p>
                <div className="font-semibold">John D.</div>
                <div className="text-sm text-gray-500">Premium Member</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "Easy to use and great customer service. I love watching my savings grow!"
                </p>
                <div className="font-semibold">Emily R.</div>
                <div className="text-sm text-gray-500">Free Member</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Incentoro today and start earning cashback on every purchase.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
