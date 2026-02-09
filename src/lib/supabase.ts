import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Request = {
  id: string;
  user_id: number;
  username: string;
  type: 'sender' | 'carrier';
  from_city: string;
  to_city: string;
  date: string;
  description?: string;
  weight?: number;
  price?: number;
  created_at: string;
};
