import express from 'express';
import {config} from 'dotenv'
import {AuthenticateToken }from '../middleware/authMiddleware.js';
import getWeatherData from '../services/weatherService.js';
import { getProfile } from '../persistence/userRepository.js';

config();

const router = express.Router();



router.get('/',  AuthenticateToken, async (req , res) =>{
   
    try{
        const profile = await getProfile(req.supabase, req.user.id);

        if (!profile?.city) {
            return res.status(400).json({ error: "City not found in user profile" });
        }

        const data = await getWeatherData(profile.city);
        res.json(data)
    } catch(err){
        res.status(500).json({error : err.message});
    }

})


export default router;