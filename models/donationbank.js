import mongoose from "mongoose";

const Schema = mongoose.Schema;
 
// create an schema
var donationbank = new Schema({
            user_id: String,
            donation_banks:[ {
                name: String,
                lat: Number,
                long: Number,
                distance: Number,
                email: String,
                phone: String,
                address: String
          }]

        }, {
             versionKey: false 
        });
        
// const collection = conn.db("Wastenot").collection("Users")

export default mongoose.model("DonationBank", donationbank)