import mongoose from "mongoose";

const RecipeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    explanation:{type:String,required:true},
    ingredients:[{type:String,required:true}],
    instructions:[{type:String,required:true}],
    imageUrl:{type:String,required:true},
    preparationTime:{type:Number,required:true},
    cookingTime:{type:Number,required:true},
    userOwner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
});

export const recipeModel=mongoose.model("recipes",RecipeSchema);