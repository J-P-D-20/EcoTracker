import express from 'express'

const app = express()
app.use(express.json());








const listen = () => {
    const PORT = 3000;

    app.listen(PORT, () =>{
        console.log(`server is listening to port ${PORT}`);
    })
}


listen();

