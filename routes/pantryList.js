import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import PantryList from "../models/pantryListSchema.js";

/* GET pantry list listing. */
router.get("/", async function (req, res, next) {
  if (req.query.user_id) {
    let pantryList = await PantryList.find({ user_id: req.query.user_id });
    res.send({ success: "has it worked", payload: pantryList });
  } else {
    let pantryList = await PantryList.find();
    res.send({ success: "has it worked", payload: pantryList });
  }
  // const collection = conn.db("Wastenot").collection("Users")
});

/* GET pantry list by ID listing. */
router.get("/:id", async function (req, res, next) {
  const pantryList = await PantryList.findOne({ _id: req.params.id });
  res.send({ success: true, payload: pantryList });
});

/* POST pantry list listing */
router.post("/", async function (req, res, next) {
  const user_id = req.query.user_id
  const { pantry_items } = req.body;
  let est_exp = new Date();

  let di = pantry_items.map((d) => {
    return { ...d, est_exp };
  });
  const pantryList = await new PantryList({
    user_id: user_id,
    pantry_items: di,
  });
  console.log(pantryList);
  pantryList.save();
  res.json({ success: "yes", payload: pantryList });
});

/* UPDATE pantry list by ID listing */
router.put("/update", async (req, res) => {
  console.log("user_id", req.query.user_id);
  const pantryList = await PantryList.findOne({ user_id: req.query.user_id });

  console.log("req.body", req.body);

  if (!pantryList)
    return res
      .status(404)
      .send("The pantry list with the given ID was not found. 😔");

  let query = { $push: {} };

  for (let key in req.body) {
    if (pantryList[key] && pantryList[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$push[key] = req.body[key];
  }

  const updatedpantryList = await PantryList.updateOne(
    { user_id: pantryList.user_id },
    query
  ).exec();

  console.log("Query", query);
  console.log("updatedPantryList", updatedpantryList);

  res.send(updatedpantryList);

  // if (req.body.id) {
  //   res.send(updatedpantryList);
  // } else {
  //   let query = { $set: {} };

  //   const updatedpantryList = await PantryList.updateOne(
  //     { _id: req.params.id },
  //     query
  //   ).exec();
  // }
});

/* DELETE pantry list by ID listing */
router.delete("/:id", async function (req, res, next) {
  const pantryList = await PantryList.deleteOne({ _id: req.params.id });
  res.send({ success: true, payload: pantryList });
});

router.delete("/", async function (req, res, next) {
  const pantryList = await PantryList.findOne({ user_id: req.query.user_id });
console.log(req.body)
  if (!pantryList)
    return res
      .status(404)
      .send("The pantry list with the given ID was not found. 😔");

  let query = { $pull: {} };

  for (let key in req.body) {
    if (pantryList[key] && pantryList[key] !== req.body[key])
      // if the field swe have in req.body exists, we're gonna update it
      query.$pull[key] = req.body[key];
  }

  const updatedpantryList = await PantryList.updateOne(
    { user_id: pantryList.user_id },
    query
  ).exec();

  res.send(updatedpantryList);
});

export default router;
