import { createClient } from '@supabase/supabase-js';
import {config} from 'dotenv'

config();

export async function AuthenticateToken(req, res, next) {
   
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
   
    const supabaseAuth = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`  
                }
            }
        }
    );
    
    
    const { data, error } = await supabaseAuth.auth.getUser();
    
    if (error || !data.user) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    req.user = data.user;        
    req.supabase = supabaseAuth; 
    
    next();
}