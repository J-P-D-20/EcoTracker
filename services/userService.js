
import * as db from '../persistence/userRepository.js'

export async function registerUser(data,userId) {
    const {fname,lname,city,province} = data;

    if(!fname || !lname || !city || !province) 
        throw new Error("all fields are required")

    //const existingEmail = await db.getUserByEmail(email);

    //if(existingEmail) throw new Error("Email already registered");

    try{
         await db.saveUserProfile(userId,fname,lname,city,province)
    return {message : "Registered Successfully"};
    } catch (err) {
        console.error({message : err.message});
        throw new Error("Registration failed", + err.message);
    }

}


//ignore logIn sa, focus sa ta sa registration
export async function logIn(data) {
    try{
        const {email,password} = data;
        const result = await db.signInUser(email,password)
        return result
    } catch (err) {
        console.error({message : err.message});
        throw err;
    }
    
}