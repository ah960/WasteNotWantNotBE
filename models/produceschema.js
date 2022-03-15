import mongoose from "mongoose";

const Schema = mongoose.Schema;

 
// create an schema
var produceSchema = new Schema({
            item_name: String,
            exp_days:Number,
            storage: String,
            category: String,

        }, {
             versionKey: false 
        });
        
// const collection = conn.db("Wastenot").collection("Users")

export default mongoose.model("ProduceData", produceSchema)