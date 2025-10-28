import express from "express";
import * as userService from '../services/userService.js'


const router = express.Router();



router.post('/',async (req,res) =>{
    try{
        const data = req.body;
        console.log("Incoming data:", data);
        await userService.registerUser(data);
        console.log(data);
        res.status(200).send({message : "Registered Successfully"});
    } catch (err){
        res.status(500).send({message: err.message});
    }

})


export default router;