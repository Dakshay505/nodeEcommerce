import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
      quantity: {
        type: Number,
        required: true,
      },
      product:{
        ref:"Product",
        type:mongoose.Schema.Types.ObjectId
      },
      user:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId
      }
});
const virtual = cartSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

cartSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform : function (doc,ret){ delete ret._id} 
})

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
