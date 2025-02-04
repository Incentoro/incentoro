import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShoppingCart, CreditCard, TrendingUp, Shield, Gift, Zap, Star } from "lucide-react";

const Index = () => {
  const upcomingTools = [
    {
      name: "Monday.com",
      description: "Project management and team collaboration platform",
      price: 8,
      cashback: 20,
      category: "Productivity"
    },
    {
      name: "Jasper AI",
      description: "AI-powered content creation and copywriting",
      price: 24,
      cashback: 15,
      category: "AI Tools"
    },
    {
      name: "Semrush",
      description: "All-in-one SEO and content marketing suite",
      price: 119.95,
      cashback: 20,
      category: "Marketing"
    },
    {
      name: "Canva Pro",
      description: "Professional design platform for teams",
      price: 12.99,
      cashback: 15,
      category: "Design"
    },
    {
      name: "ClickUp",
      description: "Project management and productivity platform",
      price: 7,
      cashback: 20,
      category: "Productivity"
    },
    {
      name: "Ahrefs",
      description: "SEO tools and backlink analysis platform",
      price: 99,
      cashback: 15,
      category: "Marketing"
    },
    {
      name: "Grammarly Business",
      description: "AI-powered writing assistant for teams",
      price: 15,
      cashback: 20,
      category: "Productivity"
    },
    {
      name: "Notion",
      description: "All-in-one workspace for notes and collaboration",
      price: 8,
      cashback: 15,
      category: "Productivity"
    },
    {
      name: "Surfer SEO",
      description: "Content optimization and SERP analysis tool",
      price: 59,
      cashback: 20,
      category: "Marketing"
    },
    {
      name: "Midjourney",
      description: "AI image generation platform",
      price: 10,
      cashback: 15,
      category: "AI Tools"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Extraordinary Savings Has Never Been Easier with Incentoro
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
              Thousands of smart shoppers can't be wrong. You can start today. Join the hottest new way to save.
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

      {/* Upcoming Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Upcoming Tools in Our Marketplace</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Preview the premium tools and services you'll have access to. Join now to be notified when these amazing offers become available.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <span className="px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                      {tool.cashback}% Cashback
                    </span>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {tool.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${tool.price}/mo</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary-light">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
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
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
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
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Incentoro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>Secure Transactions</CardTitle>
                <CardDescription>
                  Your payments are protected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bank-level security ensures your transactions are always safe
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Gift className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>Instant Rewards</CardTitle>
                <CardDescription>
                  Get cashback immediately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No waiting periods - earn and withdraw your rewards instantly
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-700">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>Smart Savings</CardTitle>
                <CardDescription>
                  Maximize your benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our platform automatically finds the best cashback rates for you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="dark:bg-gray-700">
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

            <Card className="border-primary dark:bg-gray-700">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "I've saved hundreds of dollars since joining Incentoro. The cashback really adds up!"
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">Premium Member</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-700">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "The premium plan pays for itself with the increased cashback. Highly recommended!"
                </p>
                <div className="font-semibold">John D.</div>
                <div className="text-sm text-gray-500">Premium Member</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-700">
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
            Ready to Transform How You Save?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who are already maximizing their savings with Incentoro's premium cashback platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Your Savings Journey
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