import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://auyunzaccsixnnegdusu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eXVuemFjY3NpeG5uZWdkdXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNzI4MzMsImV4cCI6MjA2Njc0ODgzM30.uIH2W6DywpDoaOBaKBClzuKUNh90UKEcQcEH4mloBN4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
