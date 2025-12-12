
import * as db from '../persistence/userRepository.js'

export async function registerUser(data,userId) {
    const {fname,lname,city,province} = data;

    if(!fname || !lname || !city || !province) 
        throw new Error("all fields are required")

    try{
         await db.saveUserProfile(userId,fname,lname,city,province)
    return {message : "Registered Successfully"};
    } catch (err) {
        console.error({message : err.message});
        throw new Error("Registration failed", + err.message);
    }

}
