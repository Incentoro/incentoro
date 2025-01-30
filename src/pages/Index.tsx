import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LayoutGrid, ShieldCheck, Star, DollarSign, Zap, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-primary">
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">
            Maximize Your AI Investment
            <br />
            with Smart Cashback Rewards
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Earn up to 20% cashback on your favorite AI tools and platforms. Join
            thousands of businesses saving smarter.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Saving Now
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "$2M+", label: "Cashback Rewarded", icon: DollarSign },
              { value: "5000+", label: "Active Users", icon: Users },
              { value: "50+", label: "AI Tools Supported", icon: Zap },
            ].map((stat, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg text-text-secondary">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-text-primary">
            How <span className="text-primary">AICashReward</span> Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sign Up for Free",
                description:
                  "Create your account in minutes and start exploring our platform",
                step: "Step 1",
                icon: LayoutGrid,
              },
              {
                title: "Browse the Marketplace",
                description:
                  "Discover a curated selection of AI tools and services.",
                step: "Step 2",
                icon: Star,
              },
              {
                title: "Earn Cashback",
                description:
                  "Get automatic cashback deposits for every tool you use through our platform",
                step: "Step 3",
                icon: ShieldCheck,
              },
            ].map((item, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <p className="text-primary-light mb-4">{item.step}</p>
                <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-text-primary">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for getting started",
                features: [
                  "5% cashback on all purchases",
                  "Basic analytics",
                  "Email support",
                ],
              },
              {
                name: "Pro",
                price: "$29",
                description: "Best for growing businesses",
                features: [
                  "10% cashback on all purchases",
                  "Advanced analytics",
                  "Priority support",
                  "API access",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "20% cashback on all purchases",
                  "Custom analytics",
                  "24/7 phone support",
                  "Dedicated account manager",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 relative ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 text-sm font-semibold rounded-bl">
                    Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-primary mb-4">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg">/mo</span>}
                </div>
                <p className="text-text-secondary mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-text-secondary">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-primary text-white"
                      : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of businesses maximizing their AI investments with smart
            cashback rewards.
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

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default Index;