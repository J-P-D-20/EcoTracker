import { config } from 'dotenv';
config();

const apiKey = process.env.API_KEY;



export default async function getWeatherData(city){
    
    try{
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const weatherObject = await weatherRes.json();

        if(weatherObject.cod !== 200){
            throw new Error (weatherObject.message);
        }

        const {lon,lat} = weatherObject.coord;
        const airRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const airObject = await airRes.json();

         const aqi = airObject.list[0].main.aqi;

         let airStatus;
        switch(aqi){

        case 1: 
            airStatus = 'Good'
        break;

        case 2: 
            airStatus = 'Fair'
        break;

        case 3:
            airStatus = 'Moderate'
        break;

        case 4: 
            airStatus = 'Poor'
        break;
        
        case 5:
            airStatus = 'Very Poor'
        break;

        default :
            airStatus = 'N/A';
    }

    return {
    city: weatherObject.name,
    temp: weatherObject.main.temp,
    description: weatherObject.weather[0].description,
    aqi,
    airStatus,
  };

    } catch (err) {
       throw err
    }
}