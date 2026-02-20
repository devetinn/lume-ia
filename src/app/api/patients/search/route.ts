import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase/client'

// GET /api/patients/search?q=query - Smart autocomplete search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ patients: [] })
    }
    
    const supabase = getServiceSupabase()
    
    // Call the search_patients function
    const { data: patients, error } = await supabase
      .rpc('search_patients', { 
        search_query: query.trim() 
      })
    
    if (error) throw error
    
    return NextResponse.json({ patients })
  } catch (error) {
    console.error('Error searching patients:', error)
    return NextResponse.json(
      { error: 'Failed to search patients' },
      { status: 500 }
    )
  }
}
