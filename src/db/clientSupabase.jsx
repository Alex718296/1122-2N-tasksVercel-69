import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SPABASE_URL,
    import.meta.env.VITE_SPABASE_ANON_KEY
);