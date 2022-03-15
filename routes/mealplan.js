import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import mealplanList from "../models/mealplannerschema.js";
/* GET users listing. */
router.get("/", async function (req, res, next) {
  if (req.query.user_id) {
    let mealplan = await mealplanList.find({ user_id: req.query.user_id });
    res.send({ success: "has it worked", payload: mealplan });
  } else {
    let mealplan = await mealplanList.find();
    res.send({ success: "has it worked", payload: mealplan });
  }
  // const collection = conn.db("Wastenot").collection("Users")
});
/* GET users by ID listing. */
router.get("/:id", async function (req, res, next) {
  const mealplan = await mealplanList.findOne({ _id: req.params.id });
  res.send({ success: true, payload: mealplan });
});
// /* GET users by User ID listing. */
// router.get("/", async function (req, res, next) {
//     const mealplan = await mealplanList.findOne({ _id: req.params.id });
//     res.send({ success: true, payload: mealplan });
//   });
/* POST users listing */
// prettier-ignore
router.post("/", async function (req, res, next) {
  const {user_id, meal_plan} = req.body
  const mealplan = await new mealplanList(
    {
        user_id: user_id,
        meal_plan: meal_plan
    }
    )
  mealplan.save()
  res.json({success:"yes", payload: mealplan})

});

/* UPDATE user by ID listing, UPDATE TO UPDATE*/
router.put("/update", async (req, res) => {
  //diff route 67
  const mealplan = await mealplanList.findOne({ user_id: req.query.user_id });
  if (!mealplan)
    return res
      .status(404)
      .send("The mealplan with the given ID was not found.");

  let query = { $push: {} }; //diff 74;

  for (let key in req.body) {
    if (mealplan[key] && mealplan[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$push[key] = req.body[key]; //diff 78
  }
  const newmealplan = await mealplanList
    .updateOne({ _id: mealplan._id }, query)
    .exec();
  console.log(query);

  res.send(newmealplan);
});

/* UPDATE user by ID listing REPLACE TO REPLACE*/
router.put("/replace", async (req, res) => {
  const mealplan = await mealplanList.findOne({ user_id: req.query.user_id });
  if (!mealplan)
    return res
      .status(404)
      .send("The mealplan with the given ID was not found.");

  let query = { $set: {} };
  for (let key in req.body) {
    if (mealplan[key] && mealplan[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];
  }
  const newmealplan = await mealplanList
    .updateOne({ _id: mealplan._id }, query)
    .exec();
  console.log(query);

  res.send(newmealplan);
});

/* DELETE user by ID listing */
router.delete("/:id", async function (req, res, next) {
  const mealplan = await mealplanList.remove({ _id: req.params.id });
  res.send({ success: true, payload: mealplan });
});

router.delete("/", async function (req, res, next) {
  const mealPlan = await mealplanList.findOne({ user_id: req.query.user_id });

  if (!mealPlan)
    return res
      .status(404)
      .send("The pantry list with the given ID was not found. 😔");

  let query = { $pull: {} };

  for (let key in req.body) {
    if (mealPlan[key] && mealPlan[key] !== req.body[key])
      // if the field swe have in req.body exists, we're gonna update it
      query.$pull[key] = req.body[key];
  }

  const updatedMealPlan = await mealplanList
    .updateOne({ user_id: mealPlan.user_id }, query)
    .exec();

  res.send(updatedMealPlan);
});

export default router;
