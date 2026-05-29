import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xatxelcacgnuurwyumdn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdHhlbGNhY2dudXVyd3l1bWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTkyMDcsImV4cCI6MjA5NTYzNTIwN30.XDf8iy7c3Xc-42iXTKjE9B4IShtSCojCQQ8jvbuolDI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
