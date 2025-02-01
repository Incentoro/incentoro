import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const PasswordReset = ({ email }: { email: string }) => {
  const [resetEmailSentAt, setResetEmailSentAt] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }

    if (resetEmailSentAt) {
      const waitTimeMs = 60000; // 60 seconds
      const timeSinceLastSend = Date.now() - resetEmailSentAt.getTime();
      
      if (timeSinceLastSend < waitTimeMs) {
        const remainingSeconds = Math.ceil((waitTimeMs - timeSinceLastSend) / 1000);
        toast({
          variant: "destructive",
          title: "Please wait",
          description: `You can request another reset email in ${remainingSeconds} seconds.`,
        });
        return;
      }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetEmailSentAt(new Date());
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      if (error.message.includes("over_email_send_rate_limit")) {
        toast({
          variant: "destructive",
          title: "Too many requests",
          description: "Please wait a minute before requesting another reset email.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleResetPassword}
      className="text-sm text-primary"
    >
      Forgot password?
    </Button>
  );
};