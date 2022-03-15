import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Shoppinglist from "../models/shoppinglistschema.js";

/* GET shoppinglist listing. */
router.get("/", async function (req, res, next) {
  if (req.query.user_id) {
    let mealplan = await Shoppinglist.find({ user_id: req.query.user_id });
    res.send({ success: "has it worked", payload: mealplan });
  } else {
    let mealplan = await Shoppinglist.find();
    res.send({ success: "has it worked", payload: mealplan });
  }
  // const shopList = await Shoppinglist.find();
  // // const collection = conn.db("Wastenot").collection("Users")
  // res.send({ success: "has it worked", payload: shopList });
});

/* GET shoppinglist by ID listing. */
router.get("/:id", async function (req, res, next) {
  const shopList = await Shoppinglist.findOne({ _id: req.params.id });
  res.send({ success: true, payload: shopList });
});
  
/* POST shoppinglist listing */
// prettier-ignore
router.post("/", async function (req, res, next) {
const user_id  = req.query.user_id; 
  const { shopping_items, id } = req.body;
  let est_exp = new Date();

  console.log("shopping list is", shopping_items);

  let sli = shopping_items.map((d)=> {
    return { ...d, est_exp };
  });

  console.log("shopList", sli)

  const shopList = await new Shoppinglist({
    user_id: user_id,
    shopping_items: sli,
    id: id,
  });console.log(shopList, "into db")
  shopList.save();
  res.json({ success: "yes", payload: shopList })
});

/* UPDATE user by ID listing, UPDATE TO UPDATE*/
router.put("/update", async (req, res) => {
  //diff route 67
  const shopList = await Shoppinglist.findOne({ user_id: req.query.user_id });
  if (!shopList)
    return res
      .status(404)
      .send("The shopList with the given ID was not found.");

  let query = { $push: {} }; //diff 74;
  
  for (let key in req.body) {
    if (shopList[key] && shopList[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$push[key] = req.body[key]; //diff 78
  }
  const newshopList = await Shoppinglist
    .updateOne({ _id: shopList._id }, query)
    .exec();
  console.log(query);

  res.send(newshopList);
});

/* DELETE shoppinglist by ID listing */ //ORIGINAL
router.delete("/:id", async function (req, res, next) {
  const shopList = await Shoppinglist.deleteOne({ user_id: req.query.user_id });
  res.send({ success: true, payload: shopList });
});

router.delete("/", async function (req, res, next) {
  const shopList = await Shoppinglist.findOne({ user_id: req.query.user_id });
  console.log(req.body)

  if (!shopList)
    return res
      .status(404)
      .send("The shop list with the given ID was not found. 😔");

  let query = { $pull: {} };

  for (let key in req.body) {
    if (shopList[key] && shopList[key] !== req.body[key])
      // if the field swe have in req.body exists, we're gonna update it
      query.$pull[key] = req.body[key];
  }

  const updatedShopList = await Shoppinglist
    .updateOne({ user_id: shopList.user_id }, query)
    .exec();

  res.send(updatedShopList);
});

/* UPDATE shoppinglist by ID listing */
router.put("/update", async (req, res) => {
  const shopList = await Shoppinglist.findOne({ user_id: req.query.user_id }); //find shopping list ID from what we pull from DB in our get request or even can change it to UserID they only have one shopping list

  console.log(shopList);
  console.log("req.body", req.body);

  if (!shopList)
    return res
      .status(404)
      .send("The shopping list with the given ID was not found. 😔");

  let query = { $push: {} };

  for (let key in req.body) {
    if (shopList[key] && shopList[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$push[key] = req.body[key];
  }

  const updatedShopList = await Shoppinglist.updateOne(
    { user_id: shopList.user_id },
    query
  ).exec();

  console.log("Query", query);
  console.log("updatedShopList", updatedShopList);

  res.send(updatedShopList);
});

// /* UPDATE shoppinglist by ID listing ORIGINAL*/
// router.put("/:id", async (req, res) => {
//   const shopList = await Shoppinglist.findOne({ _id: req.params.id });

//   if (!shopList)
//     return res
//       .status(404)
//       .send("The shopping list with the given ID was not found. 😔");

//   let query = { $set: {} };
//   for (let key in req.body) {
//     if (shopList[key] && shopList[key] !== req.body[key])
//       // if the field we have in req.body exists, we're gonna update it
//       query.$set[key] = req.body[key];
//   }
//   const updatedShopList = await Shoppinglist.updateOne(
//     { _id: req.params.id },
//     query
//   ).exec();

//   res.send(updatedShopList);
// });

export default router;
