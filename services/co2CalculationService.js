
import * as db from '../persistence/co2CalculationRepository.js'

export async function transportationCo2Calculation(supabaseClient,userID,transportation, distance) {
  try {
    const transportData = [
      ['Small Car', 0.120],
      ['Medium Car', 0.180],
      ['Large Car', 0.250],
      ['Diesel Car', 0.200],
      ['Hybrid Car', 0.090],
      ['Electric Car', 0.050],
      ['Bus', 0.105],
      ['Jeepney', 0.130],
      ['Train', 0.041],
      ['MotorCycle', 0.090]
    ];

    const [, emission] = transportData.find(([t]) => t === transportation);
    const result = emission * distance;

    const savedData = await db.saveCalculation(
        supabaseClient,
         userID,
        'transportation',{
            transportation: transportation,
            distance: distance
        },
         result);

    return result

  } catch (err) {
    throw err;
  }
}


export async function energyCo2Calculation(supabaseClient,userID,usage,hours){
    try{
        let result;
        switch(usage){
            case 'Light Usage' :
                result = (hours * 0.8 * 0.55).toFixed(2);
            break;

            case 'Average Usage' :
                result = (hours * 1.2 * 0.55).toFixed(2);
            break;

            case 'Heavy Usage' :
                result = (hours * 2.0 * 0.55).toFixed(2);
            break;
        }
        
        const savedData = await db.saveCalculation(
            supabaseClient,
            userID,
            'energy',{
                usage: usage,
                hours: hours
            },
            result);
            
        return parseFloat(result);
    } catch (err) {
        throw err;
    }
}



export async function consumptionCo2Calculation(supabaseClient, userID, logs) {
    try {
        let totalResult = 0;

        const foodCategory = [
            ['Heavy Meat', 5.0],
            ['Mixed', 3.0],
            ['Vegetarian', 2.0],
            ['Vegan', 1.5]
        ];
        const goodsCategory = [
            ['Clothing', 25],
            ['Electronics', 100],
            ['Furniture', 200],
            ['Groceries', 10],
            ['Miscellaneous', 5]
        ];

        // Ensure logs is always an array
        if (!Array.isArray(logs)) logs = [logs];

        for (const log of logs) {
            const { category, type, quantity } = log;
            let result = 0;

            if (category === 'Food') {
                const found = foodCategory.find(([t]) => t === type);
                if (!found) throw new Error(`Invalid Food type: ${type}`);
                result = found[1] * quantity;
            } else if (category === 'Goods') {
                const found = goodsCategory.find(([t]) => t === type);
                if (!found) throw new Error(`Invalid Goods type: ${type}`);
                result = found[1] * quantity;
            } else {
                throw new Error(`Invalid category: ${category}`);
            }

            // Save each calculation to DB
            await db.saveCalculation(
                supabaseClient,
                userID,
                'consumption',
                { category, type, quantity },
                result
            );

            totalResult += result;
        }

        return totalResult;

    } catch (err) {
        throw err;
    }
}


export async function wasteCo2Calculation(supabaseClient,userID,waste,recycled ='false'){
    try{
        let result
        if(recycled){
            result = waste * 1.8;
        }else{
            result = waste * 0.10;
        }
        
        const savedData = await db.saveCalculation(
            supabaseClient,
            userID,
            'waste',{
                waste: waste,
                recycled: recycled
            },
            result);

        return result;
    } catch(err){
        throw err;
    }
}

