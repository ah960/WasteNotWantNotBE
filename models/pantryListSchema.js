import mongoose from "mongoose";
import conn from "../db/database.js";

const Schema = mongoose.Schema;

// create an schema
var pantryListSchema = new Schema(
  {
    user_id: String,
    pantry_items: [
      {
        name: String,
        est_exp: Date,
        category: String,
        quantity: String, //new
        measurement: String, //new
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Pantrylist", pantryListSchema);
