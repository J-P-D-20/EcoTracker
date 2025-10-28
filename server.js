import express from 'express'
import userController from './controllers/userController.js';

const app = express()
app.use(express.json());



app.use('/register',userController);




const listen = () => {
    const PORT = 3000;

    app.listen(PORT, () =>{
        console.log(`server is listening to port ${PORT}`);
    })
}


listen();

