import express from 'express';
import * as calculation from '../services/co2CalculationService.js';
import { getAverageFootprint, getTotalFootprint,getMinFootprint,getMaxFootprint } from '../persistence/co2CalculationRepository.js';
import {AuthenticateToken }from '../middleware/authMiddleware.js';
import { getLowestFootprintDay,getHighestFootprintDay,getAccumulatedPercentage } from '../persistence/co2CalculationRepository.js';

const router = express.Router();


//transportation route
router.post('/transportation',AuthenticateToken, async (req , res) => {
    try{
    const userId =  req.user.id
    const {transportation, distance} = req.body;

    const result = await calculation.transportationCo2Calculation(
        req.supabase,
        userId,
        transportation, 
        distance
    );
    
    res.json({result :`${result.toFixed(2)}`});
    } catch (err){
        res.status(500).json({message : err.message})
    }
})

//energy route
router.post('/energy', AuthenticateToken ,async (req,res) =>{
    try{
        const userId = req.user.id;
        const {usage,hours} = req.body;
        
        const result = await calculation.energyCo2Calculation(req.supabase,userId,usage,hours);

        res.json({result :`${result} `});
    } catch(err){
        res.status(500).json({message : err.message})

    }
})

//consumption route
router.post('/consumption',AuthenticateToken, async (req,res) => {
    try {
        const userId = req.user.id;

        const { logs } = req.body; // <-- get logs array from request body
        
        if (!logs || !Array.isArray(logs) || logs.length === 0) {
            return res.status(400).json({ message: "No logs provided" });
        }
        
        const result = await calculation.consumptionCo2Calculation(req.supabase, userId, logs)


         res.json({result :`${result}`});
    } catch(err) {
        res.status(500).json({message : err.message})
    }
})

//waste route
router.post('/waste',AuthenticateToken, async (req,res) => {
    try {
        const userId = req.user.id;
        const {waste,recycled} = req.body;
        
        const result = await calculation.wasteCo2Calculation(req.supabase,userId,waste,recycled);

         res.json({result :`${result}`});
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

 
router.get('/lowestFootprintDay', AuthenticateToken, async (req,res) => {
  try {
    const userId = req.user.id;
    const result = await getLowestFootprintDay(req.supabase, userId);
    res.json({ date: result.date, footprint: result.total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/highestFootprintDay', AuthenticateToken, async (req,res) => {
  try {
    const userId = req.user.id;
    const result = await getHighestFootprintDay(req.supabase, userId);
    res.json({ date: result.date, footprint: result.total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/percentage', AuthenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const percentage = await getAccumulatedPercentage(req.supabase, userId);
    res.json({ percentage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;