import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'


//Login user

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.find({email});
        if(user.length===0){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch=await bcrypt.compare(password,user[0].password);/*Hash Storage: When you hash a password using bcrypt.hash(password, salt), the resulting hash contains the salt used to create it. This hash is a combination of the salt and the hashed password. Compare Function: The bcrypt.compare function takes the plain text password and the stored hash (which includes the salt) and performs the following steps:
        1. Extracts the salt from the stored hash.
        2. Uses this extracted salt to hash the plain text password.
        3. Compares the newly generated hash with the stored hash. */

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"});
        }
        const token=createToken(user[0]._id);
        return res.json({success:true,token})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}




//create Token

const createToken=(id)=>{
    const x=jwt.sign({id},process.env.JWT_SECRET);
    console.log(x);
    return jwt.sign({id},process.env.JWT_SECRET);
    // return jwt.sign({id},process.env.JWT_SECRET);
}






//register user
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try {

        //checking is user already exist
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //  hashing user password
        const salt=await bcrypt.genSalt(10);  //better to take value b/w 5-15 for strong password 10 is used as it provide a balance of security and performance.  The genSalt function generates a salt, which is a random value added to the password before hashing. This helps to protect against rainbow table attacks, where precomputed tables of hashed values are used to crack passwords.
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        
        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}



export {loginUser,registerUser}