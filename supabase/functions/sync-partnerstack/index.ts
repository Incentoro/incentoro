import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PartnerStackTransaction {
  id: string
  status: string
  amount: number
  commission: number
  customer: {
    email: string
  }
  created_at: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const PARTNERSTACK_API_KEY = Deno.env.get('PARTNERSTACK_API_KEY')
    if (!PARTNERSTACK_API_KEY) {
      throw new Error('PartnerStack API key not found')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch transactions from PartnerStack
    const response = await fetch('https://api.partnerstack.com/v1/transactions', {
      headers: {
        'Authorization': `Bearer ${PARTNERSTACK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`PartnerStack API error: ${response.statusText}`)
    }

    const transactions: PartnerStackTransaction[] = await response.json()
    console.log(`Fetched ${transactions.length} transactions from PartnerStack`)

    // Process each transaction
    for (const transaction of transactions) {
      // Find the user by email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', transaction.customer.email)
        .single()

      if (userError || !userData) {
        console.error(`User not found for email: ${transaction.customer.email}`)
        continue
      }

      // Update or insert the purchase record
      const { error: upsertError } = await supabase
        .from('purchases')
        .upsert({
          user_id: userData.id,
          external_transaction_id: transaction.id,
          affiliate_platform: 'partnerstack',
          external_status: transaction.status,
          amount: transaction.amount,
          cashback_amount: transaction.commission,
          status: transaction.status === 'confirmed' ? 'completed' : 'pending',
          purchased_at: transaction.created_at,
        }, {
          onConflict: 'external_transaction_id,affiliate_platform'
        })

      if (upsertError) {
        console.error(`Error upserting purchase: ${upsertError.message}`)
        continue
      }
    }

    // Trigger the sync function to update statuses
    await supabase.rpc('sync_partnerstack_transactions')

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Processed ${transactions.length} transactions` 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in sync-partnerstack function:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})