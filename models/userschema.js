import mongoose from "mongoose";
import conn from "../db/database.js";

const Schema = mongoose.Schema;

 
// create an schema
var userSchema = new Schema({
            _id: String,
            name: String,
            email:String,
            dietary_reqs: Array,
            wastage: Number,
            consumption: Number,
            donations: Number,

        }, {
             versionKey: false 
        });
        
// const collection = conn.db("Wastenot").collection("Users")

export default mongoose.model("User", userSchema) 