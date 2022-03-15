import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import DonationList from "../models/donationschema.js";

/* GET users listing. */
router.get("/", async function (req, res, next) {
  if (req.query.user_id) {
    let donation = await DonationList.find({user_id: req.query.user_id})
    res.send({success: "has it worked", payload: donation})

  }else {
  const donation = await DonationList.find();
  res.send({ success: true, payload: donation });
}
  // const collection = conn.db("Wastenot").collection("Users")

});

/* GET users by ID listing. */
router.get("/:id", async function (req, res, next) {
  const donation = await DonationList.findOne({ _id: req.params.id });
  res.send({ success: true, payload: donation });
});

/* POST users listing */
// prettier-ignore
router.post("/", async function (req, res, next) {

  const {user_id, donated_items} = req.body
  let est_exp = new Date();
 
  let di = donated_items.map((d)=> {
    return {...d, est_exp}
  })

  console.log("di",  di)

  const donation = await new DonationList(
    { 
        user_id: user_id,
        donated_items: di
    }
    )
  donation.save()
  res.json({success:"yes", payload: donation})

});

/* UPDATE user by ID listing */
router.put("/update", async (req, res) => {
  const donations = await DonationList.findOne({ user_id: req.query.user_id });
  if (!donations)
    return res
      .status(404)
      .send("The mealplan with the given ID was not found.");

  let query = { $push: {} };
  for (let key in req.body) {
    if (donations[key] && donations[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$push[key] = req.body[key];
  }
  const newdonations = await DonationList.updateOne(
    {_id: donations._id },
    query
  ).exec();
  console.log(query)

  res.send(donations);
});

/* DELETE user by ID listing */
router.delete("/:id", async function (req, res, next) {
  const donation = await DonationList.remove({ _id: req.params.id });
  res.send({ success: true, payload: donation });
});

router.delete("/", async function (req, res, next) {
  
  const donations = await DonationList.findOne({ user_id: req.query.user_id });

  if (!donations)
    return res
      .status(404)
      .send("The pantry list with the given ID was not found. 😔");

  let query = { $pull: {} };

  for (let key in req.body) {
    if (donations[key] && donations[key] !== req.body[key])
      // if the field swe have in req.body exists, we're gonna update it
      query.$pull[key] = req.body[key];
  }

  const updatedDonations = await DonationList.updateOne(
    { user_id: donations.user_id },
    query
  ).exec();

  res.send(updatedDonations);
});

export default router;
