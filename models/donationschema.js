import mongoose from "mongoose";

const Schema = mongoose.Schema;
 
// create an schema
var donationSchema = new Schema({
            user_id: String,
            donated_items:[ {
               name: String,
               est_exp: String,
               category: String, 
               quanitiy: Number,
               measurement: String
          }]

        }, {
             versionKey: false 
        });
        
// const collection = conn.db("Wastenot").collection("Users")

export default mongoose.model("DonationList", donationSchema)