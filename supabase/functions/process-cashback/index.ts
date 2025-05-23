
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const handler = async (_req: Request): Promise<Response> => {
  try {
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all pending transactions where cookie period has ended
    const { data: transactions, error: fetchError } = await supabase
      .from("transactions")
      .select(`
        *,
        profiles (email),
        marketplace_tools:source_transaction_id (name)
      `)
      .eq("status", "pending")
      .lte("cookie_period_end", new Date().toISOString());

    if (fetchError) throw fetchError;

    console.log(`Processing ${transactions?.length || 0} completed transactions`);

    // Process each transaction
    for (const transaction of transactions || []) {
      try {
        // Update transaction status to confirmed
        const { error: updateError } = await supabase
          .from("transactions")
          .update({ status: "confirmed" })
          .eq("id", transaction.id);

        if (updateError) throw updateError;

        // Send confirmation email
        if (transaction.profiles?.email) {
          await resend.emails.send({
            from: "Incentoro <notifications@incentoro.com>",
            to: transaction.profiles.email,
            subject: "Your Cashback is Ready!",
            html: `
              <h1>Your Cashback is Ready!</h1>
              <p>Great news! Your cashback of $${transaction.amount} has been confirmed and added to your balance.</p>
              <p>You can now withdraw it from your dashboard.</p>
              <p>Thank you for using Incentoro!</p>
            `,
          });
        }

        console.log(`Processed transaction ${transaction.id} successfully`);
      } catch (error) {
        console.error(`Error processing transaction ${transaction.id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ message: "Cashback processing completed" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in process-cashback function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
