import express from "express";
import * as userService from '../services/userService.js'
import { supabase } from "../persistence/supabaseClient.js";



const router = express.Router();

router.post('/',async (req,res) =>{
    try{

        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'No token provided' });
        }

         const { data: user, error } = await supabase.auth.getUser(token);
        if (error || !user) return res.status(401).send({ message: "Invalid token" });

       
        await userService.registerUser(req.body, user.user.id);

        res.status(200).send({message : "Registered successfully"});
    } catch (err){
        res.status(500).send({message: err.message});
    }

})


export default router;