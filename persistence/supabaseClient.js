import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vzpmliuwlpkbgosimnqh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cG1saXV3bHBrYmdvc2ltbnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1Njc1NzgsImV4cCI6MjA3NzE0MzU3OH0.WjwDUaTowMKp2TKSMQuVaW11nwxA8TEgG6QvjU6wc7U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);