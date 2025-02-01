import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShoppingCart, CreditCard, TrendingUp, Shield, Gift, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary to-blue-500 dark:from-blue-900 dark:to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in dark:text-white">
              Maximize Your Savings with Incentoro
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in dark:text-white/80">
              Join thousands of smart shoppers who earn cashback on every purchase. Start saving today!
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 animate-scale-in">
                  Start Saving Now
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10 animate-scale-in">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <ShoppingCart className="w-12 h-12 text-primary dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-white">1. Sign Up</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Create your free account in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Join Incentoro and get instant access to cashback opportunities
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <CreditCard className="w-12 h-12 text-primary dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-white">2. Shop</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Browse our marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Find the best deals and earn cashback on your purchases
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-primary dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-white">3. Earn</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Get cashback automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Watch your savings grow with every purchase
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Choose Incentoro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-10 h-10 text-primary dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-white">Secure Transactions</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Your payments are protected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bank-level security ensures your transactions are always safe
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Gift className="w-10 h-10 text-primary dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-white">Instant Rewards</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Get cashback immediately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  No waiting periods - earn and withdraw your rewards instantly
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-10 h-10 text-primary dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-white">Smart Savings</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Maximize your benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform automatically finds the best cashback rates for you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">Free Plan</CardTitle>
                <CardDescription className="dark:text-gray-300">Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold dark:text-white">$0</span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
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

            <Card className="border-primary dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl dark:text-white">Premium Plan</CardTitle>
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                    Popular
                  </span>
                </div>
                <CardDescription className="dark:text-gray-300">For serious savers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold dark:text-white">$15</span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "I've saved hundreds of dollars since joining Incentoro. The cashback really adds up!"
                </p>
                <div className="font-semibold dark:text-white">Sarah M.</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Premium Member</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The premium plan pays for itself with the increased cashback. Highly recommended!"
                </p>
                <div className="font-semibold dark:text-white">John D.</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Premium Member</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Easy to use and great customer service. I love watching my savings grow!"
                </p>
                <div className="font-semibold dark:text-white">Emily R.</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Free Member</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Incentoro today and start earning cashback on every purchase.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Get Started Now
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
