import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Get all completed cashback transactions from the last 24 hours
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*, profiles(email, full_name)')
      .eq('type', 'cashback')
      .eq('status', 'completed')
      .gte('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    // Send email notifications
    for (const transaction of transactions) {
      const profile = transaction.profiles;
      
      await resend.emails.send({
        from: 'Cashback Updates <notifications@yourdomain.com>',
        to: profile.email,
        subject: 'Your Cashback Has Been Processed!',
        html: `
          <h1>Good news, ${profile.full_name || 'there'}!</h1>
          <p>Your cashback of $${transaction.amount} has been processed and will be available for withdrawal soon.</p>
          <p>Transaction Details:</p>
          <ul>
            <li>Amount: $${transaction.amount}</li>
            <li>Date: ${new Date(transaction.created_at).toLocaleDateString()}</li>
            <li>Description: ${transaction.description}</li>
          </ul>
          <p>Thank you for using our platform!</p>
        `,
      });

      console.log(`Sent cashback notification email to ${profile.email}`);
    }

    return new Response(
      JSON.stringify({ message: 'Notifications sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending notifications:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});