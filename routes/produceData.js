import express from "express";
const router = express.Router();
import mongoose from "mongoose"
import ProduceData from "../models/produceschema.js"

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const produce = await ProduceData.find()
  // const collection = conn.db("Wastenot").collection("Users")
  res.send({success: "has it worked", payload: produce })
});

/* GET users by ID listing. */
router.get("/:id", async function (req, res, next) {
  const produce = await ProduceData.findOne({ _id: req.params.id })
  res.send({success: true, payload: produce })
});

/* POST users listing */
router.post("/", async function (req, res, next) {
  const {item_name, exp_days, storage, category} = req.body
  const produce = await new ProduceData(
    {item_name: item_name,
    exp_days: exp_days, 
    storage: storage, 
    category: category,
    }
    )
    console.log(produce)
  produce.save()
  res.json({success:"yes", payload: produce})
});

/* UPDATE user by ID listing */
router.put('/:id', async (req, res) => {
  const produce = await ProduceData.findOne({ _id: req.params.id })

  if (!produce) return res.status(404).send('The produce with the given ID was not found.');

  let query = {$set: {}};
  for (let key in req.body) {
    if (produce[key] && produce[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
       query.$set[key] = req.body[key];
  }
  const updatedProduce = await ProduceData.updateOne({_id: req.params.id}, query).exec();

  res.send(updatedProduce);
});

/* DELETE user by ID listing */
router.delete("/:id", async function (req, res, next) {
  const produce = await ProduceData.remove({ _id: req.params.id })
  res.send({success: true, payload: produce })
});

export default router;
