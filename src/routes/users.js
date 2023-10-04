import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/Users.js"
import 'dotenv/config'

const router=express.Router()

router.post("/register",async(req,res)=>{
    const {username,password}=req.body
    const user = await userModel.findOne({username});
    if(user){
        return res.json("This user already exist.");
    }


    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new userModel({username,password:hashedPassword});
    await newUser.save();

    res.json({message:"User Registered Succesfully!"})
   
})

router.post("/login",async (req,res)=>{

    const {username,password}=req.body;
    const user=await userModel.findOne({username});

    if(!user){
        return res.json({message:"User Doesn't Exist!"})
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.json({message:"Username or Password is Incorrect"});
    }

    const token=jwt.sign({id:user._id},process.env.SECRET)
    res.json({token,userID:user._id});


})


export {router as userRouter};

export const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.SECRET,(err)=>{
          if(err) return res.sendStatus(403);
          next();  
        })
    }
    else{
        res.sendStatus(401);
    }
}