import { supabase } from './supabaseClient.js';

// Saves a new calculation to the DB 
export async function saveCalculation(userId, calculationType, inputs, result) {
  try {
    const data = {
      user_id: userId,
      calculation_type: calculationType,
      result: parseFloat(result), 
      ...inputs  
    };

    const { data: insertedData, error } = await supabase
      .from('co2_calculations')
      .insert(data)
      .select()
      .single();  

    if (error) throw new Error(`Failed to save calculation: ${error.message}`);
    return insertedData;
  } catch (err) {
    throw err;
  }
}

// Fetches all calculations for a user
export async function getCalculationsByUser(userId) {
  try {
    const { data, error } = await supabase
      .from('co2_calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });  

    if (error) throw new Error(`Failed to fetch calculations: ${error.message}`);
    return data; 
  } catch (err) {
    throw err;
  }
}

// Calculates the total CO2 footprint for a user 
export async function getTotalFootprint(userId) {
  try {
    const { data, error } = await supabase
      .from('co2_calculations')
      .select('result')
      .eq('user_id', userId);

    if (error) throw new Error(`Failed to calculate footprint: ${error.message}`);
    const total = data.reduce((sum, calc) => sum + parseFloat(calc.result), 0);
    return total.toFixed(2);  // Return as string parehas sa ato service
  } catch (err) {
    throw err;
  }
}

// Update a calculation (if mag add og edit functionality later)
export async function updateCalculation(calculationId, userId, updates) {
  try {
    const { data, error } = await supabase
      .from('co2_calculations')
      .update(updates)
      .eq('id', calculationId)
      .eq('user_id', userId)  // Extra check for security 
      .select()
      .single();

    if (error) throw new Error(`Failed to update calculation: ${error.message}`);
    return data;
  } catch (err) {
    throw err;
  }
}

// Delete a calculation (if mag add ta og delete functionality)
export async function deleteCalculation(calculationId, userId) {
  try {
    const { error } = await supabase
      .from('co2_calculations')
      .delete()
      .eq('id', calculationId)
      .eq('user_id', userId);  // Extra check for security

    if (error) throw new Error(`Failed to delete calculation: ${error.message}`);
    return true;
  } catch (err) {
    throw err;
  }
}

// Calculates the average CO2 footprint for a user 
export async function getAverageFootprint(userId) {
    try {
        // Use Supabase's aggregation to compute the average directly in the query
        const { data, error } = await supabase
            .from('co2_calculations')
           .select('result')  
           .eq('user_id', userId);
        if (error) throw new Error(`Failed to calculate average footprint: ${error.message}`);
        if (!data || data.length === 0) {
           return '0.00';
        }
        // Calculate the average manually since Supabase doesn't have a direct AVG function in JS client
        const total = data.reduce((sum, calc) => sum + parseFloat(calc.result), 0);
        const average = total / data.length;
        return average.toFixed(2);  // Return as string para same again sa service
    } catch (err) {
        throw err;
    }
}

// Fetch only the smallest result for a user
export async function getMinFootprint(userId) {
  try {
    const { data, error } = await supabase
      .from('co2_calculations')
      .select('result')
      .eq('user_id', userId)
      .order('result', { ascending: true })
      .limit(1);

    if (error) throw new Error(`Failed to calculate minimum footprint: ${error.message}`);
    const raw = data && data.length ? data[0].result : null;
    return raw === null ? '0.00' : parseFloat(raw).toFixed(2);
  } catch (err) {
    throw err;
  }
}

// Fetch only the largest result for a user
export async function getMaxFootprint(userId) {
  try {
    const { data, error } = await supabase
      .from('co2_calculations')
      .select('result')
      .eq('user_id', userId)
      .order('result', { ascending: false })
      .limit(1);

    if (error) throw new Error(`Failed to calculate maximum footprint: ${error.message}`);
    const raw = data && data.length ? data[0].result : null;
    return raw === null ? '0.00' : parseFloat(raw).toFixed(2);
  } catch (err) {
    throw err;
  }
}

// Calculates both min and max CO2 footprint
export async function getMinAndMaxFootprint(userId) {
  try {
    const [min, max] = await Promise.all([
      getMinFootprint(userId),
      getMaxFootprint(userId),
    ]);

    return { min, max };
  } catch (err) {
    throw err;
  }
}