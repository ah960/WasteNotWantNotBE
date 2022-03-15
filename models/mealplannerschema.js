
import mongoose from "mongoose";
import conn from "../db/database.js";

const Schema = mongoose.Schema;


// create an schema
var mealPlannerSchema = new Schema(
{
    
            user_id: String,
            meal_plan: [{
                recipe_name: String,
                recipe_id: String,
                prep_time: Number,
                cook_time: Number,
                calories: Number
            }],
            
        }, {
             versionKey: false 
        });
        


export default mongoose.model("mealPlannerList", mealPlannerSchema)