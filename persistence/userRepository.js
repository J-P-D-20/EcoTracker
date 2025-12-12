import { supabase } from './supabaseClient.js';


export async function saveUserProfile(id, fname, lname, city, province) {
    const { data, error } = await supabase
        .from('profiles')
        .insert([{ id, fname, lname, city, province }])
        .select();

    if (error) {
       console.error("Supabase insert error:", error);
      throw error;
    }
    return data[0];
}


// Fetch profile
export async function getProfile(supabaseClient,userId) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

// Update profile
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  if (error) throw error;
  return data[0];
}
