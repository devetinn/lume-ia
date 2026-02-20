import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase/client'

// GET /api/patients - List all patients for authenticated doctor
export async function GET() {
  try {
    const supabase = getServiceSupabase()
    
    const { data: patients, error } = await supabase
      .from('patients')
      .select('*')
      .eq('is_active', true)
      .order('full_name', { ascending: true })
    
    if (error) throw error
    
    return NextResponse.json({ patients })
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    )
  }
}

// POST /api/patients - Create new patient
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = getServiceSupabase()
    
    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        full_name: body.full_name,
        cpf: body.cpf,
        email: body.email,
        phone: body.phone,
        street: body.street,
        number: body.number,
        complement: body.complement,
        neighborhood: body.neighborhood,
        city: body.city,
        state: body.state,
        zip_code: body.zip_code,
        notes: body.notes,
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ patient }, { status: 201 })
  } catch (error) {
    console.error('Error creating patient:', error)
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    )
  }
}
