import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase/client'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = getServiceSupabase()
    
    // Save to database
    const { data: invoice, error: dbError } = await supabase
      .from('invoices')
      .insert({
        customer_name: data.clientName,
        customer_document: data.cpfCnpj,
        gross_amount: data.serviceValue,
        net_amount: data.netValue,
        service_description: data.description,
        status: 'pending',
      })
      .select()
      .single()
    
    if (dbError) throw dbError
    
    return NextResponse.json(invoice)
    
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}
