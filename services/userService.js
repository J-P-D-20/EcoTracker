


export async function registerUser(data) {
    const {fname,lname,email,password,city,province} = data;

    if(!fname || !lname || !email || !password || !city || !province) 
        throw new Error("Email and password required")

    //mag add ko diri ug mag check sa db if existing email na iyang gi gamit
    //so need ug query function na mo select ug tanan email kana ra 
}


//ignore logIn sa, focus sa ta sa registration
export async function logIn(data) {
    const {email,password} = data;


    
}