
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShoppingCart, CreditCard, TrendingUp, Shield, Gift, Zap, Star, Info, ArrowDown, ArrowUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

const Index = () => {
  const [showAllTools, setShowAllTools] = useState(false);
  
  const upcomingTools = [
    {
      name: "Monday.com",
      description: "Project management and team collaboration platform",
      detailedDescription: "Monday.com is a versatile work OS that enables teams to build custom workflows, manage projects, and track everything in one place. Features include timeline views, automation, integrations, and real-time collaboration tools.",
      price: 8,
      cashback: {
        free: 5,
        premium: 20
      },
      category: "Productivity"
    },
    {
      name: "Jasper AI",
      description: "AI-powered content creation and copywriting",
      detailedDescription: "Jasper AI is an advanced AI writing assistant that helps create high-quality content for blogs, social media, and marketing materials. It uses GPT technology to generate human-like text and supports multiple languages.",
      price: 24,
      cashback: {
        free: 5,
        premium: 15
      },
      category: "AI Tools"
    },
    {
      name: "Semrush",
      description: "All-in-one SEO and content marketing suite",
      detailedDescription: "Semrush provides comprehensive SEO tools for keyword research, competitor analysis, site audits, and content optimization. It helps improve search rankings and track marketing campaign performance.",
      price: 119.95,
      cashback: {
        free: 5,
        premium: 20
      },
      category: "Marketing"
    },
    {
      name: "Canva Pro",
      description: "Professional design platform for teams",
      detailedDescription: "Canva Pro offers premium design features including Brand Kit, background remover, unlimited storage, and access to millions of premium stock photos and elements. Perfect for creating professional marketing materials.",
      price: 12.99,
      cashback: {
        free: 5,
        premium: 15
      },
      category: "Design"
    },
    {
      name: "ClickUp",
      description: "Project management and productivity platform",
      detailedDescription: "ClickUp combines project management, document collaboration, and task tracking in one platform. Features include custom views, time tracking, and workflow automation.",
      price: 7,
      cashback: {
        free: 5,
        premium: 20
      },
      category: "Productivity"
    },
    {
      name: "Ahrefs",
      description: "SEO tools and backlink analysis platform",
      detailedDescription: "Ahrefs is a comprehensive SEO toolset for backlink analysis, keyword research, competitor research, and rank tracking. It helps optimize websites and improve search engine rankings.",
      price: 99,
      cashback: {
        free: 5,
        premium: 15
      },
      category: "Marketing"
    },
    {
      name: "Grammarly Business",
      description: "AI-powered writing assistant for teams",
      detailedDescription: "Grammarly Business helps teams write consistently and professionally with advanced grammar checking, style suggestions, and tone adjustments. Includes team features and analytics.",
      price: 15,
      cashback: {
        free: 5,
        premium: 20
      },
      category: "Productivity"
    },
    {
      name: "Notion",
      description: "All-in-one workspace for notes and collaboration",
      detailedDescription: "Notion combines notes, documents, wikis, and project management in one platform. Features include customizable templates, real-time collaboration, and powerful database capabilities.",
      price: 8,
      cashback: {
        free: 5,
        premium: 15
      },
      category: "Productivity"
    },
    {
      name: "Surfer SEO",
      description: "Content optimization and SERP analysis tool",
      detailedDescription: "Surfer SEO provides data-driven content optimization suggestions based on top-ranking pages. Features include content editor, SERP analyzer, and keyword research tools.",
      price: 59,
      cashback: {
        free: 5,
        premium: 20
      },
      category: "Marketing"
    },
    {
      name: "Midjourney",
      description: "AI image generation platform",
      detailedDescription: "Midjourney is an advanced AI art generator that creates high-quality images from text descriptions. Perfect for creating unique visuals for marketing, design, and creative projects.",
      price: 10,
      cashback: {
        free: 5,
        premium: 15
      },
      category: "AI Tools"
    },
    {
      name: "Claude AI",
      description: "Advanced AI language model for business",
      detailedDescription: "Claude AI is a sophisticated language model that excels at analysis, writing, and coding. It offers enhanced security features and specialized knowledge for business applications.",
      price: 20,
      cashback: {
        free: 5,
        premium: 20
      },
      category: "AI Tools"
    },
    {
      name: "Stable Diffusion",
      description: "Enterprise AI image generation platform",
      detailedDescription: "Stable Diffusion is a powerful AI image generation tool for businesses. It offers high-resolution output, custom model training, and API access for integration into existing workflows.",
      price: 25,
      cashback: {
        free: 5,
        premium: 15
      },
      category: "AI Tools"
    }
  ];

  const displayedTools = showAllTools ? upcomingTools : upcomingTools.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 gradient-text animate-float">
              Extraordinary Savings Has Never Been Easier with Incentoro
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in">
              Thousands of smart shoppers can't be wrong. Start maximizing your savings today.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all duration-300 premium-shadow">
                  Start Saving Now
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tools Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 gradient-text">
            Premium Tools in Our Marketplace
          </h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Access exclusive premium tools and services. Join now to unlock amazing offers.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTools.map((tool, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 h-full">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white truncate">{tool.name}</CardTitle>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                          <Info className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="glass-card border-none text-white w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{tool.name}</h4>
                          <p className="text-sm text-white/80 break-words">{tool.detailedDescription}</p>
                          <div className="pt-2">
                            <h5 className="font-semibold text-sm">Cashback Rates:</h5>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-400" />
                                <span>Free Plan: {tool.cashback.free}% cashback</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span>Premium Plan: {tool.cashback.premium}% cashback</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <CardDescription className="text-white/60">
                    {tool.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">${tool.price}/mo</span>
                    <div className="flex items-center text-yellow-400">
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
          
          <div className="text-center mt-8">
            {upcomingTools.length > 3 && (
              <Button
                onClick={() => setShowAllTools(!showAllTools)}
                variant="outline"
                className="glass-card text-white gap-2 hover:bg-white/20"
              >
                {showAllTools ? (
                  <>
                    Show Less <ArrowUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More <ArrowDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 premium-shadow">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 gradient-text">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white">1. Sign Up</CardTitle>
                <CardDescription className="text-white/60">
                  Create your free account in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Join Incentoro and get instant access to cashback opportunities
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white">2. Shop</CardTitle>
                <CardDescription className="text-white/60">
                  Browse our marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Find the best deals and earn cashback on your purchases
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white">3. Earn</CardTitle>
                <CardDescription className="text-white/60">
                  Get cashback automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Watch your savings grow with every purchase
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 gradient-text">Why Choose Incentoro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white">Secure Transactions</CardTitle>
                <CardDescription className="text-white/60">
                  Your payments are protected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Bank-level security ensures your transactions are always safe
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white">Instant Rewards</CardTitle>
                <CardDescription className="text-white/60">
                  Get cashback immediately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  No waiting periods - earn and withdraw your rewards instantly
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white">Smart Savings</CardTitle>
                <CardDescription className="text-white/60">
                  Maximize your benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Our platform automatically finds the best cashback rates for you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 gradient-text">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Free Plan</CardTitle>
                <CardDescription className="text-white/60">Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-white/60">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">5% cashback on all purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">Basic marketplace access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">Standard support</span>
                  </li>
                </ul>
                <Link to="/signup" className="block mt-6">
                  <Button className="w-full bg-gradient-primary hover:opacity-90">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 transition-all duration-300 relative">
              <div className="absolute -top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-gradient-primary rounded-full">
                Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Premium Plan</CardTitle>
                <CardDescription className="text-white/60">For serious savers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$15</span>
                  <span className="text-white/60">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">15-20% cashback on all purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">Priority marketplace access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">24/7 Premium support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">Exclusive deals and offers</span>
                  </li>
                </ul>
                <Link to="/signup" className="block mt-6">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 premium-shadow">Upgrade Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 gradient-text">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <p className="text-white/80 mb-4">
                  "I've saved hundreds of dollars since joining Incentoro. The cashback really adds up!"
                </p>
                <div className="font-semibold text-white">Sarah M.</div>
                <div className="text-sm text-white/60">Premium Member</div>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <p className="text-white/80 mb-4">
                  "The premium plan pays for itself with the increased cashback. Highly recommended!"
                </p>
                <div className="font-semibold text-white">John D.</div>
                <div className="text-sm text-white/60">Premium Member</div>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <p className="text-white/80 mb-4">
                  "Easy to use and great customer service. I love watching my savings grow!"
                </p>
                <div className="font-semibold text-white">Emily R.</div>
                <div className="text-sm text-white/60">Free Member</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 gradient-text">
            Ready to Transform How You Save?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who are already maximizing their savings with Incentoro's premium cashback platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 premium-shadow transition-all duration-300">
                Start Your Savings Journey
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="outline" className="glass-card text-white hover:bg-white/20 transition-all duration-300">
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
