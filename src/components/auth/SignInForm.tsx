
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt to sign in directly without checking profiles first
      const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          toast({
            variant: "destructive",
            title: "Invalid credentials",
            description: "Please check your email and password and try again.",
          });
        } else if (signInError.message.includes("Email not confirmed")) {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email,
          });

          if (resendError) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to resend verification email. Please try signing up again.",
            });
            return;
          }

          toast({
            title: "Email Not Verified",
            description: "We've sent you a new verification email. Please check your inbox and spam folder to verify your email address.",
            duration: 6000,
          });
        } else {
          throw signInError;
        }
      } else {
        // After successful sign in, check if profile exists
        const { data: user } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.user.id)
            .maybeSingle();

          // If profile doesn't exist, create it with a generated username
          if (!profile && user.user) {
            const generatedUsername = email.split('@')[0]; // Generate username from email
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: user.user.id,
                email: email,
                username: generatedUsername,
                full_name: user.user.user_metadata.full_name || null
              });

            if (profileError) {
              console.error("Error creating profile:", profileError);
              // Handle username conflict if it occurs
              if (profileError.message.includes('duplicate key value violates unique constraint')) {
                const randomSuffix = Math.floor(Math.random() * 1000);
                const { error: retryError } = await supabase
                  .from('profiles')
                  .insert({
                    id: user.user.id,
                    email: email,
                    username: `${generatedUsername}${randomSuffix}`,
                    full_name: user.user.user_metadata.full_name || null
                  });
                
                if (retryError) {
                  console.error("Error creating profile with random suffix:", retryError);
                }
              }
            }
          }
        }

        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2 relative">
        <Input
          id="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};
