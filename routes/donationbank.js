import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import DonationBank from "../models/donationbank.js";

/* GET pantry list listing. */
router.get("/", async function (req, res, next) {
  if (req.query.user_id) {
    let donationBank = await DonationBank.find({ user_id: req.query.user_id });
    res.send({ success: "has it worked", payload: donationBank });
  } else {
    let donationBank = await DonationBank.find();
    res.send({ success: "has it worked", payload: donationBank });
  }
  // const collection = conn.db("Wastenot").collection("Users")
});

/* GET pantry list by ID listing. */
router.get("/:id", async function (req, res, next) {
  const donationBank = await DonationBank.findOne({ _id: req.params.id });
  res.send({ success: true, payload: donationBank });
});

/* POST pantry list listing */
router.post("/", async function (req, res, next) {
  const { user_id, donation_banks } = req.body;
  let est_exp = new Date();

  let di = donation_banks.map((d) => {
    return { ...d, est_exp };
  });
  const donationBank = await new DonationBank({
    user_id: user_id,
    donation_banks: di,
  });
  console.log(donationBank);
  donationBank.save();
  res.json({ success: "yes", payload: donationBank });
});

/* UPDATE pantry list by ID listing */
router.put("/update", async (req, res) => {
  console.log("user_id", req.query.user_id);
  const donationBank = await DonationBank.findOne({ user_id: req.query.user_id });

  console.log("req.body", req.body);

  if (!donationBank)
    return res
      .status(404)
      .send("The pantry list with the given ID was not found. 😔");

  let query = { $push: {} };

  for (let key in req.body) {
    if (donationBank[key] && donationBank[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$push[key] = req.body[key];
  }

  const updatedDonationBank = await DonationBank.updateOne(
    { user_id: donationBank.user_id },
    query
  ).exec();

  console.log("Query", query);
  console.log("updatedDonationBank", updatedDonationBank);

  res.send(updatedDonationBank);

  // if (req.body.id) {
  //   res.send(updatedDonationBank);
  // } else {
  //   let query = { $set: {} };

  //   const updatedDonationBank = await DonationBank.updateOne(
  //     { _id: req.params.id },
  //     query
  //   ).exec();
  // }
});

/* DELETE pantry list by ID listing */
router.delete("/:id", async function (req, res, next) {
  const donationBank = await DonationBank.deleteOne({ _id: req.params.id });
  res.send({ success: true, payload: donationBank });
});

router.delete("/", async function (req, res, next) {
  
  const donationBank = await DonationBank.findOne({ user_id: req.query.user_id });

  if (!donationBank)
    return res
      .status(404)
      .send("The pantry list with the given ID was not found. 😔");

  let query = { $pull: {} };

  for (let key in req.body) {
    if (donationBank[key] && donationBank[key] !== req.body[key])
      // if the field swe have in req.body exists, we're gonna update it
      query.$pull[key] = req.body[key];
  }

  const updatedDonationBank = await DonationBank.updateOne(
    { user_id: donationBank.user_id },
    query
  ).exec();

  res.send(updatedDonationBank);
});

export default router;
