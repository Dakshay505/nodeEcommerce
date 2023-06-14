import mongoose from "mongoose";

const connectDb = ()=>{
   mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Database Connected Successfully");
   }).catch((e)=>{
     console.log(e);
   })
}
export default connectDb;