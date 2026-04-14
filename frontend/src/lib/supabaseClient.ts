import { createClient } from '@supabase/supabase-js'

// These will be replaced with your actual keys in the next step
const supabaseUrl = "https://ecwrrzhvgwaumgreerqf.supabase.co"
const supabaseAnonKey = "sb_publishable_6uUipgwW6kSaPcParPZP-g_hxclq4p0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)