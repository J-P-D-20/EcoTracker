import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kzrwieaxknzfcufnbqnc.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cndpZWF4a256ZmN1Zm5icW5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTYyNjQ0MCwiZXhwIjoyMDc3MjAyNDQwfQ._oJatNz_7rtjwJRVNbVo1lK7VU2xR6YsntPwLeE80cE';

export const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
