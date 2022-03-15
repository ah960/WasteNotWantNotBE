import mongoose from "mongoose";
const Schema = mongoose.Schema;
// create an schema, line 6 to stop commas being added on lines 17 & 18 by prettier
// prettier-ignore
var shoppinglistSchema = new Schema(
  {
    id: String,
    shopping_items:[
      {
        _itemid: String,
        name: String,
        est_exp: Date,
        category: String,
        quantity: String,
        measurement: String
      }
    ],
    user_id: String,
  },
  {
    versionKey: false,
  }
);
export default mongoose.model("Shoppinglist", shoppinglistSchema);
