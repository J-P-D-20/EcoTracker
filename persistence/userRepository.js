import { supabase } from './supabaseClient.js';

// Fetch all users
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) throw error;
  return data;
}

// Fetch user by email (for login and avoid duplicate registration basta kana)
export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();
  
  if (error) throw error;
  return data;
}

// Add a new user
export async function addUser(fname, lname, email, password, city, province) {
  const { data, error } = await supabase
    .from('users')
    .insert({ fname, lname, email, password, city, province })
    

  if (error) throw error;
  return data;
}

// Update user's city and province if mag allow tag edit option
export async function updateUserLocation(userId, city, province) {
  const { data, error } = await supabase
    .from('users')
    .update({ city, province })
    .eq('id', userId)
    .select();
  
  if (error) throw error;
  return data[0];
}