
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  email: string;
  toolName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, toolName }: EmailRequest = await req.json();

    if (!email || !toolName) {
      return new Response(
        JSON.stringify({ error: "Email and tool name are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const data = await resend.emails.send({
      from: "Incentoro <notifications@incentoro.com>",
      to: email,
      subject: `Your Cashback for ${toolName} is Being Tracked`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thanks for exploring ${toolName}!</h2>
          <p>We'll credit your cashback if you purchase within the next 30-90 days. You'll see it in your dashboard soon!</p>
          <p>The Incentoro team is monitoring your cashback and will notify you once it's confirmed.</p>
          <p>Happy saving!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
            <p>Incentoro - Earn cashback on your business tools</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
