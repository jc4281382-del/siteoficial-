import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.8/+esm'

// Configurações do Supabase
const SUPABASE_URL = 'https://swtdvogwffyvucwirwiu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dGR2b2d3ZmZ5dnVjd2lyd2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzg2ODEsImV4cCI6MjA5MTkxNDY4MX0.vaH25USlvD9wWRWYvy15oVRJxW8S6EX8zrsFFXKQ588';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
