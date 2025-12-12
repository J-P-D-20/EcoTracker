function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Saves a new calculation to the DB 
export async function saveCalculation(supabaseClient,userId, calculationType, inputs, result) {
  try {
    const data = {
      user_id: userId,
      calculation_type: calculationType,
      result: parseFloat(result), 
      ...inputs  
    };

    const { data: insertedData, error } = await supabaseClient
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

/* Fetches all calculations for a user
export async function getCalculationsByUser(supabaseClient,userId) {
  try {
    const { data, error } = await supabaseClient
      .from('co2_calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });  

    if (error) throw new Error(`Failed to fetch calculations: ${error.message}`);
    return data; 
  } catch (err) {
    throw err;
  }
}*/

// Calculates the total CO2 footprint for a user 
export async function getTotalFootprint(supabaseClient,userId) {
  try {
    const { data, error } = await supabaseClient
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

/*Update a calculation (if mag add og edit functionality later)
export async function updateCalculation(supabaseClient, calculationId, userId, updates) {
  try {
    const { data, error } = await supabaseClient
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
}*/

/* Delete a calculation (if mag add ta og delete functionality)
export async function deleteCalculation(supabaseClient, calculationId, userId) {
  try {
    const { error } = await supabaseClient
      .from('co2_calculations')
      .delete()
      .eq('id', calculationId)
      .eq('user_id', userId);  // Extra check for security

    if (error) throw new Error(`Failed to delete calculation: ${error.message}`);
    return true;
  } catch (err) {
    throw err;
  }
}*/

// Calculates the average CO2 footprint for a user 
export async function getAverageFootprint(supabaseClient,userId) {
    try {
        // Use Supabase's aggregation to compute the average directly in the query
        const { data, error } = await supabaseClient
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
export async function getMinFootprint(supabaseClient,userId) {
  try {
    const { data, error } = await supabaseClient
      .from('co2_calculations')
      .select('result, calculation_type, created_at')
      .eq('user_id', userId)
      .order('result', { ascending: true })
      .limit(1);

    if (error) throw new Error(`Failed to calculate minimum footprint: ${error.message}`);
    if (!data || !data.length) {
      return { result: '0.00', calculation_type: null, created_at: null };
    }
    return {
      result: parseFloat(data[0].result).toFixed(2),
      calculation_type: data[0].calculation_type,
      created_at: formatDate(data[0].created_at)
    };
  } catch (err) {
    throw err;
  }
}

// Fetch only the largest result for a user
export async function getMaxFootprint(supabaseClient,userId) {
  try {
    const { data, error } = await supabaseClient
      .from('co2_calculations')
      .select('result, calculation_type, created_at')
      .eq('user_id', userId)
      .order('result', { ascending: false })
      .limit(1);

    if (error) throw new Error(`Failed to calculate maximum footprint: ${error.message}`);
    if (!data || !data.length) {
      return { result: '0.00', calculation_type: null, created_at: null };
    }
    return {
      result: parseFloat(data[0].result).toFixed(2),
      calculation_type: data[0].calculation_type,
      created_at: formatDate(data[0].created_at)
    };
  } catch (err) {
    throw err;
  }
}

/*Calculates both min and max CO2 footprint
export async function getMinAndMaxFootprint(supabaseClient, userId) {
  try {
    const [min, max] = await Promise.all([
      getMinFootprint(supabaseClient, userId),
      getMaxFootprint(supabaseClient, userId),
    ]);

    return { min, max };
  } catch (err) {
    throw err;
  }
}*/

export async function getHighestFootprintDay(supabaseClient, userId) {
  try {
    const { data, error } = await supabaseClient
      .from("co2_calculations")
      .select(`result, created_at`)
      .eq("user_id", userId);

    if (error) throw new Error(`Failed to fetch daily totals: ${error.message}`);
    if (!data || data.length === 0) {
      return { date: null, total: "0.00" };
    }

    // Group by DATE and sum totals
    const dailyTotals = {};

    for (const entry of data) {
      const day = entry.created_at.split("T")[0]; // YYYY-MM-DD
      const result = parseFloat(entry.result) || 0;

      if (!dailyTotals[day]) dailyTotals[day] = 0;
      dailyTotals[day] += result;
    }

    // Find the day with the highest total
    let highestDate = null;
    let highestTotal = 0;

    for (const date of Object.keys(dailyTotals)) {
      if (dailyTotals[date] > highestTotal) {
        highestTotal = dailyTotals[date];
        highestDate = date;
      }
    }

    return {
      date: formatDate(highestDate),
      total: highestTotal.toFixed(2)
    };

  } catch (err) {
    throw err;
  }
}

export async function getLowestFootprintDay(supabaseClient, userId) {
  try {
    const { data, error } = await supabaseClient
      .from("co2_calculations")
      .select("result, created_at")
      .eq("user_id", userId);

    if (error) throw new Error(`Failed to fetch daily totals: ${error.message}`);
    if (!data || data.length === 0) {
      return { date: null, total: "0.00" };
    }

    // Group results by day
    const dailyTotals = {};

    for (const entry of data) {
      const day = entry.created_at.split("T")[0]; // "YYYY-MM-DD"
      const result = parseFloat(entry.result) || 0;

      if (!dailyTotals[day]) dailyTotals[day] = 0;
      dailyTotals[day] += result;
    }

    // Find the day with the lowest total
    let lowestDate = null;
    let lowestTotal = Infinity;

    for (const date of Object.keys(dailyTotals)) {
      if (dailyTotals[date] < lowestTotal) {
        lowestTotal = dailyTotals[date];
        lowestDate = date;
      }
    }

    return {
      date: formatDate(lowestDate),
      total: lowestTotal.toFixed(2)
    };

  } catch (err) {
    throw err;
  }
}


export async function getAccumulatedPercentage(supabaseClient, userId, dailyLimit = 50) {
  try {
    const { data, error } = await supabaseClient
      .from("co2_calculations")
      .select("result, created_at")
      .eq("user_id", userId);

    if (error) throw new Error(`Failed to fetch calculations: ${error.message}`);
    if (!data || data.length === 0) return 0;

    // Sum today's results
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    let totalToday = 0;

    for (const entry of data) {
      const day = entry.created_at.split("T")[0];
      if (day === today) {
        totalToday += parseFloat(entry.result) || 0;
      }
    }

    // Calculate percentage of daily limit
    const percentage = Math.min((totalToday / dailyLimit) * 100, 100).toFixed(2);

    return percentage;

  } catch (err) {
    throw err;
  }
}

