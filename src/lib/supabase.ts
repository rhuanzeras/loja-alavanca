import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Exportação padrão (default) é a mais estável para o Turbopack em singletons
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase