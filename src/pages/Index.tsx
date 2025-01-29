import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LayoutGrid, ShieldCheck, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">
            Maximize Your AI Investment
            <br />
            with Smart Cashback Rewards
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Earn up to 20% cashback on your favorite AI tools and platforms. Join
            thousands of businesses saving smarter.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Start Saving Now
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            How <span className="text-primary">Incentoro</span> Works
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
              <Card key={index} className="p-6 text-center">
                <p className="text-primary mb-4">{item.step}</p>
                <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "$2M+", label: "Cashback Rewarded" },
              { value: "5000+", label: "Active Users" },
              { value: "50+", label: "AI Tools Supported" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses maximizing their AI investments with smart
            cashback rewards.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary text-white">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;