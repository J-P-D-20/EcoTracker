import { getMinFootprint,getMaxFootprint } from "../persistence/co2CalculationRepository.js";
import { getProfile } from "../persistence/userRepository.js";
import express from "express"; 
import { AuthenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();




router.get('/fname',AuthenticateToken, async (req,res) =>{

  try{
    const userId = req.user.id
    const supabaseClient = req.supabase
    const fname = await getProfile(supabaseClient,userId)
    res.json({ fname: fname.fname });
    //console.log('Profile data:', fname);
  } catch (err){
    res.status(500).send({message: err.message});
  }
});


  router.get('/email', AuthenticateToken,async (req,res) =>{

  try{
    const user = req.user

    res.json({ email: user.email });
  } catch (err){
    res.status(500).send({message: err.message});
  }



})
// Route to get both min and max CO2 footprints for the authenticated user
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

export default router