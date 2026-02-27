import { createClient } from '@supabase/supabase-js';

// Estas variables leen los datos de tu archivo .env que ya tienes creado
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);