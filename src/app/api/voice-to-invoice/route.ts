import { NextRequest, NextResponse } from 'next/server'

// API temporarily disabled until environment variables are configured
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Voice-to-Invoice API is temporarily disabled',
      message: 'Please configure OPENAI_API_KEY environment variable to enable this feature.'
    },
    { status: 503 }
  )
}
