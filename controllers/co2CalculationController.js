import express from 'express';
import * as calculation from '../services/co2CalculationService.js';
import { getAverageFootprint, getTotalFootprint,getMinFootprint,getMaxFootprint } from '../persistence/co2CalculationRepository.js';
import {AuthenticateToken }from '../middleware/authMiddleware.js';

const router = express.Router();


//transportation route
router.post('/transportation',AuthenticateToken, async (req , res) => {
    try{
    const userid =  req.user.id
    const {transportation, distance} = req.body;

    const result = await calculation.transportationCo2Calculation(
        req.supabase,
        userid,
        transportation,
        distance
    );
    
    res.json({result :`${result.toFixed(2)} kg`});
    } catch (err){
        res.status(500).json({message : err.message})
    }
})

//energy route
router.post('/energy', AuthenticateToken ,async (req,res) =>{
    try{
        const userid = req.user.id;
        const {usage,hours} = req.body;
        
        const result = await calculation.energyCo2Calculation(req.supabase,userid,usage,hours);

        res.json({result :`${result} kg`});
    } catch(err){
        res.status(500).json({message : err.message})

    }
})

//consumption route
router.post('/consumption',AuthenticateToken, async (req,res) => {
    try {
        const userid = req.user.id;
        const {category,type,quantity} = req.body;
        
        const result = await calculation.consumptionCo2Calculation(req.supabase,userid,category,type,quantity)

         res.json({result :`${result} kg`});
    } catch(err) {
        res.status(500).json({message : err.message})
    }
})

//waste route
router.post('/waste',AuthenticateToken, async (req,res) => {
    try {
        const userid = req.user.id;
        const {waste,recycled} = req.body;
        
        const result = await calculation.wasteCo2Calculation(req.supabase,userid,waste,recycled);

         res.json({result :`${result} kg`});
    } catch(err) {
        res.status(500).json({message : err.message})
    }
})

// CO2 average route
router.get('/average',AuthenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;  
        const average = await getAverageFootprint(req.supabase,userId);
        res.json({ average: `${average}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//total footprint route
router.get('/total',AuthenticateToken, async (req,res) => {
    try {
        const userId = req.user.id;
        const total = await getTotalFootprint(req.supabase,userId);
        res.json({ total: `${total}` });
    } catch (err) { 
        res.status(500).json({ message: err.message });
    } 
});

 
router.get('/footprints/min', AuthenticateToken, async (req, res) => {
  try {                 
    const userId = req.user.id;
    const min = await getMinFootprint(req.supabase, userId);
    res.json({ min });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get('/footprints/max', AuthenticateToken, async (req, res) => {
  try {                 
    const userId = req.user.id; 
    const max = await getMaxFootprint(req.supabase, userId);
    res.json({ max });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;