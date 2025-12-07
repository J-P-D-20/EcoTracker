import express from 'express'
import cors from 'cors'
import signUpController from './controllers/signUpController.js';
import signInController from './controllers/signInController.js';
import weatherController from  './controllers/weatherController.js'
import co2CalcuclationController from './controllers/co2CalculationController.js';
import profileController from './controllers/profileController.js';
const app = express()
app.use(express.json());
app.use(cors());


//register
app.use('/register',signUpController );

//log in
app.use('/logIn', signInController);

// weather and air quality
app.use('/weather', weatherController);

//calculations
app.use('/co2', co2CalcuclationController);

//profile
app.use('/profile', profileController);





const listen = () => {
    const PORT = 3000;

    app.listen(PORT, () =>{
        console.log(`server is listening to port ${PORT}`);
    })
}


listen();

