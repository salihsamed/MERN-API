import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'

import {userRouter} from "./routes/users.js"
import { recipesRouter } from "./routes/recipes.js";

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);

mongoose.connect(`mongodb+srv://${process.env.NICK}:${process.env.PASSWORD}@recipesdb.i1fcuil.mongodb.net/recipesDB?retryWrites=true&w=majority&appName=AtlasApp`);

app.listen(3001,()=>console.log("Server started !"))
