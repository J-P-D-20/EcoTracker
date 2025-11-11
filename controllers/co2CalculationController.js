import express from 'express';
import * as calculation from '../services/co2CalculationService.js';


const router = express.Router();


//transportation route
router.post('/transportation', async (req , res) => {
    try{
    const {transportation, distance} = req.body;

    const result = await calculation.transportationCo2Calculation(transportation,distance);
    
    res.json({result :`${result.toFixed(2)} kg`});
    } catch (err){
        res.status(500).json({message : err.message})
    }
})

//energy route
router.post('/energy', async (req,res) =>{
    try{
        const {usage,hours} = req.body;
        
        const result = await calculation.energyCo2Calculation(usage,hours);

        res.json({result :`${result} kg`});
    } catch(err){
        res.status(500).json({message : err.message})

    }
})

//consumption route
router.post('/consumption', async (req,res) => {
    try {
        const {category,type,quantity} = req.body;
        
        const result = await calculation.consumptionCo2Calculation(category,type,quantity)

         res.json({result :`${result} kg`});
    } catch(err) {
        res.status(500).json({message : err.message})
    }
})

//waste route
router.post('/waste', async (req,res) => {
    try {
        const {waste,recycled} = req.body;
        
        const result = await calculation.wasteCo2Calculation(waste,recycled);

         res.json({result :`${result} kg`});
    } catch(err) {
        res.status(500).json({message : err.message})
    }
})

export default router;