import { createClient } from '@supabase/supabase-js';

// Sem o NEXT_PUBLIC_, isso aqui só roda no lado do servidor!
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseKey);