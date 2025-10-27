import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = "https://xvcvwnyvemdtvgextcyd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2Y3Z3bnl2ZW1kdHZnZXh0Y3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NzgwOTYsImV4cCI6MjA3NDI1NDA5Nn0.gCFSaWvVT0FRPOq9WrxrQx-n0BYEd4QrDvxQDOFkx1M";

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

