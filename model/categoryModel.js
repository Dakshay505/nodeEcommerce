import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
const virtual = categorySchema.virtual('id');
virtual.get(function(){
  return this._id;
})

categorySchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform : function (doc,ret){ delete ret._id} 
})

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
