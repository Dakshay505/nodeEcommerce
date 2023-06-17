import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
      items:{type:[mongoose.Schema.Types.Mixed],required:true},
      totalAmount:{type:Number},
      totalItems:{type:Number},
      paymentMethod:{type:String},
      user:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId
      },
      status:{type:String,default:"pending"},
      selectedAddress:{type:[mongoose.Schema.Types.Mixed]}
});
const virtual = orderSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

orderSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform : function (doc,ret){ delete ret._id} 
})

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
