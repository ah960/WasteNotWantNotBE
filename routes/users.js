import express from "express";
const router = express.Router();
import mongoose from "mongoose"
import User from "../models/userschema.js"


/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await User.find()
  // const collection = conn.db("Wastenot").collection("Users")
  res.send({success: "has it worked", payload: users })
});

/* GET users by ID listing. */
router.get("/:id", async function (req, res, next) {
  
  const user = await User.findOne({ _id: req.params.id })
  res.send({success: true, payload: user })
});

/* POST users listing */
router.post("/", async function (req, res, next) {
  const {_id, name, email, dietary_reqs, wastage, consumption, donations} = req.body
  const user = await new User(
    {
    _id: _id,  
    name: name,
    email: email, 
    dietary_reqs: dietary_reqs, 
    wastage: wastage,
    consumption: consumption,
    donations: donations}
    )
    console.log(user)
  user.save()
  res.json({success:"yes", payload: user})
});

/* UPDATE user by ID listing */
router.put('/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })

  if (!user) return res.status(404).send('The user with the given ID was not found.');
console.log(req.body)
  let query = {$set: {}};
  for (let key in req.body) {
    
    if (user[key] && user[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
    console.log(key)
      query.$set[key] = req.body[key];
  }
  const updatedUser = await User.updateOne({_id: req.params.id}, query).exec();
  console.log(query)
  res.send(updatedUser);
});


/* DELETE user by ID listing */
router.delete("/:id", async function (req, res, next) {
  const user = await User.remove({ _id: req.params.id })
  res.send({success: true, payload: user })
});

export default router;
