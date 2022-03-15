import mongoose from "mongoose"

const uri = process.env.REACT_APP_URI;
mongoose.connect(uri)
const conn=mongoose.connection
// const collection = conn.db("Wastenot").collection("Users");
conn.on('connected',function(){
  console.log('it works')
})

export default conn