import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xatxelcacgnuurwyumdn.supabase.co';
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdHhlbGNhY2dudXVyd3l1bWRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1OTIwNywiZXhwIjoyMDk1NjM1MjA3fQ.8-hSqOAkpFIYY-9-2xyUQxqk7JiZi8iXqiecmDBlotM';

// Admin client bypasses RLS - USE ONLY ON SERVER!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
