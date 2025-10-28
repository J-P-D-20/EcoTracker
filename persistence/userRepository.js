import { supabase } from './supabaseClient.js';

export async function signUpUser(email, password, fname, lname, city, province) {
  // Sign up the user in Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) throw signUpError;

  // Sign in immediately to create an active session
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) throw signInError;

  const user = signInData.user;

  // Insert profile using active session (RLS will allow)
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert([{ id: user.id, fname, lname, city, province }])
    .select();

  if (profileError) throw profileError;

  return { user, profile: profileData[0] };
}

// Sign in existing user
export async function signInUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Fetch profile
export async function getProfile(userId) {
  const { data, error } = await supabase
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
