import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "label is required."],
  },
  value: {
    type: String,
    required: [true, "value is required."],
  },
  checked:{
    type:Boolean,
    default:false
  }
});
const virtual = brandSchema.virtual('id');
virtual.get(function(){
  return this._id;
})

brandSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform : function (doc,ret){ delete ret._id} 
})

const brandModel = mongoose.model("Brand", brandSchema);
export default brandModel;
