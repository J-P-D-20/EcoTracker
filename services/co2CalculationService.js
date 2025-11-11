
export async function transportationCo2Calculation(transportation, distance) {
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

    return result;

  } catch (err) {
    throw err;
  }
}


export async function energyCo2Calculation(usage,hours){
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
        return result;
    } catch (err) {
        throw err;
    }
}



export async function consumptionCo2Calculation(category,type,quantity){
    try{
        let result;
        const foodCategory = [
            ['Heavy Meat', 5.0],
            ['Mixed', 3.0],
            ['Vegetarian', 2.0],
            ['Vegan', 1.5]
        ]
        const goodsCatgory = [
            ['Clothing', 25],
            ['Electronics', 100],
            ['Furniture', 200],
            ['Groceries', 10],
            ['Miscellaneous', 5]
        ];

        if(category === 'Food'){
            const [,emission] = foodCategory.find(([t]) => t === type)
            result = emission * quantity
        }else if(category === 'Good'){
            const [,emission] = goodsCatgory.find(([t]) => t === type)
            result = emission * quantity
        }

        return result;
    } catch (err) {
        throw err;
    }
}


export async function wasteCo2Calculation(waste,recycled ='false'){
    try{
        let result
        if(recycled){
            result = waste * 1.8;
        }else{
            result = waste * 0.10;
        }

        return result;
    } catch(err){
        throw err;
    }
}

