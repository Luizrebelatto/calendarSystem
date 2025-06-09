
import { createClient } from '@supabase/supabase-js'
import apiConfig from '../config/api.config'

export const client = createClient(apiConfig.SUPABASE_URL, apiConfig.SUPABASE_KEY)