import { recipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { userModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const response=await recipeModel.find({});
        res.json(response)

    }
    catch(err){
        res.json(err)
    }

})

router.post("/",verifyToken,async(req,res)=>{
    const recipe=new recipeModel(req.body)
    try{
        const response=await recipe.save();
        res.json(response)

    }
    catch(err){
        res.json(err)
    }

})

router.put("/",verifyToken,async(req,res)=>{


    
    try{
        const recipe=await recipeModel.findById(req.body.recipeID)
        const user=await userModel.findById(req.body.userID)
        if(req.body.type==="save"){
            user.savedRecipes.push(recipe._id);
            await user.save();
            res.json({savedRecipes:user.savedRecipes})
        }
        else{
           
            const tempSavedRecipes=user.savedRecipes.filter((recipeID)=>recipeID.toString()!==recipe._id.toString())
            user.savedRecipes=tempSavedRecipes;
            await user.save();
            const savedRecipes=await recipeModel.find({_id:{$in:user.savedRecipes}})
            res.json({savedRecipes})

        }
        
        
        

    }
    catch(err){
        res.json(err)
    }

})

router.get("/recipe/:recipeID",async(req,res)=>{

    try {
        const recipe=await recipeModel.findById(req.params.recipeID).populate('userOwner')
        res.json(recipe)
        
    } catch (error) {
        res.json(err);
        
    }



});

router.get("/savedRecipes/ids/:userID",async(req,res)=>{


    try {
        const user=await userModel.findById(req.params.userID)
        res.json({savedRecipes:user?.savedRecipes});
        
    } catch (err) 
    {
        res.json(err)
        
    }
})

router.get("/savedRecipes/:userID",async(req,res)=>{


    try {
        const user=await userModel.findById(req.params.userID)
        const savedRecipes=await recipeModel.find({_id:{$in:user.savedRecipes}})
        res.json({savedRecipes});
        
    } catch (err) 
    {
        res.json(err)
        
    }
})



export {router as recipesRouter}