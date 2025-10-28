
import * as db from '../persistence/userRepository.js'

export async function registerUser(data) {
    const {fname,lname,email,password,city,province} = data;

    if(!fname || !lname || !email || !password || !city || !province) 
        throw new Error("all fields are required")

    const existingEmail = await db.getUserByEmail(email);

    if(existingEmail) throw new Error("Email already registered");

    await db.addUser(fname,lname,email,password,city,province)


    return {message : "Registered Successfully"};

}


//ignore logIn sa, focus sa ta sa registration
export async function logIn(data) {
    const {email,password} = data;


    
}