import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kzrwieaxknzfcufnbqnc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cndpZWF4a256ZmN1Zm5icW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MjY0NDAsImV4cCI6MjA3NzIwMjQ0MH0.sbqC8XmwT4pWJ97-ISUzHhtgNDkPcSZDWHdWZvqwP30';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
